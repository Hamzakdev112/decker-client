import React from 'react'
import { BeatLoader } from 'react-spinners';

const Loader = () => {
  return (
    <div className="flex h-[100%] w-[100%] justify-center items-center">
  <BeatLoader
  color={'#000000'} 
  loading={true} 
  size="20px"
  />      
  </div>

  )
}

export default Loader