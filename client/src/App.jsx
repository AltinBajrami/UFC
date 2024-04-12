import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
  Events, About, HomeLayout, Landing, ResetPassword, Register, Login, Error, Users,
  FightsFinish, CreateFightFinish, UpdateFightFinish, VerifyEmail, ForgotPassword, UpdateUser,
  Arena, CreateArena, UpdateArena
} from './pages'
import { action as RegisterAction } from './pages/authPages/Register';
import { action as ForgotPasswordAction } from './pages/authPages/ForgotPassword';
import { action as CreateArenaAction } from './pages/Arena/CreateArena';
import { action as UpdateArenaAction } from './pages/Arena/UpdateArena';

import { loader as UsersLoader } from './pages/users/Users'
import { loader as ArenaLoader } from './pages/Arena/Arena'
import { loader as UpdateArenaLoader } from './pages/Arena/UpdateArena'

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
        path: 'register',
        element: <Register />,
        action: RegisterAction
      },
      {
        path: 'login',
        element: <Login />,
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
        element: <Register />
      },
      {
        path: 'verify-email',
        element: <VerifyEmail />
      },
      {
        path: 'forgot-password',
        element: <ForgotPassword />,
        action: ForgotPasswordAction
      },
      {
        path: 'reset-password',
        element: <ResetPassword />,
      },
      {
        path: 'users',
        element: <Users />,
        loader: UsersLoader(queryClient)
      },
      {
        path: 'users/update/:id',
        element: <UpdateUser />,
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
      {
        path: 'arena',
        element: <Arena />,
        loader: ArenaLoader(queryClient)
      },
      {
        path: 'arena/create',
        element: <CreateArena />,
        action: CreateArenaAction(queryClient)
      },
      {
        path: 'arena/update/:id',
        element: <UpdateArena />,
        loader: UpdateArenaLoader(queryClient),
        action: UpdateArenaAction(queryClient),
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
