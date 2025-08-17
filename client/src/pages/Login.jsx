import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
  const navigate = useNavigate()
  const { backendUrl, setIsLoggedin ,getUserData} = useContext(AppContext)
  const [state, setState] = useState('sign up')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();

      axios.defaults.withCredentials = true
      if (state === 'sign up') {
        const { data } = await axios.post(backendUrl + '/api/auth/register',
          { name, email, password })
        if (data.success) {
          setIsLoggedin(true)
          getUserData()
          navigate('/')
        } else {
          toast.error(data.message)
        }
      }
      else {
        const { data } = await axios.post(backendUrl + '/api/auth/login',
          { email, password })
        if (data.success) {
          setIsLoggedin(true)
          getUserData()
          navigate('/')
        } else {
          toast.error(data.message)
        }
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-sky-100 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 
            onClick={() => navigate('/')} 
            className="text-3xl font-bold text-sky-600 cursor-pointer hover:text-sky-800 transition-colors duration-200"
          >
            Purple
          </h1>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-sky-200">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-sky-600 mb-2">
              {state === 'sign up' ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="text-sky-500">
              {state === 'sign up' ? 'Create your account to get started' : 'Login to your account'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={onSubmitHandler} className="space-y-6">
            {state === 'sign up' && (
              <div>
                <label className="block text-sm font-medium text-sky-700 mb-2">
                  Full Name
                </label>
                <input
                  onChange={e => setName(e.target.value)}
                  value={name}
                  type="text"
                  placeholder="Enter your full name"
                  required
                  className="w-full px-4 py-3 border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all duration-200 bg-white focus:bg-sky-50"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-sky-700 mb-2">
                Email Address
              </label>
              <input
                onChange={e => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Enter your email"
                required
                className="w-full px-4 py-3 border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all duration-200 bg-white focus:bg-sky-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-sky-700 mb-2">
                Password
              </label>
              <input
                onChange={e => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Enter your password"
                required
                className="w-full px-4 py-3 border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all duration-200 bg-white focus:bg-sky-50"
              />
            </div>

            {state === 'Login' && (
              <div className="text-right">
                <p 
                  onClick={() => navigate('/reset-password')} 
                  className="text-sm text-sky-600 hover:text-sky-800 cursor-pointer font-medium"
                >
                  Forgot password?
                </p>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-sky-500 to-sky-700 text-white py-3 px-4 rounded-lg font-medium hover:from-sky-600 hover:to-sky-800 focus:ring-4 focus:ring-sky-200 transition-all duration-200 transform hover:scale-[1.02]"
            >
              {state === 'sign up' ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          {/* Toggle State */}
          <div className="mt-8 text-center">
            {state === 'sign up' ? (
              <p className="text-sky-500">
                Already have an account?{' '}
                <span 
                  onClick={() => setState('Login')} 
                  className="text-sky-600 hover:text-sky-800 cursor-pointer font-medium"
                >
                  Login here
                </span>
              </p>
            ) : (
              <p className="text-sky-500">
                Don't have an account?{' '}
                <span 
                  onClick={() => setState('sign up')} 
                  className="text-sky-600 hover:text-sky-800 cursor-pointer font-medium"
                >
                  Sign up
                </span>
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sky-400 text-sm">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
