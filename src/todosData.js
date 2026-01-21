import { v4 as uuidv4 } from "uuid";

export const initTodos = [
  {
    id: uuidv4(),
    title: "دراسة الوحدة الأولى",
    details: "يجب دراسة القواعد",
    isCompleted: false,
  },

  {
    id: uuidv4(),
    title: "دراسة الوحدة الثانية",
    details: "دراسة النصوص",
    isCompleted: false,
  },
];
