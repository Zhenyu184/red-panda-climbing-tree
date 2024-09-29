import React, { useState, useEffect } from 'react';
import './Clock.css';

function Clock() {
    const [dateTime, setDateTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setDateTime(new Date());
        }, 20); // frequency 20 ms

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

    const formatTime = (date: Date) => {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        const milliseconds = date.getMilliseconds().toString().padStart(3, '0');

        return (
            <>
                {`${hours}:${minutes}:${seconds}.`}
                <span className='milliseconds'>{milliseconds}</span>
            </>
        );
    };

    return (
        <div className='clock'>
            <div className='date'>{formatDate(dateTime)}</div>
            <div className='time'>{formatTime(dateTime)}</div>
        </div>
    );
}

export default Clock;
