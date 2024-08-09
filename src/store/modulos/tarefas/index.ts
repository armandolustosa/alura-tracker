import http from "@/http"; // Importa a instância configurada do cliente HTTP (Axios)
import INotificacao from "@/interfaces/INotificacao"; // Importa a interface que define a estrutura de uma notificação
import ITarefa from "@/interfaces/ITarefa"; // Importa a interface que define a estrutura de uma tarefa
import { Estado } from "@/store"; // Importa a interface que define o estado global da aplicação
import { Module } from "vuex"; // Importa o tipo Module do Vuex para definir um módulo

// Define a interface para o estado do módulo de tarefas
export interface EstadoTarefa {
  notificacoes: INotificacao[]; // Lista de notificações
  tarefas: ITarefa[]; // Lista de tarefas
}

// Define o módulo 'tarefa' do Vuex
export const tarefa: Module<EstadoTarefa, Estado> = {
  state: {
    notificacoes: [], // Inicializa o array de notificações vazio
    tarefas: [], // Inicializa o array de tarefas vazio
  },
  mutations: {
    // Adiciona uma nova notificação ao estado
    NOTIFICACAO(state, novaNotificacao: INotificacao) {
      novaNotificacao.id = new Date().getTime(); // Gera um ID único para a notificação baseado no timestamp atual
      state.notificacoes.push(novaNotificacao); // Adiciona a notificação à lista

      // Remove a notificação após 3 segundos
      setTimeout(() => {
        state.notificacoes = state.notificacoes.filter(
          (notificacao) => notificacao.id !== novaNotificacao.id
        );
      }, 3000);
    },
    // Define a lista de tarefas no estado
    DEFINIR_TAREFAS(state, tarefas: ITarefa[]) {
      state.tarefas = tarefas; // Substitui a lista de tarefas no estado
    },
    // Adiciona uma nova tarefa ao estado
    ADICIONAR_TAREFA(state, tarefa: ITarefa) {
      state.tarefas.push(tarefa); // Adiciona a tarefa à lista
    },
    // Atualiza uma tarefa existente no estado
    ALTERAR_TAREFA(state, tarefa: ITarefa) {
      const index = state.tarefas.findIndex((taref) => taref.id === tarefa.id);
      if (index !== -1) {
        state.tarefas[index] = tarefa; // Substitui a tarefa existente pela nova
      }
    },
  },
  actions: {
    // Obtém a lista de tarefas do servidor, com um filtro opcional
    OBTER_TAREFAS({ commit }, filtro: string) {
      let url = "tarefas";

      if (filtro) {
        url += "?descricao=" + filtro; // Adiciona o filtro à URL se fornecido
      }

      http
        .get(url) // Faz uma requisição GET para obter as tarefas
        .then((resposta) => commit("DEFINIR_TAREFAS", resposta.data)); // Atualiza o estado com os dados recebidos
    },
    // Cadastra uma nova tarefa no servidor e atualiza o estado
    CADASTRAR_TAREFA({ commit }, tarefa: ITarefa) {
      return http
        .post("tarefas", tarefa) // Faz uma requisição POST para criar uma nova tarefa
        .then((resposta) => commit("ADICIONAR_TAREFA", resposta.data)); // Adiciona a nova tarefa ao estado
    },
    // Atualiza uma tarefa existente no servidor e no estado
    ALTERAR_TAREFA({ commit }, tarefa: ITarefa) {
      return http
        .put(`tarefas/${tarefa.id}`, tarefa) // Faz uma requisição PUT para atualizar a tarefa
        .then(() => commit("ALTERAR_TAREFA", tarefa)); // Atualiza a tarefa no estado
    },
  },
};
