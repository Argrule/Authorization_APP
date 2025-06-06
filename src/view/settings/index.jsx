import { useState } from 'react';
import { generateAccount, generateAccountWithMnemonic } from '@/utils/privateKey';
import useGetWeb3 from '@/web3/useGetWeb3';
import { alertDialog } from '@/component/DialogProvider';

const Settings = () => {
    const { web3, account, contract } = useGetWeb3();

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
        }
    };
    const myDestroy = async (sig) => {
        try {
            const gasEstimate = await contract.methods.destroy(name, sig).estimateGas({ from: account });
            const receipt = await contract.methods.destroy(name, sig).send({ from: account, gasLimit: gasEstimate * 2n });
            console.log("Transaction receipt:", receipt);
            alertDialog("注销成功");
        } catch (error) {
            console.error("Error during transaction:", error);
            alertDialog("注销失败，请检查区块链连接和输入信息");
        }
    }
    const myReplace = async (sig) => {
        try {
            const gasEstimate = await contract.methods.modify(name, newAddress, sig).estimateGas({ from: account });
            const receipt = await contract.methods.modify(name, newAddress, sig).send({ from: account, gasLimit: gasEstimate * 2n });
            console.log("Transaction receipt:", receipt);
            alertDialog("更换成功");
        } catch (error) {
            console.error("Error during transaction:", error);
            alertDialog("更换失败，请检查区块链连接和输入信息");
        }
    }

    const handleSubmit = async () => {
        if (!name || !mnemonic) {
            alertDialog("名称和助记词不能为空");
            return;
        }
        let privateKey;
        try {
            privateKey = generateAccountWithMnemonic(mnemonic).privateKey;
        } catch (err) {
            alertDialog("助记词无效，无法生成私钥");
            return;
        }
        let signature;
        try {
            signature = web3.eth.accounts.sign(name, privateKey).signature;
        } catch (err) {
            alertDialog("签名失败，请检查Web3和私钥");
            return;
        }
        if (newAddress === "" && newMnemonic === "") {
            // 注销（Revoke）逻辑
            await myDestroy(signature);
        } else {
            // 更换（Replace）逻辑
            await myReplace(signature);
        }
    };

    const handleGenerate = () => {
        const { mnemonic, address } = generateAccount();
        setNewMnemonic(mnemonic);
        setNewAddress(address);
    }

    // 移除 useEffect
    const syncFromLocal = () => {
        setName(localStorage.getItem("name") || "");
        setMnemonic(localStorage.getItem("mnemonic") || "");
    };

    return (
        <main className="card" autoComplete="off">
            <p>Revoke & Replace</p>
            <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5em', position: 'relative'}}>
                <input
                    name="name"
                    className="item prefix settings-input"
                    type="text"
                    placeholder="current name>"
                    autoComplete="off"
                    value={name}
                    onChange={handleInput}
                    style={{width: '100%'}}
                />
                <span
                    className="sync-icon"
                    title="同步本地用户名和助记词"
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
            <input
                name="mnemonic"
                className="item prefix settings-input"
                type="text"
                placeholder="current mnemonic>"
                autoComplete="off"
                value={mnemonic}
                onChange={handleInput}
            />
            <div className="input-wrapper settings-input-wrapper">
                <input
                    name="newAddress"
                    className="item settings-input"
                    type="text"
                    placeholder="new address (optional)>"
                    value={newAddress}
                    readOnly
                />
                <span className="input-icon" onClick={handleGenerate} title="Generate new mnemonic & address">
                    🔑
                </span>
            </div>
            <div className="show-mnemonic settings-show-mnemonic">
                <input
                    name="newMnemonic"
                    className="item settings-input"
                    type={isShow ? "text" : "password"}
                    placeholder="new mnemonic (optional)>"
                    value={newMnemonic}
                    readOnly
                />
                <span className="show-icon" onClick={() => setIsShow(!isShow)} title="Show/Hide mnemonic">
                    {isShow ? "🙉" : "🙈"}
                </span>
            </div>
            <button className="settings-btn" onClick={handleSubmit}>Submit</button>
        </main>
    );
};

export default Settings;