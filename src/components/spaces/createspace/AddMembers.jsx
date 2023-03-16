import React, { useState } from 'react'
import PeopleIcon from '@mui/icons-material/People';
import { getUserByEmail } from '../../../apiCalls/userApis';
import { toast } from 'react-toastify';
import { RingLoader } from 'react-spinners';
import { useSelector } from 'react-redux';
import { sendInviteToMember } from '../../../apiCalls/spacesApis';

const AddMembers = ({createdSpace}) => {
    const [email, setEmail] = useState('')
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(false)
    const [invited, setInvited] = useState(false)
    const [error, setError] = useState(null)
    const handleSearch = (e)=>{
        e.preventDefault()
        if(email.length < 1){
           return toast.error('Please enter email',{autoClose:2000})
        }
        setInvited(false)
        getUserByEmail(email,setUser,setLoading,setError)

    }

    const handleSendInvite = () =>{
        sendInviteToMember(createdSpace?._id,user?._id,email,setInvited)
    }

    const test = "63fdbc6733440441e9c19b4e"

  return (
    <div className='flex'>
    <div className=' flex flex-col gap-3  mx-auto w-[60%] border-[1px] border-[#f1f1f1]  p-[20px] h-[100%]'>
        <p>Awesome! You have created a new Work Space. Let's invite some people to join our workspace</p>
        <span className='' >Search By Email</span>
        <form className='p-2 flex gap-2 items-center w-[100%] h-[50px] border-[1px] border-[#8b8b8b]'>
        <PeopleIcon />
            <input onChange={(e)=>setEmail(e.target.value)} className='focus:outline-none w-[90%]' placeholder='Enter email here' type="text" />
            <button className='bg-[#dadada] transition-all duration-300 hover:bg-[#cfcfcf] p-2 px-5 rounded-[10px]' onClick={handleSearch}>Search</button>
        </form>

        {
            loading ?
             <RingLoader size={50} /> :
             error ?
             <div>
             {error}
             </div> 
             :
             user &&
             <div className='boxshadow justify-between h-[60px] w-[70%] p-4 flex items-center'>
                <div className='flex items-center gap-4'>
                <img src="/assets/user.png"className='w-[40px] h-[40px]' alt="" />
                <span>{user?.firstName} {user?.lastName}</span>
                </div>
                {
                    invited ?
                    <button disabled className=' bg-[#dadada]  rounded-[10px] py-1 px-3'>Invited</button>
                    :
                <button onClick={handleSendInvite} className='bg-[red]  rounded-[10px] py-1 px-3 text-[white]'>Invite</button>
                }
            </div>
        }
    </div>
        </div>
  )
}

export default AddMembers