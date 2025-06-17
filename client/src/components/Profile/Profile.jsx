import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../redux/features/authSlice';
import { getMemories } from '../../redux/features/memorySlice';
import MemoryCard from '../Memory/MemoryCard';
import './Profile.css';

const Profile = () => {
    const dispatch = useDispatch();
    const { user, loading: authLoading } = useSelector((state) => state.auth);
    const { memories, loading: memoryLoading } = useSelector((state) => state.memories);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        username: user?.username || '',
        bio: user?.bio || '',
        avatar: user?.avatar || ''
    });
    const [imagePreview, setImagePreview] = useState(user?.avatar || '');

    useEffect(() => {
        dispatch(getMemories());
    }, [dispatch]);

    const userMemories = memories.filter(memory => memory.creator._id === user?._id);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setFormData(prev => ({ ...prev, avatar: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Submitting profile update:', formData);
            const result = await dispatch(updateProfile({ 
                id: user._id, 
                formData 
            })).unwrap();
            console.log('Update successful:', result);
            setIsEditing(false);
        } catch (error) {
            console.error('Update failed:', error);
        }
    };

    if (authLoading) return <div className="loading">Loading...</div>;

    return (
        <div className="profile-container">
            <div className="profile-header">
                <div className="profile-image-container">
                    {isEditing ? (
                        <div className="edit-avatar">
                            <img src={imagePreview} alt={user.username} />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                id="avatar-input"
                                hidden
                            />
                            <label htmlFor="avatar-input" className="change-avatar-btn">
                                Change Photo
                            </label>
                        </div>
                    ) : (
                        <img src={user.avatar || '/default-avatar.png'} alt={user.username} />
                    )}
                </div>

                <div className="profile-info">
                    {isEditing ? (
                        <form onSubmit={handleSubmit} className="edit-profile-form">
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Name"
                                required
                            />
                            <input
                                type="text"
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                placeholder="Username"
                                required
                            />
                            <textarea
                                value={formData.bio}
                                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                placeholder="Bio"
                                rows={3}
                            />
                            <div className="edit-buttons">
                                <button type="submit">Save Changes</button>
                                <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                            </div>
                        </form>
                    ) : (
                        <>
                            <h1>{user.name}</h1>
                            <h2>@{user.username}</h2>
                            {user.bio && <p className="bio">{user.bio}</p>}
                            <button onClick={() => setIsEditing(true)} className="edit-profile-btn">
                                Edit Profile
                            </button>
                        </>
                    )}
                </div>
            </div>

            <div className="profile-stats">
                <div className="stat">
                    <span className="stat-value">{userMemories.length}</span>
                    <span className="stat-label">Memories</span>
                </div>
                <div className="stat">
                    <span className="stat-value">{user.followers?.length || 0}</span>
                    <span className="stat-label">Followers</span>
                </div>
                <div className="stat">
                    <span className="stat-value">{user.following?.length || 0}</span>
                    <span className="stat-label">Following</span>
                </div>
            </div>

            <div className="user-memories">
                <h3>My Memories</h3>
                {memoryLoading ? (
                    <div className="loading">Loading memories...</div>
                ) : (
                    <div className="memories-grid">
                        {userMemories.map(memory => (
                            <MemoryCard key={memory._id} memory={memory} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;