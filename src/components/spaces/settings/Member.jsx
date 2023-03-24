import React from 'react'

const Member = ({firstName, lastName}) => {
  return (
    <div className='w-[150px] transition-all duration-300 rounded-[10px] border-[transparent] border-[1px] hover:border-[#a1a1a1] flex gap-[1em] justify-center items-center flex-col aspect-square'>
    <img src="/assets/user.png" className='rounded-[50%] w-[50%] aspect-square' alt="" />
    <h3 className='text-[1.2em]'>{firstName} {lastName}</h3>
</div>
  )
}

export default Member