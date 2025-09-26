import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">Sweet Shop</Link>
        <div className="space-x-4">
          {user ? (
            <>
              <span className="text-white">Welcome, {user.username}</span>
              {user.role === 'admin' && (
                <Link to="/admin" className="text-white hover:text-blue-200">Admin Dashboard</Link>
              )}
              <button
                onClick={handleLogout}
                className="text-white hover:text-blue-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white hover:text-blue-200">Login</Link>
              <Link to="/register" className="text-white hover:text-blue-200">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;