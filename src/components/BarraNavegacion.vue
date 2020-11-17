<template>
  <div>
    <v-app-bar
      app
      style="background-color: rgb(4, 146, 6 ); border-color: rgb(44, 56, 86)"
      elevate
      dense
      color="green"
      dark
    >
      <v-app-bar-nav-icon
        @click="mostrarNavigationDrawer = true"
      ></v-app-bar-nav-icon>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-google-translate</v-icon>
        ES
      </v-btn>
    </v-app-bar>

    <NavigationDrawer
      :drawer="mostrarNavigationDrawer"
      @cerrar="mostrarNavigationDrawer = false"
    />
  </div>
</template>

<script>
import NavigationDrawer from "./NavigationDrawer";

export default {
  components: {
    NavigationDrawer
  },
  data: () => ({
    mostrarNavigationDrawer: false
  })
};
</script>

<style lang="scss" scoped></style>
