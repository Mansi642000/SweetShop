import { useState, useEffect } from 'react';
import { getSweets, createSweet, updateSweet, deleteSweet, restockSweet } from '../services/api';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [sweets, setSweets] = useState([]);
  const [newSweet, setNewSweet] = useState({ name: '', category: '', price: '', quantity: '' });
  const [editingSweet, setEditingSweet] = useState(null);
  const navigate = useNavigate();

  const fetchSweets = async () => {
    try {
      const response = await getSweets();
      setSweets(response.data);
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    }
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createSweet(newSweet);
      setNewSweet({ name: '', category: '', price: '', quantity: '' });
      fetchSweets();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add sweet');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateSweet(editingSweet.id, editingSweet);
      setEditingSweet(null);
      fetchSweets();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update sweet');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSweet(id);
      fetchSweets();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete sweet');
    }
  };

  const handleRestock = async (id) => {
    const quantity = prompt('Enter quantity to restock:');
    if (quantity) {
      try {
        await restockSweet(id, { quantity: parseInt(quantity) });
        fetchSweets();
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to restock sweet');
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <h3 className="text-xl font-semibold mb-2">Add New Sweet</h3>
      <form onSubmit={handleCreate} className="mb-6 flex flex-wrap gap-4">
        <input
          placeholder="Name"
          value={newSweet.name}
          onChange={(e) => setNewSweet({ ...newSweet, name: e.target.value })}
          className="p-2 border rounded"
          required
        />
        <input
          placeholder="Category"
          value={newSweet.category}
          onChange={(e) => setNewSweet({ ...newSweet, category: e.target.value })}
          className="p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={newSweet.price}
          onChange={(e) => setNewSweet({ ...newSweet, price: e.target.value })}
          className="p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newSweet.quantity}
          onChange={(e) => setNewSweet({ ...newSweet, quantity: e.target.value })}
          className="p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Sweet
        </button>
      </form>

      {editingSweet && (
        <form onSubmit={handleUpdate} className="mb-6 flex flex-wrap gap-4">
          <input
            placeholder="Name"
            value={editingSweet.name}
            onChange={(e) => setEditingSweet({ ...editingSweet, name: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <input
            placeholder="Category"
            value={editingSweet.category}
            onChange={(e) => setEditingSweet({ ...editingSweet, category: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={editingSweet.price}
            onChange={(e) => setEditingSweet({ ...editingSweet, price: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <input
            type="number"
            placeholder="Quantity"
            value={editingSweet.quantity}
            onChange={(e) => setEditingSweet({ ...editingSweet, quantity: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Update Sweet
          </button>
          <button
            type="button"
            onClick={() => setEditingSweet(null)}
            className="p-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Cancel
          </button>
        </form>
      )}

      <h3 className="text-xl font-semibold mb-2">Manage Sweets</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {sweets.map((sweet) => (
          <div key={sweet.id} className="bg-white p-4 rounded-lg shadow-md">
            <h4 className="text-lg font-bold">{sweet.name}</h4>
            <p>Category: {sweet.category}</p>
            <p>Price: ${sweet.price}</p>
            <p>In Stock: {sweet.quantity}</p>
            <button
              onClick={() => setEditingSweet(sweet)}
              className="mt-2 mr-2 p-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(sweet.id)}
              className="mt-2 mr-2 p-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Delete
            </button>
            <button
              onClick={() => handleRestock(sweet.id)}
              className="mt-2 p-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Restock
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;