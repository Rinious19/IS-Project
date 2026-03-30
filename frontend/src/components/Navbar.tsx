import { Link, useLocation } from 'react-router-dom';
import { FiActivity, FiImage, FiInfo, FiCpu } from 'react-icons/fi';

export default function Navbar() {
  const location = useLocation();

  const navLinks = [
      { path: '/predict-ml', name: 'Test ML', icon: <FiActivity className="mr-2" /> },
      { path: '/predict-nn', name: 'Test NN', icon: <FiImage className="mr-2" /> },
      { path: '/about-ml', name: 'About ML', icon: <FiInfo className="mr-2" /> },
      { path: '/about-nn', name: 'About NN', icon: <FiCpu className="mr-2" /> },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 overflow-x-auto whitespace-nowrap hide-scrollbar">
          <div className="flex items-center font-bold text-xl text-indigo-600 mr-8">
            IS Project 2568
          </div>
          <div className="flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'border-indigo-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}