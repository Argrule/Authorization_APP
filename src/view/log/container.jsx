import { useState } from 'react'
import './log.css'

const LogContainer = (props) => {

    const [name, setName] = useState('');
    const updateName = (event) => {
        setName(event.target.value);
    }
    const [pass, setPass] = useState('');
    const updatePass = (event) => {
        setPass(event.target.value);
    }

    return (
        <main>
            <form onSubmit={(event) => {
                event.preventDefault()
                console.log("name====>", name)
                console.log("pass====>", pass)
                props.login(name, pass)
            }}
            >
                <fieldset className="flex formField">
                    <legend>Login</legend>
                    <span>Please input your name and password</span>
                    <input className="prefix" onInput={updateName} type="text" required placeholder="Name>" />
                    <input className="prefix" onInput={updatePass} type="text" required placeholder="Password>" />

                    <button type="submit">Login</button>
                    <nav className="link"> go to register</nav>
                </fieldset>
            </form>
        </main>
    )
}

export default LogContainer;