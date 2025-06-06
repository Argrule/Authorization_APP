import './index.css';
import { useEffect, useRef, useState } from 'react';
import { generateAccountWithMnemonic } from '@/utils/privateKey';
import useGetWeb3 from '@/web3/useGetWeb3';
import { alertDialog } from '@/component/DialogProvider';

const Config = () => {
    const { web3 } = useGetWeb3();
    const [name, setName] = useState("");
    const [mnemonic, setMnemonic] = useState("");
    const [provider, setProvider] = useState("");
    const [address, setAddress] = useState("");
    const [privateKey, setPrivateKey] = useState("");
    // const isMounted = useRef(false); // 用于判断组件是否挂载    
    const dataRef = useRef({ name, mnemonic, provider, address, privateKey });

    // 同步更新 ref
    useEffect(() => {
        dataRef.current = { name, mnemonic, provider, address, privateKey };
    }, [name, mnemonic, provider, address, privateKey]);

    useEffect(() => {
        // if (!isMounted.current) return () => isMounted.current = true;
        setName(localStorage.getItem("name") || "");
        setMnemonic(localStorage.getItem("mnemonic") || "");
        setProvider(localStorage.getItem("provider") || "");
        setAddress(localStorage.getItem("address") || "");
        setPrivateKey(localStorage.getItem("privateKey") || "");
    }, []);

    useEffect(() => {
        /**
         * 监听ctrl + s保存
         */
        const handleSave = (event) => {
            if (!(event.ctrlKey && event.key === 's')) return;

            const { name, mnemonic, provider, address, privateKey } = dataRef.current;
            localStorage.setItem("name", name);
            localStorage.setItem("provider", provider || "http://127.0.0.1:7545");
            localStorage.setItem("address", address); // 以太坊账户
            localStorage.setItem("privateKey", privateKey); // 以太坊账户私钥

            if (mnemonic !== localStorage.getItem("mnemonic")) {
                localStorage.setItem("mnemonic", mnemonic);
                if (mnemonic) {
                    try {
                        const { privateKey: pvk, address: addr } = generateAccountWithMnemonic(mnemonic);
                        localStorage.setItem("pvk", pvk);
                        localStorage.setItem("addr", addr);
                    } catch (error) {
                        alertDialog("Invalid mnemonic");
                        throw Error("Invalid mnemonic");
                    }
                } else {
                    localStorage.removeItem("pvk");
                    localStorage.removeItem("addr");
                }
            }
            // 添加账户钱包
            if (!!privateKey) {
                web3.eth.accounts.wallet.add(privateKey);
            }
            alertDialog("保存成功");
        }
        // 添加事件监听器
        window.addEventListener('keydown', handleSave);
        // 清理函数
        return () => {
            window.removeEventListener('keydown', handleSave);
        };
    }, [web3]);

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
                placeholder="address of wallet>"
                autoComplete="new-password"
                value={address}
                onChange={handleInput}
            />
            <input
                name="privateKey"
                className="item prefix"
                placeholder="private key of wallet>"
                autoComplete="new-password"
                value={privateKey}
                onChange={handleInput}
            />
        </main>
    )
}
export default Config;