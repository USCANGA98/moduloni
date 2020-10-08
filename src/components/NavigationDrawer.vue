<template>
  <div>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{user}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <div>
        <div>
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
        .then( () => {
          this.$router.replace('/');
          // Sign-out successful.
        })
        .catch( (error) => {
          // An error happened.
          console.log(error);
        });
    },
  },
  data() {
    return {
      items: [
        { title: "Home", icon: "dashboard" },
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