import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#f5b700] overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12">
          
          {/* Left Section - Text */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-yellow-200 mb-6">
              <Sparkles className="w-4 h-4 text-yellow-700" />
              <span className="text-sm font-medium text-yellow-900">Welcome to the Future of Campus Life</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-black mb-6 leading-tight">
              Your Campus Journey <br />
              Starts with <span className="text-black">Sahay</span>
            </h1>
            
            <p className="text-lg text-yellow-900 mb-8 max-w-xl mx-auto lg:mx-0">
              Connect, learn, and thrive with cutting-edge features designed for the next generation of campus life. Experience a seamless blend of community, opportunity, and innovation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group bg-yellow-700 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-yellow-600/25"
              >
                Get Started
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-yellow-900 bg-white shadow-lg px-6 py-3 rounded-xl hover:bg-yellow-50 transition-colors border border-yellow-300"
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>

          {/* Right Section - Logo */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 flex justify-center"
          >
            <img 
              src="/vi_logo-removebg-preview.png" 
              alt="Sahay Logo" 
              className="drop-shadow-xl w-72 lg:w-96 h-auto"
            />
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Hero;
