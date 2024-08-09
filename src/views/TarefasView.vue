<template>
  <div>
    <FormularioComp @aoSalvarTarefa="salvarTarefa" />
    <div class="lista">
      <div class="field">
        <p class="control has-icons-left">
          <input
            class="input"
            type="text"
            placeholder="Digite para filtrar"
            v-model="filtro"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-search"></i>
          </span>
        </p>
      </div>
      <ModalComp :isactive="isactive" :tarefaEspecifica="tarefaEspecifica">
        <template v-slot:cabecalho>
          <p class="modal-card-title">Editando Tarefa</p>
          <button
            class="delete"
            aria-label="close"
            @click="fecharModal"
          ></button>
        </template>
        <template v-slot:corpo>
          <div class="field">
            <label for="descricaoDaTarefa" class="label">Descrição</label>
            <input
              type="text"
              id="descricaoDaTarefa"
              class="input"
              v-model="descricao"
            />
          </div>
        </template>
        <template v-slot:rodape>
          <div class="buttons">
            <button class="button is-success" @click="alterarTarefa">
              Salvar Alterações
            </button>
            <button class="button" @click="fecharModal">Cancelar</button>
          </div>
        </template>
      </ModalComp>
      <BoxComp v-if="listaEstaVazia"> Não há nenhuma tarefa :( </BoxComp>
      <TarefaComp
        @tarefaClicada="tarefaSelecionada"
        v-for="(tarefa, index) in tarefas"
        :key="index"
        :tarefa="tarefa"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import FormularioComp from "@/components/FormularioComp.vue";
import TarefaComp from "@/components/TarefaComp.vue";
import BoxComp from "@/components/BoxComp.vue";
import { useStore } from "vuex";
import { key } from "@/store";
import ITarefa from "@/interfaces/ITarefa";
import ModalComp from "@/components/ModalComp.vue";

export default defineComponent({
  name: "App",
  components: {
    FormularioComp,
    TarefaComp,
    BoxComp,
    ModalComp,
  },
  setup() {
    const store = useStore(key);
    store.dispatch("OBTER_TAREFAS");
    store.dispatch("OBTER_PROJETOS");

    const filtro = ref("");
    const tarefaEspecifica = ref<ITarefa | null>(null);
    const isactive = ref("");

    const tarefas = computed(() =>
      store.state.tarefa.tarefas.filter(
        (tarefa) => !filtro.value || tarefa.descricao.includes(filtro.value)
      )
    );

    const listaEstaVazia = computed(() => tarefas.value.length === 0);

    const descricao = computed({
      get: () => tarefaEspecifica.value ? tarefaEspecifica.value.descricao : "",
      set: (value: string) => {
        if (tarefaEspecifica.value) {
          tarefaEspecifica.value.descricao = value;
        }
      }
    });

    function salvarTarefa(tarefa: ITarefa) {
      store.dispatch("CADASTRAR_TAREFA", tarefa);
    }

    function tarefaSelecionada(tarefa: ITarefa) {
      isactive.value = "is-active";
      tarefaEspecifica.value = tarefa;
    }

    function fecharModal() {
      isactive.value = "";
      tarefaEspecifica.value = null;
    }

    function alterarTarefa() {
      if (tarefaEspecifica.value) {
        store.dispatch("ALTERAR_TAREFA", tarefaEspecifica.value).then(() => {
          fecharModal();
        });
      }
    }

    return {
      tarefas,
      filtro,
      isactive,
      descricao,
      listaEstaVazia,
      salvarTarefa,
      tarefaSelecionada,
      fecharModal,
      alterarTarefa,
      tarefaEspecifica
    };
  },
});
</script>
