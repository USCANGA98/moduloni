<template>
  <div>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-layout mt-4 column class="align-center">
        <v-flex>
          <v-avatar>
            <v-img
              src="https://firebasestorage.googleapis.com/v0/b/moduloni.appspot.com/o/DmCzjUsLw9Mw7qugU2jYbgyG3243%2F%5Bobject%20File%5D.jpg?alt=media&token=f3ddeee5-3a95-45e6-8f23-e306a92b64e3"
            ></v-img>
          </v-avatar>
        </v-flex>

        <v-flex>
          <p class="dark--text mt-3 headline">Luis Angel Uscanga</p>
        </v-flex>
      </v-layout>
      <div>
        <v-list dense>
          <v-list-item v-for="item in items" :key="item.title" link>
            <v-list-item-icon>
              <v-icon @click="Panel()" >{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title @click="Graficos()">{{
                item.title
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <div class="v-btn__content">
          <v-btn
            @click="cerrarSesion()"
            type="button"
            class="font-weight-medium v-btn v-btn--block v-btn--depressed v-btn--flat v-btn--outlined theme--light v-size--default"
            style="color: rgb(254, 5, 69); caret-color: rgb(254, 5, 69)"
          >
            <span class="v-btn__content">
              <i
                class="v-icon notranslate v-icon--left mdi mdi-account-arrow-left theme--light"
              ></i>
              Cerrar Sesion
            </span>
          </v-btn>
        </div>
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { auth } from "../services/firebase";
export default {
  name: "NavigationDrawerComponent",
  props: {
    drawer: {
      type: Boolean,
    },
  },
  methods: {
    cerrarSesion() {
      auth
        .signOut()
        .then(() => {
          this.$router.replace("/");
          // Sign-out successful.
        })
        .catch((error) => {
          // An error happened.
          console.log(error);
        });
    },

    Graficos() {
      this.$router.push("/admin/graficos");
    },
    Panel() {
      this.$router.push("/admin");
    },
  },
  data() {
    return {
      items: [
        { title: "Graficas", icon: "Panel" },
        { title: "About", icon: "question" },
      ],
    };
  },

  watch: {
    drawer: function () {
      if (!this.drawer) this.$emit("cerrar");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>