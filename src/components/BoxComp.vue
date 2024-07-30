<template>
  <!-- Caixa para conteúdo com estilo personalizado -->
  <div class="box has-text-weight-bold" :style="estiloBox">
    <!-- Slot para inserir conteúdo -->
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BoxComp",
  data() {
    return {
      // Estilo da caixa
      estiloBox: {
        backgroundColor: "#53627e", // Cor de fundo da caixa
      },
    };
  },
});
</script>
