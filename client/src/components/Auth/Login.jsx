import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/features/authSlice';
import './Auth.css';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(login(formData)).unwrap();
            navigate('/community');
        } catch (err) {
            setError(err.message || 'Login failed');
        }
    };

    return (
        <div className="auth-container">
            <h2>Sign In</h2>
            {error && <p className="error-message">{error}</p>}
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