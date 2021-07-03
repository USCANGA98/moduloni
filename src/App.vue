<template>
  <v-app>
    <v-fade-transition>
      <BarraNavegacion
        v-if="
          $route.path != '/' &&
          $route.path != '/registro' &&
          $route.path != '/restablecer-contrasena'"
      />
    </v-fade-transition>
    <NavigationDrawer v-if="$route.path != '/' && $route.path != '/registro' && $route.path != '/restablecer-contrasena'" />
    <v-main :class="$vuetify.theme.dark ? '' : 'grey lighten-5'">
      <v-card
        max-height="30"
        v-if="$route.path != '/' && $route.path != '/registro' && $route.path != '/restablecer-contrasena'"
        flat
        color="rgba(0, 0, 0, 0)"
      >
        <v-card-text v-if="user.rol == 'admin'" class="font-weight-bold">
          Carreras {{ new Date().getFullYear() }}
        </v-card-text>
        <v-card-text v-else class="font-weight-bold">
          Año {{ new Date().getFullYear() }}
        </v-card-text>
      </v-card>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>
<script>
import { mapState } from "vuex";
import BarraNavegacion from "./components/BarraNavegacion";
import NavigationDrawer from "./components/NavigationDrawer";

export default {
  name: "App",
  
  computed: {
    ...mapState(["user"]),
  },

  components: {
    BarraNavegacion,
    NavigationDrawer,
  },

  data: () => ({
    //
  }),
};
</script>
