<template>
  <BoxComp>
    <div class="columns clicavel" @click="tarefaSelecionada">
      <div class="column is-4">
        <!-- Exibe a descrição da tarefa, ou uma mensagem padrão se não houver descrição -->
        {{ tarefa.descricao || "Tarefa sem descrição" }}
      </div>
      <div class="column is-3">
        {{ tarefa.projeto?.nome || "N/D" }}
      </div>
      <div class="column">
        <!-- Passa o tempo em segundos como prop para o componente CronometroComp -->
        <CronometroComp :tempoEmSegundos="tarefa.duracaoEmSegundos" />
      </div>
    </div>
  </BoxComp>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import CronometroComp from "./CronometroComp.vue";
import ITarefa from "../interfaces/ITarefa";
import BoxComp from "./BoxComp.vue";

export default defineComponent({
  name: "TarefaComp",
  emits: ['tarefaClicada'],
  components: {
    CronometroComp,
    BoxComp,
  },
  methods: {
    tarefaSelecionada () {
      this.$emit('tarefaClicada', this.tarefa)
    }
  },
  props: {
    // Propriedade para receber a tarefa como objeto
    tarefa: { type: Object as PropType<ITarefa>, required: true },
  },
});
</script>

<style scoped>
.clicavel:hover {
  cursor: pointer;
}
</style>
