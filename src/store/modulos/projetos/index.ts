import http from "@/http"; // Importa a instância configurada do cliente HTTP (Axios)
import IProjeto from "@/interfaces/IProjeto"; // Importa a interface que define a estrutura de um projeto
import { Estado } from "@/store"; // Importa a interface que define o estado global da aplicação
import { Module } from "vuex"; // Importa o tipo Module do Vuex para definir um módulo

// Define a interface para o estado do módulo de projetos
export interface EstadoProjeto {
  projetos: IProjeto[]; // Lista de projetos no estado
}

// Define o módulo 'projeto' do Vuex
export const projeto: Module<EstadoProjeto, Estado> = {
  // Define as mutações que alteram o estado
  mutations: {
    // Adiciona um novo projeto ao estado
    ADICIONAR_PROJETO(state, nomeDoProjeto) {
      const projeto = {
        id: new Date().toISOString(), // Gera um ID único baseado na data e hora atual
        nome: nomeDoProjeto,          // Nome do projeto a ser adicionado
      } as IProjeto;
      state.projetos.push(projeto); // Adiciona o novo projeto à lista de projetos no estado
    },
    // Atualiza um projeto existente no estado
    ALTERAR_PROJETO(state, projeto: IProjeto) {
      const index = state.projetos.findIndex(
        (projet) => projet.id == projeto.id // Encontra o índice do projeto com o mesmo ID
      );
      state.projetos[index] = projeto; // Substitui o projeto antigo pelo novo
    },
    // Remove um projeto do estado com base no ID
    EXCLUIR_PROJETO(state, id) {
      const index = state.projetos.findIndex((projeto) => projeto.id == id);

      if (index !== -1) {
        state.projetos.splice(index, 1); // Remove o projeto da lista
      }
    },
    // Define a lista de projetos no estado
    DEFINIR_PROJETO(state, projetos: IProjeto[]) {
      state.projetos = projetos; // Substitui a lista de projetos no estado
    },
  },
  // Define as ações que podem realizar operações assíncronas e chamar mutações
  actions: {
    // Obtém a lista de projetos do servidor e atualiza o estado
    OBTER_PROJETOS({ commit }) {
      http
        .get("projetos") // Faz uma requisição GET para obter os projetos
        .then((resposta) => commit("DEFINIR_PROJETO", resposta.data)); // Atualiza o estado com os dados recebidos
    },
    // Cadastra um novo projeto no servidor
    CADASTRAR_PROJETO(context, nomeDoProjeto: string) {
      return http.post("projetos", {
        nome: nomeDoProjeto, // Envia o nome do novo projeto para o servidor
      });
    },
    // Atualiza um projeto existente no servidor
    ALTERAR_PROJETO(context, projeto: IProjeto) {
      return http.put(`projetos/${projeto.id}`, projeto); // Faz uma requisição PUT para atualizar o projeto
    },
    // Exclui um projeto do servidor e atualiza o estado
    EXCLUIR_PROJETO({ commit }, id: string) {
      return http
        .delete(`projetos/${id}`) // Faz uma requisição DELETE para excluir o projeto
        .then(() => commit("EXCLUIR_PROJETO", id)); // Atualiza o estado removendo o projeto da lista
    },
  },
};
