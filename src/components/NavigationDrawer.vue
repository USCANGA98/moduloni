<template>
  <div>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-layout mt-4 column class="align-center" v-show="user.rol === 'admin'">
        <v-flex>
          <v-avatar>
            <v-img
              src="https://firebasestorage.googleapis.com/v0/b/moduloni.appspot.com/o/DmCzjUsLw9Mw7qugU2jYbgyG3243%2F%5Bobject%20File%5D.jpg?alt=media&token=f3ddeee5-3a95-45e6-8f23-e306a92b64e3"
            ></v-img>
          </v-avatar>
        </v-flex>

        <v-flex>
          <v-toolbar-title class="dark--text mt-3 title"
            >Luis Angel Uscanga</v-toolbar-title
          >
        </v-flex>
      </v-layout>
      <!-- -->
      <v-layout
        mt-4
        column
        class="align-center"
        v-show="user.rol === 'Estudiante'"
      >
        <v-flex>
          <v-avatar>
            <v-img
              src="https://firebasestorage.googleapis.com/v0/b/moduloni.appspot.com/o/DmCzjUsLw9Mw7qugU2jYbgyG3243%2F%5Bobject%20File%5D.jpg?alt=media&token=f3ddeee5-3a95-45e6-8f23-e306a92b64e3"
            ></v-img>
          </v-avatar>
        </v-flex>

        <v-flex>
          <v-toolbar-title class="dark--text mt-3 title">{{
            user.nombre
          }}</v-toolbar-title>
        </v-flex>
      </v-layout>
      <!-- -->
      <div>
        <v-list dense v-if="user.rol === 'admin'">
          <v-list-item
            v-for="items in itemsAdmin"
            :key="items.title"
            link
            :to="items.path"
            exact
          >
            <v-list-item-icon>
              <v-icon>{{ items.icon }} </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-icon>{{ items.title }} </v-list-item-icon>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <!---->
        <v-list dense v-else>
          <v-list-item
            v-for="items in itemsStudent"
            :key="items.title"
            link
            :to="items.path"
            exact
          >
            <v-list-item-icon>
              <v-icon>{{ items.icon }} </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-icon>{{ items.title }} </v-list-item-icon>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <!---->
        <div>
          <v-btn
            @click="cerrarSesion()"
            type="button"
            class="v-btn--block v-btn--depressed v-btn--flat"
            style="color: rgb(254, 5, 69); caret-color: rgb(254, 5, 69)"
          >
            <span>
              <i
                class="v-icon notranslate v-icon--left mdi mdi-power theme--light"
              ></i>
              Salir
            </span>
          </v-btn>
        </div>
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { auth } from "../services/firebase";
import { mapState } from "vuex";
export default {
  name: "NavigationDrawerComponent",
  props: {
    drawer: {
      type: Boolean
    }
  },
  methods: {
    cerrarSesion() {
      auth
        .signOut()
        .then(() => {
          this.$router.replace("/");
          // Sign-out successful.
        })
        .catch(error => {
          // An error happened.
          console.log(error);
        });
    }
  },
  data() {
    return {
      itemsAdmin: [
        {
          title: "Panel",
          icon: "mdi-view-dashboard",
          path: "/admin"
        },
        {
          title: "Graficas",
          icon: "mdi-chart-areaspline",
          path: "/admin/graficos"
        }
      ],
      itemsStudent: ""
    };
  },
  computed: {
    ...mapState(["user"])
  },

  watch: {
    drawer: function() {
      if (!this.drawer) this.$emit("cerrar");
    }
  }
};
</script>

<style lang="scss" scoped></style>
