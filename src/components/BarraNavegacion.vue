<template>
  <div>
    <v-app-bar app elevate-on-scroll color="grey lighten-5">
      <v-app-bar-nav-icon
        v-if="$vuetify.breakpoint.width < 960"
        style="color: black"
        @click="mostrarNavigationDrawer = true"
      ></v-app-bar-nav-icon>
      <h4 class="title font-weight-black">
        {{ toolbarTitle }}
      </h4>

      <v-spacer></v-spacer>
      <!-- Notificaciones empiezan -->
      <v-menu
        max-height="500"
        v-if="user.rol == 'Estudiante'"
        offset-y
        :close-on-content-click="false"
      >
        <template v-slot:activator="{ on: menu, attrs }">
          <v-tooltip color="grey darken-3" bottom>
            <template v-slot:activator="{ on: tooltip }">
              <v-btn
                class="mx-1"
                color="grey"
                icon
                v-bind="attrs"
                v-on="{ ...tooltip, ...menu }"
              >
                <v-btn @click="messages = 0" icon>
                  <v-badge
                    :content="messages"
                    :value="messages"
                    color="error"
                    overlap
                    dot
                    left
                  >
                    <v-icon color="grey darken-2">mdi-bell</v-icon>
                  </v-badge>
                </v-btn>
              </v-btn>
            </template>
            <span>Notificaciones</span>
          </v-tooltip>
        </template>
        <v-card min-height="500" min-width="450" max-width="450">
          <h2 class="pl-2 pt-2 mb-5">Notificaciones</h2>

          <v-list nav dense class="mx-n1">
            <div class="subtitle-2 pl-2 pt-2">Nuevo Ingreso</div>
            <v-list-item
              v-for="document in user.documents"
              :key="document.name"
              v-show="document.aprobado"
              link
            >
              <v-badge class="mr-6" avatar bordered overlap>
                <template v-slot:badge>
                  <v-avatar>
                    <v-img :src="user.documents.fotografia.url"></v-img>
                  </v-avatar>
                </template>

                <v-avatar size="45">
                  <v-img src="../assets/utsv-logo-2.jpg"></v-img>
                </v-avatar>
              </v-badge>
              <v-list-item-content>
                <h3 class="pb-1">Servicios Escolares</h3>
                <span class="caption mx-2" style="color: grey">
                  {{ document.name }} <br />
                  {{ document.mensaje }}
                </span>
              </v-list-item-content>
              <v-tooltip color="grey darken-3" top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    v-bind="attrs"
                    v-on="on"
                    color="blue"
                    dark
                    depressed
                    @click="abrir(document.url)"
                    ><v-icon>mdi-file-move-outline</v-icon></v-btn
                  >
                </template>
                <span>Abrir documento</span>
              </v-tooltip>
            </v-list-item>
          </v-list>
          <v-list nav dense class="mx-n1">
            <div class="subtitle-2 pl-2 pt-2">Inscripción</div>
            <v-list-item
              v-for="document in user.documentsInscription"
              :key="document.name"
              v-show="document.aprobado"
              link
            >
              <v-badge class="mr-6" avatar bordered overlap>
                <template v-slot:badge>
                  <v-avatar>
                    <v-img :src="user.documents.fotografia.url"></v-img>
                  </v-avatar>
                </template>

                <v-avatar size="45">
                  <v-img src="../assets/utsv-logo-2.jpg"></v-img>
                </v-avatar>
              </v-badge>
              <v-list-item-content>
                <h3 class="pb-1">Servicios Escolares</h3>
                <span class="caption mx-2" style="color: grey">
                  {{ document.name }} <br />
                  {{ document.mensaje }}
                </span>
              </v-list-item-content>
              <v-tooltip color="grey darken-3" top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    v-bind="attrs"
                    v-on="on"
                    color="blue"
                    dark
                    depressed
                    @click="abrir(document.url)"
                    ><v-icon>mdi-file-move-outline</v-icon></v-btn
                  >
                </template>
                <span>Abrir documento</span>
              </v-tooltip>
            </v-list-item>
          </v-list>

          <v-card-text class="caption text-center"
            >No hay notificaciones.</v-card-text
          >
        </v-card>
      </v-menu>

      <!-- Notificaciones terminan -->
      <v-hover
        v-slot:default="{ hover }"
        open-delay="0"
        class="d-flex flex-row-reverse"
        v-if="user.rol == 'admin'"
      >
        <v-tooltip color="grey darken-3" bottom>
          <template v-slot:activator="{ on: tooltip }">
            <v-btn icon elevation="0" color="#fff" v-on="{ ...tooltip }">
              <v-avatar
                :class="`elevation-${hover ? 5 : 5}`"
                color="blue-grey lighten-5"
                size="37"
              >
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
      </v-hover>
      <!--Termina condicional de administrador-->
      <v-hover
        v-slot:default="{ hover }"
        open-delay="0"
        class="d-flex flex-row-reverse"
        v-if="user.rol == 'Estudiante'"
      >
        <v-tooltip color="grey darken-3" bottom>
          <template v-slot:activator="{ on: tooltip }">
            <v-btn @click="perfil()" icon color="#fff" v-on="{ ...tooltip }">
              <v-avatar
                :class="`elevation-${hover ? 5 : 5}`"
                color="blue-grey lighten-5"
                size="37"
              >
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
      </v-hover>
      <!--Termina condicional de estudiante-->
      <v-hover
        v-slot:default="{ hover }"
        open-delay="0"
        class="d-flex flex-row-reverse"
        v-if="
          user.rol === 'DirectorTi' ||
          user.rol === 'DirectorQui' ||
          user.rol === 'DirectorMeca' ||
          user.rol === 'DirectorMantto'
        "
      >
        <v-tooltip color="grey darken-3" bottom>
          <template v-slot:activator="{ on: tooltip }">
            <v-btn @click="perfil()" icon color="#fff" v-on="{ ...tooltip }">
              <v-avatar
                :class="`elevation-${hover ? 5 : 5}`"
                color="blue-grey lighten-5"
                size="37"
              >
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
      </v-hover>

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
import NavigationDrawer from "./NavigationDrawer";

export default {
  data: () => ({
    messages: 0,
    toolbarTitle: "",
    mostrarNavigationDrawer: false,
  }),
  components: {
    NavigationDrawer,
  },
  mounted() {
    this.sendNotification();
  },
  created() {
    this.getUser();
  },
  methods: {
    getUser() {
      if (this.user.rol == "Estudiante") this.toolbarTitle = "Estudiante";
      else return (this.toolbarTitle = "UTSV");
    },
    sendNotification() {
      if (
        this.user.documents.actaNacimiento.aprobado ||
        this.user.documents.certificadoPreparatoria.aprobado ||
        this.user.documents.analisisVDRL.aprobado ||
        this.user.documents.certificadoPreparatoria.aprobado ||
        this.user.documents.comprobanteDomicilio.aprobado ||
        this.user.documents.credencialElector.aprobado ||
        this.user.documents.curp.aprobado ||
        this.user.documents.fotografia.aprobado
      ) {
        this.messages++;
      }
      console.log(this.user.documents.actaNacimiento.aprobado);
    },
    abrir(url) {
      this.user.documents.url = url;
      window.open(url, "_blank");
    },
    perfil() {
      this.$router.push({name: 'Perfil'});
    },
  },

  computed: {
    ...mapState(["user"]),
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
