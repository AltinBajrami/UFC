
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  Events,
  About,
  HomeLayout,
  Landing,
  ResetPassword,
  Register,
  Login,
  Error,
  Users,
  FightsFinish,
  CreateFightFinish,
  UpdateFightFinish,
  VerifyEmail,
  ForgotPassword,
  UpdateUser,
  WeightClasses,
  CreateWeightClasses,
  UpdateWeightClasses,
  Fighters,
  UpdateFighter,
  CreateFighter,
  Refer,
  UpdateRefer,
  CreateRefer,
  Quotes,
  CreateQuote,
  UpdateQuote,
  Arena,
  CreateArena,
  UpdateArena
} from "./pages";
import CreateFight from "./pages/fights/CreateFight";
import UpdateFight from "./pages/fights/UpdateFight";
import Fights from "./pages/fights/Fights";
import Ranked from "./pages/ranked/Ranked";
import CreateRanked from "./pages/ranked/CreateRanked";
import UpdateRanked from "./pages/ranked/UpdateRanked";
import { action as RegisterAction } from "./pages/authPages/Register";
import { action as ForgotPasswordAction } from "./pages/authPages/ForgotPassword";
import { loader as UsersLoader } from "./pages/users/Users";
import { loader as WeightClassLoader } from "./pages/weightClasses/WeightClasses";
import { loader as UpdateWeightClassLoader } from "./pages/weightClasses/UpdateWeightClasses";
import { action as UpdateWeightClassAction } from "./pages/weightClasses/UpdateWeightClasses";
import { action as CreateWeightClassAction } from "./pages/weightClasses/CreateWeightClasses";

import { loader as ReferLoader } from './pages/refer/Refer'
import { loader as UpdateReferLoader } from './pages/refer/UpdateRefer'
import { action as UpdateReferAction } from './pages/refer/UpdateRefer'
import { action as CreateReferAction } from './pages/refer/CreateRefer'

import { loader as QuotesLoader } from './pages/quote/Quotes'
import { loader as UpdateQuoteLoader } from './pages/quote/UpdateQuote'
import { action as UpdateQuoteAction } from './pages/quote/UpdateQuote'
import { loader as CreateQuoteLoader } from './pages/quote/CreateQuote'
import { action as CreateQuoteAction } from './pages/quote/CreateQuote'

import { loader as ArenaLoader } from './pages/Arena/Arena'
import { loader as UpdateArenaLoader } from './pages/Arena/UpdateArena'
import { action as UpdateArenaAction } from './pages/Arena/UpdateArena'
import { action as CreateArenaAction } from './pages/Arena/CreateArena'


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "register",
        element: <Register />,
        action: RegisterAction,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "fightFinish",
        element: <FightsFinish />,
      },
      {
        path: "verify-email",
        element: <VerifyEmail />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
        action: ForgotPasswordAction,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
      {
        path: "users",
        element: <Users />,
        loader: UsersLoader(queryClient),
      },
      {
        path: "users/update/:id",
        element: <UpdateUser />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "events",
        element: <Events />,
      },
      {
        path: "fightFinish",
        element: <FightsFinish />,
      },
      {
        path: "fightFinish/create",
        element: <CreateFightFinish />,
      },
      {
        path: "fightFinish/update/:id",
        element: <UpdateFightFinish />,
      },
      {
        path: "weightClasses",
        element: <WeightClasses />,
        loader: WeightClassLoader(queryClient),
      },
      {
        path: "weightClasses/create",
        element: <CreateWeightClasses />,
        action: CreateWeightClassAction(queryClient),
      },
      {
        path: "weightClasses/update/:id",
        element: <UpdateWeightClasses />,
        loader: UpdateWeightClassLoader(queryClient),
        action: UpdateWeightClassAction(queryClient),
      },
      {
        path: "fighters",
        element: <Fighters />,
      },
      {
        path: "fighters/create",
        element: <CreateFighter />,
      },
      {
        path: "fighters/update/:id",
        element: <UpdateFighter />,
      },
      {
        path: "fights",
        element: <Fights />,
      },
      {
        path: "fights/create",
        element: <CreateFight />,
      },
      {
        path: "fights/update/:id",
        element: <UpdateFight />,
      },
      {
        path: "ranked",
        element: <Ranked />,
      },
      {
        path: "ranked/create",
        element: <CreateRanked />,
      },
      {
        path: "ranked/update/:id",
        element: <UpdateRanked />,
      },
      {
        path: 'fighters/create',
        element: <CreateFighter />,
      },
      {
        path: 'fighters/update/:id',
        element: <UpdateFighter />,
      },
      {
        path: 'refers',
        element: <Refer />,
        loader: ReferLoader(queryClient)
      },
      {
        path: 'refers/create',
        element: <CreateRefer />,
        action: CreateReferAction(queryClient)
      },
      {
        path: 'refers/update/:id',
        element: <UpdateRefer />,
        loader: UpdateReferLoader(queryClient),
        action: UpdateReferAction(queryClient)
      },
      {
        path: 'quotes',
        element: <Quotes />,
        loader: QuotesLoader(queryClient)
      },
      {
        path: 'quotes/create',
        element: <CreateQuote />,
        loader: CreateQuoteLoader(queryClient),
        action: CreateQuoteAction(queryClient)
      },
      {
        path: 'quotes/update/:id',
        element: <UpdateQuote />,
        loader: UpdateQuoteLoader(queryClient),
        action: UpdateQuoteAction(queryClient)
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
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />;
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;



