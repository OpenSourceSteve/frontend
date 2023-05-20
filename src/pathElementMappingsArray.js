import {
  // CaseDetails,
  CasesList,
  // ChargeDetail,
  // ChargesList,
  // ClientDetails,
  ClientsList,
  Docket,
  // TODO: Remove Events, Notes, Tasks routes
  // EventDetail,
  // EventsList,
  // FinancesDetail,
  // FinancesList,
  Finances,
  Login,
  Logout,
  // NoteDetail,
  // NotesList,
  Profile,
  Home,
  Settings,
  Signup,
  // TaskDetail,
  // TasksList,
  // Terms
} from "./features"

export const pathElementMappingsArray = [
  {
    path: "/cases",
    element: <CasesList />
  },
  // {
  //   path: "/cases/:caseId",
  //   element: <CaseDetails />,
    // children: [
    //   {
    //     path: "#charges",
    //     element: <ChargesList />
    //   },
    //   {
    //     path: "#charges/:chargeId",
    //     element: <ChargeDetail />
    //   },
    //   {
    //     path: "#events",
    //     element: <EventsList />
    //   },
    //   {
    //     path: "#events/:eventId",
    //     element: <EventDetail />
    //   },
    //   {
    //     path: "#notes",
    //     element: <NotesList />
    //   },
    //   // NOTE: I don't think NoteDetail is a thing. Just add a text area.
    //   {
    //     path: "#notes/:noteId",
    //     element: <NoteDetail />
    //   },
    //   {
    //     path: "#tasks",
    //     element: <TasksList />
    //   },
    //   {
    //     path: "#tasks/:taskId",
    //     element: <TaskDetail />
    //   }
    // ]
  // },
  {
    path: "/clients",
    element: <ClientsList />
  },
  // {
  //   path: "/clients/:clientId",
  //   element: <ClientDetails />
  // },
  {
    path: "/docket",
    element: <Docket />
  },
  // TODO: Remove events, notes and tasks page.  Replace with docket
  // {
  //   path: "/finances",
  //   element: <FinancesList />
  // },
  {
    path: "/finances",
    element: <Finances />
  },
  // {
  //   path: "/finances/:accountId",
  //   element: <FinancesDetail />
  // },
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/logout",
    element: <Logout />
  },
  {
    path: "/profile",
    element: <Profile />
  },
  {
    path: "/settings",
    element: <Settings />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  // {
  //   path: "/terms",
  //   element: <Terms />
  // }
]