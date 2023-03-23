import "tailwindcss/tailwind.css";
import { createBrowserRouter } from "react-router-dom";

import { DemoPage } from "~/features/demo";
import { RootLayout } from "~/components/layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <DemoPage />,
      },
    ],
  },
]);
