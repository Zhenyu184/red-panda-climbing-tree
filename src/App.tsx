import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";

function App() {
    const [outputMsg, setOutputMsg] = useState("");
    const [name, setName] = useState("");

    async function handle1() {
        setOutputMsg(await invoke("handler1", { name }));
    }

    async function handle2() {
        setOutputMsg(await invoke("handler2", { name }));
    }

    async function handle3() {
        setOutputMsg(await invoke("handler3", { name }));
    }

    return (
        <div className="container">
            <h1>Welcome to Tauri!</h1>

            <div className="row">
                <a href="https://vitejs.dev" target="_blank">
                    <img
                        src="/vite.svg"
                        className="logo vite"
                        alt="Vite logo"
                    />
                </a>
                <a href="https://tauri.app" target="_blank">
                    <img
                        src="/tauri.svg"
                        className="logo tauri"
                        alt="Tauri logo"
                    />
                </a>
                <a href="https://reactjs.org" target="_blank">
                    <img
                        src={reactLogo}
                        className="logo react"
                        alt="React logo"
                    />
                </a>
            </div>

            <p>Click on the Tauri, Vite, and React logos to learn more.</p>

            <form className="row">
                <input
                    id="greet-input"
                    onChange={(e) => setName(e.currentTarget.value)}
                    placeholder="Enter a name..."
                />
            </form>

            <div className="row">
                <button
                    type="button"
                    onClick={() => handle1()}
                    className="greet-button"
                >
                    Greet
                </button>
                <button
                    type="button"
                    onClick={() => handle2()}
                    className="greet-button"
                >
                    Greet 2
                </button>
                <button
                    type="button"
                    onClick={() => handle3()}
                    className="greet-button"
                >
                    Greet 3
                </button>
            </div>

            <p>{outputMsg}</p>
        </div>
    );
}

export default App;
