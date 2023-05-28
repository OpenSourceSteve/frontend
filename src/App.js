import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { pathElementMappingsArray } from "./app/pathElementMappingsArray";


const router = createBrowserRouter(pathElementMappingsArray);

function App() {
  return <RouterProvider router={router} />;
}

export default App;