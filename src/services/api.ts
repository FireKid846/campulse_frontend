import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add the auth token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 errors (unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token and redirect to login if token is invalid/expired
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Mock API for Demo/MVP purposes
// This interceptor simulates a backend by returning mock data
api.interceptors.request.use(async (config) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const { url, method, data } = config;

  // Mock Auth Endpoints
  if (url === '/auth/login' && method === 'post') {
    return Promise.resolve({
      data: {
        access_token: 'mock-jwt-token-12345',
        user: {
          id: 1,
          full_name: 'Test Student',
          email: data.username,
          school: 'UNILAG',
          department: 'Computer Science',
          level: 300
        }
      },
      status: 200,
      statusText: 'OK',
      headers: {},
      config,
    } as any);
  }

  if (url === '/auth/signup' && method === 'post') {
    return Promise.resolve({
      data: { message: 'User created successfully' },
      status: 201,
      statusText: 'Created',
      headers: {},
      config,
    } as any);
  }

  if (url === '/auth/me' && method === 'get') {
    return Promise.resolve({
      data: {
        id: 1,
        full_name: 'Test Student',
        email: 'student@university.edu.ng',
        school: 'UNILAG',
        department: 'Computer Science',
        level: 300
      },
      status: 200,
      statusText: 'OK',
      headers: {},
      config,
    } as any);
  }

  // Mock Data Endpoints
  if (url === '/tasks' && method === 'get') {
    return Promise.resolve({
      data: [], // Return empty list or mock tasks
      status: 200,
      statusText: 'OK',
      headers: {},
      config,
    } as any);
  }

  if (url === '/opportunities' && method === 'get') {
    return Promise.resolve({
      data: [],
      status: 200,
      statusText: 'OK',
      headers: {},
      config,
    } as any);
  }

  if (url === '/tutors' && method === 'get') {
    return Promise.resolve({
      data: [],
      status: 200,
      statusText: 'OK',
      headers: {},
      config,
    } as any);
  }

  // Pass through other requests (which will likely fail if no backend)
  return config;
});

export default api;
