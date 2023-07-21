import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { PublishScreen } from "./screens/PublishScreen";
import MyEditor from "./screens/EditScreen/editor";
import { DraftScreen } from "./screens/DraftScreen";
import { SignUp } from "./screens/Account/SignUp";
import { Otp } from "./screens/Account/SignUp/Otp";
import { Login } from "./screens/Account/LogIn";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/edit/:draftId?",
        element: <MyEditor />,
      },
      {
        path: "/publish/:postId",
        element: <PublishScreen />,
      },
      {
        path: "/drafts",
        element: <DraftScreen />,
      },
    ],
  },
  {
    path: "/accounts/signup",
    element: <SignUp />,
  },
  {
    path: "/accounts/:userMail/verify",
    element: <Otp />,
  },
  {
    path: "/accounts/login",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
