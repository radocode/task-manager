import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setTasks, deleteTask, updateTask, setError } from "../store/taskSlice";
import { taskService } from "../services/taskService";
import TaskItem from "./TaskItem";

const TaskList: React.FC = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state: RootState) => state.tasks);

  const fetchTasks = useCallback(async () => {
    try {
      const data = await taskService.getAll();
      dispatch(setTasks(data));
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error fetching tasks:", err.message);
        dispatch(setError(err.message));
      }
    }
  }, [dispatch]);

  useEffect(() => {
    fetchTasks();
  }, [dispatch, fetchTasks]);

  const handleDelete = async (id: string) => {
    try {
      await taskService.delete(id);
      dispatch(deleteTask(id));
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error deleting task:", err.message);
        dispatch(setError(err.message));
      }
    }
  };

  const handleStatusChange = async (id: string, status: "pending" | "completed") => {
    try {
      const updatedTask = await taskService.update(id, { status });
      dispatch(updateTask(updatedTask));
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error updating task:", err.message);
        dispatch(setError(err.message));
      }
    }
  };

  const handleEdit = async (id: string, title: string, description: string) => {
    try {
      await taskService.update(id, { title, description });
      // Refresh the entire task list after editing
      await fetchTasks();
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error updating task:", err.message);
        dispatch(setError(err.message));
      }
    }
  };

  if (loading) {
    return <div style={{ textAlign: "center", padding: "1rem" }}>Loading...</div>;
  }

  if (error) {
    return <div style={{ textAlign: "center", padding: "1rem", color: "#dc3545" }}>{error}</div>;
  }

  return (
    <div className="list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
          onEdit={handleEdit}
        />
      ))}
    </div>
  );
};

export default TaskList;
