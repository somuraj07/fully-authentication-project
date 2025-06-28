import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { User, Mail, LogOut, ChevronRight } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, SetIsLoggedin } = useContext(AppContext)
  
  const sendVerificationOtp = async() => {
    try {
      axios.defaults.withCredentials = true;
      const {data} = await axios.post(backendUrl + '/api/auth/send-verify-otp')
      if(data.success){
        navigate('/email-verify')
        toast.success(data.message)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  
  const logout = async() => {
    try {
      axios.defaults.withCredentials = true
      const {data} = await axios.post(backendUrl + '/api/auth/logout')
      data.success && setUserData(false)
      data.success && SetIsLoggedin(false)
      navigate('/')
    } catch (error) {
      toast.error(error.message)
    }
  }
  
  return (
    <nav className='w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0 z-50 bg-gradient-to-r from-transparent to-transparent backdrop-blur-sm'>
      <div className="flex items-center">
        <img src={assets.logo} alt="logo" className='w-28 sm:w-32 filter brightness-0 invert' />
      </div>
      
      {userData ? 
        <div className='relative group'>
          <div className='w-10 h-10 flex justify-center items-center rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:scale-105'>
            <User className="w-5 h-5" />
          </div>
          
          <div className='absolute hidden group-hover:block top-12 right-0 w-56 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-white/20 overflow-hidden z-10'>
            <div className="p-4 border-b border-gray-200/20">
              <div className="flex items-center space-x-3">
                <div className='w-8 h-8 flex justify-center items-center rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-sm font-semibold'>
                  {userData.name?.[0]?.toUpperCase() || 'U'}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{userData.name}</p>
                  <p className="text-xs text-gray-600">{userData.email}</p>
                </div>
              </div>
            </div>
            
            <div className="py-2">
              {!userData.isAccountVerified && 
                <button 
                  onClick={sendVerificationOtp}
                  className="w-full flex items-center justify-between px-4 py-3 text-left text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 transition-all duration-200 group/item"
                >
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-medium">Verify Email</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover/item:text-purple-600 transition-colors" />
                </button>
              }
              
              <button 
                onClick={logout}
                className="w-full flex items-center justify-between px-4 py-3 text-left text-gray-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 transition-all duration-200 group/item"
              >
                <div className="flex items-center space-x-3">
                  <LogOut className="w-4 h-4 text-red-600" />
                  <span className="text-sm font-medium">Logout</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover/item:text-red-600 transition-colors" />
              </button>
            </div>
          </div>
        </div>
        :
        <button 
          onClick={() => navigate('/login')}
          className='flex items-center gap-3 border border-white/30 rounded-full px-6 py-2.5 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm shadow-lg hover:shadow-xl group'
        >
          <span className="font-medium">Login</span>
          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      }
    </nav>
  )
}

export default Navbar
