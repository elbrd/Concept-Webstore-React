import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import StartPage from "./pages/StartPage/StartPage";
import DetailPage from "./pages/DetailPage/DetailPage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import ThankyouPage from "./pages/ThankyouPage/ThankyouPage";
import OrdersPage from "./pages/OrdersPage/OrdersPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import { useEffect } from "react";
import { useProductStore } from "./stores/useProductStore";
import { useCartStore } from "./stores/useCartStore";
import { useAuthStore } from "./stores/useAuthStore";
import { useOrdersStore } from "./stores/useOrdersStore";
import ProtectedRoute from "./components/ProtectedRoute";

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
        element: (
          <ProtectedRoute>
            <OrdersPage />
          </ProtectedRoute>
        ),
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

  // Fetch user cart, and if logged in orders
  const token = useAuthStore((state) => state.token);
  const loggedInUser = !!sessionStorage.getItem("token");
  const fetchCart = useCartStore((state) => state.fetchCart);
  const fetchOrders = useOrdersStore((state) => state.fetchOrders);

  useEffect(() => {
    fetchCart();
    if (loggedInUser) fetchOrders();
  }, [token, fetchCart, fetchOrders]);

  return <RouterProvider router={router} />;
}

export default App;
