<template>
  <div>
    <v-navigation-drawer
      v-if="$vuetify.breakpoint.width >= 960"
      app
      v-model="drawer"
      width="190"
      permanent
    >
      <!-- Condicion de renderizado para asignar un tipo de drawer a un tipo de usuario en este caso "admin" -->
      <v-layout class="align-center" v-if="user.rol === 'admin'">
        <v-menu
          max-width="250"
          transition="scale-transition"
          bottom
          min-width="200"
          offset-x
        >
          <template v-slot:activator="{ on: menu, attrs }">
            <v-tooltip color="grey darken-3" bottom>
              <template v-slot:activator="{ on: tooltip }">
                <v-btn
                  v-bind="attrs"
                  class="ma-2"
                  fab
                  elevation="0"
                  color="#fff"
                  v-on="{ ...tooltip, ...menu }"
                >
                  <v-avatar size="50">
                    <v-img src="../assets/utsv-logo.png"></v-img>
                  </v-avatar>
                </v-btn>
              </template>
              <span>Cuenta Administrador</span>
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
                      size="70"
                    >
                      <v-img
                        max-height="68"
                        max-width="68"
                        src="../assets/utsv-logo.png"
                      ></v-img>
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
              </div>
            </v-list-item-content>
          </v-card>
        </v-menu>
        <v-list class="cortar">
          <v-list-item-title>
            <strong>
              {{ user.nombre }}
            </strong>
          </v-list-item-title>
        </v-list>
      </v-layout>
      <!-- Condicion de renderizado para "Estudiante" -->
      <v-layout class="align-center" link v-if="user.rol === 'Estudiante'">
        <v-menu
          max-width="250"
          transition="scale-transition"
          bottom
          min-width="200"
          offset-x
        >
          <template v-slot:activator="{ on: menu, attrs }">
            <v-tooltip color="grey darken-3" bottom>
              <template v-slot:activator="{ on: tooltip }">
                <v-btn
                  v-bind="attrs"
                  class="ma-2"
                  fab
                  elevation="0"
                  color="#fff"
                  v-on="{ ...tooltip, ...menu }"
                >
                  <v-avatar size="50">
                    <v-img :src="user.documents.fotografia.url"></v-img>
                  </v-avatar>
                </v-btn>
              </template>
              <span> Ver Cuenta</span>
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
                      size="70"
                    >
                      <v-img
                        max-height="68"
                        max-width="68"
                        :src="user.documents.fotografia.url"
                      ></v-img>
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
                <v-btn @click="perfil()" depressed rounded text>
                  Editar Cuenta
                </v-btn>
              </div>
            </v-list-item-content>
          </v-card>
        </v-menu>
        <v-list class="cortar">
          <v-list-item-title>
            <strong>
              {{ user.nombre }}
            </strong>
          </v-list-item-title>
        </v-list>
      </v-layout>
      <!-- Condicion de renderizado para "director"-->
      <v-layout
        class="align-center"
        v-if="
          user.rol === 'DirectorTi' ||
          user.rol === 'DirectorQui' ||
          user.rol === 'DirectorMeca' ||
          user.rol === 'DirectorMantto'
        "
      >
        <v-menu
          max-width="250"
          transition="scale-transition"
          bottom
          min-width="200"
          offset-x
        >
          <template v-slot:activator="{ on: menu, attrs }">
            <v-tooltip color="grey darken-3" bottom>
              <template v-slot:activator="{ on: tooltip }">
                <v-btn
                  v-bind="attrs"
                  class="ma-2"
                  fab
                  elevation="0"
                  color="#fff"
                  v-on="{ ...tooltip, ...menu }"
                >
                  <v-avatar size="50">
                    <v-img src="../assets/utsv-logo.png"></v-img>
                  </v-avatar>
                </v-btn>
              </template>
              <span>Ver Cuenta</span>
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
                      class="mb-2 mt-1 transition-swing"
                      color="white"
                      size="70"
                    >
                      <v-img
                        max-height="68"
                        max-width="68"
                        src="../assets/utsv-logo.png"
                      ></v-img>
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
                <v-btn @click="perfil()" depressed rounded text>
                  Editar Cuenta
                </v-btn>
              </div>
            </v-list-item-content>
          </v-card>
        </v-menu>

        <v-list class="cortar">
          <v-list-item-title>
            <strong>
              {{ user.nombre }}
            </strong>
          </v-list-item-title>
        </v-list>
      </v-layout>
      <v-divider></v-divider>
      <!-- Items renderizados de "admin"-->
      <div>
        <v-list rounded dense v-if="user.rol === 'admin'">
          <v-list-item
            active-class="pink darken-1 white--text px-2 mt-1"
            v-for="items in itemsAdmin"
            :key="items.title"
            link
            :to="{name: items.name}"
            exact
          >
            <v-list-item-icon>
              <v-icon>{{ items.icon }} </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ items.title }} </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-group
            active-class="pink darken-1 white--text px-2 mt-1"
            prepend-icon="mdi-account-group-outline"
          >
            <template v-slot:activator>
              <v-list-item-title class="mx-n3">Acciónes</v-list-item-title>
            </template>

            <v-list no-action sub-group>
              <v-list-item
                active-class="pink darken-1 white--text px-2 mt-1"
                v-for="items in itemsAdminActions"
                :key="items.title"
                link
                :to="{name: items.name}"
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
          </v-list-group>
        </v-list>
        <!-- Items renderizados de "Estudiante"-->
        <v-list rounded dense v-if="user.rol === 'Estudiante'">
          <v-list-item
            active-class="pink darken-1 white--text px-2 mt-1"
            v-for="items in itemsStudent"
            :key="items.title"
            link
            :to="{name: items.name}"
            exact
          >
            <v-list-item-icon>
              <v-icon>{{ items.icon }} </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ items.title }} </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            v-show="
              user.rol === 'Estudiante' && user.statusProceso == 'Revisado'
            "
            active-class="pink darken-1 white--text px-2 mt-1"
            v-for="items in itemsStudentFinalized"
            :key="items.title"
            link
            :to="{name: items.name}"
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
          rounded
          dense
          v-if="
            user.rol === 'DirectorTi' ||
            user.rol === 'DirectorQui' ||
            user.rol === 'DirectorMeca' ||
            user.rol === 'DirectorMantto'
          "
        >
          <v-list-item
            active-class="pink darken-1 white--text px-2 mt-1"
            v-for="items in itemsDirect"
            :key="items.title"
            link
            :to="{name: items.name}"
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
      <template v-slot:append>
        <div class="pa-2">
          <v-btn
            @click="cerrarSesion()"
            block
            outlined
            class="pink--text font-weight-bold"
          >
            Salir
            <v-icon color="pink" right>mdi-account-arrow-left-outline</v-icon>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <!--Aqui termina renderizado de NavigationDrawer-->
    <v-navigation-drawer
      v-if="$vuetify.breakpoint.width < 960"
      app
      v-model="drawer"
      width="190"
      temporary
    >
      <!-- Condicion de renderizado para asignar un tipo de drawer a un tipo de usuario en este caso "admin" -->
      <v-layout class="align-center" v-if="user.rol === 'admin'">
        <v-menu
          max-width="250"
          transition="scale-transition"
          bottom
          min-width="200"
          offset-x
        >
          <template v-slot:activator="{ on: menu, attrs }">
            <v-tooltip color="grey darken-3" bottom>
              <template v-slot:activator="{ on: tooltip }">
                <v-btn
                  class="ma-1"
                  v-bind="attrs"
                  fab
                  elevation="0"
                  color="#fff"
                  v-on="{ ...tooltip, ...menu }"
                >
                  <v-avatar size="50">
                    <v-img src="../assets/utsv-logo.png"></v-img>
                  </v-avatar>
                </v-btn>
              </template>
              <span>Cuenta Administrador</span>
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
                      size="70"
                    >
                      <v-img
                        max-height="68"
                        max-width="68"
                        src="../assets/utsv-logo.png"
                      ></v-img>
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
              </div>
            </v-list-item-content>
          </v-card>
        </v-menu>
        <v-list class="cortar">
          <v-list-item-title>
            <strong>
              {{ user.nombre }}
            </strong>
          </v-list-item-title>
        </v-list>
      </v-layout>
      <!-- Condicion de renderizado para "Estudiante" -->
      <v-layout class="align-center" link v-if="user.rol === 'Estudiante'">
        <v-menu
          max-width="250"
          transition="scale-transition"
          bottom
          min-width="200"
          offset-x
        >
          <template v-slot:activator="{ on: menu, attrs }">
            <v-tooltip color="grey darken-3" bottom>
              <template v-slot:activator="{ on: tooltip }">
                <v-btn
                  class="ma-1"
                  v-bind="attrs"
                  fab
                  elevation="0"
                  color="#fff"
                  v-on="{ ...tooltip, ...menu }"
                >
                  <v-avatar size="50">
                    <v-img :src="user.documents.fotografia.url"></v-img>
                  </v-avatar>
                </v-btn>
              </template>
              <span> Ver Cuenta</span>
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
                      size="70"
                    >
                      <v-img
                        max-height="68"
                        max-width="68"
                        :src="user.documents.fotografia.url"
                      ></v-img>
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
                <v-btn @click="perfil()" depressed rounded text>
                  Editar Cuenta
                </v-btn>
              </div>
            </v-list-item-content>
          </v-card>
        </v-menu>
        <v-list class="cortar">
          <v-list-item-title>
            <strong>
              {{ user.nombre }}
            </strong>
          </v-list-item-title>
        </v-list>
      </v-layout>
      <!-- Condicion de renderizado para "director"-->
      <v-layout
        class="align-center"
        v-if="
          user.rol === 'DirectorTi' ||
          user.rol === 'DirectorQui' ||
          user.rol === 'DirectorMeca' ||
          user.rol === 'DirectorMantto'
        "
      >
        <v-menu
          max-width="250"
          transition="scale-transition"
          bottom
          min-width="200"
          offset-x
        >
          <template v-slot:activator="{ on: menu, attrs }">
            <v-tooltip color="grey darken-3" bottom>
              <template v-slot:activator="{ on: tooltip }">
                <v-btn
                  class="ma-1"
                  v-bind="attrs"
                  fab
                  elevation="0"
                  color="#fff"
                  v-on="{ ...tooltip, ...menu }"
                >
                  <v-avatar size="50">
                    <v-img src="../assets/utsv-logo.png"></v-img>
                  </v-avatar>
                </v-btn>
              </template>
              <span>Ver Cuenta</span>
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
                      class="mb-2 mt-1 transition-swing"
                      color="white"
                      size="70"
                    >
                      <v-img
                        max-height="68"
                        max-width="68"
                        src="../assets/utsv-logo.png"
                      ></v-img>
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
                <v-btn @click="perfil()" depressed rounded text>
                  Editar Cuenta
                </v-btn>
              </div>
            </v-list-item-content>
          </v-card>
        </v-menu>

        <v-list class="cortar">
          <v-list-item-title>
            <strong>
              {{ user.nombre }}
            </strong>
          </v-list-item-title>
        </v-list>
      </v-layout>
      <v-divider></v-divider>
      <!-- Items renderizados de "admin"-->
      <div>
        <v-list rounded dense v-if="user.rol === 'admin'">
          <v-list-item
            active-class="pink darken-1 white--text px-2 mt-1"
            v-for="items in itemsAdmin"
            :key="items.title"
            link
            :to="{name: items.name}"
            exact
          >
            <v-list-item-icon>
              <v-icon>{{ items.icon }} </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ items.title }} </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-group
            active-class="pink darken-1 white--text px-2 mt-1"
            prepend-icon="mdi-account-group-outline"
          >
            <template v-slot:activator>
              <v-list-item-title class="mx-n3">Acciónes</v-list-item-title>
            </template>

            <v-list no-action sub-group>
              <v-list-item
                active-class="pink darken-1 white--text px-2 mt-1"
                v-for="items in itemsAdminActions"
                :key="items.title"
                link
                :to="{name: items.name}"
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
          </v-list-group>
        </v-list>
        <!-- Items renderizados de "Estudiante"-->
        <v-list rounded dense v-if="user.rol === 'Estudiante'">
          <v-list-item
            active-class="pink darken-1 white--text px-2 mt-1"
            v-for="items in itemsStudent"
            :key="items.title"
            link
            :to="{name: items.name}"
            exact
          >
            <v-list-item-icon>
              <v-icon>{{ items.icon }} </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ items.title }} </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            v-show="
              user.rol === 'Estudiante' && user.statusProceso == 'Revisado'
            "
            active-class="pink darken-1 white--text px-2 mt-1"
            v-for="items in itemsStudentFinalized"
            :key="items.title"
            link
            :to="{name: items.name}"
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
          rounded
          dense
          v-if="
            user.rol === 'DirectorTi' ||
            user.rol === 'DirectorQui' ||
            user.rol === 'DirectorMeca' ||
            user.rol === 'DirectorMantto'
          "
        >
          <v-list-item
            active-class="pink darken-1 white--text px-2 mt-1"
            v-for="items in itemsDirect"
            :key="items.title"
            link
            :to="{name: items.name}"
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
      <template v-slot:append>
        <div class="pa-2">
          <v-btn
            @click="cerrarSesion()"
            block
            outlined
            class="pink--text font-weight-bold"
          >
            Salir
            <v-icon color="pink" right>mdi-account-arrow-left-outline</v-icon>
          </v-btn>
        </div>
      </template>
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
      try {
        auth.signOut();
        this.$router.push({ name: "Home" });
      } catch (error) {
        console.log(error);
      }
    },
    perfil() {
      this.$router.push({name: 'Perfil'});
    },
  },
  data() {
    return {
      itemsAdmin: [
        {
          title: "Panel",
          icon: "mdi-view-dashboard",
          name: "Admin",
        },
        {
          title: "Graficas",
          icon: "mdi-chart-areaspline",
          name: "Graficos",
        },

        {
          title: "Valorar",
          icon: "mdi-hand-heart",
          name: "Valorar",
        },
        {
          title: "Inscripcion",
          icon: "mdi-school",
          name: "Inscripcion-admin",
        },
      ],
      itemsAdminActions: [
        {
          title: "Nuevo Admin",
          icon: "mdi-account-circle",
          name: "Agregar-Admin",
        },
        {
          title: "Nuevo Director",
          icon: "mdi-account-multiple",
          name: "Agregar-Usuario",
        },
        {
          title: "Egresados",
          icon: "mdi-account-tie",
          name: "Egresados",
        },
      ],
      itemsStudent: [
        {
          title: "Seguimiento",
          icon: "mdi-clipboard-account-outline",
          name: "Student",
        },
        {
          title: "Valorar",
          icon: "mdi-hand-heart",
          name: "Valorar-student",
        },
      ],
      itemsStudentFinalized: [
        {
          title: "Inscripcion 1",
          icon: "mdi-card-account-details-outline",
          name: "Inscripcion-student-1",
        },
        {
          title: "Inscripcion 2",
          icon: "mdi-school",
          name: "Inscripcion-student-2",
        },
      ],
      itemsDirect: [
        {
          title: "Panel",
          icon: "mdi-view-dashboard",
          name: "Control-Estudiantes",
        },
        {
          title: "Valorar",
          icon: "mdi-hand-heart",
          name: "Valorar-director",
        },
        {
          title: "Inscripcion",
          icon: "mdi-school",
          name: "Inscripcion-director",
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

<style lang="scss" scoped>
.cortar {
  width: 230px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
