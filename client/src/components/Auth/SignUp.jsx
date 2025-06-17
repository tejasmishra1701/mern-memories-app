import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signup } from '../../redux/features/authSlice';
import './Auth.css';

const SignUp = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        username: '',
        name: '',
        age: '',
        gender: '',
        bio: '',
        spiritCharacter: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            return setError('Passwords do not match');
        }
        try {
            await dispatch(signup(formData)).unwrap();
            navigate('/community');
        } catch (err) {
            setError(err.message || 'Signup failed');
        }
    };

    return (
        <div className="auth-container">
            <h2>Create Account</h2>
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
                        type="text"
                        placeholder="Username"
                        value={formData.username}
                        onChange={(e) => setFormData({...formData, username: e.target.value})}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
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
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                        required
                        className="form-input"
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Sign Up
                </button>
            </form>
            <div className="auth-switch">
                <p>Already have an account? 
                    <Link to="/auth/login" className="auth-link"> Sign In</Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;