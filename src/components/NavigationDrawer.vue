<template>
  <div>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <!-- Condicion de renderizado para asignar un tipo de drawer a un tipo de usuario en este caso "admin" -->
      <v-layout mt-4 column class="align-center" v-if="user.rol === 'admin'">
        <v-flex>
          <div>
            <v-img
              max-height="70"
              max-width="100"
              src="../assets/utsv-logo.png"
            ></v-img>
          </div>
        </v-flex>

        <v-flex>
          <v-toolbar-title class="dark--text mt-3 title">{{
            user.nombre
          }}</v-toolbar-title>
        </v-flex>
      </v-layout>
      <!-- Condicion de renderizado para "Estudiante" -->
      <v-layout
        mt-4
        column
        class="align-center"
        v-if="user.rol === 'Estudiante'"
      >
        <v-flex>
          <v-avatar>
            <v-img src="../assets/user.png"></v-img>
          </v-avatar>
        </v-flex>
        <v-flex>
          <v-toolbar-title class="dark--text mt-3 title">{{
            user.nombre
          }}</v-toolbar-title>
        </v-flex>
      </v-layout>
      <!-- Condicion de renderizado para "director"-->
      <v-layout
        mt-4
        column
        class="align-center"
        v-if="
          user.rol === 'DirectorTi' ||
            user.rol === 'DirectorQui' ||
            user.rol === 'DirectorMeca' ||
            user.rol === 'DirectorMantto'
        "
      >
        <v-flex>
          <div>
            <v-img
              max-height="70"
              max-width="100"
              src="../assets/utsv-logo.png"
            ></v-img>
          </div>
        </v-flex>
        <v-flex>
          <v-toolbar-title class="dark--text mt-3 title"
            >{{ user.rol }}&nbsp;{{ user.nombre }}</v-toolbar-title
          >
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
      <!-- Items renderizados de "admin"-->
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
        <!-- Items renderizados de "Estudiante"-->
        <v-list dense v-if="user.rol === 'Estudiante'">
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
        <!--Renderizado para "director"-->
        <v-list
          dense
          v-if="
            user.rol === 'DirectorTi' ||
              user.rol === 'DirectorQui' ||
              user.rol === 'DirectorMeca' ||
              user.rol === 'DirectorMantto'
          "
        >
          <v-list-item
            v-for="items in itemsDirect"
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
        <div>
          <v-btn
            @click="cerrarSesion()"
            type="button"
            class="v-btn--block v-btn--depressed v-btn--flat "
            style="color: rgb(254, 5, 69); caret-color: rgb(254, 5, 69)"
          >
            <span>
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
        .then(function() {
          window.location.reload(true);
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
        },
        {
          title: "Nuevo Usuario",
          icon: "mdi-account-plus",
          path: "/admin/nuevo-usuario"
        }
      ],
      itemsStudent: "",
      itemsDirect: [
        {
          title: "Panel",
          icon: "mdi-view-dashboard",
          path: "/director"
        }
      ]
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
