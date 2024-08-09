import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"; // Importa funções e tipos para configurar o roteamento
import TarefasView from "../views/TarefasView.vue";
import ProjetosView from "../views/ProjetosView.vue";
import ListaView from "../views/projetos/ListaView.vue";
import FormProjetos from "../views/projetos/FormProjetos.vue";

// Define as rotas da aplicação
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

// Cria uma instância do roteador
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL), // Configura o histórico de navegação usando a base URL definida no ambiente
  routes, // Define as rotas configuradas
});

export default router;
