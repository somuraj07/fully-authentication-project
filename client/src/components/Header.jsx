import React, { useContext } from 'react'
import { Mail, Phone, Github, MapPin } from 'lucide-react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const {userData} = useContext(AppContext)
  const navigate = useNavigate();
  return (
    <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        /*
        
        {/* Main Profile Section */}
        <div className="flex flex-col items-center">          
          {/* Profile Info */}
          <div className="flex-1 text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              K SOMASANKAR
            </h1>
            <p className="text-xl lg:text-2xl text-gray-300 mb-6 font-light">
              Full Stack Developer & Software Engineer
            </p>
            
            {/* Contact Info */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center">
              
              <div className="flex items-center gap-2 text-gray-300">
                <Mail size={16} className="text-blue-400" />
                <span>katikasomasankar@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Github size={16} className="text-blue-400" />
                <span>github.com/somuraj07</span>
              </div>
            </div>
            
            {/* Education */}
            <div className="bg-white/5 rounded-lg p-4 mb-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-2 text-blue-400">Education</h3>
              <p className="text-gray-300">Bachelor's in Technology: Electronics and Communication Engineering</p>
              <p className="text-sm text-gray-400">Sanskrithi School of Engineering, Puttaparthi • CGPA: 7.9/10.00 • 2022-2026</p>
            </div>
            
            {/* Quick Skills */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3 text-blue-400">Core Technologies</h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {['React.js', 'Next.js', 'Node.js', 'MongoDB', 'TypeScript', 'Python', 'AWS', 'Docker'].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm border border-blue-500/30">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            {/* CTA Button */}
            <button 
             onClick={() => navigate('/login')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
              Get Started
            </button>
          </div>
        </div>
        
        {/* Featured Projects Preview */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <h3 className="text-2xl font-bold mb-6 text-center">Featured Projects</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 rounded-lg p-4 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <h4 className="font-semibold text-blue-400 mb-2">Video Interview Platform</h4>
              <p className="text-sm text-gray-300 mb-3">Next.js, React, Stream API - Real-time video conferencing with 99.9% uptime</p>
              <div className="flex flex-wrap gap-1">
                <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded text-xs">Next.js</span>
                <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded text-xs">Stream API</span>
              </div>
            </div>
            
            <div className="bg-white/5 rounded-lg p-4 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <h4 className="font-semibold text-blue-400 mb-2">Emergency Blood Management</h4>
              <p className="text-sm text-gray-300 mb-3">React, Cloudflare Workers - 65% reduction in response latency</p>
              <div className="flex flex-wrap gap-1">
                <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs">React</span>
                <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs">Cloudflare</span>
              </div>
            </div>
            
            <div className="bg-white/5 rounded-lg p-4 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <h4 className="font-semibold text-blue-400 mb-2">PropSpace Housing</h4>
              <p className="text-sm text-gray-300 mb-3">Next.js 15, MongoDB - 70% reduction in housing search time</p>
              <div className="flex flex-wrap gap-1">
                <span className="px-2 py-1 bg-orange-500/20 text-orange-300 rounded text-xs">Next.js 15</span>
                <span className="px-2 py-1 bg-orange-500/20 text-orange-300 rounded text-xs">MongoDB</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
