import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { commentMemory } from '../../redux/features/memorySlice';
import './CommentSection.css';

const CommentSection = ({ memory }) => {
    const [comment, setComment] = useState('');
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (comment.trim()) {
            try {
                await dispatch(commentMemory({ id: memory._id, comment })).unwrap();
                setComment('');
            } catch (error) {
                console.error('Failed to add comment:', error);
            }
        }
    };

    return (
        <div className="comments-section">
            <h4>Comments ({memory.comments.length})</h4>
            
            {user && (
                <form onSubmit={handleSubmit} className="comment-form">
                    <input
                        type="text"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Add a comment..."
                        className="comment-input"
                    />
                    <button type="submit" className="comment-button">
                        Post
                    </button>
                </form>
            )}

            <div className="comments-list">
                {memory.comments.map((comment, index) => (
                    <div key={index} className="comment">
                        <span className="comment-author">
                            {comment.creator.username}
                        </span>
                        <p className="comment-text">{comment.text}</p>
                        <span className="comment-date">
                            {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommentSection;