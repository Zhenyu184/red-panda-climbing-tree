import './App.css';
import { useState, useEffect } from 'react';
import { invoke } from '@tauri-apps/api/tauri';

// rete.js
import { createEditor } from './editor';
import { useRete } from 'rete-react-plugin';

// assets
import reactLogo from './assets/react.svg';

function Clock() {
    const [dateTime, setDateTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setDateTime(new Date());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    const formatDate = (date: any) => {
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            weekday: 'short',
        };
        return date.toLocaleDateString('zh-TW', options);
    };

    const formatTime = (date: any) => {
        const options = {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        };
        return date.toLocaleTimeString('zh-TW', options);
    };

    return (
        <div className='clock'>
            <div className='date'>{formatDate(dateTime)}</div>
            <div className='time'>{formatTime(dateTime)}</div>
        </div>
    );
}

function App() {
    const [name, setName] = useState('');
    const [outputMsg, setOutputMsg] = useState('');
    const [editor] = useRete(createEditor);

    async function handle1() {
        setOutputMsg(await invoke('handler1', { name }));
    }

    async function handle2() {
        setOutputMsg(await invoke('handler2', { name }));
    }

    async function handle3() {
        setOutputMsg(await invoke('handler3', { name }));
    }

    return (
        <div className='container'>
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

                <p>Click on the Tauri, Vite, and React logos to learn more.</p>

                <form className='row'>
                    <input id='greet-input' onChange={(e) => setName(e.currentTarget.value)} placeholder='Enter a name...' />
                </form>

                <div className='row'>
                    <button type='button' onClick={() => handle1()} className='greet-button'>
                        Greet
                    </button>
                    <button type='button' onClick={() => handle2()} className='greet-button'>
                        Start
                    </button>
                    <button type='button' onClick={() => handle3()} className='greet-button'>
                        test
                    </button>
                </div>

                <p>{outputMsg}</p>
                <div className='sidebar-footer'>
                    <Clock />
                </div>
            </div>

            <div className='editor-space'>
                <div ref={editor} className='rete' style={{ height: '100%', width: '100%' }}></div>
            </div>
        </div>
    );
}

export default App;
