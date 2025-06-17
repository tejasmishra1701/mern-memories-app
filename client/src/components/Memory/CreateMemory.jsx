import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createMemory } from '../../redux/features/memorySlice';
import './CreateMemory.css';

const CreateMemory = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: ''
    });
    const [imagePreview, setImagePreview] = useState('');
    const { loading, error } = useSelector((state) => state.memories);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setFormData({ ...formData, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Submitting memory:', formData);
            const result = await dispatch(createMemory(formData)).unwrap();
            console.log('Memory created:', result);
            navigate('/community');
        } catch (err) {
            console.error('Failed to create memory:', err);
        }
    };

    return (
        <div className="create-memory-container">
            <h2>Create New Memory</h2>
            {error && <div className="error-message">{error}</div>}
            
            <form onSubmit={handleSubmit} className="memory-form">
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Enter memory title"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Share your memory's story..."
                        required
                        rows={4}
                    />
                </div>

                <div className="form-group image-upload-group">
                    <label>Memory Image</label>
                    <div 
                        className={`image-upload-area ${imagePreview ? 'has-image' : ''}`}
                        onClick={() => document.getElementById('image-input').click()}
                    >
                        {imagePreview ? (
                            <div className="image-preview-wrapper">
                                <img src={imagePreview} alt="Preview" />
                                <div className="image-overlay">
                                    <span>Click to change image</span>
                                </div>
                            </div>
                        ) : (
                            <div className="upload-placeholder">
                                <i className="upload-icon">📸</i>
                                <p>Click to upload an image</p>
                                <span className="upload-hint">JPG, PNG or GIF (Max 5MB)</span>
                            </div>
                        )}
                        <input
                            id="image-input"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            required
                            style={{ display: 'none' }}
                        />
                    </div>
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? 'Creating...' : 'Create Memory'}
                </button>
            </form>
        </div>
    );
};

export default CreateMemory;