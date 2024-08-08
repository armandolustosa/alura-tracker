import { InjectionKey } from "vue";
import { Store, createStore } from "vuex";
import { EstadoProjeto, projeto } from "./modulos/projetos";
import { EstadoTarefa, tarefa } from "./modulos/tarefas";

export interface Estado {
  projeto: EstadoProjeto;
  tarefa: EstadoTarefa;
}

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
  state: {
    projeto: {
      projetos: [],
    },
    tarefa: {
      tarefas: [],
      notificacoes: [],
    },
  },
  getters: {},
  modules: {
    projeto,
    tarefa,
  },
});
