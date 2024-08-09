<template>
  <section class="projetos">
    <form @submit.prevent="salvar"> <!-- Impede o comportamento padrão do formulário (recarregar a página) e chama a função 'salvar' -->
      <!-- Vincula o valor do campo ao modelo de dados 'nomeDoProjeto' -->
      <div class="field">
        <label for="nomeDoProjeto" class="label">Nome do Projeto</label>
        <input
          type="text"
          id="idnomeDoProjeto"
          class="input"
          v-model="nomeDoProjeto" 
        />
      </div>
      <div class="field">
        <input type="submit" value="Salvar" class="button" /> 
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import { TipoNotificacao } from "@/interfaces/INotificacao"; // Importa a enumeração dos tipos de notificação
import { key } from "@/store"; // Importa a chave para a injeção da store
import { defineComponent, onMounted, ref } from "vue"; // Importa funções do Vue para criar o componente e manipular o ciclo de vida
import { useStore } from "vuex"; // Importa a função para acessar a store do Vuex
import useNotificador from "@/hooks/notificador"; // Importa o hook personalizado para gerenciar notificações
import { useRouter } from "vue-router"; // Importa a função para navegação entre rotas

export default defineComponent({
  name: "FormProjetos", 
  props: {
    id: { type: String, required: true }, 
  },
  setup(props) {
    const store = useStore(key); // Obtém a instância da store Vuex
    const { notificar } = useNotificador(); // Obtém a função 'notificar' do hook de notificações
    const router = useRouter(); // Obtém a instância do roteador

    // Cria uma referência reativa para o nome do projeto
    const nomeDoProjeto = ref("");

    // Função executada quando o componente é montado
    onMounted(() => {
      if (props.id) {
        // Se um ID for fornecido, busca o projeto correspondente na store e define o nome no campo
        const projeto = store.state.projeto.projetos.find(
          (projeto) => projeto.id == props.id
        );
        nomeDoProjeto.value = projeto?.nome || ""; // Define o nome do projeto ou uma string vazia se não encontrado
      }
    });

    // Função para lidar com sucesso na operação de salvar
    const lidarSucesso = () => {
      notificar(
        TipoNotificacao.SUCESSO,
        "Exelente!",
        "O projeto foi cadastrado com sucesso!"
      ); // Exibe uma notificação de sucesso
      router.push("/projetos"); // Redireciona para a página de projetos
      nomeDoProjeto.value = ""; // Limpa o campo de entrada
    };

    // Função para salvar ou atualizar um projeto
    const salvar = () => {
      if (props.id) {
        // Se o ID estiver presente, atualiza o projeto existente
        store
          .dispatch("ALTERAR_PROJETO", {
            id: props.id,
            nome: nomeDoProjeto.value,
          })
          .then(() => lidarSucesso()); // Chama a função de sucesso após a atualização
      } else {
        // Se o ID não estiver presente, cria um novo projeto
        store
          .dispatch("CADASTRAR_PROJETO", nomeDoProjeto.value)
          .then(() => lidarSucesso()); // Chama a função de sucesso após a criação
      }
    };

    return {
      nomeDoProjeto,
      salvar, // Retorna as variáveis e funções para o template
    };
  },
});
</script>

<style scoped>
form {
  margin-left: 15px; 
}

.projetos {
  width: 95%; 
  margin: 30px auto; 
}

label {
  color: #53627e; 
  font-weight: bold; 
}
</style>
