<template>
  <div>
    <v-app-bar
      app
      elevate-on-scroll
      :class="$vuetify.theme.dark ? '' : 'grey lighten-5'"
    >
      <v-app-bar-nav-icon
        v-if="$vuetify.breakpoint.width < 960"
        :class="$vuetify.theme.dark ? '' : 'grey lighten-5'"
        @click="mostrarNavigationDrawer = true"
      ></v-app-bar-nav-icon>
      <h4 class="title font-weight-black">
        {{ toolbarTitle }}
      </h4>

      <v-spacer />
      <!-- Notificaciones empiezan -->

      <v-icon
        
        :class="!$vuetify.theme.dark ? '' : 'moon'"
        v-show="$vuetify.theme.dark"
        class="mx-n4"
        small
        >mdi-brightness-3</v-icon
      >

      <v-icon
        :class="$vuetify.theme.dark ? '' : 'sun'"
        v-show="!$vuetify.theme.dark"
        class="mx-n10"
        small
        >mdi-white-balance-sunny</v-icon
      >

      <v-switch color="yellow" hide-details inset v-model="$vuetify.theme.dark">
      </v-switch>

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
                    left
                  >
                    <v-icon
                      :class="messages ? 'shake' : ''"
                      :color="$vuetify.theme.dark ? '' : 'grey darken-2'"
                      >mdi-bell</v-icon
                    >
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
              v-show="
                document.aprobado ||
                (document.mensaje != 'No ha sido revisado' &&
                  document.mensaje != undefined)
              "
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
                  {{ document.mensaje }} <br />
                  Aprobado:
                  <v-chip
                    class="white--text"
                    x-small
                    :color="document.aprobado ? 'green' : 'orange'"
                    >{{ document.aprobado }}</v-chip
                  >
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
              v-show="
                document.aprobado ||
                (document.mensaje != 'No ha sido revisado' &&
                  document.mensaje != undefined)
              "
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
                  {{ document.mensaje }} <br />
                  Aprobado:
                  <v-chip
                    class="white--text"
                    x-small
                    :color="document.aprobado ? 'green' : 'orange'"
                    >{{ document.aprobado }}</v-chip
                  >
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
            <v-btn
              :to="{ name: 'Perfil' }"
              icon
              color="#fff"
              v-on="{ ...tooltip }"
            >
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
            <v-btn
              :to="{ name: 'Perfil' }"
              icon
              color="#fff"
              v-on="{ ...tooltip }"
            >
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
    this.init();
  },
  created() {
    this.getUser();
  },
  methods: {
    async init() {
      if (this.user.rol == "Estudiante") {
        this.sendNotification2();
      } else {
        return true;
      }
    },
    getUser() {
      if (this.user.rol == "Estudiante") this.toolbarTitle = "Estudiante";
      else return (this.toolbarTitle = "UTSV");
    },
    searchNotification() {
      if (
        this.user.documents.actaNacimiento.aprobado ||
        this.user.documents.certificadoPreparatoria.aprobado ||
        this.user.documents.analisisVDRL.aprobado ||
        this.user.documents.comprobanteDomicilio.aprobado ||
        this.user.documents.credencialElector.aprobado ||
        this.user.documents.curp.aprobado ||
        this.user.documents.fotografia.aprobado
      ) {
        const audio = new Audio(
          "https://firebasestorage.googleapis.com/v0/b/moduloni.appspot.com/o/postman.mp3?alt=media&token=2e74187c-70ab-4e8a-9458-348a15b200cd"
        );
        audio.play();
      }
    },
    sendNotification2() {
      this.searchNotification();
      if (
        this.user.documents.actaNacimiento.aprobado == true ||
        this.user.documents.actaNacimiento.mensaje != "No ha sido revisado"
      ) {
        this.messages++;
      }
      if (
        this.user.documents.certificadoPreparatoria.aprobado == true ||
        this.user.documents.certificadoPreparatoria.mensaje !=
          "No ha sido revisado"
      ) {
        this.messages++;
      }
      if (
        this.user.documents.analisisVDRL.aprobado == true ||
        this.user.documents.analisisVDRL.mensaje != "No ha sido revisado"
      ) {
        this.messages++;
      }
      if (
        this.user.documents.comprobanteDomicilio.aprobado == true ||
        this.user.documents.comprobanteDomicilio.mensaje !=
          "No ha sido revisado"
      ) {
        this.messages++;
      }
      if (
        this.user.documents.credencialElector.aprobado == true ||
        this.user.documents.credencialElector.mensaje != "No ha sido revisado"
      ) {
        this.messages++;
      }
      if (
        this.user.documents.curp.aprobado == true ||
        this.user.documents.curp.mensaje != "No ha sido revisado"
      ) {
        this.messages++;
      }
      if (
        this.user.documents.fotografia.aprobado == true ||
        this.user.documents.fotografia.mensaje != "No ha sido revisado"
      ) {
        this.messages++;
      }
      if (
        this.user.documentsInscription.ficha.aprobado == true ||
        this.user.documentsInscription.ficha.mensaje != "No ha sido revisado"
      ) {
        this.messages++;
      }
      if (
        this.user.documentsInscription.pagoCuatrimestre.aprobado == true ||
        this.user.documentsInscription.pagoCuatrimestre.mensaje !=
          "No ha sido revisado"
      ) {
        this.messages++;
      }
    },
    abrir(url) {
      this.user.documents.url = url;
      window.open(url, "_blank");
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
.shake {
  animation: shake 2s ease infinite;
}
@keyframes shake {
  5% {
    transform: rotate(10deg);
  }
  10% {
    transform: rotate(-10deg);
  }
  15% {
    transform: rotate(10deg);
  }
  20% {
    transform: rotate(-10deg);
  }
  30% {
    transform: rotate(0deg);
  }
}
.moon {
  animation: moon .8s;
}
@keyframes moon {
  5% {
    transform: rotate(-100deg);
  }
}
.sun {
  animation: sun .8s;
}
@keyframes sun {
  5% {
    transform: rotate(100deg);
  }
}
</style>
