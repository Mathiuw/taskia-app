import { Children, createContext, useState } from "react";
import PocketBase from "pocketbase";
export const GlobalContext = createContext();

const database = new PocketBase(
  "https://pocketbasetcc-production.up.railway.app"
);

export const GlobalProvider = ({ children }) => {
  // Login Database state and functions
  const [currentUser, setCurrentUser] = useState();

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

  async function criarLogin(
    email,
    senha,
    passwordConfirm,
    nome,
    nType,
    birthDate,
    genero
  ) {
    try {
      const maxId = await database.collection("usuario").getList(1, 1, {
        sort: "-id",
      });

      let newId;
      if (typeof maxId.items[0] == "undefined") {
        newId = 1;
      } else {
        newId = parseInt(maxId.items[0].id) + 1;
      }
      console.log(newId);

      const newUser = await database.collection("usuario").create({
        id: newId,
        email: email,
        password: senha,
        passwordConfirm: passwordConfirm,
        nome: nome,
        tipoNeurodivergencia: nType,
        dataNascimento: birthDate,
        genero: genero,
        tutorialFeito: false,
      });

      console.log("conta criada", newUser);
    } catch (error) {
      console.log(error);
    }
  }

  async function login(email, password) {
    if (typeof currentUser !== "undefined") {
      console.error("You already are logged on! current user: ", currentUser);
      return;
    }

    try {
      const authData = await database
        .collection("usuario")
        .authWithPassword(email, password);
      console.log("Login ok");
      console.log("isValid:", database.authStore.isValid);
      console.log("auth model:", database.authStore.record);
      console.log("auth token:", database.authStore.token);

      setCurrentUser(authData);
    } catch (error) {
      try {
        const authAdmin = await database
          .collection("_superusers")
          .authWithPassword(email, password);
        console.log("Login ADM ok");

        setCurrentUser(authAdmin);
        return;
      } catch (error) {
        console.error("Erro no login:", error);
        return;
      }
    }
  }

  async function setTarefa(
    descricao,
    dataInicio,
    dataConclusao,
    prioridade,
    tags
  ) {
    const maxId = await database.collection("tarefa").getList(1, 1, {
      sort: "-id",
    });
    let newId;
    if (maxId.items.length == 0) {
      newId = 1;
    } else {
      newId = parseInt(maxId.items[0].id) + 1;
    }
    const data = {
      id: newId,
      idUsuario: currentUser.record.id,
      prioridade: prioridade,
      idTag: tags,
      descricao: descricao,
      dataInicio: dataInicio,
      dataConclusao: dataConclusao,
      concluida: false,
    };

    console.log(data);
    console.log(data.idTag);

    try {
      const record = await database.collection("tarefa").create(data);
      return record;
    } catch (error) {
      console.log("setTarefa", error);
      return false;
    }
  }

  async function getTarefa(
    id,
    idUsuario = currentUser.record.id,
    dataConclusao
  ) {
    console.log("isValid:", database.authStore.isValid);
    console.log("auth model:", database.authStore.record);
    console.log("auth token:", database.authStore.token);

    if (typeof id !== "undefined") {
      try {
        const record = await database.collection("tarefa").getList(1, 1, {
          filter: `id = "${id}"`,
        });
        return record.items[0];
      } catch (error) {
        console.log("getTarefa/tarefaId", error);
        return [];
      }
    } else if (typeof idUsuario !== "undefined") {
      try {
        console.log(idUsuario);
        const records = await database.collection("tarefa").getFullList({
          filter: `idUsuario = "${idUsuario}"`,
        });
        console.log(records);
        return records;
      } catch (error) {
        console.log("getTarefa/tarefaIdUser", error);
        return [];
      }
    } else if (typeof DataConclusao !== "undefined") {
      try {
        const recordsByDate = await database.collection("tarefa").getFullList({
          filter: `idUsuario = "${idUsuario}" & dataConclusao = "${dataConclusao}"`,
        });
        return recordsByDate.items;
      } catch (error) {
        console.log("getTarefa/dataConclusao", error);
        return [];
      }
    } else {
      try {
        const records = await database.collection("tarefa").getFullList();
        return records;
      } catch (error) {
        console.log("getTarefa", error);
        return [];
      }
    }
  }

  async function updateTarefa(id, concluida) {
    const data = {
      concluida: concluida,
    };
    try {
      await database.collection("tarefa").update(id, data);
    } catch (error) {
      console.log("updateTarefa", error);
    }
  }

  async function getTags(id, idUsuario = currentUser.record.id) {
    if (typeof id !== "undefined") {
      try {
        const record = await database.collection("tags").getList(1, 1, {
          filter: `id = "${id}" && idUsuario = "${idUsuario}"`,
        });
        return record.items[0];
      } catch (error) {
        console.log("getTags/tagsId", error);
        return [];
      }
    } else if (typeof idUsuario !== "undefined") {
      try {
        const records = await database.collection("tags").getFullList({
          filter: `idUsuario = "${idUsuario}"`,
        });
        return records;
      } catch (error) {
        console.log("getTags/tagsIdUser", error);
        return [];
      }
    } else {
      try {
        const records = await database.collection("tags").getFullList();
        return records;
      } catch (error) {
        console.log("getTags", error);
        return [];
      }
    }
  }

  async function setTag(descricao) {
    const maxId = await database.collection("tags").getList(1, 1, {
      sort: "-id",
    });
    let newId;
    if (typeof maxId.items[0] == "undefined") {
      newId = 1;
    } else {
      newId = parseInt(maxId.items[0].id) + 1;
    }
    try {
      const existingTag = await database.collection("tags").getList(1, 1, {
        filter: `idUsuario = "${currentUser.record.id}" && descricao = "${descricao}"`,
      });
      console.log("teste", existingTag.items[0]);
      if (typeof existingTag.items[0] !== "undefined") {
        console.log("tag já existente");
        return false;
      }
    } catch (error) {
      console.log("setTag/tagsDescricao", error);
    }
    const data = {
      id: newId,
      idUsuario: currentUser.record.id,
      descricao: descricao,
    };

    try {
      const record = await database.collection("tags").create(data);
      return record;
    } catch (error) {
      console.log("setTag", error);
      return false;
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        tasks,
        setTasks,
        AddTask,
        DeleteTask,
        getTarefa,
        setTarefa,
        updateTarefa,
        notes,
        setNotes,
        AddNote,
        DeleteNote,
        currentUser,
        criarLogin,
        login,
        getTags,
        setTag,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
