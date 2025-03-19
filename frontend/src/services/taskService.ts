import axios from "axios";
import { Task } from "../store/taskSlice";

const API_URL = "/api/tasks";

export const taskService = {
  getAll: async (): Promise<Task[]> => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  create: async (task: Omit<Task, "id">): Promise<Task> => {
    const response = await axios.post(API_URL, task);
    return response.data;
  },

  update: async (id: string, task: Partial<Task>): Promise<Task> => {
    const response = await axios.patch(`${API_URL}/${id}`, task);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
  },
};
