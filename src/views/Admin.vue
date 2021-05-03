<template>
  <v-container>
    <v-subheader>Página principal</v-subheader>

    <!-- <v-expand-transition>
        <v-card ripple v-if="cardActive" class="d-flex rounded-xl">
          <v-img
            class="rounded-xl"
            max-height="280"
            src="https://png.pngtree.com/thumb_back/fw800/background/20210205/pngtree-technology-computer-business-office-background-image_543978.jpg"
            gradient="to top left, rgba(13,60,116,.33), rgba(231,0,112,.7)"
          >
            <v-col>
              <v-card-title class="align-start white--text">
                <h3><strong> ¡¡Bienvenido Administrador!!</strong></h3>
              </v-card-title>
              <v-card-subtitle class="white--text ml-10">
                ¡Es un gusto tenerte de vuelta!
              </v-card-subtitle>
              <v-card-actions class="d-flex align-center ml-5">
                <v-btn
                  @click="cardActive = false"
                  class="pink--text"
                  color="white"
                  depressed
                  rounded
                  dark
                >
                  Comenzar
                </v-btn>
              </v-card-actions>
            </v-col>
          </v-img>
        </v-card>
      </v-expand-transition> -->
    <v-scroll-x-transition mode="out-in">
      <v-container class="text-right">
        <v-tooltip color="grey darken-3" left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              color="white"
              rounded
              @click="expand = !expand"
            >
              <v-icon color="pink">mdi-account-search</v-icon>
            </v-btn>
          </template>
          <span>Buscar Alumno</span>
        </v-tooltip>
      </v-container>
    </v-scroll-x-transition>

    <!-- Aqui empieza linea de todos los alumnos-->

    <v-container>
      <v-expand-transition>
        <v-text-field
          rounded
          clearable
          v-show="expand"
          v-model="search"
          solo
          color="green"
          prepend-inner-icon="mdi-magnify"
          label="Buscar"
        ></v-text-field>
      </v-expand-transition>
      <v-expand-transition>
        <v-card v-show="expand" class="rounded-xl" width="100%" elevation="5">
          <v-data-table
            :loading="loading"
            :search="search"
            :headers="headers"
            :items="estudiantes"
            sort-by="statusProceso"
          >
            <template v-slot:top>
              <v-toolbar flat class="rounded-xl">
                <v-toolbar-title>Aspirantes</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-icon left>mdi-account</v-icon>
              </v-toolbar>
            </template>
            <template v-slot:item.statusProceso="{ item }">
              <v-chip :color="getColorProceso(item.statusProceso)" dark>
                {{ item.statusProceso }}
              </v-chip>
            </template>
            <template v-slot:item.fotografia="{ item }">
              <v-avatar class="ma-1" size="45" color="blue-grey lighten-5">
                <v-img :src="item.documents.fotografia.url"> </v-img>
              </v-avatar>
            </template>

            <template v-slot:item.documents="{ item }">
              <v-btn
                small
                depressed
                color="green"
                dark
                @click="verDocumentos(item)"
                >documentos</v-btn
              >
            </template>

            <template v-slot:item.detalleCompleto="{ item }">
              <v-btn
                small
                depressed
                color="green"
                dark
                @click="verUsuario(item)"
                >detalle</v-btn
              >
            </template>

            <template v-slot:item.eliminarestudiante="{ item }">
              <v-btn icon dark color="red" @click="eliminarEstudiante(item.uid)"
                ><v-icon> mdi-delete </v-icon></v-btn
              >
            </template>
          </v-data-table>
        </v-card>
      </v-expand-transition>
    </v-container>

    <documentsModal
      :viewDocuments="viewDocuments"
      :item="item"
      @cerrar="viewDocuments = false"
      @guardado="guardado"
    />

    <userModal
      :viewDetailUser="viewDetailUser"
      :userData="userData"
      @cerrar="viewDetailUser = false"
    />

    <!-- Aqui termina linea de todos los alumnos-->

    <v-row>
      <v-col cols="2" md="sm" v-for="career in careerOptions" :key="career">
        <v-hover v-slot:default="{ hover }" open-delay="0">
          <v-card
            :min-height="$vuetify.breakpoint.xs ? 190 : '20vh'"
            min-width="140"
            :class="`elevation-${hover ? 20 : 1}`"
            class="mx-auto d-flex transition-swing"
            @click="goDetailCareer(career)"
          >
            <v-img
              v-if="
                career == 'TSU Tecnologias de Informacion y Comunicacion' ||
                career == 'Ingenieria en Tecnologias de la Informacion'
              "
              src="../assets/utsv-logo-tic.jpg"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.08), rgba(0,0,0,.7)"
            >
              <h3 class="pa-3 text-subtitle-2 font-weight-medium">
                {{ career }}
              </h3>
            </v-img>

            <v-img
              v-if="
                career == 'TSU Mantenimiento Area Industrial' ||
                career == 'Ingenieria en Mantenimiento Industrial'
              "
              src="../assets/utsv-logo-mantto.jpg"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.08), rgba(0,0,0,.7)"
            >
              <h3 class="pa-3 text-subtitle-2 font-weight-medium">
                {{ career }}
              </h3>
            </v-img>
            <v-img
              v-if="career == 'TSU Contaduria'"
              src="../assets/utsv-logo-conta.png"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.08), rgba(0,0,0,.7)"
            >
              <h3 class="pa-3 text-subtitle-2 font-weight-medium">
                {{ career }}
              </h3>
            </v-img>
            <v-img
              v-if="
                career == 'TSU Mecatronica Area Automatizacion' ||
                career == 'Ingenieria en Mecatronica'
              "
              src="../assets/utsv-logo-mecatronica.jpg"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.08), rgba(0,0,0,.7)"
            >
              <h3 class="pa-3 text-subtitle-2 font-weight-medium">
                {{ career }}
              </h3>
            </v-img>
            <v-img
              v-if="
                career == 'TSU Quimica Industrial' ||
                career == 'Ingenieria Quimica'
              "
              src="../assets/utsv-logo-quimica.jpg"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.08), rgba(0,0,0,.7)"
            >
              <h3 class="pa-3 text-subtitle-2 font-weight-medium">
                {{ career }}
              </h3>
            </v-img>
            <v-img
              v-if="career == 'TSU Mecanica Area Automotriz'"
              src="../assets/utsv-logo-mecanica.jpg"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.08), rgba(0,0,0,.7)"
            >
              <h3 class="pa-3 text-subtitle-2 font-weight-medium">
                {{ career }}
              </h3>
            </v-img>
            <v-img
              v-if="career == 'TSU Administracion Area Capital Humano'"
              src="../assets/utsv-logo-administracion.jpg"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.08), rgba(0,0,0,.7)"
            >
              <h3 class="pa-3 text-subtitle-2 font-weight-medium">
                {{ career }}
              </h3>
            </v-img>
            <v-img
              v-if="career == 'TSU Energias Renovables'"
              src="../assets/utsv-logo-2.jpg"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.08), rgba(0,0,0,.7)"
            >
              <h3 class="pa-3 text-subtitle-2 font-weight-medium">
                {{ career }}
              </h3>
            </v-img>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>

    <EliminarEstudiante
      :snackbar="snackbar"
      :uid="uid"
      :dialog="dialog"
      @cancel="dialog = false"
    />
  </v-container>
