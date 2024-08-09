// Define um enum chamado 'TipoNotificacao', que representa os tipos de notificações disponíveis
export enum TipoNotificacao {
  SUCESSO,
  FALHA,
  ATENCAO,
}

// Define uma interface 'INotificacao' que descreve a estrutura de uma notificação
export default interface INotificacao {
  titulo: string;
  texto: string;
  tipo: TipoNotificacao;  // Tipo da notificação, baseado no enum 'TipoNotificacao'
  id: number;
}