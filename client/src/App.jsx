import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import ProtectedRoute from './components/ProtectedRoute';
import { useSelector } from 'react-redux';

const App = () => {
    const { token } = useSelector((state) => state.auth);

    return (
        <Router>
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <Routes>
                    <Route 
                        path="/" 
                        element={token ? <Navigate to="/community" /> : <Navigate to="/auth/login" />} 
                    />
                    <Route path="/auth/login" element={<Login />} />
                    <Route path="/auth/signup" element={<SignUp />} />
                    <Route 
                        path="/community" 
                        element={
                            <ProtectedRoute>
                                <Community />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="/create-memory" 
                        element={
                            <ProtectedRoute>
                                <CreateMemory />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="/profile" 
                        element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        } 
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;