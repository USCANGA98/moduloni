<template>
  <v-app>
    <!-- <BarraNavegacion v-if="$route.path != '/' && $route.path != '/registro'" /> -->
    <NavigationDrawer v-if="$route.path != '/' && $route.path != '/registro'" />
    <v-main class="grey lighten-5">
      <v-card
        max-height="30"
        v-if="$route.path != '/' && $route.path != '/registro'"
        flat
        color="rgba(0, 0, 0, 0)"
      >
        <v-card-text class="font-weight-bold">
          Todas las carreras {{ new Date().getFullYear() }}
        </v-card-text>
        <v-card-text class="text-right mt-n16">
          Hora actual
          <h3 class="font-weight-bold text-right">
            {{ getHora }}
          </h3></v-card-text
        >
      </v-card>
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
  created() {
    let self = this;
    setInterval(function () {
      self.actualizarHora();
    }, 1000);
  },
  methods: {
    actualizarHora() {
      let fecha = new Date(Date.now());
      this.hora = fecha.getHours() - 12;
      this.minutos = fecha.getMinutes();
      this.segundos = fecha.getSeconds();
      this.hora = this.hora > 9 ? this.hora : "0" + this.hora.toString();
      this.minutos =
        this.minutos > 9 ? this.minutos : "0" + this.minutos.toString();
      this.segundos =
        this.segundos > 9 ? this.segundos : "0" + this.segundos.toString();
    },
  },
  computed: {
    getHora() {
      if (this.hora > 11 && this.minutos > 59) {
        return `${this.hora}:${this.minutos}:${this.segundos} AM`;
      } else return `${this.hora}:${this.minutos}:${this.segundos} PM`;
    },
  },

  components: {
    // BarraNavegacion,
    NavigationDrawer,
  },

  data: () => ({
    hora: 0,
    minutos: 0,
    segundos: 0,
    //
  }),
};
</script>
