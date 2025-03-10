import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// 配置axios请求基础路径
axios.defaults.baseURL = 'http://localhost:8080/auth';
axios.defaults.withCredentials = true;

export default function Register() {
  const [user, setUser] = useState({
    username: '',
    password: '',

  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      try {
        const response = await axios.post('/register', {
  username: user.username,
  password: user.password
});
        if (response.status === 400) {
          setError(response.data?.message || '请求参数错误，请检查输入');
          return; 
        }
        if (response.status === 201 || response.status === 200) {
          navigate('/login');
        } else {
          console.log(response);
        }
      } catch (err: any) {
        if (err.response && err.response.status === 400) {
          setError(err.response.data);
        } else {
          setError(err.response?.data?.join?.('\n') || err.response?.data?.message || '注册失败：' + JSON.stringify(err.response?.data));
        }
      }

      }catch (err: any) {
      if (err.response && err.response.status === 400) {
        setError(err.response.data);
      } else {
        setError(err.response?.data?.join?.('\n') || err.response?.data?.message || '注册失败：' + JSON.stringify(err.response?.data));
      }
    } finally {
      setIsLoading(false);
    }
  };

   // 添加注册跳转处理器
   const handleloginClick = (e: React.MouseEvent) => {
       e.preventDefault();
       if (!isLoading) {
         navigate('/login', { replace: true });
       }
   };

  return (
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
      <form className="auth-form" onSubmit={handleSubmit} style={{ gap: '1.5rem', padding: '2rem' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>注册</h2>
          <motion.input
            type="text"
            placeholder="用户名"
            value={user.username}
            onChange={(e) => setUser({...user, username: e.target.value})}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            whileFocus={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
            style={{ pointerEvents: 'auto', position: 'relative', zIndex: 2, color: '#000' }}
          />
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            whileFocus={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <input
              type="password"
              placeholder="密码"
              value={user.password}
              onChange={(e) => setUser({...user, password: e.target.value})}
              style={{ width: '100%', color: '#000' }}
            />
          </motion.div>
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            whileFocus={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {/* <input
              type="email"
              placeholder="邮箱"
              value={user.email}
              onChange={(e) => setUser({...user, email: e.target.value})}
              style={{ width: '100%' }}
            /> */}
          </motion.div>
          <button 
            type="submit" 
            className="flat-button primary"
            
            style={{ 
              pointerEvents: 'auto',
              position: 'relative',
              zIndex: 2,
              marginTop: '1.2rem'
            }}
          >
            {isLoading ? '注册中...' : '注册'}
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
            <span>已有账号？</span>
            <button 
              className="flat-link"
              onClick={handleloginClick}
              disabled={isLoading}
              style={{ 
                background: 'none',
                border: 'none',
                color: isLoading ? '#9e9e9e' : '#2196f3',
                cursor: 'pointer',
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
              返回登录
            </button>
          </div>
        </form>
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
    </motion.div>
  );
}