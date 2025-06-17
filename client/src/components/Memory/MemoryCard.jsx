import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { likeMemory, deleteMemory } from '../../redux/features/memorySlice';
import CommentSection from './CommentSection';
import { FaHeart, FaRegHeart, FaTimes, FaTrash } from 'react-icons/fa';
import './MemoryCard.css';

const MemoryCard = ({ memory: initialMemory, onDelete }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [memory, setMemory] = useState(initialMemory);
    const [isLiking, setIsLiking] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    // Check if the current user has liked the memory
    const hasLiked = user ? memory.likes.includes(user._id) : false;

    const handleLike = async (e) => {
        e.stopPropagation(); // Prevent card expansion when clicking like button
        if (!user || isLiking) return;

        try {
            setIsLiking(true);
            const updatedMemory = await dispatch(likeMemory(memory._id)).unwrap();
            setMemory(updatedMemory);
        } catch (error) {
            console.error('Like failed:', error);
        } finally {
            setIsLiking(false);
        }
    };

    const handleCardClick = () => {
        setIsExpanded(true);
    };

    const handleClose = (e) => {
        e.stopPropagation();
        setIsExpanded(false);
    };

    const handleDelete = async (e) => {
        e.stopPropagation();
        if (window.confirm('Are you sure you want to delete this memory?')) {
            try {
                await dispatch(deleteMemory(memory._id)).unwrap();
                if (onDelete) onDelete(memory._id);
            } catch (error) {
                console.error('Delete failed:', error);
            }
        }
    };

    const isCreator = user?._id === memory.creator._id;

    return (
        <>
            <div className={`memory-card ${isExpanded ? 'hidden' : ''}`} onClick={handleCardClick}>
                <div className="memory-image-container">
                    <img src={memory.image} alt={memory.title} className="memory-image" />
                </div>
                <div className="memory-content">
                    <h3 className="memory-title">{memory.title}</h3>
                    <p className="memory-description">
                        {memory.description.length > 150 
                            ? `${memory.description.substring(0, 150)}...` 
                            : memory.description}
                    </p>
                    <div className="memory-footer">
                        <span className="memory-creator">
                            By {memory.creator.username}
                        </span>
                        <button 
                            className={`like-button ${hasLiked ? 'liked' : ''}`}
                            onClick={handleLike}
                            disabled={isLiking}
                        >
                            {hasLiked ? <FaHeart /> : <FaRegHeart />}
                            <span>{memory.likes.length}</span>
                        </button>
                    </div>
                </div>
                <CommentSection memory={memory} />
                {isCreator && (
                    <button 
                        className="delete-button"
                        onClick={handleDelete}
                        title="Delete memory"
                    >
                        <FaTrash />
                    </button>
                )}
            </div>

            {isExpanded && (
                <div className="expanded-overlay" onClick={handleClose}>
                    <div className="expanded-card" onClick={e => e.stopPropagation()}>
                        <button className="close-button" onClick={handleClose}>
                            <FaTimes />
                        </button>
                        <div className="expanded-image-container">
                            <img src={memory.image} alt={memory.title} />
                        </div>
                        <div className="expanded-content">
                            <h2>{memory.title}</h2>
                            <p className="expanded-description">{memory.description}</p>
                            <div className="expanded-footer">
                                <span className="memory-creator">
                                    By {memory.creator.username}
                                </span>
                                <button 
                                    className={`like-button ${hasLiked ? 'liked' : ''}`}
                                    onClick={handleLike}
                                    disabled={isLiking}
                                >
                                    {hasLiked ? <FaHeart /> : <FaRegHeart />}
                                    <span>{memory.likes.length}</span>
                                </button>
                            </div>
                            <CommentSection memory={memory} />
                        </div>
                        {isCreator && (
                            <button 
                                className="delete-button expanded"
                                onClick={handleDelete}
                                title="Delete memory"
                            >
                                <FaTrash />
                            </button>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default MemoryCard;