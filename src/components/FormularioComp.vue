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
import { computed, defineComponent } from "vue";
import TemporizadorComp from "./TemporizadorComp.vue";
import { useStore } from "vuex";
import { key } from "@/store";

export default defineComponent({
  name: "FormularioComp",
  components: {
    TemporizadorComp,
  },
  emits: ["aoSalvarTarefa"], // Define eventos emitidos pelo componente
  data() {
    return {
      descricao: "",
      idProjeto: "",
    };
  },
  methods: {
    // Método para finalizar a tarefa
    finalizarTarefa(tempoDecorrido: number): void {
      // Emite o evento aoSalvarTarefa com a descrição e a duração da tarefa
      this.$emit("aoSalvarTarefa", {
        descricao: this.descricao,
        duracaoEmSegundos: tempoDecorrido,
        projeto: this.projetos.find(projeto => projeto.id == this.idProjeto),
      });

      // Limpa o campo de descrição da tarefa após salvar
      this.descricao = "";
    },
  },
  setup() {
    const store = useStore(key);
    return {
      projetos: computed(() => store.state.projeto.projetos),
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
