import { useEffect, useState } from 'react'
import './log.css'

const LogContainer = (props) => {

    const [name, setName] = useState('');
    const [privateKey, setPrivateKey] = useState('');
    const [isShow, setIsShow] = useState(false);

    const updateName = (event) => {
        setName(event.target.value);
    }

    useEffect(() => {
        setName(localStorage.getItem("name") || "");
        setPrivateKey(localStorage.getItem("pvk") || "");
    }, [])

    return (
        <main>
            <form onSubmit={(event) => {
                event.preventDefault();
                props.login(name)
            }}
            >
                <fieldset className="flex formField">
                    <legend>Login</legend>
                    <input className="prefix" onInput={updateName} type="text" required placeholder="Name>" value={name} />
                    <div className="show-mnemonic">
                        <input
                            type={isShow ? "text" : "password"}
                            placeholder="private key>"
                            value={privateKey}
                            readOnly // 禁用输入框
                        />
                        <span className="show-icon" onClick={() => setIsShow(!isShow)}>
                            {isShow ? "🙉" : "🙈"}
                        </span>
                    </div>

                    <button type="submit">Login</button>
                </fieldset>
            </form>
        </main>
    )
}

export default LogContainer;