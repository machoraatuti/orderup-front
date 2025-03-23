import React from 'react';
import SignupForm from '@/components/auth/SignupForm';

export const metadata = {
  title: 'Sign Up | OrderUp',
  description: 'Create your OrderUp account',
};

const SignupPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <SignupForm />
    </div>
  );
};

export default SignupPage;