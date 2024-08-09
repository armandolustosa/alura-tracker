<template>
  <section class="projetos">
    <!-- Link para criar um novo projeto -->
    <router-link to="/projetos/novo" class="button">
      <span class="icon is-small">
        <i class="fas fa-plus"></i>
        <!-- Ícone para adicionar um novo projeto -->
      </span>
      <span>Novo Projeto</span>
    </router-link>
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="projeto in projetos" :key="projeto.id">
          <td>
            {{ projeto.id }}
          </td>
          <td>
            {{ projeto.nome }}
          </td>
          <td>
            <!-- Link para editar o projeto -->
            <router-link :to="`/projetos/${projeto.id}`" class="button">
              <span class="icon is-small">
                <i class="fas fa-pencil-alt"></i>
                <!-- Ícone para edição -->
              </span>
            </router-link>
            <button
              class="button ml-2 is-danger"
              @click="excluirTarefa(projeto.id)"
              >
              <span class="icon is-small">
                <i class="fas fa-trash"></i>
              </span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
import { key } from "@/store"; // Importa a chave para injeção da store
import { computed, defineComponent } from "vue"; // Importa funções do Vue
import { useStore } from "vuex"; // Importa a função para acessar a store do Vuex

export default defineComponent({
  name: "ListaView", 
  methods: {
    // Função para excluir um projeto com base no ID
    excluirTarefa(id: string) {
      this.store.dispatch("EXCLUIR_PROJETO", id); // Dispara a ação para excluir o projeto
    },
  },
  setup() {
    const store = useStore(key); // Obtém a instância da store Vuex
    store.dispatch("OBTER_PROJETOS"); // Obtém a lista de projetos ao montar o componente
    return {
      store,
      projetos: computed(() => store.state.projeto.projetos), // Cria uma propriedade computada para a lista de projetos
    };
  },
});
</script>

<style scoped>
.title,
.label {
  color: #53627e;
  padding: 5px 15px;
}

form {
  margin-left: 15px;
}

.table {
  margin: 15px;
  border-radius: 10px;
  width: 95%;
  margin: 30px auto;
}

.button {
  margin-left: 30px;
}
</style>
