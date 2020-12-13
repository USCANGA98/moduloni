<template>
  <v-app>
    <!-- <BarraNavegacion v-if="$route.path != '/' && $route.path != '/registro'" /> -->
    <NavigationDrawer v-if="$route.path != '/' && $route.path != '/registro'" />
    <v-main class="grey lighten-5">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
// import BarraNavegacion from "./components/BarraNavegacion";
import NavigationDrawer from "./components/NavigationDrawer";

export default {
  name: "App",
  mounted() {},

  components: {
    // BarraNavegacion,
    NavigationDrawer,
  },

  data: () => ({
    //
  }),
};
</script>
