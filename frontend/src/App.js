import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import ErrorPage from "./pages/ErrorPage";
import Signin from "./pages/Signin/Signin";
import { useSelector } from "react-redux";
import Review from "./pages/Review/Review";

function App() {
  // the current user
  const user = useSelector((state) => state.user);

  const router = createBrowserRouter([
    {
      path: "/",
      // if already logged in show home page, else the signup page
      element: user ? <Home /> : <Signin />,
      errorElement: <ErrorPage />,
    },
    {
      path: "review/:reviewid",
      element: user ? <Review /> : <Signin />,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
