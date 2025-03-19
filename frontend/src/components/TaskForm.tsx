import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../store/taskSlice";
import { taskService } from "../services/taskService";

const TaskForm: React.FC = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

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
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1.5rem" }}>
      <div className="form-group">
        <label htmlFor="title" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>
          Description (optional)
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-control"
          rows={3}
        />
      </div>
      <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
