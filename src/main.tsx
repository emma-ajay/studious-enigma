import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { PublishScreen } from "./screens/PublishScreen";
import MyEditor from "./screens/EditScreen/editor";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/edit",
        element: <MyEditor />,
      },
      {
        path: "/publish/:postId",
        element: <PublishScreen />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
