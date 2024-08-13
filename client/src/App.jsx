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
  Athletes,
  Profile,
  Refer,
  UpdateRefer,
  CreateRefer,
  Quotes,
  CreateQuote,
  UpdateQuote,
  Arena,
  CreateArena, UpdateArena,
  OctagonTickets,
  Success, Cancel, Orders,
  MiniEvent, CreateMiniEvent, UpdateMiniEvent,
  CreateEvent,
  ManageEvents,
  UpdateEvent,
  SingleEventPage,
  AthleteProfile,
  SeatingLayout,
  CreateSeatingLayout,
  UpdateSeatingLayout,
} from "./pages";
import Rankings from "./pages/Rankings";
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
import { loader as ProfileLoader } from "./pages/users/Profile";

import { loader as ReferLoader } from "./pages/refer/Refer";
import { loader as UpdateReferLoader } from "./pages/refer/UpdateRefer";
import { action as UpdateReferAction } from "./pages/refer/UpdateRefer";
import { action as CreateReferAction } from "./pages/refer/CreateRefer";

import { loader as QuotesLoader } from "./pages/quote/Quotes";
import { loader as UpdateQuoteLoader } from "./pages/quote/UpdateQuote";
import { action as UpdateQuoteAction } from "./pages/quote/UpdateQuote";
import { loader as CreateQuoteLoader } from "./pages/quote/CreateQuote";
import { action as CreateQuoteAction } from "./pages/quote/CreateQuote";

import { loader as ArenaLoader } from "./pages/Arena/Arena";
import { loader as UpdateArenaLoader } from "./pages/Arena/UpdateArena";
import { action as UpdateArenaAction } from "./pages/Arena/UpdateArena";
import { action as CreateArenaAction } from "./pages/Arena/CreateArena";

import { loader as octagonLoader } from './pages/OctagonTickets'
import { loader as ordersLoader } from './pages/tickets/Orders'

import { loader as MiniEventLoader } from './pages/miniEvent/MiniEvent'
import { loader as UpdateMiniEventLoader } from './pages/miniEvent/UpdateMiniEvent'
import { action as UpdateMiniEventAction } from './pages/miniEvent/UpdateMiniEvent'
import { action as CreateMiniEventAction } from './pages/miniEvent/CreateMiniEvent'

import { action as CreateEventAction } from './pages/events/CreateEvent'
import { loader as CreateEventLoader } from './pages/events/CreateEvent'
import { action as UpdateEventAction } from './pages/events/UpdateEvent'
import { loader as UpdateEventLoader } from './pages/events/UpdateEvent'
import { loader as ManageEventLoader } from './pages/events/ManageEvents'

import { action as CreateFightAction } from './pages/fights/CreateFight'
import { loader as CreateFightLoader } from './pages/fights/CreateFight'
import { action as UpdateFightAction } from './pages/fights/UpdateFight'
import { loader as UpdateFightLoader } from './pages/fights/UpdateFight'
import { loader as FightsLoader } from './pages/fights/Fights'

import { loader as EventsLoader } from './pages/Events';
import { loader as SingleEventLoader } from './pages/events/SingleEventPage';
import { loader as AthleteProfileLoader } from './pages/AthleteProfile';

import { loader as LandingLoader } from './pages/Landing';


import { loader as SeatingLayoutLoader } from "./pages/seatingLayout/SeatingLayout";
import { loader as UpdateSeatingLayoutLoader } from "./pages/seatingLayout/UpdateSeatingLayout";
import { action as UpdateSeatingLayoutAction } from "./pages/seatingLayout/UpdateSeatingLayout";
import { action as CreateSeatingLayoutAction } from "./pages/seatingLayout/CreateSeatingLayout";

import { action as createFightFinishAction } from "./pages/fightFinish/CreateFightFinish";
import { loader as fightFinishLoader } from "./pages/fightFinish/FightsFinish";
import { action as updateFightFinishAction } from "./pages/fightFinish/UpdateFightFinish";
import { loader as updateFightFinishLoader } from "./pages/fightFinish/UpdateFightFinish";

