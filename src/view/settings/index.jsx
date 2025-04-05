import { useState } from 'react';

const Settings = () => {
    const [name, setName] = useState("");
    const [mnemonic, setMnemonic] = useState("");
    const [newAddress, setNewAddress] = useState("");   // 新地址
    const [newMnemonic, setNewMnemonic] = useState(""); // 新助记词
    const [isShow, setIsShow] = useState(false); // 显示/隐藏助记词

    const handleInput = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'name':
                setName(value.trim());
                break;
            case 'mnemonic':
                setMnemonic(value.trim());
                break;
            case 'newMnemonic':
                setNewMnemonic(value);
                break;
            case 'newAddress':
                setNewAddress(value.trim());
                break;
            default:
                break;
        }
    };

    const handleSubmit = (e) => {
        if (!name || !mnemonic) {
            alert("Name and current mnemonic are required");
            return;
        }

        if (newAddress === "" && newMnemonic === "") {
            // 注销（Revoke）逻辑
            // localStorage.removeItem("name");
            // localStorage.removeItem("mnemonic");
            // localStorage.removeItem("address");
            // localStorage.removeItem("privateKey");
            // localStorage.removeItem("provider");
            alert("Account revoked successfully");
            navigate('/log');
        } else if (newMnemonic) {
            // 更换（Replace）逻辑
            localStorage.setItem("mnemonic", newMnemonic);
            localStorage.setItem("address", newAddress || ""); // 如果没有新地址，可以留空
            localStorage.setItem("name", name); // 保留原name
            alert("Account updated successfully");
        } else {
            alert("Please provide a new mnemonic for replacement");
        }

    };

    const handleGenerate = () => {
        console.log("Generating new mnemonic...");
        // alert(" Generating new mnemonic...");
        // const mnemonic = generateMnemonic(); // 生成助记词的函数
        // setNewMnemonic(mnemonic);
        setNewAddress("0x1234567890abcdef1234567890abcdef12345678");
        setNewMnemonic("0x1234567890abcdef1234567890abcdef12345678");
    }

    return (
        <main className="card" autoComplete="off">
            <p>Revoke & Replace</p>
            <input
                name="name"
                className="item prefix"
                type="text"
                placeholder="current name>"
                autoComplete="off"
                value={name}
                onChange={handleInput}
            />
            <input
                name="mnemonic"
                className="item prefix"
                type="text"
                placeholder="current mnemonic>"
                autoComplete="off"
                value={mnemonic}
                onChange={handleInput}
            />
            <div className="input-wrapper">
                <input
                    name="newAddress"
                    className="item"
                    type="text"
                    placeholder="new address (optional)>"
                    value={newAddress}
                    readOnly // 禁用输入框
                />
                <span className="input-icon" onClick={handleGenerate}>
                    🔑
                </span>
            </div>

            <input
                name="newMnemonic"
                className="item"
                type={isShow ? "text" : "password"}
                placeholder="new mnemonic (optional)>"
                value={newMnemonic}
                readOnly // 禁用输入框
            />
            <button onClick={handleSubmit}>Submit</button>
        </main>
    );
};

export default Settings;