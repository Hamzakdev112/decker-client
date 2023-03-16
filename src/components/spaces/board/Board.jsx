import React from 'react'
import List from '../list/List'
import TimelineChart from '../timeline/TimelineChart'
import Chart from './Chart'

const Board= () => {
  return (
    // <div className='flex w-[1000px] border-[1px] border-[#ebebeb]'>
    //   <div className='w-[30%] h-[500px] overflow-visible'><List /></div>
    //   <div className='w-[70%] overflow-scroll border-[1px] border-[#ebebeb]'><Chart /> </div>
    // </div>
    <div>
      <TimelineChart />
    </div>
  )
}

export default Board