
import React from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const Chart = ({ tasks }) => {
  const {tasksBySpaceId} = useSelector(state=>state.tasks)
  const {singleSpace} = useSelector(state=>state.spaces)
  const startDate = moment(singleSpace?.createdAt);
  const endDate = moment().add(3, 'months');
  const duration = moment.duration(endDate?.diff(startDate)).asDays();
  const dateLabels = Array.from({ length: duration + 1 }, (_, i) => {
    const date = moment(startDate).add(i, 'days');
    return (
      <div key={date.format('YYYY-MM-DD')} className="   h-[100%] border-[1px]  border-[#ebebeb] date-label">
       <span className=' border-b-[1px] text-[10px] flex justify-center items-center text-[gray] h-[22px] w-[22px] border-[#bbbbbb] '>{date.format('D')}</span> 
      </div>
    );
  });

  return (
    <div className="gantt-chart h-[100%] relative">
      <div className="flex date-axis h-[100%]">{dateLabels}</div>
      {/* Render the bars of the Gantt chart here */}
    </div>
  );
};

export default Chart;