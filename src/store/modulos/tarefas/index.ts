import http from "@/http";
import INotificacao from "@/interfaces/INotificacao";
import ITarefa from "@/interfaces/ITarefa";
import { Estado } from "@/store";
import { Module } from "vuex";

export interface EstadoTarefa {
  notificacoes: INotificacao[];
  tarefas: ITarefa[];
}

export const tarefa: Module<EstadoTarefa, Estado> = {
  state: {
    notificacoes: [], // Inicializando o array notificacoes
    tarefas: [],      // Inicializando o array tarefas
  },
  mutations: {
    NOTIFICACAO(state, novaNotificacao: INotificacao) {
      novaNotificacao.id = new Date().getTime();
      state.notificacoes.push(novaNotificacao);

      setTimeout(() => {
        state.notificacoes = state.notificacoes.filter(
          (notificacao) => notificacao.id !== novaNotificacao.id
        );
      }, 3000);
    },
    DEFINIR_TAREFAS(state, tarefas: ITarefa[]) {
      state.tarefas = tarefas;
    },
    ADICIONAR_TAREFA(state, tarefa: ITarefa) {
      state.tarefas.push(tarefa);
    },
    ALTERAR_TAREFA(state, tarefa: ITarefa) {
      const index = state.tarefas.findIndex((taref) => taref.id === tarefa.id);
      if (index !== -1) {
        state.tarefas[index] = tarefa;
      }
    },
  },
  actions: {
    OBTER_TAREFAS({ commit }) {
      http
        .get("tarefas")
        .then((resposta) => commit("DEFINIR_TAREFAS", resposta.data));
    },
    CADASTRAR_TAREFA({ commit }, tarefa: ITarefa) {
      return http
        .post("tarefas", tarefa)
        .then((resposta) => commit("ADICIONAR_TAREFA", resposta.data));
    },
    ALTERAR_TAREFA({ commit }, tarefa: ITarefa) {
      return http
        .put(`tarefas/${tarefa.id}`, tarefa)
        .then(() => commit("ALTERAR_TAREFA", tarefa));
    },
  },
};
