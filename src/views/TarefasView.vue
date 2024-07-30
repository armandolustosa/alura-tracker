<template>
  <FormularioComp @aoSalvarTarefa="salvarTarefa" />
  <div class="lista">
    <TarefaComp
      v-for="(tarefa, index) in tarefas"
      :key="index"
      :tarefa="tarefa"
    />
    <BoxComp v-if="listaEstaVazia">
      Você não está muito produtivo hoje :(
    </BoxComp>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FormularioComp from "@/components/FormularioComp.vue";
import TarefaComp from "@/components/TarefaComp.vue";
import BoxComp from "@/components/BoxComp.vue";
import ITarefa from "@/interfaces/ITarefa";

export default defineComponent({
  name: "App",
  components: {
    FormularioComp,
    TarefaComp,
    BoxComp,
  },
  data() {
    return {
      tarefas: [] as ITarefa[],
    };
  },
  computed: {
    listaEstaVazia(): boolean {
      return this.tarefas.length === 0;
    },
  },
  methods: {
    salvarTarefa(tarefa: ITarefa) {
      this.tarefas.push(tarefa);
    },
  },
});
</script>
