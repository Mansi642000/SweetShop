import { purchaseSweet } from '../services/api';

const SweetCard = ({ sweet, user, refreshSweets }) => {
  const handlePurchase = async () => {
    try {
      await purchaseSweet(sweet.id);
      refreshSweets();
    } catch (err) {
      alert(err.response?.data?.message || 'Purchase failed');
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-bold">{sweet.name}</h3>
      <p className="text-gray-600">Category: {sweet.category}</p>
      <p className="text-gray-600">Price: ${sweet.price}</p>
      <p className="text-gray-600">In Stock: {sweet.quantity}</p>
      {user && (
        <button
          onClick={handlePurchase}
          disabled={sweet.quantity === 0}
          className={`mt-2 w-full p-2 rounded text-white ${
            sweet.quantity === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          Purchase
        </button>
      )}
    </div>
  );
};

export default SweetCard;