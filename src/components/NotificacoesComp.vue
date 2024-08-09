<template>
  <div class="notificacoes">
    <!-- Itera sobre a lista de notificações e cria um artigo para cada uma -->
     <!-- A classe do artigo é dinamicamente atribuída com base no tipo da notificação -->
    <article
      class="message"
      :class="contexto[notificacao.tipo]"
      v-for="notificacao in notificacoes"
      :key="notificacao.id"
    >
      <div class="message-header">{{ notificacao.titulo }}</div>
      <div class="message-body">{{ notificacao.texto }}</div>
    </article>
  </div>
</template>

<script lang="ts">
import { TipoNotificacao } from "@/interfaces/INotificacao";
import { key } from "@/store";
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "NotificacoesComp",
  data() {
    return {
      contexto: {
        [TipoNotificacao.SUCESSO]: "is-success",  // Classe CSS para notificações de sucesso
        [TipoNotificacao.ATENCAO]: "is-warning",  // Classe CSS para notificações de atenção
        [TipoNotificacao.FALHA]: "is-danger",     // Classe CSS para notificações de falha
      },
    };
  },
  setup() {
    const store = useStore(key);  // Obtém a store Vuex

    return {
      notificacoes: computed(() => store.state.tarefa.notificacoes),
      // Obtém as notificações do estado Vuex e as torna reativas
    };
  },
});
</script>

<style scoped>
.notificacoes {
  position: absolute;
  right: 0;
  width: 300px;
  padding: 8px;
  z-index: 105;
}
</style>
