import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { pathElementMappingsArray } from './pathElementMappingsArray'


const router = createBrowserRouter(pathElementMappingsArray);

function App() {
  return <RouterProvider router={router} />;
}

export default App;