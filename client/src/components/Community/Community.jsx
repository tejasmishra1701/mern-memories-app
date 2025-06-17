import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMemories } from '../../redux/features/memorySlice';
import MemoryCard from '../Memory/MemoryCard';
import SearchBar from '../Search/SearchBar';
import './Community.css';

const Community = () => {
    const dispatch = useDispatch();
    const { memories, loading, error } = useSelector((state) => state.memories);
    const { user } = useSelector((state) => state.auth);
    const [filteredMemories, setFilteredMemories] = useState([]);

    useEffect(() => {
        const fetchMemories = async () => {
            try {
                console.log('Fetching memories...');
                await dispatch(getMemories()).unwrap();
                console.log('Memories fetched:', memories.length);
            } catch (err) {
                console.error('Failed to fetch memories:', err);
            }
        };

        if (user) {
            fetchMemories();
        }
    }, [dispatch, user]);

    useEffect(() => {
        setFilteredMemories(memories);
    }, [memories]);

    const handleSearch = (searchTerm) => {
        const filtered = memories.filter(memory => 
            memory.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredMemories(filtered);
    };

    const handleFilter = ({ sortBy, timeFrame }) => {
        let filtered = [...memories];

        // Apply time frame filter
        if (timeFrame !== 'all') {
            const now = new Date();
            const timeFrames = {
                today: 1,
                week: 7,
                month: 30
            };
            
            filtered = filtered.filter(memory => {
                const memoryDate = new Date(memory.createdAt);
                const diffTime = Math.abs(now - memoryDate);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                return diffDays <= timeFrames[timeFrame];
            });
        }

        // Apply sorting
        switch (sortBy) {
            case 'oldest':
                filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                break;
            case 'mostLiked':
                filtered.sort((a, b) => b.likes.length - a.likes.length);
                break;
            default: // newest
                filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }

        setFilteredMemories(filtered);
    };

    if (loading) return <div className="loading">Loading memories...</div>;
    if (error) return <div className="error-message">{error}</div>;
    if (!memories.length) return <div className="no-memories">No memories found</div>;

    return (
        <div className="community-container">
            <SearchBar onSearch={handleSearch} onFilter={handleFilter} />
            <div className="memories-grid">
                {filteredMemories.map(memory => (
                    <MemoryCard key={memory._id} memory={memory} />
                ))}
            </div>
        </div>
    );
};

export default Community;