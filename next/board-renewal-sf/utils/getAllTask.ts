// utils/taskService.ts
import { supabase } from "@/lib/supabase";
import { Task } from "@/types";

export const getAllTasks = async (): Promise<Task[]> => {
  const { data, status, error } = await supabase.from("tasks").select("*");
  if (status === 200 && data) {
    return data;
  }
  throw error;
};
