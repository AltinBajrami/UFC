
import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Events, About, HomeLayout, Landing, Register, Login, Error, FightsFinish, CreateFightFinish, UpdateFightFinish, VerifyEmail } from './pages'
import { action as RegisterAction } from './pages/Register';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5
    }
  }
})

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />
      },
      {
        path: 'fightFinish',
        element: <FightsFinish />
      },
      {
        path: 'fightFinish/create',
        element: <CreateFightFinish />
      },
      {
        path: 'fightFinish/update/:id',
        element: <UpdateFightFinish />
      },
      {
        path: 'register',
        element: <Register />,
        action: RegisterAction
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'verify-email',
        element: <VerifyEmail />
      },
      {
        path: 'about',
        element: <About />
      },
      {
        path: 'events',
        element: <Events />
      },
      {
        path: 'fightFinish',
        element: <FightsFinish />
      },
      {
        path: 'fightFinish/create',
        element: <CreateFightFinish />
      },
      {
        path: 'fightFinish/update/:id',
        element: <UpdateFightFinish />
      },
    ]
  }
])

function App() {
  return <>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />;
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </>
}

export default App
