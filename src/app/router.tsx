import { MainLayout } from '@/components/layout/main-layout';
import { ForgotPasswordPage } from '@/pages/auth/forgot-password';
import { LoginPage } from '@/pages/auth/login';
import { RegisterPage } from '@/pages/auth/register';
import { UpdatePasswordPage } from '@/pages/auth/update-password';
import { DashboardPage } from '@/pages/dashboard';
import { Authenticated, ErrorComponent } from '@refinedev/core';
import { CatchAllNavigate, NavigateToResource, } from '@refinedev/react-router-v6';
import { Outlet, Route, Routes } from 'react-router-dom';

import { BankAccountsCreate, BankAccountsEdit, BankAccountsList, BankAccountsShow } from '@/pages/bank-accounts';


export const AppRouter = () => (
  <Routes>
    <Route
      element={
        <Authenticated
          key="authenticated-routes"
          fallback={
            <CatchAllNavigate to="/login" />
          }
        >
          <MainLayout />
        </Authenticated>
      }
    >
      <Route index element={<DashboardPage />} />

      <Route path="/bank-accounts">
        <Route index path="/bank-accounts/list" element={<BankAccountsList />} />
        <Route path="create" element={<BankAccountsCreate />} />
        <Route path="edit/:id" element={<BankAccountsEdit />} />
        <Route path="show/:id" element={<BankAccountsShow />} />
      </Route>

    </Route >

    <Route element={<Authenticated key="auth-pages" fallback={<Outlet />} ><NavigateToResource resource="dashboard" /></Authenticated>}>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/update-password" element={<UpdatePasswordPage />} />
    </Route>

    <Route element={<Authenticated key="catch-all" ><MainLayout /></Authenticated>}>
      <Route path="*" element={<ErrorComponent />} />
    </Route>
  </Routes >

);

export default AppRouter;
