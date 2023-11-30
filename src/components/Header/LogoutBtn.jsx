import React, { useEffect } from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

function LogoutBtn() 
{
    const dispatch = useDispatch()
    const navigate = useNavigate()
       
      const logoutHandler = () => {
        authService.logout().then(() => {
            toast.success("Logout Successfully")
            dispatch(logout())
            navigate("/")
            window.location.reload();
        })
    }

  
  
  return (
    <button className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'  onClick={logoutHandler}>
          Logout
    </button>
  )
}

export default LogoutBtn