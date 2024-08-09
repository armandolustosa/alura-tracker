<template>
  <div :class="['modal', isactive]" v-if="tarefaEspecifica">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <slot name="cabecalho" />
      </header>
      <section class="modal-card-body">
        <slot name="corpo" />
      </section>
      <footer class="modal-card-foot">
        <slot name="rodape" />
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
    tarefaEspecifica: { type: Object as () => ITarefa | null, required: true },
  },
});
</script>
