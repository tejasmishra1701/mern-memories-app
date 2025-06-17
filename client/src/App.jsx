import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import Community from './components/Community/Community';
import CreateMemory from './components/Memory/CreateMemory';
import Profile from './components/Profile/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

const App = () => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    const { loading, token } = useSelector((state) => state.auth);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="app-container">
            <Navbar />
            <main className={`main-content ${isHomePage ? 'home' : 'with-padding'}`}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route 
                        path="/auth/login" 
                        element={token ? <Navigate to="/community" /> : <Login />} 
                    />
                    <Route 
                        path="/auth/signup" 
                        element={token ? <Navigate to="/community" /> : <SignUp />} 
                    />
                    <Route path="/community" element={
                        <ProtectedRoute>
                            <Community />
                        </ProtectedRoute>
                    } />
                    <Route path="/create-memory" element={
                        <ProtectedRoute>
                            <CreateMemory />
                        </ProtectedRoute>
                    } />
                    <Route path="/profile" element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    } />
                </Routes>
            </main>
        </div>
    );
};

export default App;