import { useState } from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';
import './SearchBar.css';

const SearchBar = ({ onSearch, onFilter }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
        sortBy: 'newest',
        timeFrame: 'all'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
    };

    const handleFilterChange = (key, value) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        onFilter(newFilters);
    };

    return (
        <div className="search-container">
            <form onSubmit={handleSubmit} className="search-form">
                <div className="search-input-container">
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search memories..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>
                <button
                    type="button"
                    className={`filter-button ${showFilters ? 'active' : ''}`}
                    onClick={() => setShowFilters(!showFilters)}
                >
                    <FaFilter />
                    Filters
                </button>
            </form>

            {showFilters && (
                <div className="filter-container">
                    <div className="filter-group">
                        <label>Sort by:</label>
                        <select
                            value={filters.sortBy}
                            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                        >
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                            <option value="mostLiked">Most Liked</option>
                        </select>
                    </div>
                    <div className="filter-group">
                        <label>Time Frame:</label>
                        <select
                            value={filters.timeFrame}
                            onChange={(e) => handleFilterChange('timeFrame', e.target.value)}
                        >
                            <option value="all">All Time</option>
                            <option value="today">Today</option>
                            <option value="week">This Week</option>
                            <option value="month">This Month</option>
                        </select>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchBar;