<template>
  <v-app>
    <BarraNavegacion />
    <v-main class="grey lighten-5">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import BarraNavegacion from "./components/BarraNavegacion";
export default {
  name: "App",

  components: {
    BarraNavegacion
  },

  data: () => ({
    
    //
  }),
};
</script>
