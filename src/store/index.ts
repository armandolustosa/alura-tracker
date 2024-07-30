import IProjeto from "@/interfaces/IProjeto";
import INotificacao from "@/interfaces/INotificacao";
import { InjectionKey } from "vue";
import { Store, createStore } from "vuex";

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
  actions: {},
  modules: {},
});
