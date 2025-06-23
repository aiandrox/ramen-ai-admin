import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuthContext } from './context/AuthContext';
import { LoginPage } from './pages/auth/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { ShopsPage } from './pages/shops/ShopsPage';
import { MenusPage } from './pages/menus/MenusPage';
import { GenresPage } from './pages/master/GenresPage';
import { SoupsPage } from './pages/master/SoupsPage';
import { NoodlesPage } from './pages/master/NoodlesPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuthContext();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuthContext();

  return (
    <Routes>
      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />} 
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/shops"
        element={
          <ProtectedRoute>
            <ShopsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/menus"
        element={
          <ProtectedRoute>
            <MenusPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/master/genres"
        element={
          <ProtectedRoute>
            <GenresPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/master/soups"
        element={
          <ProtectedRoute>
            <SoupsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/master/noodles"
        element={
          <ProtectedRoute>
            <NoodlesPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="App">
            <AppRoutes />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
              }}
            />
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;