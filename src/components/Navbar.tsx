import { GraduationCap, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/signnnup');
  };

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center"
          >
            <Link to="/" className="flex items-center">
              <div className="bg-gradient-to-r from-primary to-secondary p-2 rounded-xl">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="ml-2 text-xl font-bold text-gradient">
                Sahay
              </span>
            </Link>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:flex items-center gap-8"
          >
            <Link to="/events" className="text-gray-600 hover:text-primary transition-colors">Events</Link>
            <Link to="/community" className="text-gray-600 hover:text-primary transition-colors">Community</Link>
            <Link to="/jobs" className="text-gray-600 hover:text-primary transition-colors">Jobs</Link>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSignUp}
              className="bg-primary text-white px-4 py-2 rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
            >
              Sign Up
            </motion.button>
          </motion.div>
          
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-primary transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link to="/events" className="block px-3 py-2 text-gray-600 hover:text-primary transition-colors">Events</Link>
                <Link to="/community" className="block px-3 py-2 text-gray-600 hover:text-primary transition-colors">Community</Link>
                <Link to="/jobs" className="block px-3 py-2 text-gray-600 hover:text-primary transition-colors">Jobs</Link>
                <button 
                  onClick={handleSignUp}
                  className="w-full mt-2 bg-primary text-white px-4 py-2 rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
                >
                  Sign Up
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;