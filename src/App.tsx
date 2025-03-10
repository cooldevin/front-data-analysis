import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import Navigation from './components/Navigation';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';
import DataStorage from './pages/DataStorage';
import Visualization from './pages/Visualization';
import Home from './pages/Home';
import { ThemeProvider } from '@mui/material/styles';
import Dashboard from './components/Dashboard';
// 如果 'theme' 模块确实存在，需要确保路径正确；如果不存在，需要移除该导入
// 由于当前提示找不到模块且未使用该变量，暂时移除该导入
import theme from './theme';

function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const handleStorageChange = () => {
      setLoggedIn(!!localStorage.getItem('token'));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navigation loggedIn={loggedIn} />
        <Routes>
          <Route path="/login" element={<Login />} />
          // Add this route configuration
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/data-storage" element={
            <ProtectedRoute>
              <DataStorage />
            </ProtectedRoute>
          } />
          <Route path="/visualization" element={
            <ProtectedRoute>
              <Visualization />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
      </ThemeProvider>
  );
}

export default App;

<> 
<div className="floating-sidebar glass-effect">
  <nav className="nav flex-column">
    <NavLink to="/" className="nav-link">
      <i className="bi bi-house"></i>
      <span className="d-none d-md-inline">首页</span>
    </NavLink>
    {/* 其他导航项 */}
  </nav>
</div>
<main className="container-fluid px-4" style={{marginLeft: '260px'}}>
  <div className="responsive-grid">
    <div className="data-card glass-effect">
      {/* 数据卡片内容 */}
    </div>
    {/* 其他数据卡片 */}
  </div>
</main>
</>
