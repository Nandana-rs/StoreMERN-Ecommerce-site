import axiosInstance from '../axios';

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axiosInstance.post('/users/auth', credentials);
    setMessage('Login successful!');
    navigate('/profile'); // Redirect to the profile page after login
  } catch (error) {
    setMessage('Login failed. Please try again.');
  }
};
