import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/features/authSlice';
import './Navbar.css';

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
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="logo">
                    Memories
                </Link>
                
                {user && (
                    <div className="nav-links">
                        <Link to="/community" className="nav-link">
                            Community
                        </Link>
                        <Link to="/create-memory" className="nav-link">
                            Create Memory
                        </Link>
                        
                        <div className="dropdown">
                            <button 
                                className="dropdown-button"
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                {user.username}
                                <span>▼</span>
                            </button>
                            
                            <div className={`dropdown-content ${isOpen ? 'show' : ''}`}>
                                <Link 
                                    to="/profile" 
                                    className="dropdown-item"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Profile
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="dropdown-item"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;