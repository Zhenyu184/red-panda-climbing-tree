import { useState, useEffect } from 'react';
import './clock.css';

// use local time
function Clock() {
    const [dateTime, setDateTime] = useState(new Date());
    const [compensate, setCompensate] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setDateTime(new Date(Date.now() + compensate));
        }, 10);

        return () => {
            clearInterval(timer);
        };
    }, [compensate]);

    const microAdjust = (offset: number) => {
        console.log(`micro adjust clock +${offset} ms`);
        setCompensate(compensate + offset);
    };

    const resetAdjustment = () => {
        console.log(`reset clock`);
        setCompensate(0);
    };

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

    // format time
    const formatTime = (date: Date) => {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        const milliseconds = date.getMilliseconds().toString().padStart(3, '0');

        return (
            <>
                {`${hours}:${minutes}:${seconds}.`}
                <span className='milliseconds'>{milliseconds}</span>
                {compensate !== 0 && (
                    <span className='adjustment'>{compensate > 0 ? ` (+${compensate}ms)` : ` (${compensate}ms)`}</span>
                )}
            </>
        );
    };

    return (
        <div className='clock'>
            <div className='date'>{formatDate(dateTime)}</div>
            <div className='time'>{formatTime(dateTime)}</div>
            <div className='adjust-buttons'>
                <button onClick={() => microAdjust(10)}>+10ms</button>
                <button onClick={() => microAdjust(-10)}>-10ms</button>
                <button onClick={resetAdjustment}>reset</button>
            </div>
        </div>
    );
}

export default Clock;
