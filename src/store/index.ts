import { InjectionKey } from "vue"; // Importa o tipo InjectionKey para injeção de dependências
import { Store, createStore } from "vuex"; // Importa tipos e funções do Vuex para criar e gerenciar a store
import { EstadoProjeto, projeto } from "./modulos/projetos"; // Importa o módulo de projetos e a interface de estado correspondente
import { EstadoTarefa, tarefa } from "./modulos/tarefas"; // Importa o módulo de tarefas e a interface de estado correspondente

// Define a interface para o estado global da aplicação
export interface Estado {
  projeto: EstadoProjeto; // Estado relacionado aos projetos
  tarefa: EstadoTarefa; // Estado relacionado às tarefas
}

// Cria uma chave única para a store, usada para injeção de dependências
export const key: InjectionKey<Store<Estado>> = Symbol();

// Cria a instância da store Vuex com o estado, módulos e outros recursos
export const store = createStore<Estado>({
  state: {
    projeto: {
      projetos: [], // Inicializa o estado dos projetos com um array vazio
    },
    tarefa: {
      tarefas: [], // Inicializa o estado das tarefas com um array vazio
      notificacoes: [], // Inicializa o estado das notificações com um array vazio
    },
  },
  getters: {}, 
  modules: {
    projeto, // Adiciona o módulo de projetos à store
    tarefa, // Adiciona o módulo de tarefas à store
  },
});
