import { Children, createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [tasks, setTasks] = useState([
    {
      id: Math.random(),
      title: "Test task 1",
      startDate: new Date(),
      dueDate: new Date(),
      priority: "media",
      steps: [{ title: "step 1" }, { title: "step 2" }, { title: "step 3" }],
    },
    {
      id: Math.random(),
      title: "Test task 2",
      startDate: new Date(),
      dueDate: new Date(),
      priority: "baixa",
    },
    {
      id: Math.random(),
      title: "Test task 3",
      startDate: new Date(),
      dueDate: new Date(),
      priority: "alta",
    },
  ]);

  const AddTask = ({ title, steps, startDate, dueDate, priority, tags }) => {
    if (title === "") {
      console.error("Task has no title");
      return;
    }

    const newTask = {
      key: Math.random().toString(),
      title: title,
      steps: steps,
      startDate: startDate,
      dueDate: dueDate,
      priority: priority,
      tags: tags,
    };

    setTasks([...tasks, newTask]);
  };

  const DeleteTask = (id) => {
    console.log("Deleted ", id);
    setTasks((currentCourseGoals) => {
      return currentCourseGoals.filter((goal) => goal.key !== id);
    });
  };

  const [notes, setNotes] = useState([]);

  const AddNote = (enteredNoteTitle, enteredNoteText) => {
    if (enteredNoteTitle == "") return;

    setNotes((currentNotes) => [
      ...currentNotes,
      { key: Math.random(), title: enteredNoteTitle, text: enteredNoteText },
    ]);
  };

  const DeleteNote = (id) => {
    console.log("Deleted ", id);
    setNotes((currentCourseGoals) => {
      return currentCourseGoals.filter((goal) => goal.key !== id);
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        tasks,
        setTasks,
        AddTask,
        DeleteTask,
        notes,
        setNotes,
        AddNote,
        DeleteNote,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
