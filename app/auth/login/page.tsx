import React from 'react';
import LoginForm from '@/components/auth/LoginForm';

export const metadata = {
  title: 'Login | OrderUp',
  description: 'Login to your OrderUp account',
};

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <LoginForm />
    </div>
  );
};

export default LoginPage;