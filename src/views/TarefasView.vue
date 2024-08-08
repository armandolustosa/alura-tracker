<template>
  <FormularioComp @aoSalvarTarefa="salvarTarefa" />
  <div class="lista">
    <TarefaComp
      @tarefaClicada="tarefaSelecionada"
      v-for="(tarefa, index) in listaTarefas"
      :key="index"
      :tarefa="tarefa"
    />
    <BoxComp v-if="listaEstaVazia">
      Você não está muito produtivo hoje :(
    </BoxComp>

    <div :class="['modal', isactive]" v-if="tarefaEspecifica">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Editando Tarefa</p>
          <button
            class="delete"
            aria-label="close"
            @click="fecharModal"
          ></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label for="descricaoDaTarefa" class="label">Descrição</label>
            <input
              type="text"
              id="idnomeDoProjeto"
              class="input"
              v-model="tarefaEspecifica.descricao"
            />
          </div>
        </section>
        <footer class="modal-card-foot">
          <div class="buttons">
            <button class="button is-success" @click="alterarTarefa">
              Salvar Alterações
            </button>
            <button class="button" @click="fecharModal">Cancelar</button>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import FormularioComp from "@/components/FormularioComp.vue";
import TarefaComp from "@/components/TarefaComp.vue";
import BoxComp from "@/components/BoxComp.vue";
import { useStore } from "vuex";
import { key } from "@/store";
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
      isactive: "",
      tarefaEspecifica: null as ITarefa | null,
    };
  },
  computed: {
    listaEstaVazia(): boolean {
      return this.listaTarefas ? this.listaTarefas.length === 0 : true;
    },
  },
  methods: {
    salvarTarefa(tarefa: ITarefa) {
      this.store.dispatch("CADASTRAR_TAREFA", tarefa);
    },
    tarefaSelecionada(tarefa: ITarefa) {
      this.isactive = "is-active";
      this.tarefaEspecifica = tarefa;
    },
    fecharModal() {
      this.isactive = "";
      this.tarefaEspecifica = null;
    },
    alterarTarefa() {
      if (this.tarefaEspecifica) {
        this.store.dispatch("ALTERAR_TAREFA", this.tarefaEspecifica)
          .then(() => this.fecharModal());
      }
    },
  },
  setup() {
    const store = useStore(key);
    store.dispatch("OBTER_TAREFAS");
    store.dispatch("OBTER_PROJETOS");
    return {
      listaTarefas: computed(() => store.state.tarefa.tarefas),
      store,
    };
  },
});
</script>
