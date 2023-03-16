import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { getAllSpaces } from '../apiCalls/spacesApis'
import Sidebar from '../components/navigations/Sidebar'

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
      <div className='flex h-[100%] w-[100%]'>
      <nav className="h-[100%]">
          <Sidebar />
          </nav>
          <div className='w-[100vw]'>
          <Outlet />
          </div>
          </div>
        }
        </>
  )
}

export default Home