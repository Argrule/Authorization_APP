import { useEffect, useState } from 'react';
import { generateAccount, generateAccountWithMnemonic } from '@/utils/privateKey';
import useGetWeb3 from '@/web3/useGetWeb3';

const Settings = () => {
    const { web3, account, contract } = useGetWeb3();

    const [name, setName] = useState("");
    const [mnemonic, setMnemonic] = useState("");
    const [newAddress, setNewAddress] = useState("");   // 新地址
    const [newMnemonic, setNewMnemonic] = useState(""); // 新助记词
    const [isShow, setIsShow] = useState(false); // 显示/隐藏助记词

    useEffect(() => {
        setName(localStorage.getItem("name") || "");
        setMnemonic(localStorage.getItem("mnemonic") || "");
    }, []);

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
        } catch (error) {
            console.error("Error during transaction:", error);
        }
    }
    const myReplace = async (sig) => {
        try {
            const gasEstimate = await contract.methods.modify(name, sig, newAddress).estimateGas({ from: account });
            const receipt = await contract.methods.modify(name, sig, newAddress).send({ from: account, gasLimit: gasEstimate * 2n });
            console.log("Transaction receipt:", receipt);
        } catch (error) {
            console.error("Error during transaction:", error);
        }
    }

    const handleSubmit = async () => {
        if (!name || !mnemonic) {
            alert("Name and current mnemonic are required");
            return;
        }
        const { privateKey, address: a_test, mnemonic: m_t } = generateAccountWithMnemonic(mnemonic);
        const { signature } = web3.eth.accounts.sign(name, privateKey);
        console.log("signature", signature, a_test, m_t);

        if (newAddress === "" && newMnemonic === "") {
            // 注销（Revoke）逻辑
            myDestroy(signature);
        } else {
            // 更换（Replace）逻辑
            myReplace(signature);
        }
    };

    const handleGenerate = () => {
        const { mnemonic, address } = generateAccount();
        setNewMnemonic(mnemonic);
        setNewAddress(address);
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
                    readOnly
                />
                <span className="input-icon" onClick={handleGenerate}>
                    🔑
                </span>
            </div>
            <div className="show-mnemonic">
                <input
                    name="newMnemonic"
                    className="item"
                    type={isShow ? "text" : "password"}
                    placeholder="new mnemonic (optional)>"
                    value={newMnemonic}
                    readOnly // 禁用输入框
                />
                <span className="show-icon" onClick={() => setIsShow(!isShow)}>
                    {isShow ? "🙉" : "🙈"}
                </span>
            </div>

            <button onClick={handleSubmit}>Submit</button>
        </main>
    );
};

export default Settings;