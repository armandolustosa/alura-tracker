import IProjeto from "@/interfaces/IProjeto";
import INotificacao from "@/interfaces/INotificacao";
import { InjectionKey } from "vue";
import { Store, createStore } from "vuex";
import http from "@/http";

interface Estado {
  projetos: IProjeto[];
  notificacoes: INotificacao[];
}

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
  state: {
    projetos: [],
    notificacoes: [],
  },
  getters: {},
  mutations: {
    ADICIONAR_PROJETO(state, nomeDoProjeto) {
      const projeto = {
        id: new Date().toISOString(),
        nome: nomeDoProjeto,
      } as IProjeto;
      state.projetos.push(projeto);
    },
    ALTERAR_PROJETO(state, projeto: IProjeto) {
      const index = state.projetos.findIndex(
        (projet) => projet.id == projeto.id
      );
      state.projetos[index] = projeto;
    },
    EXCLUIR_PROJETO(state, id) {
      const index = state.projetos.findIndex((projeto) => projeto.id == id);

      if (index !== -1) {
        state.projetos.splice(index, 1);
      }
    },
    DEFINIR_PROJETO(state, projetos: IProjeto[]) {
      state.projetos = projetos;
    },
    NOTIFICACAO(state, novaNotificacao: INotificacao) {
      novaNotificacao.id = new Date().getTime();
      state.notificacoes.push(novaNotificacao);

      setTimeout(() => {
        state.notificacoes = state.notificacoes.filter(
          (notificacao) => notificacao.id != novaNotificacao.id
        );
      }, 3000);
    },
  },
  actions: {
    OBTER_PROJETOS({ commit }) {
      http
        .get("projetos")
        .then((resposta) => commit("DEFINIR_PROJETO", resposta.data));
    },
    CADASTRAR_PROJETO(context, nomeDoProjeto: string) {
      return http.post("projetos", {
        nome: nomeDoProjeto,
      });
    },
    ALTERAR_PROJETO(context, projeto: IProjeto) {
      return http.put(`projetos/${projeto.id}`, projeto);
    },
    EXCLUIR_PROJETO({  commit }, id: string) {
      return http.delete(`projetos/${id}`)
      .then(() => commit('EXCLUIR_PROJETO', id));
    },
  },
  modules: {},
});
