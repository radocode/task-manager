import React, { useState } from "react";
import { Task } from "../store/taskSlice";
import Spinner from "./Spinner";

interface TaskItemProps {
  task: Task;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: "pending" | "completed") => void;
  onEdit: (id: string, title: string, description: string) => void;
  isLoading: boolean;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onDelete,
  onStatusChange,
  onEdit,
  isLoading,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(
    task.description || ""
  );

  const handleEdit = () => {
    if (isEditing) {
      onEdit(task.id, editedTitle, editedDescription);
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  return (
    <div
      className="card"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "relative",
      }}
    >
      {isLoading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255,255,255,0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "8px",
          }}
        >
          <Spinner />
        </div>
      )}
      <div
        style={{ display: "flex", alignItems: "center", gap: "1rem", flex: 1 }}
      >
        <input
          type="checkbox"
          checked={task.status === "completed"}
          onChange={() =>
            onStatusChange(
              task.id,
              task.status === "completed" ? "pending" : "completed"
            )
          }
          style={{ width: "1.25rem", height: "1.25rem", cursor: "pointer" }}
          disabled={isLoading}
        />
        <div style={{ flex: 1 }}>
          {isEditing ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="form-control"
                style={{ width: "100%" }}
                disabled={isLoading}
              />
              <textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="form-control"
                style={{ width: "100%" }}
                rows={3}
                disabled={isLoading}
              />
            </div>
          ) : (
            <>
              <h3
                style={{
                  fontSize: "1.125rem",
                  fontWeight: "500",
                  textDecoration:
                    task.status === "completed" ? "line-through" : "none",
                  color: task.status === "completed" ? "#6c757d" : "inherit",
                }}
              >
                {task.title}
              </h3>
              {task.description && (
                <p
                  style={{
                    color: "#6c757d",
                    fontSize: "0.875rem",
                    marginTop: "0.25rem",
                  }}
                >
                  {task.description}
                </p>
              )}
            </>
          )}
        </div>
      </div>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button
          onClick={handleEdit}
          className="btn"
          style={{
            padding: "0.25rem 0.5rem",
            fontSize: "0.875rem",
            backgroundColor: "#28a745",
            color: "white",
          }}
          disabled={isLoading}
        >
          {isEditing ? "Save" : "Edit"}
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="btn btn-danger"
          style={{ padding: "0.25rem 0.5rem", fontSize: "0.875rem" }}
          disabled={isLoading}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
