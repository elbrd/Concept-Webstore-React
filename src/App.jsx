import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import StartPage from "./pages/StartPage/StartPage";
import DetailPage from "./pages/DetailPage/DetailPage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import ThankyouPage from "./pages/ThankyouPage/ThankyouPage";
import OrdersPage from "./pages/OrdersPage/OrdersPage";
import { useEffect } from "react";
import { useProductStore } from "./stores/useProductStore";

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
      {
        path: "checkout",
        element: <CheckoutPage />,
      },
      {
        path: "thankyou/:ordernumber",
        element: <ThankyouPage />,
      },
      {
        path: "orders",
        element: <OrdersPage />,
      },
    ],
  },
]);

function App() {
  const fetchProducts = useProductStore((state) => state.fetchProducts);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return <RouterProvider router={router} />;
}

export default App;
