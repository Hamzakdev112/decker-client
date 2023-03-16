import React from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { handleClickOutSide } from '../../../services/functions'
import ClickAwayListener from '@mui/base/ClickAwayListener';


const Filters = ({setOpenFilters}) => {
//   const filtersRef = useRef()
//     useEffect(()=>{
//         handleClickOutSide(filtersRef, ()=>setOpenFilters(false))
//     }, [filtersRef])
  return (
    <ClickAwayListener onClickAway={()=>setOpenFilters(false)}>
    <div  className='absolute top-[25px] left-[60px] w-[300px] h-[200px] boxshadow bg-[white] z-10'>
    </div>
    </ClickAwayListener>
  )
}

export default Filters