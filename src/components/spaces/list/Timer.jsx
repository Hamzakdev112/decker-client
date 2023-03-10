import React, { useState, useEffect } from 'react';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StopIcon from '@mui/icons-material/Stop';
import moment from 'moment'
import axios from 'axios'
import { SERVER_URL } from '../../../config/config';
import { toast } from "react-toastify"

function Timer({ id, spaceId }) {

    const [timeFromDB, setTimeFromDB] = useState();
    const now = moment()
    const elapsed = now.diff(timeFromDB, 'seconds')
    const formatted = moment.utc(elapsed * 1000).format('HH:mm:ss').toString()
    const [seconds, setSeconds] = useState(formatted);
    const func = async () => {
        const { data } = await axios.get(`${SERVER_URL}/api/workspace/tasks/singletask/${spaceId}/${id}`, { withCredentials: true })
        setTimeFromDB(data.timer)
    }
    useEffect(() => {
        func()
    }, [])
    async function start() {
        await toast.promise(
            axios.put(`${SERVER_URL}/api/workspace/tasks/update/timer/${id}`, {
                timer: moment().toDate()
            }, { withCredentials: true }),
            {
                pending: 'Starting Timer',
                success: 'Timer Started',
                error: 'Error Occured'
            },
            { autoClose: 1500 }
        )
        func()
    }
    async function reset() {
        await toast.promise(
            axios.put(`${SERVER_URL}/api/workspace/tasks/update/timer/${id}`, {
                timer: null
            }, { withCredentials: true }),
            {
                pending: 'Stopping Timer',
                success: 'Timer Stopped',
                error: 'Error Occured'
            },
            { autoClose: 1500 }
        )
        func()
    }

    useEffect(() => {
        let interval = null;
        if (timeFromDB) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds + 1);
            }, 1000);
        } else if (!timeFromDB && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [timeFromDB, seconds]);

    return (
        <div className="flex items-center gap-1">
            {
                timeFromDB ?
                    <button className={`text-[red]`} onClick={reset}>
                        <StopIcon sx={{ fontSize: '18px' }} />
                    </button>
                    :
                    <button className={`text-[blue]`} onClick={start}>
                        <PlayCircleIcon sx={{ fontSize: '18px' }} />
                    </button>
            }
            <div className="time">{timeFromDB ? formatted : moment().format('00:00:00')}</div>
        </div>
    );
}

export default Timer;
