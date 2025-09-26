import { useState, useEffect } from 'react';
import { getSweets, searchSweets } from '../services/api';
import SweetCard from '../components/SweetCard';
import SearchBar from '../components/SearchBar';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [sweets, setSweets] = useState([]);
  const [searchParams, setSearchParams] = useState({});
  const navigate = useNavigate();

  const fetchSweets = async () => {
    try {
      const response = searchParams.name || searchParams.category || searchParams.minPrice || searchParams.maxPrice
        ? await searchSweets(searchParams)
        : await getSweets();
      setSweets(response.data);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    }
  };

  useEffect(() => {
    fetchSweets();
  }, [searchParams]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Sweets Dashboard</h2>
      <SearchBar setSearchParams={setSearchParams} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {sweets.map((sweet) => (
          <SweetCard
            key={sweet.id}
            sweet={sweet}
            user={JSON.parse(localStorage.getItem('user'))}
            refreshSweets={fetchSweets}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;