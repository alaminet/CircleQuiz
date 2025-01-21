import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import LoggedInUser from "./router/LoggedInUser";
import Home from "./pages/Home";
import LoggedOutUser from "./router/LoggedOutUser";
import Login from "./pages/Login";
import Questions from "./pages/Questions";
import ExamFinished from "./pages/ExamFinished";
import BasicLayout from "./components/BasicLayout";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={<LoggedInUser />}>
          <Route path="/" element={<BasicLayout />}>
            <Route path="" element={<Home />}></Route>
            <Route path="/questions" element={<Questions />}></Route>
            <Route path="result" element={<ExamFinished />}></Route>
          </Route>
        </Route>
        <Route element={<LoggedOutUser />}>
          <Route path="/login" element={<Login />}></Route>
        </Route>
      </Route>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
export default App;
