import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMemories } from '../../redux/features/memorySlice';

const Community = () => {
    const dispatch = useDispatch();
    const { memories, loading, error } = useSelector((state) => state.memories);

    useEffect(() => {
        dispatch(getMemories());
    }, [dispatch]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500 mt-10">
                Error: {error}
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Community Memories</h2>
            
            {memories.length === 0 ? (
                <p className="text-center text-gray-500">No memories shared yet.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {memories.map((memory) => (
                        <div key={memory._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <img 
                                src={memory.image} 
                                alt={memory.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold text-gray-900">{memory.title}</h3>
                                <p className="mt-2 text-gray-600">{memory.description}</p>
                                <div className="mt-4 flex justify-between items-center">
                                    <span className="text-sm text-gray-500">
                                        {new Date(memory.createdAt).toLocaleDateString()}
                                    </span>
                                    <span className="text-sm text-indigo-600">
                                        By {memory.creator.username}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Community;