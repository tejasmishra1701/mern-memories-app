import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import Community from './components/Community/Community';
import CreateMemory from './components/Memory/CreateMemory';
import Profile from './components/Profile/Profile';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const { token } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
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
      </main>
    </div>
  );
};

export default App;