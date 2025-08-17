import React, { useContext } from "react";
import { Mail, Github, Linkedin, Code, Server, Database, Shield, Briefcase, Cpu } from "lucide-react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { userData } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-r from-sky-50 via-white to-sky-100 text-gray-900 pt-20">
      <div className="max-w-6xl mx-auto px-4 py-16">

        {/* Top Section */}
        <div className="flex flex-col items-center text-center animate-fadeIn">
          <h1 className="text-4xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
            K SOMASANKAR
          </h1>
          <p className="text-xl lg:text-2xl text-gray-700 mb-6 font-light">
            Secure Authentication Platform – Full Stack Developer
          </p>

          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row gap-6 mb-8 justify-center">
            <div className="flex items-center gap-2 text-gray-700">
              <Mail size={18} className="text-sky-600" />
              <span>katikasomasankar@gmail.com</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Github size={18} className="text-sky-600" />
              <span>github.com/somuraj07</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Linkedin size={18} className="text-sky-600" />
              <span>linkedin.com/in/somuraj07</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/login")}
              className="bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Get Started
            </button>
            <button
              onClick={() => {
                window.scrollTo({ top: 900, behavior: "smooth" });
              }}
              className="bg-gradient-to-r from-blue-500 to-sky-400 hover:from-blue-600 hover:to-sky-500 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Explore My Work
            </button>
          </div>
        </div>

        {/* About Me Section */}
        <div className="mt-16 bg-white rounded-xl p-8 shadow-xl border border-sky-100">
          <h3 className="text-2xl font-bold mb-6 text-sky-700 text-center">About Me</h3>
          <p className="text-center text-lg mb-8 text-gray-700">
            I’m a <span className="font-semibold">Full Stack Developer</span> passionate about
            building secure and scalable applications. I specialize in{" "}
            <span className="font-semibold">Authentication Systems</span>,{" "}
            <span className="font-semibold">Cloud Deployments</span>, and{" "}
            <span className="font-semibold">Real-Time Applications</span>.
          </p>

          <div className="grid md:grid-cols-2 gap-6 text-center">
            <div className="flex flex-col items-center">
              <Code className="text-sky-600 mb-2" size={28} />
              <h4 className="font-semibold text-sky-700 mb-1">Core Skills</h4>
              <p className="text-gray-600">React.js, Next.js, Node.js, Prisma, PostgreSQL, Docker, AWS</p>
            </div>
            <div className="flex flex-col items-center">
              <Shield className="text-sky-600 mb-2" size={28} />
              <h4 className="font-semibold text-sky-700 mb-1">Focus</h4>
              <p className="text-gray-600">Authentication, Scalable Systems, Secure APIs</p>
            </div>
          </div>
        </div>

        {/* Projects & Experience */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold mb-10 text-center text-sky-700">Projects & Experience</h3>
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Projects */}
            <div className="bg-white rounded-lg p-6 shadow-lg border border-sky-100 hover:shadow-2xl transition-all duration-300">
              <Database className="text-sky-600 mb-3" size={26} />
              <h4 className="font-semibold text-sky-700 mb-2">Secure User Authentication Platform</h4>
              <p className="text-sm text-gray-600">
                React.js, Node.js, Express.js, MongoDB – JWT login, role-based access, email verification, password reset.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg border border-sky-100 hover:shadow-2xl transition-all duration-300">
              <Server className="text-sky-600 mb-3" size={26} />
              <h4 className="font-semibold text-sky-700 mb-2">Hostel Management System – Outpass Automation</h4>
              <p className="text-sm text-gray-600">
                Next.js, Prisma, PostgreSQL – Multi-role workflow with real-time notifications and facial recognition.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg border border-sky-100 hover:shadow-2xl transition-all duration-300">
              <Cpu className="text-sky-600 mb-3" size={26} />
              <h4 className="font-semibold text-sky-700 mb-2">Blood Management System</h4>
              <p className="text-sm text-gray-600">
                Next.js, PostgreSQL – Live donor search with geo-filtering, role-based security, and 99.5% uptime.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg border border-sky-100 hover:shadow-2xl transition-all duration-300">
              <Code className="text-sky-600 mb-3" size={26} />
              <h4 className="font-semibold text-sky-700 mb-2">AI Video Interview Platform</h4>
              <p className="text-sm text-gray-600">
                Next.js, Stream API – Real-time video conferencing with scheduling, feedback, and analytics.
              </p>
            </div>

            {/* Experience */}
            <div className="bg-white rounded-lg p-6 shadow-lg border border-sky-100 hover:shadow-2xl transition-all duration-300 col-span-full">
              <Briefcase className="text-sky-600 mb-3" size={26} />
              <h4 className="font-semibold text-sky-700 mb-2">Software Developer – College Projects</h4>
              <p className="text-sm text-gray-600">
                Built and deployed real-world apps: Outpass Automation, Blood Donor Mgmt, reducing manual effort by 70%.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg border border-sky-100 hover:shadow-2xl transition-all duration-300 col-span-full">
              <Briefcase className="text-sky-600 mb-3" size={26} />
              <h4 className="font-semibold text-sky-700 mb-2">Android Developer Intern – AICTE-Google (NEAT)</h4>
              <p className="text-sm text-gray-600">
                Developed Android app modules with Java/Kotlin, completed 95% of assigned features within deadlines.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Header;
