<template>
  <div class="projetos">
    <h1 class="title">Projetos</h1>
    <router-view/>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProjetosView",
});
</script>

<style scoped>
.title,
.label {
  color: #53627e;
  padding: 20px 30px;
}
</style>
