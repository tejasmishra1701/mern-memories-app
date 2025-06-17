import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createMemory } from '../../redux/features/memorySlice';
import './CreateMemory.css';

const CreateMemory = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, image: reader.result });
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await dispatch(createMemory(formData)).unwrap();
            navigate('/community');
        } catch (err) {
            setError(err.message || 'Failed to create memory');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-memory-container">
            <h2 className="create-memory-title">Create New Memory</h2>
            
            {error && <div className="error-message">{error}</div>}
            
            <form onSubmit={handleSubmit} className="memory-form">
                <div className="form-group">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        id="title"
                        type="text"
                        className="form-input"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Give your memory a title"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                        id="description"
                        className="form-input form-textarea"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Share your memory's story..."
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Image</label>
                    <div 
                        className="image-upload"
                        onClick={() => document.getElementById('image-input').click()}
                    >
                        {imagePreview ? (
                            <div className="image-preview">
                                <img src={imagePreview} alt="Preview" />
                            </div>
                        ) : (
                            <div className="upload-placeholder">
                                <i className="upload-icon">📸</i>
                                <p>Click to upload an image</p>
                            </div>
                        )}
                        <input
                            id="image-input"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ display: 'none' }}
                            required
                        />
                    </div>
                </div>

                <button 
                    type="submit" 
                    className="submit-button"
                    disabled={loading}
                >
                    {loading ? 'Creating...' : 'Create Memory'}
                </button>
            </form>
        </div>
    );
};

export default CreateMemory;