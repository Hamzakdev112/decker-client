import React, { useState, useEffect, useCallback } from 'react';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StopIcon from '@mui/icons-material/Stop';
import moment from 'moment';
import axios from 'axios';
import { SERVER_URL } from '../../../config/config';
import { toast } from 'react-toastify';

function Timer({ id, spaceId, timer }) {
  const [timeFromDB, setTimeFromDB] = useState(timer);
  const [formatted, setFormatted] = useState(
    timeFromDB
      ? moment
          .utc(moment().diff(moment(timeFromDB)))
          .format('HH:mm:ss')
          .toString()
      : moment().format('00:00:00')
  );

  const func = useCallback(async () => {
    const { data } = await axios.get(`${SERVER_URL}/api/workspace/tasks/singletask/${spaceId}/${id}`, { withCredentials: true })
    setTimeFromDB(data.timer)
  }, [id, spaceId]);

  const start = useCallback(async()=>{
    await toast.promise(
      axios.put(
        `${SERVER_URL}/api/workspace/tasks/update/timer/${id}`,
        {
          timer: moment().toDate(),
        },
        { withCredentials: true }
      ),
      {
        pending: 'Starting Timer',
        success: 'Timer Started',
        error: 'Error Occured',
      },
      { autoClose: 1500 }
    );
    await func();
  },[func,id])

  const reset = useCallback(async () => {
    await toast.promise(
      axios.put(`${SERVER_URL}/api/workspace/tasks/update/timer/${id}`, {
        timer: null,
        savedTimers:{
        }   
      }, { withCredentials: true }),
      {
        pending: 'Stopping Timer',
        success: 'Timer Stopped',
        error: 'Error Occured'
      },
      { autoClose: 1500 }
    )
    func()
  }, [func, id])    

  useEffect(() => {
    let interval = null;
    if (timeFromDB) {
      interval = setInterval(() => {
        const elapsed = moment().diff(moment(timeFromDB), 'seconds');
        setFormatted(moment.utc(elapsed * 1000).format('HH:mm:ss').toString());
      }, 1000);
    } else if (!timeFromDB && formatted !== moment().format('00:00:00')) {
      clearInterval(interval);
      setFormatted(moment().format('00:00:00'));
    }
    return () => clearInterval(interval);
  }, [timeFromDB, formatted]);

  return (
    <div className="flex items-center gap-1">
      {timeFromDB ? (
        <button className={`text-[red]`} onClick={reset}>
          <StopIcon sx={{ fontSize: '18px' }} />
        </button>
      ) : (
        <button className={`text-[blue]`} onClick={start}>
          <PlayCircleIcon sx={{ fontSize: '18px' }} />
        </button>
      )}
      <div className="time">{formatted}</div>
    </div>
  );
}

export default Timer;
