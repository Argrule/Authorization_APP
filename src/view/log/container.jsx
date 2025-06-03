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
                <fieldset className="flex formField" style={{gap: '24px'}}>
                    <legend style={{ color: '#0dbc79' }}>Login</legend>
                    <input className="prefix" onInput={updateName} type="text" required placeholder="Name>" value={name} />
                    <div className="show-mnemonic" style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5em'}}>
                        <input
                            className="prefix"
                            type={isShow ? "text" : "password"}
                            placeholder="private key>"
                            value={privateKey}
                            onChange={e => setPrivateKey(e.target.value)}
                        />
                        <span className="show-icon" onClick={() => setIsShow(!isShow)}>
                            {isShow ? "🙉" : "🙈"}
                        </span>
                    </div>

                    <button type="submit" style={{marginTop: '8px'}}>Login</button>
                </fieldset>
            </form>
        </main>
    )
}

export default LogContainer;