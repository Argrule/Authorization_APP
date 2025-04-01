import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import './log.css'

const LogContainer = (props) => {

    const [name, setName] = useState('');
    const updateName = (event) => {
        setName(event.target.value);
    }

    const navigate = useNavigate();
    const goRegister = () => {
        navigate('/register');
    }

    return (
        <main>
            <form onSubmit={(event) => {
                event.preventDefault();                
                props.login(name)
            }}
            >
                <fieldset className="flex formField">
                    <legend>Login</legend>
                    <span>Please input your name</span>
                    <input className="prefix" onInput={updateName} type="text" required placeholder="Name>" />                    

                    <button type="submit">Login</button>                    
                    <nav className="link" onClick={goRegister}> go to register</nav>
                </fieldset>
            </form>
        </main>
    )
}

export default LogContainer;