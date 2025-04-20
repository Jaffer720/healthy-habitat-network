import useAuth from '../../hooks/useAuth';
import { useState } from 'react';

export default function Login() {
  const { login } = useAuth()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const handleLogin = async () => {
    const res = await fetch('http://localhost:8000/index.php/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (data.success) {
      console.log(data);
      login(data.user); // Assuming the API returns user data

    } else {
      console.error('Login failed:', data.message);
      setError(data.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error}
      <input type="email" placeholder='email' onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder='password' onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
