<template>
  <section>
    <!-- Elemento para exibir o tempo decorrido -->
    <strong class="display">{{ tempoDecorrido }}</strong>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CronometroComp",
  props: {
    // Propriedade para receber o tempo em segundos como número
    tempoEmSegundos: { type: Number, default: 0, required: true },
  },
  computed: {
    // Calcula o tempo decorrido formatado como string HH:MM:SS
    tempoDecorrido(): string {
      return new Date(this.tempoEmSegundos * 1000).toISOString().substr(11, 8);
    },
  },
});
</script>

<style scoped>
.display {
  color: var(--texto-primario);
}
</style>
