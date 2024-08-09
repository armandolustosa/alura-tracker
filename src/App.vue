<template>
  <main
    class="columns is-gapless is-multiline"
    :class="{ 'modo-escuro': modoEscuroAtivo }"
  >
    <!-- Barra lateral para navegação ou opções -->
    <div class="column is-one-quarter">
      <BarraLateral @aoTemaAlterado="trocarTema" />
    </div>

    <!-- Área principal do conteúdo, onde as rotas são exibidas -->
    <div class="column is-three-quarter conteudo">
      <!-- Componente para exibir notificações -->
      <NotificacoesComp />
      <!-- Exibe a view associada à rota atual -->
      <router-view />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BarraLateral from "./components/BarraLateral.vue";
import NotificacoesComp from "./components/NotificacoesComp.vue";

export default defineComponent({
  name: "App",
  components: {
    BarraLateral,
    NotificacoesComp,
  },
  data() {
    return {
      modoEscuroAtivo: false,
    };
  },
  methods: {
    // Método para alternar o tema (modo escuro)
    trocarTema(modoEscuroAtivo: boolean) {
      this.modoEscuroAtivo = modoEscuroAtivo;
    },
  },
});
</script>

<style>
.lista {
  padding: 1.25rem;
}

main {
  --bg-primario: #fff; /* Cor de fundo padrão */
  --texto-primario: #000; /* Cor do texto padrão */
}

/* Estilo para o modo escuro */
main.modo-escuro {
  --bg-primario: #2b2d42; /* Cor de fundo no modo escuro */
  --texto-primario: #ddd; /* Cor do texto no modo escuro */
}

/* Estilo para a área de conteúdo, usa a variável de cor de fundo */
.conteudo {
  background-color: var(--bg-primario);
}
</style>
