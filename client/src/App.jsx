
import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Events, About, HomeLayout, Landing, Register, Login, Error } from './pages'

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
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
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
    <RouterProvider router={router} />
  </>
}

export default App
