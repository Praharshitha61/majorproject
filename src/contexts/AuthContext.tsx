
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'sonner';
import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

interface User {
  _id: string;
  email: string;
  role: 'customer' | 'employee';
  name?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, role: 'customer' | 'employee', name?: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('bankAuthToken');
        if (token) {
          const response = await axios.get(`${API_URL}/auth/profile`, {
            headers: {
              'x-auth-token': token
            }
          });
          
          if (response.data.user) {
            setUser(response.data.user);
          }
        }
      } catch (error) {
        console.error('Failed to load stored user:', error);
        localStorage.removeItem('bankAuthToken');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password
      });
      
      const { token, user } = response.data;
      
      setUser(user);
      localStorage.setItem('bankAuthToken', token);
      toast('Login successful');
    } catch (error) {
      console.error('Login failed:', error);
      toast('Login failed. Please check your credentials.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, role: 'customer' | 'employee', name?: string) => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${API_URL}/auth/register`, {
        email,
        password,
        role,
        name
      });
      
      const { token, user } = response.data;
      
      setUser(user);
      localStorage.setItem('bankAuthToken', token);
      toast('Registration successful');
    } catch (error) {
      console.error('Registration failed:', error);
      toast('Registration failed. Please try again.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('bankAuthToken');
    toast('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
