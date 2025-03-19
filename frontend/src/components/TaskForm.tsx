import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../store/taskSlice";
import { taskService } from "../services/taskService";
import Spinner from "./Spinner";

const TaskForm: React.FC = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsLoading(true);
    try {
      const newTask = await taskService.create({
        title: title.trim(),
        description: description.trim(),
        status: "pending",
      });
      dispatch(addTask(newTask));
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error("Error creating task:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1.5rem" }}>
      <div className="form-group">
        <label
          htmlFor="title"
          style={{
            display: "block",
            marginBottom: "0.5rem",
            fontWeight: "500",
          }}
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-control"
          required
          disabled={isLoading}
        />
      </div>
      <div className="form-group">
        <label
          htmlFor="description"
          style={{
            display: "block",
            marginBottom: "0.5rem",
            fontWeight: "500",
          }}
        >
          Description (optional)
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-control"
          rows={3}
          disabled={isLoading}
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        style={{ width: "100%", position: "relative", minHeight: "38px" }}
        disabled={isLoading}
      >
        {isLoading ? (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "0.5rem",
              backgroundColor: "#007bff",
              borderRadius: "4px",
            }}
          >
            <Spinner />
            <span>Adding Task...</span>
          </div>
        ) : (
          "Add Task"
        )}
      </button>
    </form>
  );
};

export default TaskForm;
