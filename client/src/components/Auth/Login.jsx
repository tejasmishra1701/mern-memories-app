import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/features/authSlice';
import './Auth.css';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    
    const { user, token, loading, error } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Attempting login with:', formData);
        
        try {
            const result = await dispatch(login(formData)).unwrap();
            console.log('Login result:', result);
            
            if (result?.token) {
                console.log('Token received, navigating to community');
                navigate('/community');
            }
        } catch (err) {
            console.error('Login error:', err);
        }
    };

    return (
        <div className="auth-container">
            <h2>Sign In</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        required
                        className="form-input"
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Sign In
                </button>
            </form>
            <div className="auth-switch">
                <p>Don't have an account? 
                    <Link to="/auth/signup" className="auth-link"> Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;