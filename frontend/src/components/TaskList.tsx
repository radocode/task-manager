import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  setTasks,
  deleteTask,
  updateTask,
  setError,
  setLoading,
} from "../store/taskSlice";
import { taskService } from "../services/taskService";
import TaskItem from "./TaskItem";
import Spinner from "./Spinner";

const TaskList: React.FC = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector(
    (state: RootState) => state.tasks
  );
  const [loadingTasks, setLoadingTasks] = useState<Set<string>>(new Set());

  const fetchTasks = useCallback(async () => {
    dispatch(setLoading(true));
    try {
      const data = await taskService.getAll();
      dispatch(setTasks(data));
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error fetching tasks:", err.message);
        dispatch(setError(err.message));
      }
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    fetchTasks();
  }, [dispatch, fetchTasks]);

  const handleDelete = async (id: string) => {
    setLoadingTasks((prev) => new Set(prev).add(id));
    try {
      await taskService.delete(id);
      dispatch(deleteTask(id));
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error deleting task:", err.message);
        dispatch(setError(err.message));
      }
    } finally {
      setLoadingTasks((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  const handleStatusChange = async (
    id: string,
    status: "pending" | "completed"
  ) => {
    setLoadingTasks((prev) => new Set(prev).add(id));
    try {
      const updatedTask = await taskService.update(id, { status });
      dispatch(updateTask(updatedTask));
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error updating task:", err.message);
        dispatch(setError(err.message));
      }
    } finally {
      setLoadingTasks((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  const handleEdit = async (id: string, title: string, description: string) => {
    setLoadingTasks((prev) => new Set(prev).add(id));
    try {
      await taskService.update(id, { title, description });
      await fetchTasks();
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error updating task:", err.message);
        dispatch(setError(err.message));
      }
    } finally {
      setLoadingTasks((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "1rem", color: "#dc3545" }}>
        {error}
      </div>
    );
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
          isLoading={loadingTasks.has(task.id)}
        />
      ))}
    </div>
  );
};

export default TaskList;
