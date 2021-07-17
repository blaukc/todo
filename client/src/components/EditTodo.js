import React, {Fragment, useState} from "react";

const EditTodo = ({ todo }) => {
    const [description, setDescription] = useState(todo.description)
    const [due, setDue] = useState(todo.due)

    const editTodo = async e => {
        e.preventDefault();
        try {
            const body = {description, due};
            const response = await fetch(`http://localhost:5000/todos/${todo.todo_id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            window.location = "/";
        } catch(err) {
            console.error(err.message);
        }
    }

    const noChange = () => {
        setDescription(todo.description)
    }

    return(
        <Fragment>
            <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target={`#id${todo.todo_id}`}>Edit</button>

            <div className="modal fade" id={`id${todo.todo_id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title" id="exampleModalLabel">Edit Todo</h3>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                            onClick={noChange}></button>
                        </div>
                        <form>
                        <div className="modal-body">
                            <input type="text" className="form-control"
                            value={description}
                            onChange={e => setDescription(e.target.value)}/>
                            <input type="text" className="form-control mt-2"
                            value={due}
                            onChange={e => setDue(e.target.value)}/>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-warning" data-bs-dismiss="modal"
                            onClick={e => editTodo(e)}>Edit</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal"
                            onClick={noChange}>Close</button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default EditTodo;
