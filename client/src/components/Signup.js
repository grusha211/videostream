import React, { useState } from 'react';
import { signup } from '../services/authService';
import '../css/signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password:''
  });

  const { username, email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const response = await signup(formData);
      alert(response.message);
    } catch (error) {
      console.error(error);
      alert('Error signing up');
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={onSubmit}>
        <input type="text" name="username" value={username} onChange={onChange} placeholder="User Name" required />
        <input type="email" name="email" value={email} onChange={onChange} placeholder="Email" required />
        <input type='password' name="password" value={password} onChange={onChange} placeholder='Password' required/>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
