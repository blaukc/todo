import React, {Fragment, useState} from "react";

const InputTodo = () => {

    const [description, setDescription] = useState("")
    const [due, setDue] = useState("")

    const onSubmitForm = async(e) => {
        e.preventDefault();
        try {
            const body = {description, due};
            const response = await fetch("http://localhost:5000/todos", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })

            window.location = "/";
        } catch(err) {
            console.error(err.message)
        }
    }

    return(
        <Fragment>
            <h1 className="text-center mt-5">Input Todo</h1>
            <form className="container" onSubmit={onSubmitForm}>
                <div className="d-flex mt-5">
                    <div className="col-9">
                        <input type="text" className="form-control"
                        value={description}
                        onChange={e => setDescription(e.target.value)}/>
                    </div>
                    <div className="col-3">
                        <input type="date" className="form-control"
                        value={due}
                        onChange={e => setDue(e.target.value)}/>
                    </div>
                </div>
                <div className="d-grid gap-2 col-2 mx-auto mt-3">
                    <button className="btn btn-success">Add</button>
                </div>
            </form>
        </Fragment>
    );
}

export default InputTodo
