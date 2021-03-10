<template>
  <div>
    <v-app-bar app elevate dense color="white" dark>
      <v-app-bar-nav-icon
        style="color: black"
        @click="mostrarNavigationDrawer = true"
      ></v-app-bar-nav-icon>

      <v-spacer></v-spacer>
      <v-menu
        v-if="user.rol == 'admin'"
        max-width="100"
        min-width="150"
        origin="center center"
        transition="scale-transition"
        bottom
        offset-x
      >
        <template v-slot:activator="{ on: menu, attrs }">
          <v-tooltip color="grey darken-3" bottom>
            <template v-slot:activator="{ on: tooltip }">
              <v-btn
                v-bind="attrs"
                icon
                elevation="0"
                color="#fff"
                v-on="{ ...tooltip, ...menu }"
              >
                <v-avatar color="blue-grey lighten-5" size="37">
                  <v-img src="../assets/utsv-logo.png"></v-img>
                </v-avatar>
              </v-btn>
            </template>
            <span
              >Cuenta UTSV <br />
              <span>{{ user.nombre }} </span>
              <br />
              <span>{{ user.correoElectronico }}</span>
            </span>
          </v-tooltip>
        </template>
        <v-card>
          <v-card color="blue" min-height="10" tile flat> </v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <v-hover v-slot:default="{ hover }" open-delay="0">
                <v-btn class="mb-3 mt-3" depressed fab icon>
                  <v-avatar
                    :class="`elevation-${hover ? 4 : 1}`"
                    class="mb-2 mt-1 transition-swing"
                    color="white"
                    size="60"
                  >
                    <v-img src="../assets/utsv-logo.png"></v-img>
                  </v-avatar>
                </v-btn>
              </v-hover>
              <h3>
                {{ user.nombre }}
                <v-icon color="blue" small> mdi mdi-check-decagram</v-icon>
              </h3>
              <p class="caption mt-1">
                {{ user.rol }}
              </p>
              <v-divider class="my-3"></v-divider>
              <v-btn
                @click="cerrarSesion()"
                depressed
                rounded
                color="pink"
                text
              >
                Salir <v-icon right small>mdi-account-arrow-left</v-icon>
              </v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>
      <!--Termina condicional de administrador-->
      <v-menu
        v-if="user.rol == 'Estudiante'"
        max-width="100"
        min-width="150"
        origin="center center"
        transition="scale-transition"
        bottom
        offset-x
      >
        <template v-slot:activator="{ on: menu, attrs }">
          <v-tooltip color="grey darken-3" bottom>
            <template v-slot:activator="{ on: tooltip }">
              <v-btn
                v-bind="attrs"
                icon
                elevation="0"
                color="#fff"
                v-on="{ ...tooltip, ...menu }"
              >
                <v-avatar color="blue-grey lighten-5" size="37">
                  <v-img :src="user.documents.fotografia.url"></v-img>
                </v-avatar>
              </v-btn>
            </template>
            <span
              >Cuenta Estudiante UTSV <br />
              <span
                >{{ user.nombre }} {{ user.apellidoPaterno }}
                {{ user.apellidoMaterno }}</span
              >
              <br />
              <span>{{ user.correoElectronico }}</span>
            </span>
          </v-tooltip>
        </template>
        <v-card>
          <v-card color="blue" min-height="10" tile flat> </v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <v-hover v-slot:default="{ hover }" open-delay="0">
                <v-btn @click="perfil()" class="mb-3 mt-3" depressed fab icon>
                  <v-avatar
                    :class="`elevation-${hover ? 4 : 1}`"
                    class="mb-2 transition-swing"
                    color="white"
                    size="60"
                  >
                    <v-img :src="user.documents.fotografia.url"></v-img>
                  </v-avatar>
                </v-btn>
              </v-hover>
              <h3>
                {{ user.nombre }}
                <v-icon color="blue" small>mdi mdi-check-decagram</v-icon>
              </h3>

              <p class="caption mt-1">
                {{ user.correoElectronico }}
              </p>
              <v-divider class="my-3"></v-divider>
              <v-btn @click="perfil()" depressed text> Editar Cuenta </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn @click="cerrarSesion()" depressed text>
                Cerrar Sesión
              </v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>
      <!--Termina condicional de estudiante-->
      <v-menu
        v-if="
          user.rol === 'DirectorTi' ||
          user.rol === 'DirectorQui' ||
          user.rol === 'DirectorMeca' ||
          user.rol === 'DirectorMantto'
        "
        max-width="100"
        min-width="150"
        origin="center center"
        transition="scale-transition"
        bottom
        offset-x
      >
        <template v-slot:activator="{ on: menu, attrs }">
          <v-tooltip color="grey darken-3" bottom>
            <template v-slot:activator="{ on: tooltip }">
              <v-btn
                v-bind="attrs"
                icon
                elevation="0"
                color="#fff"
                v-on="{ ...tooltip, ...menu }"
              >
                <v-avatar color="blue-grey lighten-5" size="37">
                  <v-img src="../assets/utsv-logo-2.jpg"></v-img>
                </v-avatar>
              </v-btn>
            </template>
            <span
              >Cuenta {{ user.rol }} <br />
              <span
                >{{ user.nombre }} {{ user.apellidoPaterno }}
                {{ user.apellidoMaterno }}</span
              >
              <br />
              <span>{{ user.correoElectronico }}</span>
            </span>
          </v-tooltip>
        </template>
        <v-card>
          <v-card color="blue" min-height="10" tile flat> </v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <v-hover v-slot:default="{ hover }" open-delay="0">
                <v-btn @click="perfil()" class="mb-3 mt-3" depressed fab icon>
                  <v-avatar
                    :class="`elevation-${hover ? 4 : 1}`"
                    class="mb-2 transition-swing"
                    color="white"
                    size="60"
                  >
                    <v-img src="../assets/utsv-logo-2.jpg"></v-img>
                  </v-avatar>
                </v-btn>
              </v-hover>
              <h3>
                {{ user.nombre }}
                <v-icon color="blue" small>mdi mdi-check-decagram</v-icon>
              </h3>

              <p class="caption mt-1">
                {{ user.correoElectronico }}
              </p>
              <v-divider class="my-3"></v-divider>
              <v-btn @click="perfil()" depressed text> Editar Cuenta </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn @click="cerrarSesion()" depressed text>
                Cerrar Sesión
              </v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>

      <!-- <v-btn icon>
        <v-icon>mdi-google-translate</v-icon>
        ES
      </v-btn> -->
    </v-app-bar>

    <NavigationDrawer
      :drawer="mostrarNavigationDrawer"
      @cerrar="mostrarNavigationDrawer = false"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { auth } from "../services/firebase";
import NavigationDrawer from "./NavigationDrawer";

export default {
  components: {
    NavigationDrawer,
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
  data: () => ({
    mostrarNavigationDrawer: false,
  }),
  computed: {
    ...mapState(["user"]),
  },
};
</script>

<style lang="scss" scoped></style>
