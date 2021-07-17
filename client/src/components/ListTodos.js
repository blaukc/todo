import React, {Fragment, useEffect, useState} from "react";
import EditTodo from './EditTodo'

const ListTodos = () => {

    const [todos, setTodos] = useState([]);

    const getTodos = async() => {
        try {
            const response = await fetch("http://localhost:5000/todos");
            var jsonData = await response.json()

            jsonData = jsonData.sort((a, b) => {            //sorts due dates
                console.log(a)
                return new Date(a.due) - new Date(b.due)
            })

            for (let i = 0; i < jsonData.length; i++) {     //loops through dates to convert the date format
                if (jsonData[i].due) {
                    console.log(jsonData[i].due)
                    var d = new Date(jsonData[i].due);
                    d = d.toLocaleDateString();             //converts from mmddyyyy to ddmmyyyy
                    var monthDayYear = d.split("/")
                    var dayMonthYear = monthDayYear[1] + '/' + monthDayYear[0] + '/' + monthDayYear[2]
                    jsonData[i].due = dayMonthYear;
                }
            }

            setTodos(jsonData)
        } catch(err) {
            console.error(err.message)
        }
    }

    const deleteTodo = async(id) => {
        try {
            const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
                method: "DELETE"
            })

            setTodos(todos.filter(todo => todo.todo_id !== id))
        } catch(err) {
            console.error(err.message);
        }
    }

    useEffect(() => {           //useEffect runs on every time React renders or whenever state changes
        getTodos();
    }, [])

    return(
        <Fragment>
            <h1 className="text-center mt-5">List Todos</h1>
            <table className="table mt-3 text-center">
                <thead>
                    <tr>
                        <th className="col-8">Description</th>
                        <th className="col-2">Due</th>
                        <th className="col-1">Edit</th>
                        <th className="col-1">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map(todo => (
                        <tr key={todo.todo_id}>
                            <td>{todo.description}</td>
                            <td>{todo.due}</td>
                            <td>
                                <EditTodo todo={todo}/>
                            </td>
                            <td>
                                <button className="btn btn-danger"
                                onClick={() => deleteTodo(todo.todo_id)}>
                                Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    );
}

export default ListTodos
