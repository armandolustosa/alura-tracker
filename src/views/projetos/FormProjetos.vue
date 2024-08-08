<template>
  <section class="projetos">
    <form @submit.prevent="salvar">
      <div class="field">
        <label for="nomeDoProjeto" class="label">Nome do Projeto</label>
        <input
          type="text"
          id="idnomeDoProjeto"
          class="input"
          v-model="nomeDoProjeto"
        />
      </div>
      <div class="field">
        <input type="submit" value="Salvar" class="button" />
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import { TipoNotificacao } from "@/interfaces/INotificacao";
import { key } from "@/store";
import { defineComponent, onMounted, ref } from "vue";
import { useStore } from "vuex";
import useNotificador from "@/hooks/notificador";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "FormProjetos",
  props: {
    id: { type: String, required: true },
  },
  setup(props) {
    const store = useStore(key);
    const { notificar } = useNotificador();
    const router = useRouter();

    // Funcionalidades do Projeto
    const nomeDoProjeto = ref("");

    onMounted(() => {
      if (props.id) {
        const projeto = store.state.projeto.projetos.find(
          (projeto) => projeto.id == props.id
        );
        nomeDoProjeto.value = projeto?.nome || "";
      }
    });

    const lidarSucesso = () => {
      notificar(
        TipoNotificacao.SUCESSO,
        "Exelente!",
        "O projeto foi cadastrado com sucesso!"
      ),
        router.push("/projetos");
      nomeDoProjeto.value = "";
    };

    const salvar = () => {
      if (props.id) {
        store
          .dispatch("ALTERAR_PROJETO", {
            id: props.id,
            nome: nomeDoProjeto.value,
          })
          .then(() => lidarSucesso());
      } else {
        store
          .dispatch("CADASTRAR_PROJETO", nomeDoProjeto.value)
          .then(() => lidarSucesso());
      }
    };
    return {
      nomeDoProjeto,
      salvar,
    };
  },
});
</script>

<style scoped>
form {
  margin-left: 15px;
}

.projetos {
  width: 95%;
  margin: 30px auto;
}

label {
  color: #53627e;
  font-weight: bold;
}
</style>
