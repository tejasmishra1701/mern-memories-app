import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMemories } from '../../redux/features/memorySlice';
import MemoryCard from '../Memory/MemoryCard';
import './Community.css';

const Community = () => {
    const dispatch = useDispatch();
    const { memories, loading, error } = useSelector((state) => state.memories);

    useEffect(() => {
        dispatch(getMemories());
    }, [dispatch]);

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loader"></div>
            </div>
        );
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="community-container">
            <h1 className="community-title">Community Memories</h1>
            
            {memories.length === 0 ? (
                <div className="no-memories">
                    <p>No memories shared yet. Be the first to share!</p>
                </div>
            ) : (
                <div className="memories-grid">
                    {memories.map((memory) => (
                        <MemoryCard key={memory._id} memory={memory} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Community;