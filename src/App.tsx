import './App.css';
import { useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';

// rete.js
import { createEditor } from './editor';
import { useRete } from 'rete-react-plugin';

// assets and component
import Clock from './clock';
import reactLogo from './assets/react.svg';

function App() {
    const [name, setName] = useState('');
    const [outputMsg, setOutputMsg] = useState('');
    const [editor] = useRete(createEditor);

    async function handle1() {
        setOutputMsg(await invoke('handler1', { name }));
    }

    async function request_f() {
        const url = "https://example.com"
        setOutputMsg(await invoke('request_cmd', { url }));
    }

    async function handle3() {
        setOutputMsg(await invoke('handler3', { name }));
    }

    return (
        <div className='container'>
            {/* sidebar */}
            <div className='sidebar'>
                <h1>Hi Rad panda!</h1>

                <div className='row'>
                    <a href='https://vitejs.dev' target='_blank'>
                        <img src='/vite.svg' className='logo vite' alt='Vite logo' />
                    </a>
                    <a href='https://tauri.app' target='_blank'>
                        <img src='/tauri.svg' className='logo tauri' alt='Tauri logo' />
                    </a>
                    <a href='https://reactjs.org' target='_blank'>
                        <img src={reactLogo} className='logo react' alt='React logo' />
                    </a>
                </div>

                <p>This is a tool to visualize the web crawler process. Although it is still under development.</p>

                <form className='row'>
                    <input id='greet-input' onChange={(e) => setName(e.currentTarget.value)} placeholder='Enter a name...' />
                </form>

                <div className='row'>
                    <button type='button' onClick={() => handle1()} className='greet-button'>
                        Greet
                    </button>
                    <button type='button' onClick={() => request_f()} className='greet-button'>
                        Start
                    </button>
                    <button type='button' onClick={() => handle3()} className='greet-button'>
                        test
                    </button>
                </div>

                <p>{outputMsg}</p>

                {/* clock */}
                <div className='sidebar-footer'>
                    <Clock />
                </div>
            </div>

            {/* editor space */}
            <div className='editor-space'>
                <div ref={editor} className='rete' style={{ height: '100%', width: '100%' }}></div>
            </div>
        </div>
    );
}

export default App;
