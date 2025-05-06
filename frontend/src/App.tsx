import React, { useState, useEffect } from 'react';
import FileUpload from './components/FileUpload';
import LogTable from './components/LogTable';
import './App.css';

type User = {
  username: string;
  password: string;
};

function App() {
  const [users, setUsers] = useState<User[]>(() => {
    const stored = localStorage.getItem('users');
    return stored ? JSON.parse(stored) : [{ username: 'admin', password: 'password123' }];
  });

  const [loggedIn, setLoggedIn] = useState(() => localStorage.getItem('loggedIn') === 'true');
  const [isRegistering, setIsRegistering] = useState(false);
  const [logData, setLogData] = useState<any[]>([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();

    if (isRegistering) {
      const exists = users.find((u) => u.username === username);
      if (exists) {
        setError('User already exists.');
        return;
      }
      const newUsers = [...users, { username, password }];
      setUsers(newUsers);
      localStorage.setItem('users', JSON.stringify(newUsers));
      setIsRegistering(false);
      setError('');
      alert('Registration successful! Please log in.');
    } else {
      const valid = users.find((u) => u.username === username && u.password === password);
      if (valid) {
        setLoggedIn(true);
        localStorage.setItem('loggedIn', 'true');
        setError('');
      } else {
        setError('Invalid credentials.');
      }
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('loggedIn');
  };

  if (!loggedIn) {
    return (
      <div className="login-container">
        <h1>SOC Log Portal</h1>
        <p>{isRegistering ? 'Register a new account' : 'Log in to your account'}</p>
        <form onSubmit={handleAuth} className="login-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">{isRegistering ? 'Register' : 'Log In'}</button>
        </form>
        {error && <p className="error">{error}</p>}
        <button className="toggle-btn" onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? 'Already have an account? Log In' : "Don't have an account? Register"}
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Log Upload & Viewer</h1>
      <button onClick={handleLogout} className="logout-btn">Log Out</button>
      <FileUpload onUploadSuccess={setLogData} />
      <LogTable data={logData} />
    </div>
  );
}

export default App;
