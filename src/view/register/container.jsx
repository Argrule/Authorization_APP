import { useEffect, useState } from 'react'
import './index.css'

const RegContainer = (props) => {

    const [name, setName] = useState('');
    const [isShow, setIsShow] = useState(false);
    const [mnemonic, setMnemonic] = useState("");
    const updateName = (event) => {
        setName(event.target.value);
    }

    useEffect(() => {
        setName(localStorage.getItem("name") || "");
    }, [])

    /**
     * 根据点击的按钮，执行不同的操作     
     */
    const handleOperation = async (e) => {
        e.preventDefault();
        switch (e.nativeEvent.submitter.name) {
            case 'register':
                await props.register(name);
                setMnemonic(localStorage.getItem("mnemonic") || "");
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
                    {/* 待生成的助记词 */}
                    <div className="show-mnemonic">
                        <input
                            type={isShow ? "text" : "password"}
                            placeholder="mnemonic generating>"
                            value={mnemonic}
                            readOnly // 禁用输入框
                        />
                        <span className="show-icon" onClick={() => setIsShow(!isShow)}>
                            {isShow ? "🙉" : "🙈"}
                        </span>
                    </div>
                    <button name="test">Ready?</button>
                    <button type="submit" name="register">Register</button>
                </fieldset>
            </form>

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