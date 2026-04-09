import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import StartPage from "./pages/StartPage";
import DetailPage from "./pages/DetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <StartPage />,
      },
      {
        path: "detail/:id",
        element: <DetailPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
