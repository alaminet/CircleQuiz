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
import AddTopic from "./pages/AddTopic";
import AddExam from "./pages/AddExam";
import TopicsHome from "./pages/TopicsHome";
import Bookmarks from "./pages/Bookmarks";
import AddQA from "./pages/AddQA";
import ViewQA from "./pages/ViewQA";
import Exam from "./pages/Exam";
import AddCategory from "./pages/AddCategory";
import AddTag from "./pages/AddTag";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={<LoggedInUser />}>
          <Route path="/" element={<BasicLayout />}>
            <Route path="*" element={<Home />}></Route>
            <Route path="" element={<Home />}></Route>
            <Route path="addcategory" element={<AddCategory />}></Route>
            <Route path="addtopics" element={<AddTopic />}></Route>
            <Route path="addtag" element={<AddTag />}></Route>
            <Route path="addexam" element={<AddExam />}></Route>
            <Route path="addqa" element={<AddQA />}></Route>
            <Route path="viewqa" element={<ViewQA />}></Route>
            <Route path="subjects" element={<TopicsHome />}></Route>
            <Route path="bookmarks" element={<Bookmarks />}></Route>
            <Route path="exam" element={<Exam />}></Route>
            <Route path="questions" element={<Questions />}></Route>
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
