import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';

import ECommerce from './pages/Dashboard/ECommerce';
import FormLayout from './pages/Form/FormLayout';


import Tables from './pages/Tables';

import DefaultLayout from './layout/DefaultLayout';
import withMiddleware from './withMiddleware';
import { authMiddleware } from './authMiddleware';
import DriverDetail from './pages/Detail_driver';

const ProtectedECommerce = withMiddleware(ECommerce, authMiddleware);
const ProtectedFormLayout = withMiddleware(FormLayout, authMiddleware);
const ProtectedTables = withMiddleware(Tables, authMiddleware);

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ProtectedECommerce />
            </>
          }
        />
        <Route path="/tables/driver/:id" element={<DriverDetail />} />
        <Route
          path="/dashboard"
          element={
            <>
              <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ProtectedECommerce />
            </>
          }
        />
        <Route
          path="/calendar"
          element={
            <>
              <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <div>Calendar Page</div>{' '}
              {/* Tambahkan konten untuk halaman Calendar */}
            </>
          }
        />

        <Route
          path="/input-driver"
          element={
            <>
              <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ProtectedFormLayout />
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ProtectedTables />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignIn />
            </>
          }
        />
      </Routes>
    </DefaultLayout>
  );
}

export default App;
