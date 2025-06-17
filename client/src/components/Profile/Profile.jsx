import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../../redux/features/authSlice';
import './Profile.css';

const Profile = () => {
    const { user } = useSelector((state) => state.auth);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        username: user?.username || '',
        bio: user?.bio || '',
        age: user?.age || '',
        gender: user?.gender || '',
        spiritCharacter: user?.spiritCharacter || ''
    });
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(updateProfile(formData)).unwrap();
            setIsEditing(false);
        } catch (error) {
            console.error('Failed to update profile:', error);
        }
    };

    return (
        <div className="profile-container">
            <div className="profile-header">
                <div className="profile-avatar">
                    {user?.username?.charAt(0).toUpperCase() || 'U'}
                </div>
                <h1>{user?.username}'s Profile</h1>
            </div>

            <div className="profile-content">
                {!isEditing ? (
                    <div className="profile-info">
                        <div className="info-section">
                            <h3>Personal Information</h3>
                            <div className="info-grid">
                                <div className="info-item">
                                    <span className="info-label">Name</span>
                                    <span className="info-value">{user?.name}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Username</span>
                                    <span className="info-value">{user?.username}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Age</span>
                                    <span className="info-value">{user?.age}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Gender</span>
                                    <span className="info-value">{user?.gender}</span>
                                </div>
                            </div>
                        </div>

                        <div className="info-section">
                            <h3>About Me</h3>
                            <p className="bio">{user?.bio || 'No bio yet'}</p>
                        </div>

                        <div className="info-section">
                            <h3>Spirit Character</h3>
                            <p className="spirit-character">{user?.spiritCharacter || 'Not set'}</p>
                        </div>

                        <button 
                            className="edit-button"
                            onClick={() => setIsEditing(true)}
                        >
                            Edit Profile
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="edit-form">
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                />
                            </div>
                            <div className="form-group">
                                <label>Age</label>
                                <input
                                    type="number"
                                    value={formData.age}
                                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                                />
                            </div>
                            <div className="form-group">
                                <label>Gender</label>
                                <select
                                    value={formData.gender}
                                    onChange={(e) => setFormData({...formData, gender: e.target.value})}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Bio</label>
                            <textarea
                                value={formData.bio}
                                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                                rows={4}
                            />
                        </div>

                        <div className="form-group">
                            <label>Spirit Character</label>
                            <input
                                type="text"
                                value={formData.spiritCharacter}
                                onChange={(e) => setFormData({...formData, spiritCharacter: e.target.value})}
                            />
                        </div>

                        <div className="button-group">
                            <button type="submit" className="save-button">Save Changes</button>
                            <button 
                                type="button" 
                                className="cancel-button"
                                onClick={() => setIsEditing(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Profile;