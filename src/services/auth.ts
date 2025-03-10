import request from '../utils/request';

export interface LoginParams {
  username: string;
  password: string;
}

export async function login(data: LoginParams) {
  try {
    const response = await request.post('/auth/login', data);
    
    if (response.data.status === 'success') {
      // 存储token到localStorage
      localStorage.setItem('access_token', response.headers.authorization || '');
      return {
        username: response.data.username,
        token: response.headers.authorization
      };
    }
    
    throw new Error(response.data.message || '登录失败');
  } catch (error) {
    if (error instanceof Error && 'response' in error && typeof error.response === 'object' && error.response !== null && 'data' in error.response) {
      const errorMessage = typeof error.response.data === 'string' ? error.response.data : '认证失败';
      throw new Error(errorMessage);
    }
    throw new Error('网络连接异常');
  }
}

export function logout() {
  localStorage.removeItem('access_token');
}