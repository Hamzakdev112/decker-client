import React from 'react'
import { ScaleLoader } from 'react-spinners';

const Loader = () => {
  return (
    <div className="flex h-[100%] w-[100%] justify-center items-center">
  <ScaleLoader
  color={'red'}
  speedMultiplier={0.7}
  loading={true} 
  size="60px"
  />      
  </div>

  )
}

export default Loader