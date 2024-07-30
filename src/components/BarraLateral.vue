<template>
  <header>
    <h1>
      <img src="../assets/logo.png" alt="Logo da página" />
    </h1>

    <!-- Botão para alterar o tema -->
    <button class="button" @click="alterarTema">{{ textoBotao }}</button>

    <nav class="panel mt-5">
      <li>
        <router-link to="/" class="link">
          <i class="fas fa-tasks"></i>
          Tarefas
        </router-link>
      </li>
      <li>
        <router-link to="/projetos" class="link">
          <i class="fas fa-project-diagram"></i>
          Projetos
        </router-link>
      </li>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BarraLateral",
  emits: ["aoTemaAlterado"],
  data() {
    return {
      modoEscuroAtivo: false, // Indica se o modo escuro está ativo
    };
  },
  computed: {
    // Define o texto do botão com base no estado do modo escuro
    textoBotao() {
      if (this.modoEscuroAtivo) {
        return "Desativar modo escuro";
      }
      return "Ativar modo escuro";
    },
  },
  methods: {
    // Altera o tema entre claro e escuro
    alterarTema() {
      this.modoEscuroAtivo = !this.modoEscuroAtivo; // Altera o estado do modo escuro

      // Emite o evento aoTemaAlterado com o estado atual do modo escuro
      this.$emit("aoTemaAlterado", this.modoEscuroAtivo);
    },
  },
});
</script>

<style scoped>
header {
  padding: 1rem;
  background: #0d3b66;
  width: 100%;
  height: 100vh;
  text-align: center;
}
button {
  margin: 14px;
}
.panel li {
  margin: 8px 0;
  list-style: none;
  padding: 10px;
}
.link {
  color: #fff;
}
.link:hover {
  color: #faf0ca;
}
.link.router-link-active {
  color: #faf0ca;
}

@media only screen and (max-width: 768px) {
  /* Estilos específicos para telas menores */
  header {
    padding: 2.5rem;
    height: auto;
  }
}
</style>
