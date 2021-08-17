import React, { lazy, Suspense } from 'react';
import {
  Route,
  Redirect,
  BrowserRouter as Router,
  Switch,
  useLocation,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import ErrorBoundary from './ErrorBoundary';
import { PUBLIC_ROUTE } from './route.constants';
import Loader from '@iso/components/utility/loader';
import SignIn from '@iso/containers/Pages/SignIn/SignIn';
import useToken from './useToken';
const Dashboard = lazy(() => import('./containers/Dashboard/Dashboard'));

const publicRoutes = [
  {
    path: PUBLIC_ROUTE.LANDING,
    exact: true,
    component: lazy(() => import('@iso/containers/Pages/SignIn/SignIn')),
  },
  {
    path: PUBLIC_ROUTE.PAGE_404,
    component: lazy(() => import('@iso/containers/Pages/404/404')),
  },
  {
    path: PUBLIC_ROUTE.PAGE_500,
    component: lazy(() => import('@iso/containers/Pages/500/500')),
  },
  {
    path: PUBLIC_ROUTE.SIGN_IN,
    component: lazy(() => import('@iso/containers/Pages/SignIn/SignIn')),
  },
  {
    path: PUBLIC_ROUTE.SIGN_UP,
    component: lazy(() => import('@iso/containers/Pages/SignUp/SignUp')),
  },
  {
    path: PUBLIC_ROUTE.FORGET_PASSWORD,
    component: lazy(() =>
      import('@iso/containers/Pages/ForgotPassword/ForgotPassword')
    ),
  },
  {
    path: PUBLIC_ROUTE.RESET_PASSWORD,
    component: lazy(() =>
      import('@iso/containers/Pages/ResetPassword/ResetPassword')
    ),
  },
  {
    path: PUBLIC_ROUTE.AUTH0_CALLBACK,
    component: lazy(() =>
      import('@iso/containers/Authentication/Auth0/Auth0Callback')
    ),
  },
];

function PrivateRoute({ children, ...rest }) {
 
  let location = useLocation();
  const isLoggedIn = useSelector(state => state.Auth.idToken);
  const token = localStorage.getItem('token');

  //  if(isLoggedIn) return <Route {...rest}>{children}</Route>;
  
  
  // return <Redirect
  //     to={{
  //        pathname: '/signin',
  //       state: { from: location },
  //      }}
  //    />
   if (token) return <Route {...rest}>{children}</Route>;
   return (
    <SignIn/>
   );
}
export default function Routes() {
  
  
  
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loader />}>
        <Router>
          <Switch>
            {publicRoutes.map((route, index) => (
              <Route key={index} path={route.path} exact={route.exact}>
                <route.component />
              </Route>
            ))}
           
            <PrivateRoute path="/dashboard">
              <Dashboard />
            </PrivateRoute>
          </Switch>
        </Router>
      </Suspense>
    </ErrorBoundary>
  );
}
