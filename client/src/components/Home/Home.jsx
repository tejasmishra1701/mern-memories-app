import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Home.css';
import logo from '../../assets/memories-logo.png';

const Home = () => {
    const { token } = useSelector((state) => state.auth);

    return (
        <div className="home-container">
            <nav className="home-nav">
                <div className="nav-content">
                    <Link to="/" className="nav-logo">
                        <img src={logo} alt="Memories Logo" />
                        <span>Memories</span>
                    </Link>
                    <div className="nav-links">
                        <Link to="/community" className="nav-link">Community</Link>
                        {!token ? (
                            <>
                                <Link to="/auth/login" className="nav-link">Login</Link>
                                <Link to="/auth/signup" className="nav-button">Sign Up</Link>
                            </>
                        ) : null}
                    </div>
                </div>
            </nav>

            <main className="home-content">
                <h1>Share Your Precious Memories</h1>
                <p className="description">
                    Welcome to Memories - a platform where you can preserve and share your most 
                    cherished moments. Create your personal collection of memories with photos 
                    and stories, connect with others through their shared experiences, and build 
                    a community of storytellers. Whether it's a breathtaking sunset, a family 
                    celebration, or a simple moment of joy, every memory deserves to be 
                    remembered and shared.
                </p>
            </main>
        </div>
    );
};

export default Home;