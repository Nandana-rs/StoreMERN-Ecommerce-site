import axiosInstance from '../axios';
import { useNavigate } from 'react-router-dom';

const handleLogout = async () => {
  try {
    await axiosInstance.post('/users/logout');
    navigate('/login'); // Redirect to login after successful logout
  } catch (error) {
    console.log('Error logging out:', error);
  }
};

return (
  <button onClick={handleLogout}>Logout</button>
);
