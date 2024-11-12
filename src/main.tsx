import { StrictMode, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { MasterLayout } from "./layouts/MasterLayout";
import { RootLayout } from "./layouts/RootLayout";
import { ProductsPage } from "./pages/products/ProductsPage";
import { RegisterPage } from "./pages/register/RegisterPage";
import { ProtectRoute } from "./ui/ProtectedRoute";
import { ProductPage } from "./pages/ProductPage";
import { OrderListPage } from "./pages/OrderListPage";
import { FavoritesPage } from "./pages/FavoritesPage";

const routers = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: (
          <ProtectRoute>
            <MasterLayout />
          </ProtectRoute>
        ),
        children: [
          {
            index: true,
            element: <ProductsPage />,
          },
          {
            path: "/product/:id",
            element: <ProductPage />,
          },
          {
            path: "/order-list",
            element: <OrderListPage />,
          },
          {
            path: "/favorites",
            element: <FavoritesPage />,
          },
        ],
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <Suspense
      fallback={
        <section className="fixed inset-0 grid h-screen w-full bg-white dark:bg-black">
          <div className="relative m-auto size-20">
            <div className="absolute top-1/2 h-2 w-full animate-[spin_3s_infinite_ease-in-out] rounded-full bg-sky-500/80 bg-blend-hue" />
            <div className="absolute top-1/2 h-2 w-full animate-[spin_3s_infinite_ease-in-out_-2.25s] rounded-full bg-rose-500/80 bg-blend-hue" />
            <div className="absolute top-1/2 h-2 w-full animate-[spin_3s_infinite_ease-in-out_-1.5s] rounded-full bg-amber-500/80 bg-blend-hue" />
            <div className="absolute top-1/2 h-2 w-full animate-[spin_3s_infinite_ease-in-out_-0.75s] rounded-full bg-lime-500/80 bg-blend-hue" />
          </div>
        </section>
      }
    >
      <RouterProvider router={routers} />
    </Suspense>
  </StrictMode>
);
