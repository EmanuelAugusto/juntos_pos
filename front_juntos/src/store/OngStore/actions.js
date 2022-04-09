import { api } from "../../boot/axios.js";

const errors = {
  "cnpj must be unique": "Já existe uma ONG com esse cnpj",
  send_password: "Por favor insira uma senha",
  send_razao_social: "Por favor envie uma Razão social",
};

export async function ActionGetOngs({ commit }) {
  try {
    const { data } = await api.get("ongs");
    commit("setOngs", data);
  } catch (error) {
    console.log(error);
  }
}

export async function ActionGetOng({ commit }, { id }) {
  try {
    const { data } = await api.get(String(id));
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function ActionDeleteOng({ commit, dispatch }, { id }) {
  try {
    const { data } = await api.delete(String(id));

    dispatch("ActionGetOngs");

    commit("setModalNewOng", {
      modal: false,
      data: null,
    });

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function ActionPostOng({ commit, dispatch }, payload) {
  try {
    const response = await api.post("create", {
      ...payload,
    });

    dispatch("ActionGetOngs");

    commit("setModalNewOng", {
      modal: false,
      data: null,
    });

    return { msg: "Salvo com sucesso", data: response.data };
  } catch (error) {
    return { msg: errors[error.response.data.msg], data: error.response.data };
  }
}

export async function ActionPutOng({ commit, dispatch }, payload) {
  try {
    const { codigo } = payload;

    const response = await api.put(String(codigo), {
      ...payload,
    });

    dispatch("ActionGetOngs");

    commit("setModalNewOng", {
      modal: false,
      data: null,
    });

    return { msg: "Salvo com sucesso", data: response.data };
  } catch (error) {
    return { msg: errors[error.response.data.msg], data: error.response.data };
  }
}
