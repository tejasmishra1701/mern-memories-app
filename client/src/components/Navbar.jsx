import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/features/authSlice';
import { useState } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/auth/login');
    };

    return (
        <nav className="bg-indigo-600 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="text-xl font-bold">
                            Memories
                        </Link>
                        {user && (
                            <div className="ml-10 flex items-baseline space-x-4">
                                <Link to="/community" className="hover:bg-indigo-700 px-3 py-2 rounded-md">
                                    Community
                                </Link>
                                <Link to="/create-memory" className="hover:bg-indigo-700 px-3 py-2 rounded-md">
                                    Create Memory
                                </Link>
                            </div>
                        )}
                    </div>

                    {user && (
                        <div className="relative">
                            <button 
                                onClick={() => setIsOpen(!isOpen)}
                                className="flex items-center hover:bg-indigo-700 px-3 py-2 rounded-md"
                            >
                                {user.username}
                                <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {isOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                                    <Link 
                                        to="/profile" 
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Profile
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;