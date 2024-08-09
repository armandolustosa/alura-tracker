<template>
  <div>
    <!-- Componente para o formulário de tarefas -->
    <FormularioComp @aoSalvarTarefa="salvarTarefa" />

    <div class="lista">
      <!-- Campo de entrada para filtrar tarefas -->
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

      <!-- Componente modal para editar tarefas -->
      <ModalComp :isactive="isactive" :tarefaEspecifica="tarefaEspecifica">
        <!-- Slot para o cabeçalho do modal -->
        <template v-slot:cabecalho>
          <p class="modal-card-title">Editando Tarefa</p>
          <button
            class="delete"
            aria-label="close"
            @click="fecharModal"
          ></button>
        </template>

        <!-- Slot para o corpo do modal -->
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

        <!-- Slot para o rodapé do modal -->
        <template v-slot:rodape>
          <div class="buttons">
            <button class="button is-success" @click="alterarTarefa">
              Salvar Alterações
            </button>
            <button class="button" @click="fecharModal">Cancelar</button>
          </div>
        </template>
      </ModalComp>

      <!-- Componente exibido quando a lista de tarefas está vazia -->
      <BoxComp v-if="listaEstaVazia"> Não há nenhuma tarefa :( </BoxComp>

      <!-- Componente para exibir cada tarefa na lista -->
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

    // Obtém as tarefas e projetos do estado da store ao montar o componente
    store.dispatch("OBTER_TAREFAS");
    store.dispatch("OBTER_PROJETOS");

    // Estado reativo para o filtro de tarefas
    const filtro = ref("");
    
    // Estado reativo para a tarefa específica selecionada no modal
    const tarefaEspecifica = ref<ITarefa | null>(null);

    // Estado reativo para controlar a visibilidade do modal
    const isactive = ref("");

    // Computa a lista de tarefas filtradas com base no valor de 'filtro'
    const tarefas = computed(() =>
      store.state.tarefa.tarefas.filter(
        (tarefa) => !filtro.value || tarefa.descricao.includes(filtro.value)
      )
    );

    // Computa se a lista de tarefas está vazia
    const listaEstaVazia = computed(() => tarefas.value.length === 0);

    // Computa e define a descrição da tarefa específica
    const descricao = computed({
      get: () =>
        tarefaEspecifica.value ? tarefaEspecifica.value.descricao : "",
      set: (value: string) => {
        if (tarefaEspecifica.value) {
          tarefaEspecifica.value.descricao = value;
        }
      },
    });

    // Função para salvar uma nova tarefa
    function salvarTarefa(tarefa: ITarefa) {
      store.dispatch("CADASTRAR_TAREFA", tarefa);
    }

    // Função para selecionar uma tarefa e abrir o modal
    function tarefaSelecionada(tarefa: ITarefa) {
      isactive.value = "is-active";
      tarefaEspecifica.value = tarefa;
    }

    // Função para fechar o modal
    function fecharModal() {
      isactive.value = "";
      tarefaEspecifica.value = null;
    }

    // Função para alterar a tarefa e fechar o modal
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
      tarefaEspecifica,
    };
  },
});
</script>
