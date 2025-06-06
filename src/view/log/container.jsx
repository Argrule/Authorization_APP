import { useState } from 'react'
import './log.css'
import { alertDialog } from '@/component/DialogProvider';

const LogContainer = (props) => {

    const [name, setName] = useState('');
    const [privateKey, setPrivateKey] = useState('');
    const [isShow, setIsShow] = useState(false);

    const updateName = (event) => {
        setName(event.target.value);
    }

    const syncFromLocal = () => {
        setName(localStorage.getItem("name") || "");
        setPrivateKey(localStorage.getItem("pvk") || "");
    };

    const handleLogin = (event) => {
        event.preventDefault();
        if (!name || !privateKey) {
            // 简单校验，后续可用弹窗提示
            alertDialog('请输入用户名和私钥');
            return;
        }
        props.login(name, privateKey);
    }

    return (
        <main>
            <form onSubmit={handleLogin}>
                <fieldset className="flex formField" style={{ gap: '24px' }}>
                    <legend style={{ color: '#0dbc79' }}>Login</legend>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5em', position: 'relative' }}>
                        <input className="prefix" onInput={updateName} type="text" required placeholder="Name>" value={name} style={{ width: '100%' }} />
                        <span
                            className="sync-icon"
                            title="同步本地私钥和用户名"
                            style={{
                                cursor: 'pointer',
                                fontSize: '1.15em',
                                color: '#0dbc79',
                                transition: 'color 0.2s',
                                position: 'absolute',
                                right: '10px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'none',
                                border: 'none',
                                lineHeight: 1
                            }}
                            onClick={syncFromLocal}
                        >
                            &#x21bb;
                        </span>
                    </div>
                    <div className="show-mnemonic" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5em' }}>
                        <input
                            className="prefix"
                            type={isShow ? "text" : "password"}
                            placeholder="private key>"
                            value={privateKey}
                            onChange={e => setPrivateKey(e.target.value)}
                        />
                        <span className="show-icon" title={isShow ? '隐藏私钥' : '显示私钥'} onClick={() => setIsShow(!isShow)}>
                            {isShow ? "🙉" : "🙈"}
                        </span>
                    </div>
                    <button type="submit" style={{ marginTop: '8px' }}>Login</button>
                </fieldset>
            </form>
        </main>
    )
}

export default LogContainer;