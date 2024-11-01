import logo from "../logo_3.png";
import fullLogo from "../full_logo.png";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [connected, toggleConnect] = useState(false);
  const location = useLocation();
  const [currAddress, updateAddress] = useState("0x");

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  async function getAddress() {
    const ethers = require("ethers");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();
    updateAddress(addr);
  }

  function updateButton() {
    const ethereumButton = document.querySelector(".enableEthereumButton");
    ethereumButton.textContent = "Connected";
    ethereumButton.classList.remove("hover:bg-blue-70");
    ethereumButton.classList.remove("bg-blue-500");
    ethereumButton.classList.add("hover:bg-green-70");
    ethereumButton.classList.add("bg-green-500");
  }

  async function connectWebsite() {
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    if (chainId !== "0x5") {
      //alert('Incorrect network! Switch your metamask network to Rinkeby');
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x5" }],
      });
    }
    await window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then(() => {
        updateButton();
        console.log("here");
        getAddress();
        window.location.replace(location.pathname);
      });
  }

  useEffect(() => {
    if (window.ethereum == undefined) return;
    let val = window.ethereum.isConnected();
    if (val) {
      console.log("here");
      getAddress();
      toggleConnect(val);
      updateButton();
    }

    window.ethereum.on("accountsChanged", function (accounts) {
      window.location.replace(location.pathname);
    });
  });

  return (
    <div className="flex">
      <div className="flex flex-col h-screen p-3  shadow w-60 text-white">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Link to="/">
              <img
                src={fullLogo}
                alt=""
                width={120}
                height={120}
                className="inline-block -mt-2"
              />
              <div className="inline-block font-bold text-xl ml-2">
                {/* NRMS */}
              </div>
            </Link>
          </div>
        </div>
        <ul className="flex flex-col space-y-4 text-lg">
          <li>
            <Link
              to="/home"
              className={`${
                location.pathname === "/home" ? "border-b-2 pb-1" : ""
              }`}
            >
              Results
            </Link>
          </li>
          <li>
            <Link
              to="/generateTranscript"
              className={`${
                location.pathname === "/generateTranscript"
                  ? "border-b-2 pb-1"
                  : ""
              }`}
            >
              Generate Result
            </Link>
          </li>
          <li>
            <Link
              to="/sellNFT"
              className={`${
                location.pathname === "/sellNFT" ? "border-b-2 pb-1" : ""
              }`}
            >
              List Result
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className={`${
                location.pathname === "/profile" ? "border-b-2 pb-1" : ""
              }`}
            >
              Profile
            </Link>
          </li>
          <li>
            <button
              className="enableEthereumButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm"
              onClick={connectWebsite}
            >
              {connected ? "Connected" : "Connect Wallet"}
            </button>
          </li>
          <li>
            <button
              className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm"
              onClick={handleLogout}
            >
              LogOut
            </button>
          </li>
        </ul>
        <div className="text-white text-sm text-center mt-auto">
          {currAddress !== "0x" ? (
            <>Connected to {currAddress.substring(0, 15) + "..."}</>
          ) : (
            <>Not Connected. Please login to view NFTs</>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
