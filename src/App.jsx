import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import MyTasks from "./pages/MyTasks";
import Completed from "./pages/Completed"
import DueSoon from "./pages/DueSoon";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";
import { TaskProvider } from "./context/TaskContext";

function App() {
  return (
    <TaskProvider>
      <BrowserRouter>
        <Routes>

          {/* Dashboard Layout (Parent Route) */}
          <Route path="/" element={<Dashboard />}>

            {/* Default page when visiting "/" */}
            <Route index element={<MyTasks />} />

            {/* Nested pages */}
            <Route path="tasks" element={<MyTasks />} />
            <Route path="completed" element={<Completed />} />
            <Route path="due-soon" element={<DueSoon />} />
            <Route path="add" element={<AddTask />} />
            <Route path="edit/:id" element={<EditTask />} />
            

          </Route>
        </Routes>
      </BrowserRouter>
    </TaskProvider>
  );
}

export default App;
