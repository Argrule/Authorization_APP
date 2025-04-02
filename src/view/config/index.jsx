import './index.css';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const Config = () => {
    const [name, setName] = useState("");
    const [mnemonic, setMnemonic] = useState("");
    const [provider, setProvider] = useState("");
    const [address, setAddress] = useState("");
    const [privateKey, setPrivateKey] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        setName(localStorage.getItem("name") || "");
        setMnemonic(localStorage.getItem("mnemonic") || "");
        setProvider(localStorage.getItem("provider") || "");
        setAddress(localStorage.getItem("address") || "");
        setPrivateKey(localStorage.getItem("privateKey") || "");
    }, [])


    const handleInput = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'name':
                setName(value.trim());
                break;
            case 'mnemonic':
                setMnemonic(value);
                break;
            case 'provider':
                setProvider(value.trim());
                break;
            case 'address':
                setAddress(value.trim());
                break;
            case 'privateKey':
                setPrivateKey(value.trim());
                break;
            default:
                break;
        }
    };
    const handleEnter = (e) => {
        if (e.key !== 'Enter') {
            return;
        }
        // if ((name && mnemonic).trim() === "") {
        //     alert("Name is required");
        //     return;
        // }
        localStorage.setItem("name", name);
        localStorage.setItem("mnemonic", mnemonic);
        localStorage.setItem("provider", provider || "http://127.0.0.1:7545");
        localStorage.setItem("address", address);
        localStorage.setItem("privateKey", privateKey);
        navigate('/log');
    }

    return (
        <main className="card" autoComplete="off">
            <p>Configuration</p>
            <input
                name="name"
                className="item prefix"
                type="text"
                placeholder="name>"
                autoComplete="new-password"
                value={name}
                onChange={handleInput}
            />
            <input
                name="mnemonic"
                className="item prefix"
                placeholder="mnemonic>"
                autoComplete="new-password"
                value={mnemonic}
                onChange={handleInput}
            />
            <input
                name="provider"
                className="item prefix"
                placeholder="provider network>"
                autoComplete="new-password"
                value={provider}
                onChange={handleInput}
            />
            <input
                name="address"
                className="item prefix"
                placeholder="address of ethereum>"
                autoComplete="new-password"
                value={address}
                onChange={handleInput}
            />
            <input
                name="privateKey"
                className="item prefix"
                placeholder="private key of ethereum>"
                autoComplete="new-password"
                value={privateKey}
                onChange={handleInput}
                onKeyDown={handleEnter}
            />
        </main>
    )
}
export default Config;