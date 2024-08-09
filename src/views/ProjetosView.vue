<template>
  <div class="projetos">
    <!-- Título da página de projetos -->
    <h1 class="title">Projetos</h1>
    <!-- Componente de visualização de rotas aninhadas -->
    <router-view />
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
