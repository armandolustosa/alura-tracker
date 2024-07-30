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
import { defineComponent } from "vue";
import { useStore } from "vuex";
import useNotificador from "@/hooks/notificador";

export default defineComponent({
  name: "FormProjetos",
  props: {
    id: { type: String, required: true },
  },
  data() {
    return {
      nomeDoProjeto: "",
    };
  },
  mounted() {
    if (this.id) {
      const projeto = this.store.state.projetos.find(
        (projeto) => projeto.id == this.id
      );
      this.nomeDoProjeto = projeto?.nome || "";
    }
  },
  methods: {
    salvar() {
      if (this.id) {
        this.store
          .dispatch("ALTERAR_PROJETO", {
            id: this.id,
            nome: this.nomeDoProjeto,
          })
          .then(() => this.lidarSucesso());
      } else {
        this.store
          .dispatch("CADASTRAR_PROJETO", this.nomeDoProjeto)
          .then(() => this.lidarSucesso());
      }
    },
    lidarSucesso() {
      this.notificar(
        TipoNotificacao.SUCESSO,
        "Exelente!",
        "O projeto foi cadastrado com sucesso!"
      ),
        this.$router.push("/projetos");
      this.nomeDoProjeto = "";
    },
  },
  setup() {
    const store = useStore(key);
    const { notificar } = useNotificador();
    return {
      store,
      notificar,
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
