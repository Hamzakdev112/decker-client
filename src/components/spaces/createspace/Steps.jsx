import React from 'react'

const Steps = ({step, activeStep,index}) => {
  return (
    <div className='flex flex-col items-center'>
    <div className={`text-[#cacaca] ${activeStep >= index && '!text-[#6e6e6ed2]'}`}>
    {step.icon}
    </div>
   <span className={`text-[0.8em] text-[gray] font-normal text-center bg-[white] ${activeStep >= index && 'text-[#6e6e6e]'}`}>{step.title}</span>
   <div className={`border-[1px] mt-[2px]  border-[#cccccc] transition-all duration-[0.3s] w-[100px] h-[8px] ${activeStep >= index && 'bg-[#6e6e6e]'}`}></div>
  </div>
  )
}

export default Steps