import React, { useState } from 'react';
import { isSessionAuthorized, setSessionAuthorized } from '../../config/secretGate';
import SecretGate from './SecretGate';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [authorized, setAuthorized] = useState<boolean>(() => {
    return isSessionAuthorized();
  });

  const handleAuthenticated = () => {
    setSessionAuthorized();
    setAuthorized(true);
  };

  if (!authorized) {
    return <SecretGate onAuthenticated={handleAuthenticated} />;
  }

  return <>{children}</>;
}
