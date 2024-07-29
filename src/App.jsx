import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout, Home, Products } from './routes/routes';


const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<div>Loading Layout...</div>}>
        <Layout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>Loading Home...</div>}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: 'products',
        element: (
          <Suspense fallback={<div>Loading Products...</div>}>
            <Products />
          </Suspense>
        ),
      },
    ],
  },
]);

// Main App component
function App() {
  return <RouterProvider router={router} />;
}

export default App;
