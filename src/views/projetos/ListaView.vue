<template>
  <section class="projetos">
    <router-link to="/projetos/novo" class="button">
      <span class="icon is-small">
        <i class="fas fa-plus"></i>
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
            <router-link :to="`/projetos/${projeto.id}`" class="button">
              <span class="icon is-small">
                <i class="fas fa-pencil-alt"></i>
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
import { key } from "@/store";
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "ListaView",
  methods: {
    excluirTarefa(id: string) {
      this.store.dispatch("EXCLUIR_PROJETO", id);
    },
  },
  setup() {
    const store = useStore(key);
    return {
      store,
      projetos: computed(() => store.state.projetos),
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
