const SearchBar = ({ setSearchParams }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const params = {
      name: formData.get('name'),
      category: formData.get('category'),
      minPrice: formData.get('minPrice'),
      maxPrice: formData.get('maxPrice'),
    };
    setSearchParams(params);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex flex-wrap gap-4">
      <input
        name="name"
        placeholder="Search by name"
        className="p-2 border rounded"
      />
      <input
        name="category"
        placeholder="Search by category"
        className="p-2 border rounded"
      />
      <input
        name="minPrice"
        type="number"
        placeholder="Min price"
        className="p-2 border rounded"
      />
      <input
        name="maxPrice"
        type="number"
        placeholder="Max price"
        className="p-2 border rounded"
      />
      <button
        type="submit"
        className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;