import { loader as fightersLoader } from "./pages/fighters/Fighters";
import { action as createFighterAction } from "./pages/fighters/CreateFighter";
import { loader as updateFighterLoader } from "./pages/fighters/UpdateFighter";
import { action as updateFighterAction } from "./pages/fighters/UpdateFighter";

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
        loader: LandingLoader(queryClient),
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
        path: "about",
        element: <About />,
      },
      {
        path: "events",
        element: <Events />,
        loader: EventsLoader(queryClient)
      },
      {
        path: "fightFinish",
        element: <FightsFinish />,
        loader: fightFinishLoader(queryClient),
      },
      {
        path: "fightFinish/create",
        element: <CreateFightFinish />,
        action: createFightFinishAction(queryClient)
      },
      {
        path: "fightFinish/update/:id",
        element: <UpdateFightFinish />,
        loader: updateFightFinishLoader(queryClient),
        action: updateFightFinishAction(queryClient),
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
        loader: fightersLoader(queryClient)
      },
      {
        path: "fighters/create",
        element: <CreateFighter />,
        action: createFighterAction(queryClient)
      },
      {
        path: "fighters/update/:id",
        element: <UpdateFighter />,
        loader: updateFighterLoader(queryClient),
        action: updateFighterAction(queryClient)
      },
      {
        path: "fights",
        element: <Fights />,
        loader: FightsLoader(queryClient)
      },
      {
        path: "fights/create",
        element: <CreateFight />,
        loader: CreateFightLoader(queryClient),
        action: CreateFightAction(queryClient)
      },
      {
        path: "fights/update/:id",
        element: <UpdateFight />,
        loader: UpdateFightLoader(queryClient),
        action: UpdateFightAction(queryClient)
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
        path: "rankings",
        element: <Rankings />,
      },
      {
        path: "athletes",
        element: <Athletes />,
      },
      {
        path: "profile",
        element: <Profile />,
        loader: ProfileLoader(queryClient),
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
        path: "refers",
        element: <Refer />,
        loader: ReferLoader(queryClient),
      },
      {
        path: "refers/create",
        element: <CreateRefer />,
        action: CreateReferAction(queryClient),
      },
      {
        path: "refers/update/:id",
        element: <UpdateRefer />,
        loader: UpdateReferLoader(queryClient),
        action: UpdateReferAction(queryClient),
      },
      {
        path: "quotes",
        element: <Quotes />,
        loader: QuotesLoader(queryClient),
      },
      {
        path: "quotes/create",
        element: <CreateQuote />,
        loader: CreateQuoteLoader(queryClient),
        action: CreateQuoteAction(queryClient),
      },
      {
        path: "quotes/update/:id",
        element: <UpdateQuote />,
        loader: UpdateQuoteLoader(queryClient),
        action: UpdateQuoteAction(queryClient),
      },
      {
        path: "arena",
        element: <Arena />,
        loader: ArenaLoader(queryClient),
      },
      {
        path: "arena/create",
        element: <CreateArena />,
        action: CreateArenaAction(queryClient),
      },
      {
        path: "arena/update/:id",
        element: <UpdateArena />,
        loader: UpdateArenaLoader(queryClient),
        action: UpdateArenaAction(queryClient),
      },
      {
        path: '/events/tickets/:eventId',
        element: <OctagonTickets />,
        loader: octagonLoader(queryClient)
      },
      {
        path: '/tickets/success',
        element: <Success />,
      },
      {
        path: '/tickets/cancel',
        element: <Cancel />,
      },
      {
        path: '/my-orders',
        element: <Orders />,
        loader: ordersLoader(queryClient),
      },
      {
        path: 'mini-event',
        element: <MiniEvent />,
        loader: MiniEventLoader(queryClient)
      },
      {
        path: 'mini-event/create',
        element: <CreateMiniEvent />,
        action: CreateMiniEventAction(queryClient)
      },
      {
        path: 'mini-event/update/:id',
        element: <UpdateMiniEvent />,
        action: UpdateMiniEventAction(queryClient),
        loader: UpdateMiniEventLoader(queryClient)
      },
      {
        path: 'seating-layout',
        element: <SeatingLayout />,
        loader: SeatingLayoutLoader(queryClient)
      },
      {
        path: 'seating-layout/create',
        element: <CreateSeatingLayout />,
        action: CreateSeatingLayoutAction(queryClient)
      },
      {
        path: "seating-layout/update/:id",
        element: <UpdateSeatingLayout />,
        loader: UpdateSeatingLayoutLoader(queryClient),
        action: UpdateSeatingLayoutAction(queryClient),
      },
      {
        path: 'events/create',
        element: <CreateEvent />,
        action: CreateEventAction(queryClient),
        loader: CreateEventLoader(queryClient)
      },
      {
        path: 'events/manage',
        element: <ManageEvents />,
        loader: ManageEventLoader(queryClient)
      },
      {
        path: 'events/update/:id',
        element: <UpdateEvent />,
        action: UpdateEventAction(queryClient),
        loader: UpdateEventLoader(queryClient)
      },
      {
        path: 'events/:id',
        element: <SingleEventPage />,
        loader: SingleEventLoader(queryClient)
      },
      {
        path: 'fighter/:id',
        element: <AthleteProfile />,
        loader: AthleteProfileLoader(queryClient)
      }
    ]
  }])

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
