import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import AuthPage from '@/components/auth/AuthPage';
import Dashboard from './Dashboard';
import Layout from '@/components/layout/Layout';

const Index: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  return (
    <Layout>
      <Dashboard />
    </Layout>
  );
};

export default Index;
