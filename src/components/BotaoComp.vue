<template>
  <button class="button" :disabled="cronometroRodando">
    <!-- Desabilita o botão se o cronômetro estiver rodando -->
    <span class="icon">
      <i :class="['fas', classeIcone]"></i>
      <!-- Adiciona classe de ícone dinamicamente -->
    </span>
    <!-- Texto do botão dinâmico -->
    <span>{{ textoBotao }}</span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BotaoComp",
  props: {
    // Texto exibido no botão
    textoBotao: { type: String, default: "", required: true },
    // Classe do ícone do botão
    classeIcone: { type: String, default: "", required: true },
    // Indica se o cronômetro está rodando
    cronometroRodando: { type: Boolean, default: false, required: true },
  },
});
</script>

<style scoped></style>
