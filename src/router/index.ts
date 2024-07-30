import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import TarefasView from "../views/TarefasView.vue";
import ProjetosView from "../views/ProjetosView.vue";
import ListaView from "../views/projetos/ListaView.vue";
import FormProjetos from "../views/projetos/FormProjetos.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Tarefas",
    component: TarefasView,
  },
  {
    path: "/projetos",
    name: "Projetos",
    component: ProjetosView,
    children: [
      {
        path: "",
        name: "Lista",
        component: ListaView,
      },
      {
        path: "/projetos/novo",
        name: "Novo Projeto",
        component: FormProjetos,
      },
      {
        path: "/projetos/:id",
        name: "Editar Projeto",
        component: FormProjetos,
        props: true,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
