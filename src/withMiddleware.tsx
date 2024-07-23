// src/components/withMiddleware.tsx
import React, { ComponentType, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Middleware = () => Promise<boolean>;

const withMiddleware = <P extends object>(
  WrappedComponent: ComponentType<P>,
  middleware: Middleware,
): ComponentType<P> => {
  const MiddlewareComponent = (props: P) => {
    const navigate = useNavigate();
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
      const executeMiddleware = async () => {
        const result = await middleware();
        setIsAuthorized(result);
        if (!result) {
          navigate('/login');
        }
      };

      executeMiddleware();
    }, [navigate]);

    if (isAuthorized === null) return <div>Loading...</div>;

    return <WrappedComponent {...props} />;
  };

  return MiddlewareComponent;
};

export default withMiddleware;
