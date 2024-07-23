// src/middleware/authMiddleware.ts
type User = {
  isAuthenticated: boolean;
};

const fetchUser = async (): Promise<User> => {
  // Simulasikan panggilan API atau penyimpanan lokal
  return {
    isAuthenticated: !!localStorage.getItem('authToken'),
  };
};

const authMiddleware = async (): Promise<boolean> => {
  const user = await fetchUser();
  return user.isAuthenticated;
};

export { authMiddleware };
