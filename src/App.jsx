import { lazy, useState } from "react";
import { useRoutes, BrowserRouter } from "react-router-dom";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import LazyWrap from "./component/LazyWrap";
import getWeb3 from "./web3/getWeb3";

import Log from "./view/log/log";
import Config from "./view/config";
import NotFound from "./view/notFound/notFound";
import NavBar from "./component/NavBar";

/**
 * @fileoverview Router configuration
 */
const router = [
  {
    path: "/",
    element: <Config />,
  },
  {
    path: "/log",
    element: <Log />,
  },
  {
    path: "/register",
    element: <LazyWrap Component={lazy(() => import("./view/register/reg"))} />,
  },
  {
    path: "/settings",
    element: <LazyWrap Component={lazy(() => import("./view/settings"))} />,
  },
  {
    path: "/demo",
    element: <LazyWrap Component={lazy(() => import("./view/notFound/notFound"))} />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

/**
 * Generate router
 * @todo useRoutes returns the elements that match the current location.
 * @description returned elements are rendered by the caller.
 */
const GenRouter = () => {
  const routing = useRoutes(router);
  return routing;
};


const App = () => {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name }));
    const fn = async () => {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      console.log("accounts====>", accounts);

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      console.log("networkId====>", networkId);
    }
    // fn();
  }

  return (
    <BrowserRouter>
      <GenRouter />
      <NavBar />
    </BrowserRouter>
  );
}
export default App;