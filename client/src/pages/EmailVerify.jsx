import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const ResetPassword = () => {

  const {baclendUrl} = useContext(AppContext)
  axios.defaults.withCredentials = true;
  const naviagte = useNavigate()
  const inputRefs = React.useRef([])
  const [email,setEmail] = useState('')
  const [newPassword,setNewPassword] = useState('')
  const [isEmailSent, setIsEmailSent] = useState('')
  const [otp, setOtp] = useState(0)
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false)

  const handleInput = (e, index) => {
    if(e.target.value.length > 0 && index < inputRefs.current.length - 1){
      inputRefs.current[index + 1].focus();
    }
  }

  const handkeKeyDown = (e,index) => {
    if(e.key === 'Backspace' && e.target.value === '' && index > 0){
      inputRefs.current[index - 1].focus();
    }
  }

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text');
    const pasteArray = paste.split('');
    pasteArray.forEach((char,index) => {
      if(inputRefs.current[index]){
         inputRefs.current[index].value = char;
      }
    })
  }

  const onSubmitEmail = async (e)=>{
    e.preventDefault();
    try {
      const {data} = await axios.post(baclendUrl + '/api/auth/send-reset-otp', {email})
      data.succes ? toast.success(data.message) : toast.error(data.message)
      data.success && setIsEmailSent(true)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const onSubmitOtp = async (e) => {
    e.preventDefault();
    const otpArray = inputRefs.current.map(e => e.value) 
    setOtp(otpArray.join(''))
    setIsOtpSubmitted(true)
  }

  const onSubmitNewPassword = async (e)=>{
    e.preventDefault();
    try {
      const {data} = await axios.post(baclendUrl + '/api/auth/reset-password', {email, otp, newPassword})
      data.success ? toast.success(data.message) : toast.error(data.message)
      data.success && naviagte('/login')
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-sky-200 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {!isEmailSent && 
        <div className="bg-white/20 backdrop-blur-md rounded-2xl shadow-2xl border border-sky-200 p-8">
          <form onSubmit={onSubmitEmail} className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-sky-400 to-sky-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m0 0a2 2 0 012 2m-2-2a2 2 0 00-2 2m2-2V5a2 2 0 00-2-2m0 0H9a2 2 0 00-2 2v0m4 0V3a2 2 0 014 0v2m-4 0a2 2 0 014 0" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-sky-800 mb-2">Verify Password</h1>
              <p className="text-sky-600 text-sm">Enter your registered email address</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-sky-800 mb-2">Email Address</label>
                <input 
                  type='email' 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  required
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-white/30 border border-sky-200 rounded-lg text-sky-800 placeholder-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                />
              </div>
            </div>
            
            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Send Reset Code
            </button>
            
            <div className="text-center">
              <button 
                type="button"
                onClick={() => naviagte('/login')}
                className="text-sky-600 hover:text-sky-800 text-sm transition-colors duration-300"
              >
                Back to Login
              </button>
            </div>
          </form>
        </div>}

        {!isOtpSubmitted && isEmailSent && 
        <div className="bg-white/20 backdrop-blur-md rounded-2xl shadow-2xl border border-sky-200 p-8">
          <form onSubmit={onSubmitOtp} className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-sky-400 to-sky-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-sky-800 mb-2">Verify Email</h1>
              <p className="text-sky-600 text-sm">Enter the 6-digit verification code sent to your email</p>
            </div>

            <div className="flex justify-center">
              <div onPaste={handlePaste} className="flex gap-3">
                {Array(6).fill(0).map((_, index) => (
                  <input 
                    type='text' 
                    maxLength='1' 
                    key={index} 
                    required
                    ref={el => inputRefs.current[index] = el}
                    onInput={(e) => handleInput(e,index)}
                    onKeyDown={(e) => handkeKeyDown(e,index)}
                    className="w-12 h-12 bg-white/30 border border-sky-200 rounded-lg text-center text-sky-800 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                  />
                ))}
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Verify Code
            </button>

            <div className="text-center">
              <button 
                type="button"
                onClick={() => setIsEmailSent(false)}
                className="text-sky-600 hover:text-sky-800 text-sm transition-colors duration-300"
              >
                Change Email Address
              </button>
            </div>
          </form>
        </div>}

        {isOtpSubmitted && isEmailSent &&
        <div className="bg-white/20 backdrop-blur-md rounded-2xl shadow-2xl border border-sky-200 p-8">
          <form onSubmit={onSubmitNewPassword} className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-sky-400 to-sky-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-sky-800 mb-2">New Password</h1>
              <p className="text-sky-600 text-sm">Enter your new secure password</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-sky-800 mb-2">New Password</label>
                <input 
                  type='password' 
                  value={newPassword} 
                  onChange={e => setNewPassword(e.target.value)} 
                  required
                  placeholder="Enter your new password"
                  className="w-full px-4 py-3 bg-white/30 border border-sky-200 rounded-lg text-sky-800 placeholder-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                />
              </div>
            </div>
            
            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Reset Password
            </button>
            
            <div className="text-center">
              <button 
                type="button"
                onClick={() => naviagte('/login')}
                className="text-sky-600 hover:text-sky-800 text-sm transition-colors duration-300"
              >
                Back to Login
              </button>
            </div>
          </form>
        </div>}

      </div>
    </div>
  )
}

export default ResetPassword
