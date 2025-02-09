import axiosInstance from '../axios';  // Import the axios instance

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axiosInstance.post('/users', user);
    setMessage('Registration successful!');
    navigate('/login');
  } catch (error) {
    setMessage('Registration failed. Please try again.');
  }
};
