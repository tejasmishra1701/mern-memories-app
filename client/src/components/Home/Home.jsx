import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Home.css';

const Home = () => {
    const { token } = useSelector((state) => state.auth);

    return (
        <div className="home-container">
            <div className="content-wrapper">
                <h1>Share Your Precious<br />Memories</h1>
                <p className="description">
                    Welcome to Memories - a platform where you can preserve and share your most 
                    cherished moments. Create your personal collection of memories with photos 
                    and stories, connect with others through their shared experiences, and build 
                    a community of storytellers. Whether it's a breathtaking sunset, a family 
                    celebration, or a simple moment of joy, every memory deserves to be 
                    remembered and shared.
                </p>
                <div className="button-group">
                    {!token ? (
                        <>
                            <Link to="/auth/signup" className="btn-primary">Get Started</Link>
                            <Link to="/auth/login" className="btn-secondary">Sign In</Link>
                        </>
                    ) : (
                        <Link to="/community" className="btn-primary">View Memories</Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;