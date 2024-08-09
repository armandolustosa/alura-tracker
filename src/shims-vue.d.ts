declare module '*.vue' {
  // Declara um módulo para arquivos .vue
  import type { DefineComponent } from 'vue'
  // Importa o tipo DefineComponent do Vue

  const component: DefineComponent<{}, {}, any>
  // Declara um componente Vue como um tipo DefineComponent
  // {} para props, {} para emite e any para o tipo do componente
  export default component
  // Exporta o componente como padrão
}
