import IProjeto from "./IProjeto"; // Importa a interface IProjeto, que é usada para definir o tipo do projeto associado à tarefa

// Define uma interface 'ITarefa' que descreve a estrutura de uma tarefa
export default interface ITarefa {
  id: number;                 
  duracaoEmSegundos: number;   
  descricao: string;           
  projeto: IProjeto;   // Projeto associado à tarefa, com base na interface 'IProjeto'
}
