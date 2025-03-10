import { useState } from 'react';
import axios from 'axios';

// 配置axios全局默认设置

import { motion } from 'framer-motion';

import { Link, useNavigate } from 'react-router-dom'; // 添加 useNavigate

axios.defaults.baseURL = 'http://localhost:8080/auth';
axios.defaults.withCredentials = true;
export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const response = await axios.post('/login', { username, password });
      if (response) {
        window.dispatchEvent(new Event('authUpdate'));
        navigate('/', { replace: true });
      }
    } catch (err: any) {
      setError(err.response?.data?.message || '登录失败，请检查凭据');
    } finally {
      setIsLoading(false);
    }
  };



    // 添加导航钩子
    const navigate = useNavigate();

    // 添加注册跳转处理器
    const handleRegisterClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (!isLoading) {
          navigate('/register', { replace: true });
        }
    };

  return (
    <div className="auth-container" style={{ position: 'relative', zIndex: 1 }}>
      <motion.div 
        className="auth-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
        style={{ 
          width: '100%',
          pointerEvents: 'auto',
          position: 'relative',
          zIndex: 1 
        }}
      >
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>登录</h2>
          <motion.input
            type="text"
            placeholder="用户名"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            whileFocus={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
            style={{ pointerEvents: 'auto', position: 'relative', zIndex: 2 }}
          />
          <motion.input
            type="password"
            placeholder="密码"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            whileFocus={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
            style={{ pointerEvents: 'auto', position: 'relative', zIndex: 2, color: '#000' }}
          />
        <button 
          type="submit" 
          className="flat-button primary"
          disabled={isLoading}
          style={{ pointerEvents: 'auto', position:'relative', zIndex: 2 }}
        >
          {isLoading ? '登录中...' : '登录'}
        </button>
        {error && 
          <div className="error-message" style={{ 
            color: '#ff4444', 
            marginTop: '1rem',
            textAlign: 'center'
          }}>
            {error}
          </div>
        }
         <div className="auth-links">
          <span>没有账号？</span>
          <button 
            className="flat-link"
            onClick={handleRegisterClick}
            disabled={isLoading}
            style={{ 
              background: 'none',
              border: 'none',
              color: isLoading ? '#9e9e9e' : '#2196f3',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              padding: 0,
              position: 'relative'
            }}
          >
            {isLoading && (
              <motion.span
                className="button-loader"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity }}
                style={{
                  display: 'inline-block',
                  width: 16,
                  height: 16,
                  border: '2px solid #e0e0e0',
                  borderTop: '2px solid #2196f3',
                  borderRadius: '50%',
                  marginRight: 8
                }}
              />
            )}
            立即注册
          </button>
        </div>
      </form>
    </motion.div>
    <style>{
      `
      .auth-container {
        max-width: 450px;
        min-width: 400px;
        padding: 1.5rem;
        margin: 2rem auto;
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: visible;
      }

      .auth-form {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        width: 100%;
        padding: 2rem;
      }

      h2 {
        margin: 0 0 2rem 0;
        font-size: 2rem;
      }

      input[type='text'],
      input[type='password'],
      .flat-button {
        width: 100%;
        box-sizing: border-box;
        padding: 12px;
      }

      .flat-button.primary {
        margin-top: 1.2rem;
      }

      .auth-links {
        display: flex;
        gap: 0.8rem;
        justify-content: center;
        margin-top: 1.5rem;
      }
      `
    }</style>
  </div>
)
}