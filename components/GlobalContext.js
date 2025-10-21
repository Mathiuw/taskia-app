import { Children, createContext, useState } from "react";
import PocketBase from "pocketbase";
import * as Notifications from "expo-notifications";
export const GlobalContext = createContext();
import { useEffect } from "react";

const database = new PocketBase(
  "https://pocketbasetcc-production.up.railway.app"
);

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: true,
      shouldSetBadge: true,
      shouldShowBanner: true,
      shouldShowList: true,
    };
  },
});

export const GlobalProvider = ({ children }) => {
  // Login Database state and functions
  const [currentUser, setCurrentUser] = useState();

  const scheduleNotification = () => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "Alerta de Tarefa",
        body: "Voce tem tarefas pendentes para hoje",
        data: { username: "Demo" },
      },
      trigger: {
        seconds: 2,
      },
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
        sort: "-dataDeCriacao",
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
      console.error(
        "You already are logged on! current user: ",
        currentUser.record.nome
      );
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
    subTarefas,
    prioridade,
    tags
  ) {
    const maxId = await database.collection("tarefa").getList(1, 1, {
      sort: "-dataDeCriacao",
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

      // subTarefas.forEach(async (element) => {
      //   await setSubtarefa(element.title, data.id);
      // });

      for (const element of subTarefas) {
        await setSubtarefa(element.title, data.id);
      }

      return record;
    } catch (error) {
      console.log("setTarefa", error);
      return false;
    }
  }

  async function getTarefa(
    dataConclusao,
    id,
    idUsuario = currentUser.record.id
  ) {
    console.log("isValid:", database.authStore.isValid);
    console.log("auth model:", database.authStore.record);
    console.log("auth token:", database.authStore.token);
    console.log(dataConclusao);

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
    } else if (typeof dataConclusao !== "undefined") {
      console.log(dataConclusao);
      const start = new Date(`${dataConclusao.dateString} 00:00:00.000`)
        .toISOString()
        .replace("T", " ");

      console.log(start);
      const end = new Date(`${dataConclusao.dateString} 23:59:59.999`)
        .toISOString()
        .replace("T", " ");
      console.log(end);
      try {
        const recordsByDate = await database.collection("tarefa").getFullList({
          filter: `idUsuario = "${idUsuario}" && dataConclusao >= "${start}" && dataConclusao <= "${end}"`,
        });
        const recordsWithSteps = [];

        for (const element of recordsByDate) {
          const steps = await getSubtarefa(element.id);
          console.log(steps);
          const newRecord = { ...element, steps: steps };
          console.log(newRecord.steps);
          recordsWithSteps.push(newRecord);
        }

        console.log(recordsWithSteps);
        return recordsWithSteps;
      } catch (error) {
        console.log("getTarefa/tarefaIdUser", error);
        return [];
      }
    } else if (typeof idUsuario !== "undefined") {
      try {
        console.log(idUsuario);
        const records = await database.collection("tarefa").getFullList({
          filter: `idUsuario = "${idUsuario}"`,
        });

        const recordsWithSteps = [];

        for (const element of records) {
          const steps = await getSubtarefa(element.id);
          console.log(steps);
          const newRecord = { ...element, steps: steps };
          console.log(newRecord.steps);
          recordsWithSteps.push(newRecord);
        }

        console.log(recordsWithSteps);
        return recordsWithSteps;
      } catch (error) {
        console.log("getTarefa/tarefaIdUser", error);
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

  async function updateSubtarefa(id, concluida) {
    const data = {
      concluido: concluida,
    };
    console.log(data, id);
    try {
      await database.collection("subtarefa").update(id, data);
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
      sort: "-dataDeCriacao",
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

  async function getAnotacoes(id, idUsuario = currentUser.record.id) {
    if (typeof id !== "undefined") {
      try {
        const record = await database.collection("anotacoes").getList(1, 1, {
          filter: `id = "${id}" && idUsuario = "${idUsuario}"`,
        });
        return record.items[0];
      } catch (error) {
        console.log("getAnotacoes/anotacoesId", error);
        return [];
      }
    } else if (typeof idUsuario !== "undefined") {
      try {
        const records = await database.collection("anotacoes").getFullList({
          filter: `idUsuario = "${idUsuario}"`,
        });
        return records;
      } catch (error) {
        console.log("getAnotacoes/anotacoesIdUsuario", error);
        return [];
      }
    } else {
      try {
        const records = await database.collection("anotacoes").getFullList();
        return records;
      } catch (error) {
        console.log("getAnotacoes", error);
        return [];
      }
    }
  }

  async function setAnotacoes(nomeAnotacao, descricao) {
    const maxId = await database.collection("anotacoes").getList(1, 1, {
      sort: "-dataDeCriacao",
    });
    let newId;
    if (typeof maxId.items[0] == "undefined") {
      newId = 1;
    } else {
      newId = parseInt(maxId.items[0].id) + 1;
    }
    try {
      const existingAnotacao = await database
        .collection("anotacoes")
        .getList(1, 1, {
          filter: `idUsuario = "${currentUser.record.id}" && nomeAnotacao = "${nomeAnotacao}"`,
        });
      if (existingAnotacao.items.length > 0) {
        console.log("Anotação já existente");
        return false;
      }
    } catch (error) {
      console.log("setAnotacoes/anotacoesNomeAnotacao", error);
    }
    const data = {
      id: newId,
      idUsuario: currentUser.record.id,
      nomeAnotacao: nomeAnotacao,
      descricao: descricao,
    };
    console.log(data);
    try {
      const record = await database.collection("anotacoes").create(data);
      return record;
    } catch (error) {
      console.log("setAnotacoes", error);
      return false;
    }
  }

  async function delAnotacoes(id, idUsuario = currentUser.record.id) {
    if (typeof id == "undefined") {
      return false;
    }
    try {
      const record = await database.collection("anotacoes").getList(1, 1, {
        filter: `id = "${id}" && idUsuario = "${idUsuario}"`,
      });

      if (record.items.length == 0) {
        return false;
      }
      await database.collection("anotacoes").delete(id);
      return true;
    } catch (error) {
      console.log("delAnotacoes", error);
      return false;
    }
  }

  async function getSubtarefa(idTarefa, id, idUsuario = currentUser.record.id) {
    if (typeof id !== "undefined") {
      try {
        const record = await database.collection("subtarefa").getList(1, 1, {
          filter: `id = "${id}" && idUsuario = "${idUsuario}"`,
        });
        return record.items[0];
      } catch (error) {
        console.log("getSubtarefa/subtarefaId", error);
        return [];
      }
    } else if (typeof idTarefa !== "undefined") {
      try {
        const recordsByTarefa = await database
          .collection("subtarefa")
          .getFullList({
            filter: `idTarefa = "${idTarefa}" && idUsuario = "${idUsuario}"`,
          });
        return recordsByTarefa;
      } catch (error) {
        console.log("getSubtarefa/subtarefaIdTarefa", error);
        return [];
      }
    } else if (typeof idUsuario !== "undefined") {
      try {
        const records = await database.collection("subtarefa").getFullList({
          filter: `idUsuario = "${idUsuario}"`,
        });
        return records;
      } catch (error) {
        console.log("getSubtarefa/subtarefaIdUser", error);
        return [];
      }
    } else {
      try {
        const records = await database.collection("subtarefa").getFullList();
        return records;
      } catch (error) {
        console.log("getSubtarefa", error);
        return [];
      }
    }
  }

  async function setSubtarefa(nomeSubtarefa, idTarefa) {
    const maxId = await database.collection("subtarefa").getList(1, 1, {
      sort: "-dataDeCriacao",
    });
    let newId;
    if (maxId.items.length == 0) {
      newId = 1;
    } else {
      newId = parseInt(maxId.items[0].id) + 1;
    }
    console.log(newId);

    const data = {
      id: newId,
      idUsuario: currentUser.record.id,
      idTarefa: idTarefa,
      nomeSubtarefa: nomeSubtarefa,
      concluido: false,
    };

    try {
      const record = await database.collection("subtarefa").create(data);
      return record;
    } catch (error) {
      console.log("setSubtarefa", error);
      return false;
    }
  }

  useEffect(() => {
    const demoAccountLogin = async () => {
      await login("mateus.martins@uscsonline.com.br", "12345678");
    };
    demoAccountLogin();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        getTarefa,
        setTarefa,
        updateTarefa,
        currentUser,
        criarLogin,
        login,
        getTags,
        setTag,
        getAnotacoes,
        setAnotacoes,
        delAnotacoes,
        getSubtarefa,
        setSubtarefa,
        updateSubtarefa,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
