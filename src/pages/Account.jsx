import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Login from '../components/Login'

const Account = () => {
  const {user, isFetching} = useSelector(state=>state.user)
  
  const navigate = useNavigate()
  user && navigate('/')
  return (
    <>
    {
      isFetching ? "Loading": 
      <div className=''>
        <Login />
    </div>
    }
    </>
  )
}

export default Account