</template>

<script>
import EliminarEstudiante from "../components/actions/EliminarEstudiante";
import { db } from "../services/firebase";
import { mapState } from "vuex";
import { mapMutations } from "vuex";

export default {
  name: "AdminView",
  mounted() {
    this.getData();
    this.Students();
  },

  components: {
    documentsModal: () => import("../components/Documents"),
    userModal: () => import("../components/DetailUser"),
    EliminarEstudiante,
  },
  data: () => ({
    viewDocuments: false,
    viewDetailUser: false,
    loading: false,
    addressData: {},
    documents: {},
    expand: false,
    items: [],
    snackbar: false,
    cardActive: true,
    item: {},
    userData: {},
    dialog: false,
    dialog2: false,
    uid: "",
    search: "",
    estudiantes: [],
    headers: [
      {
        text: "Fotografía",
        value: "fotografia",
      },
      {
        text: "Nombre",
        value: "nombre",
      },
      {
        text: "Apellido Paterno",
        value: "apellidoPaterno",
      },
      {
        text: "Apellido Materno",
        value: "apellidoMaterno",
      },
      {
        text: "Edad",
        value: "edad",
      },
      {
        text: "Status",
        value: "statusProceso",
      },
      {
        text: "Carrera",
        value: "carrera",
      },

      {
        text: "Documentos",
        value: "documents",
      },
      {
        text: "Detalle completo",
        value: "detalleCompleto",
      },
      {
        text: "Eliminar Estudiante",
        value: "eliminarestudiante",
      },
    ],

    careerOptions: [
      "TSU Tecnologias de Informacion y Comunicacion",
      "TSU Contaduria",
      "TSU Mantenimiento Area Industrial",
      "TSU Mecatronica Area Automatizacion",
      "TSU Quimica Industrial",
      "TSU Mecanica Area Automotriz",
      "TSU Administracion Area Capital Humano",
      "TSU Energias Renovables",
      "Ingenieria en Tecnologias de la Informacion",
      "Ingenieria en Mantenimiento Industrial",
      "Ingenieria en Mecatronica",
      "Ingenieria Quimica",
    ],
  }),

  methods: {
    getColorProceso(statusProceso) {
      if (statusProceso == "En revision") return "orange";
      else if (statusProceso == "Revisado") return "green";
    },
    ...mapMutations(["setCareerSelected"]),
    goDetailCareer(career) {
      this.setCareerSelected(career);
      this.$router.push("/admin/detail-career");
    },

    async guardado() {
      this.items = [];
      await this.getData();
      this.viewDocuments = false;
    },

    verDocumentos(item) {
      this.item = item;
      this.viewDocuments = true;
    },
    verUsuario(item) {
      this.userData = Object.assign({}, item);
      this.viewDetailUser = true;
    },
    async getData() {
      this.loading = true;
      try {
        const response = await db
          .collection("users")
          .where("carrera", "==", this.careerSelected)
          .get();

        if (response.docs.length > 0) {
          response.docs.forEach((e) => {
            this.items.push(e.data());
          });
        }
      } catch (error) {
        console.warn(error);
      } finally {
        this.loading = false;
      }
    },

    async Students() {
      this.loading = true;
      try {
        const response = await db
          .collection("users")
          .where("rol", "==", "Estudiante")
          .get();
        if (response.docs.length > 0) {
          response.docs.forEach((e) => {
            this.estudiantes.push(e.data());
          });
        }
      } catch (error) {
        console.warn(error);
      } finally {
        this.loading = false;
      }
    },
    async eliminarEstudiante(uid) {
      this.uid = uid;
      this.dialog = true;
    },
  },

  computed: {
    ...mapState(["careerSelected"]),
  },
};
</script>

<style lang="scss" scoped></style>
