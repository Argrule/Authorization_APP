import Web3 from "web3";

const getWeb3 = () =>
    new Promise((resolve, reject) => {
        const provider_ip = localStorage.getItem('provider');
        // Wait for loading completion to avoid race conditions with web3 injection timing.
        // window.addEventListener("load",
        const fn = async () => {
            // Modern dapp browsers...
            if (window.ethereum) {
                const web3 = new Web3(window.ethereum);
                try {
                    // Request account access if needed
                    await window.ethereum.enable();
                    // Acccounts now exposed
                    resolve(web3);
                } catch (error) {
                    reject(error);
                }
            }
            // Legacy dapp browsers...
            else if (window.web3 && window.web3.currentProvider == provider_ip) {
                // Use Mist/MetaMask's provider.
                const web3 = window.web3;
                console.log("Injected web3 detected.");
                resolve(web3);
            }
            // Fallback to localhost; use dev console port by default...
            else {
                const provider = new Web3.providers.HttpProvider(provider_ip);
                const web3 = new Web3(provider);
                console.log("No web3 instance injected, using Local web3.");
                web3.currentProvider = provider_ip;
                // 挂载到全局对象上
                window.web3 = web3;
                resolve(web3);
            }
        };

        fn();
    });


export default getWeb3;
