<template>
  <div class="box formulario">
    <div class="columns">
      <div
        class="column is-5"
        role="form"
        aria-label="Formulário para criação de uma nova tarefa"
      >
        <!-- Campo de entrada de texto para a descrição da tarefa -->
        <input
          type="text"
          class="input"
          placeholder="Qual tarefa você deseja iniciar? "
          v-model="descricao"
        />
        <!-- Vincula o valor do campo de entrada (descrição) ao modelo de dados 'descricao' -->
      </div>

      <div class="column is-3">
        <div class="select">
          <select v-model="idProjeto">
            <option value="">Selecione o Projeto</option>
            <option
              :value="projeto.id"
              v-for="projeto in projetos"
              :key="projeto.id"
            >
              {{ projeto.nome }}
            </option>
          </select>
        </div>
      </div>

      <div class="column">
        <TemporizadorComp @ao-temporizador-finalizar="finalizarTarefa" />
        <!-- Captura o evento ao-temporizador-finalizar para finalizar a tarefa -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, EmitsOptions, ref } from "vue";
import TemporizadorComp from "./TemporizadorComp.vue";
import { useStore } from "vuex";
import { key } from "@/store";

export default defineComponent({
  name: "FormularioComp",
  components: {
    TemporizadorComp,
  },
  emits: ["aoSalvarTarefa"], // Define eventos emitidos pelo componente

  setup(props, { emit }) {
    const store = useStore(key);
    const descricao = ref("");
    const idProjeto = ref("");

    // Obtém a lista de projetos do estado da store
    const projetos = computed(() => store.state.projeto.projetos);

    // Função para finalizar a tarefa
    const finalizarTarefa = (tempoDecorrido: number): void => {
      // Emite o evento aoSalvarTarefa com a descrição e a duração da tarefa
      emit("aoSalvarTarefa", {
        descricao: descricao.value,
        duracaoEmSegundos: tempoDecorrido,
        projeto: projetos.value.find(
          (projeto) => projeto.id === idProjeto.value
        ),
      });

      // Limpa o campo de descrição da tarefa após salvar
      descricao.value = "";
    };

    return {
      descricao,
      idProjeto,
      projetos,
      finalizarTarefa,
    };
  },
});
</script>

<style>
.formulario {
  color: var(--texto-primario);
  background: var(--bg-primario);
}
</style>
