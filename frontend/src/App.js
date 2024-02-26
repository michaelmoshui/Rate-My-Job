import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import ErrorPage from "./pages/ErrorPage";
import Signin from "./pages/Signin/Signin";
import { useState } from "react";

function App() {
  // the current user
  const [user, setUser] = useState(true);

  const router = createBrowserRouter([
    {
      path: "/",
      // if already logged in show home page, else the signup page
      element: user ? <Home /> : <Signin />,
      errorElement: <ErrorPage />,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
