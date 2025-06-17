import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMemories } from '../../redux/features/memorySlice';
import './Community.css';

const Community = () => {
    const dispatch = useDispatch();
    const { memories, loading, error } = useSelector((state) => state.memories);

    useEffect(() => {
        dispatch(getMemories());
    }, [dispatch]);

    // Add console log to debug memory data
    console.log('Memories:', memories);

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loader"></div>
            </div>
        );
    }

    if (error) {
        return <div className="error-message">Error: {error}</div>;
    }

    return (
        <div className="community-container">
            <h1 className="community-title">Community Memories</h1>
            
            <div className="memories-grid">
                {memories.map((memory) => (
                    <div key={memory._id} className="memory-card">
                        <div className="memory-image-container">
                            <img 
                                src={memory.image} 
                                alt={memory.title}
                                className="memory-image"
                            />
                        </div>
                        <div className="memory-details">
                            <h3 className="memory-title">{memory.title}</h3>
                            <p className="memory-description">
                                {memory.description.length > 100 
                                    ? `${memory.description.substring(0, 100)}...` 
                                    : memory.description}
                            </p>
                            <div className="memory-footer">
                                <span className="memory-author">
                                    By {memory.creator?.username || 'Anonymous'}
                                </span>
                                <span className="memory-date">
                                    {new Date(memory.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Community;