import { Provider } from "react-redux";
import { store } from "./store/store";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  return (
    <Provider store={store}>
      <div className="container">
        <h1 style={{ fontSize: "2rem", fontWeight: "bold", textAlign: "center", marginBottom: "2rem" }}>
          Task Manager
        </h1>
        <TaskForm />
        <TaskList />
      </div>
    </Provider>
  );
}

export default App;
