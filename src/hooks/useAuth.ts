import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
}

export default useAuth;
