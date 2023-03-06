import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { getAllSpaces } from '../apiCalls/spacesApis'
import Sidebar from '../scenes/global/Sidebar'
import Topbar from '../scenes/global/Topbar'

const Home = () => {
  const {isFetching} = useSelector(state=>state.user)

  const dispatch = useDispatch()
  useEffect(()=>{
      getAllSpaces(dispatch)
  }, [])

  return (
    <>
    {
      isFetching ?  "Loading" :
      <div className='flex w-[100%]'>
      <nav>
          <Sidebar />
          </nav>
          <div className='w-[100%]'>
          <Outlet />
          </div>
          </div>
        }
        </>
  )
}

export default Home