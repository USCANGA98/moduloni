<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      expand-on-hover
      absolute
      permanent
      floating
      navigation-drawer-temporary-elevation
    >
      <!-- Condicion de renderizado para asignar un tipo de drawer a un tipo de usuario en este caso "admin" -->
      <v-layout mt-2 class="align-center" v-if="user.rol === 'admin'">
        <v-menu bottom min-width="200px" rounded offset-y>
          <template v-slot:activator="{ on }">
            <v-btn class="ml-0" fab elevation="0" color="#fff" v-on="on">
              <v-avatar size="55">
                <v-img src="../assets/utsv-logo.png"></v-img>
              </v-avatar>
            </v-btn>
          </template>
          <v-card>
            <v-list-item-content class="justify-center">
              <div class="mx-auto text-center">
                <v-avatar size="70">
                  <v-img src="../assets/utsv-logo.png"></v-img>
                </v-avatar>
                <h3>{{ user.nombre }}</h3>
                <p class="caption mt-1">
                  {{ user.rol }}
                  <v-icon color="green" right> mdi mdi-check-decagram</v-icon>
                </p>
                <v-divider v-if="user.rol != 'admin'" class="my-3"></v-divider>
                <v-btn
                  v-if="user.rol != 'admin'"
                  @click="perfil()"
                  depressed
                  rounded
                  text
                >
                  Editar Cuenta
                </v-btn>
                <v-divider class="my-3"></v-divider>
                <v-btn @click="cerrarSesion()" depressed rounded text>
                  Cerrar Sesión
                </v-btn>
              </div>
            </v-list-item-content>
          </v-card>
        </v-menu>

        <v-list>
          <v-list-item-content>
            <v-list-item-title class="title ml-3"
              >{{ user.nombre }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list>
      </v-layout>
      <!-- Condicion de renderizado para "Estudiante" -->
      <v-layout class="align-center" link v-if="user.rol === 'Estudiante'">
        <v-menu bottom min-width="200px" rounded offset-y>
          <template v-slot:activator="{ on }">
            <v-btn class="ml-0" fab elevation="0" color="#fff" v-on="on">
              <v-avatar size="48">
                <v-img :src="user.documents.fotografia.url"></v-img>
              </v-avatar>
            </v-btn>
          </template>
          <v-card>
            <v-list-item-content class="justify-center">
              <div class="mx-auto text-center">
                <v-avatar size="70">
                  <v-img :src="user.documents.fotografia.url"></v-img>
                </v-avatar>
                <h3>{{ user.nombre }}</h3>
                <p class="caption mt-1">
                  {{ user.correoElectronico }}
                  <v-icon color="green" left> mdi mdi-circle-medium</v-icon>
                </p>
                <v-divider class="my-3"></v-divider>
                <v-btn @click="perfil()" depressed rounded text>
                  Editar Cuenta
                </v-btn>
                <v-divider class="my-3"></v-divider>
                <v-btn @click="cerrarSesion()" depressed rounded text>
                  Cerrar Sesión
                </v-btn>
              </div>
            </v-list-item-content>
          </v-card>
        </v-menu>
        <v-list>
          <v-list-item-content>
            <v-list-item-title class="title ml-4"
              >{{ user.nombre }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list>
      </v-layout>
      <!-- Condicion de renderizado para "director"-->
      <v-layout
        mt-2
        class="align-center"
        v-if="
          user.rol === 'DirectorTi' ||
          user.rol === 'DirectorQui' ||
          user.rol === 'DirectorMeca' ||
          user.rol === 'DirectorMantto'
        "
      >
        <v-menu bottom min-width="200px" rounded offset-y>
          <template v-slot:activator="{ on }">
            <v-btn class="ml-0" fab elevation="0" color="#fff" v-on="on">
              <v-avatar size="55">
                <v-img src="../assets/utsv-logo.png"></v-img>
              </v-avatar>
            </v-btn>
          </template>
          <v-card>
            <v-list-item-content class="justify-center">
              <div class="mx-auto text-center">
                <v-avatar size="70">
                  <v-img src="../assets/utsv-logo.png"></v-img>
                </v-avatar>
                <h3>{{ user.nombre }}</h3>
                <p class="caption mt-1">
                  {{ user.rol }}
                  <v-icon color="green" right> mdi mdi-check-decagram</v-icon>
                </p>
                <v-divider class="my-3"></v-divider>
                <v-btn @click="perfil()" depressed rounded text>
                  Editar Cuenta
                </v-btn>
                <v-divider class="my-3"></v-divider>
                <v-btn @click="cerrarSesion()" depressed rounded text>
                  Cerrar Sesión
                </v-btn>
              </div>
            </v-list-item-content>
          </v-card>
        </v-menu>

        <v-list>
          <v-list-item-content>
            <v-list-item-title class="title ml-4"
              >{{ user.nombre }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list>
      </v-layout>
      <v-divider></v-divider>
      <!-- Items renderizados de "admin"-->
      <div>
        <v-list shaped v-if="user.rol === 'admin'">
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
              <v-list-item-title>{{ items.title }} </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <!-- Items renderizados de "Estudiante"-->
        <v-list shaped v-if="user.rol === 'Estudiante'">
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
              <v-list-item-title>{{ items.title }} </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <!--Renderizado para "director"-->
        <v-list
          shaped
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
              <v-list-item-title>{{ items.title }} </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
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
      type: Boolean,
    },
  },
  methods: {
    cerrarSesion() {
      auth
        .signOut()
        .then(function () {
          window.location.reload(true);
          // Sign-out successful.
        })
        .catch((error) => {
          // An error happened.
          console.log(error);
        });
    },
    perfil() {
      this.$router.push("/perfil");
    },
  },
  data() {
    return {
      itemsAdmin: [
        {
          title: "Panel",
          icon: "mdi-view-dashboard",
          path: "/admin",
        },
        {
          title: "Graficas",
          icon: "mdi-chart-areaspline",
          path: "/admin/graficos",
        },
        {
          title: "Agregar Director",
          icon: "mdi-account-circle",
          path: "/admin/nuevo-usuario",
        },
      ],
      itemsStudent: [
        {
          title: "Seguimiento",
          icon: "mdi-clipboard-account-outline",
          path: "/student",
        },
      ],
      itemsDirect: [
        {
          title: "Panel",
          icon: "mdi-view-dashboard",
          path: "/director",
        },
      ],
    };
  },
  computed: {
    ...mapState(["user"]),
  },

  watch: {
    drawer: function () {
      if (!this.drawer) this.$emit("cerrar");
    },
  },
};
</script>

<style lang="scss" scoped></style>
