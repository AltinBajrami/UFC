import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
  Events, About, HomeLayout, Landing, ResetPassword, Register, Login, Error, Users,
  FightsFinish, CreateFightFinish, UpdateFightFinish, VerifyEmail, ForgotPassword, UpdateUser,
  WeightClasses, CreateWeightClasses, UpdateWeightClasses, Fighters, UpdateFighter, CreateFighter
} from './pages'
import { action as RegisterAction } from './pages/authPages/Register';
import { action as ForgotPasswordAction } from './pages/authPages/ForgotPassword';
import { loader as UsersLoader } from './pages/users/Users'
import { loader as WeightClassLoader } from './pages/weightClasses/WeightClasses'
import { loader as UpdateWeightClassLoader } from './pages/weightClasses/UpdateWeightClasses'
import { action as UpdateWeightClassAction } from './pages/weightClasses/UpdateWeightClasses'
import { action as CreateWeightClassAction } from './pages/weightClasses/CreateWeightClasses'

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
        path: 'weightClasses',
        element: <WeightClasses />,
        loader: WeightClassLoader(queryClient)
      },
      {
        path: 'weightClasses/create',
        element: <CreateWeightClasses />,
        action: CreateWeightClassAction(queryClient)
      },
      {
        path: 'weightClasses/update/:id',
        element: <UpdateWeightClasses />,
        loader: UpdateWeightClassLoader(queryClient),
        action: UpdateWeightClassAction(queryClient)
      },
      {
        path: 'fighters',
        element: <Fighters />,
      },
      {
        path: 'fighters/create',
        element: <CreateFighter />,
      },
      {
        path: 'fighters/update/:id',
        element: <UpdateFighter />,
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
