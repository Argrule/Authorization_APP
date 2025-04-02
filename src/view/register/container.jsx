import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import './index.css'

const RegContainer = (props) => {

    const [name, setName] = useState('');
    const updateName = (event) => {
        setName(event.target.value);
    }

    useEffect(() => {
        setName(localStorage.getItem("name") || "");
    }, [])

    const navigate = useNavigate();
    const goLogin = () => {
        navigate('/log');
    }

    /**
     * 根据点击的按钮，执行不同的操作     
     */
    const handleOperation = async (e) => {
        e.preventDefault();
        switch (e.nativeEvent.submitter.name) {
            case 'register':
                props.register(name);
                break;
            case 'test':
                props.test(name);
                break;
        }
    }
    return (
        <main>
            <form onSubmit={handleOperation}>
                <fieldset className="flex formField">
                    <legend>Register</legend>
                    <input className="prefix" onInput={updateName} type="text" required placeholder="Name>" value={name} />
                    <button name="test">Ready?</button>
                    <button type="submit" name="register">Register</button>
                    <nav className="link" onClick={goLogin}> go to Login</nav>
                </fieldset>
            </form>
            {/* 展示助记词 */}
            {!localStorage.getItem("mnemonic") ? "" : "助记词：" + localStorage.getItem("mnemonic")}
            <dialog id="confirmDialog">
                <h2>确认操作</h2>
                <p id="dialogMessage"></p>
                <div>
                    <button >确定</button>
                    <button >取消</button>
                </div>
            </dialog>
        </main>
    )
}

export default RegContainer;