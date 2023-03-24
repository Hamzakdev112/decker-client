import React from 'react'
import { useSelector } from 'react-redux'
import Head from '../../Head'
import TimelineChart from './TimelineChart'

const Board= () => {
  const {singleSpace} = useSelector((state)=>state.spaces)
  return (
    // <div className='flex w-[1000px] border-[1px] border-[#ebebeb]'>
    //   <div className='w-[30%] h-[500px] overflow-visible'><List /></div>
    //   <div className='w-[70%] overflow-scroll border-[1px] border-[#ebebeb]'><Chart /> </div>
    // </div>
    <div>
    <Head title={`${singleSpace?.name} - Board`} description={singleSpace?.description} />
      <TimelineChart />
    </div>
  )
}

export default Board