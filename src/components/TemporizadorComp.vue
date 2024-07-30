<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <CronometroComp :tempoEmSegundos="tempoEmSegundos" />

    <!-- Botão para iniciar o cronômetro -->
    <BotaoComp
      @click="dispararCronometro"
      :cronometroRodando="cronometroRodando"
      textoBotao="play"
      classeIcone="fa-play"
    />

    <!-- Botão para parar o cronômetro -->
    <BotaoComp
      @click="finalizarCronometro"
      :cronometroRodando="!cronometroRodando"
      textoBotao="stop"
      classeIcone="fa-stop"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CronometroComp from "./CronometroComp.vue";
import BotaoComp from "./BotaoComp.vue";

export default defineComponent({
  name: "TemporizadorComp",
  emits: ["aoTemporizadorFinalizar"], // Define eventos emitidos pelo componente
  components: {
    CronometroComp,
    BotaoComp,
  },
  data() {
    return {
      tempoEmSegundos: 0, 
      cronometro: 0, 
      cronometroRodando: false, 
    };
  },
  methods: {
    // Inicia o cronômetro
    dispararCronometro() {
      this.cronometro = setInterval(() => {
        this.tempoEmSegundos += 1; // Incrementa o tempo em segundos a cada intervalo
      }, 1000); // Intervalo de 1 segundo

      return (this.cronometroRodando = true); // Define que o cronômetro está em execução
    },
    // Finaliza o cronômetro
    finalizarCronometro() {
      this.cronometroRodando = false; // Define que o cronômetro não está mais em execução

      clearInterval(this.cronometro); // Limpa o intervalo do cronômetro

      // Emite evento aoTemporizadorFinalizar com o tempo em segundos atual
      this.$emit("aoTemporizadorFinalizar", this.tempoEmSegundos);

      // Reinicia o tempo em segundos
      this.tempoEmSegundos = 0;
    },
  },
});
</script>
