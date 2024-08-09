import { TipoNotificacao } from "@/interfaces/INotificacao"; // Importa o tipo de notificação disponível
import { store } from "@/store"; // Importa a store Vuex

// Define o tipo 'Notificador', que é um objeto com uma função 'notificar'
type Notificador = {
  notificar: (tipo: TipoNotificacao, titulo: string, texto: string) => void;
};

export default (): Notificador => {
  // Define a função 'notificar' que cria uma notificação
  const notificar = (
    tipo: TipoNotificacao,
    titulo: string,
    texto: string
  ): void => {
    store.commit("NOTIFICACAO", {
      titulo,
      texto,
      tipo,
    });
    // Comete a mutação 'NOTIFICACAO' na store Vuex, passando um objeto com título, texto e tipo
  };

  // Retorna um objeto contendo a função 'notificar'
  return {
    notificar,
  };
};
