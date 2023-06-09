import {
  // Accessibility,
  CaseDetails,
  CasesList,
  ClientDetails,
  ClientsList,
  Docket,
  // FinancesDetail,
  // FinancesList,
  Finances,
  Login,
  Logout,
  Profile,
  Home,
  Settings,
  Signup,
  // Terms
} from "../features"

export const pathElementMappingsArray = [
  // {
  //   path: "/a11y",
  //   element: <A11y />
  // },
  {
    path: "/cases",
    element: <CasesList />
  },
  {
    path: "/cases/:caseId",
    element: <CaseDetails />,
  },
  {
    path: "/clients",
    element: <ClientsList />
  },
  {
    path: "/clients/:clientId",
    element: <ClientDetails />
  },
  {
    path: "/docket",
    element: <Docket />
  },
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