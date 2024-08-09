<template>
  <div :class="['modal', isactive]" v-if="tarefaEspecifica">
    <!-- Exibe o modal apenas se 'tarefaEspecifica' estiver presente. A classe 'modal' é fixa e 'isactive' é dinâmica -->
    <div class="modal-background"></div>
    <div class="modal-card">
      <!-- Estrutura principal do modal -->
      <header class="modal-card-head">
        <slot name="cabecalho" />
        <!-- Slot para inserir o conteúdo do cabeçalho do modal -->
      </header>
      <section class="modal-card-body">
        <slot name="corpo" />
        <!-- Slot para inserir o conteúdo do corpo do modal -->
      </section>
      <footer class="modal-card-foot">
        <slot name="rodape" />
        <!-- Slot para inserir o conteúdo do rodapé do modal -->
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ITarefa from "@/interfaces/ITarefa";

export default defineComponent({
  name: "ModalComp",
  props: {
    isactive: { type: String, required: true },
    // 'isactive' é uma prop que controla a classe CSS do modal para indicar se ele está ativo ou não
    tarefaEspecifica: { type: Object as () => ITarefa | null, required: true },
    // 'tarefaEspecifica' é uma prop que deve conter uma tarefa específica ou null, usada para decidir se o modal é exibido
  },
});
</script>
