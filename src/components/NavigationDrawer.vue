<template>
  <div>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list-item>
        <v-list-item-avatar class="absolte">
          <v-img src="https://randomuser.me/api/portraits/men/79.jpg"></v-img>
        </v-list-item-avatar>
      </v-list-item>
      <div>
        <v-list dense>
          <v-list-item v-for="item in items" :key="item.title" link>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title @click="Panel()" >{{ item.title }}</v-list-item-title>
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

  },
  data() {
    return {
      items: [
        { title: "Home", icon: "Panel" },
        { title: "About", icon: "question_answer" },
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