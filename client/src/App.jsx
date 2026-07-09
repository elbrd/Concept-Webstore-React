import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import StartPage from "./pages/StartPage/StartPage";
import DetailPage from "./pages/DetailPage/DetailPage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import ThankyouPage from "./pages/ThankyouPage/ThankyouPage";
import OrdersPage from "./pages/OrdersPage/OrdersPage";
import { useEffect } from "react";
import { useProductStore } from "./stores/useProductStore";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import { useCartStore } from "./stores/useCartStore";
import { useAuthStore } from "./stores/useAuthStore";
import { useOrdersStore } from "./stores/useOrdersStore";

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
        path: "thankyou/:orderId",
        element: <ThankyouPage />,
      },
      {
        path: "orders",
        element: <OrdersPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
]);

function App() {
  // Fetch all products from backend
  const fetchProducts = useProductStore((state) => state.fetchProducts);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Fetch logged in user cart and orders
  const token = useAuthStore((state) => state.token);
  // const orders = useOrdersStore((state) => state.orders);
  const fetchCart = useCartStore((state) => state.fetchCart);
  const fetchOrders = useOrdersStore((state) => state.fetchOrders);

  useEffect(() => {
    fetchCart();
    fetchOrders();
  }, [token, fetchCart, fetchOrders]);

  return <RouterProvider router={router} />;
}

export default App;
