import { useState, useEffect } from 'react';
import './Clock.css';

function Clock() {
    const [dateTime, setDateTime] = useState(new Date());
    const [adjustment, setAdjustment] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setDateTime(new Date(Date.now() + adjustment));
        }, 10);

        return () => {
            clearInterval(timer);
        };
    }, [adjustment]); // 當 adjustment 改變時重新執行 effect

    // format date
    const formatDate = (date: any) => {
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            weekday: 'short',
        };
        return date.toLocaleDateString('zh-TW', options);
    };

    // 格式化時間，並顯示毫秒
    const formatTime = (date: Date) => {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        const milliseconds = date.getMilliseconds().toString().padStart(3, '0'); // 確保毫秒為 3 位數格式

        // 顯示毫秒並格式化顯示時間，將微調值用 (+/- Xms) 顯示在時間後面
        return (
            <>
                {`${hours}:${minutes}:${seconds}.`}
                <span className='milliseconds'>{milliseconds}</span>
                {/* 當 adjustment 不為 0 時顯示微調值 */}
                {adjustment !== 0 && (
                    <span className='adjustment'>{adjustment > 0 ? ` (+${adjustment}ms)` : ` (${adjustment}ms)`}</span>
                )}
            </>
        );
    };

    // 處理微調按鈕的點擊事件
    const handleAdjust = (amount: number) => {
        setAdjustment(adjustment + amount); // 增加或減少微調值
    };

    // 重置微調按鈕的事件處理
    const resetAdjustment = () => {
        setAdjustment(0); // 重置微調值為 0
    };

    return (
        <div className='clock'>
            <div className='date'>{formatDate(dateTime)}</div>
            <div className='time'>{formatTime(dateTime)}</div>

            {/* 微調按鈕區域 */}
            <div className='adjust-buttons'>
                <button onClick={() => handleAdjust(10)}>+10ms</button>
                <button onClick={() => handleAdjust(-10)}>-10ms</button>
                <button onClick={resetAdjustment}>reset</button>
            </div>
        </div>
    );
}

export default Clock;
