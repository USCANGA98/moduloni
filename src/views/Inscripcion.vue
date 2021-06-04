<template>
  <v-container>
    <v-subheader
      >Alumnos en proceso de Inscripcion
      {{ new Date().getFullYear() }}</v-subheader
    >
    <v-container class="pl-10 pr-10 mt-n5">
      <v-row>
        <v-col md="5" lg="3" xl="3" sm="4" >
          <v-card
            ripple
            color="blue"
            class="pa-5"
            height="100%"
            width="100%"
            :min-height="$vuetify.breakpoint.xs ? 140 : '15vh'"
            :min-width="$vuetify.breakpoint.xs ? 140 : '15vh'"
           
          >
            <v-row align="center">
              <v-col cols="6">
                <v-progress-circular
                  class="justify-center"
                  :size="100"
                  :width="15"
                  color="white"
                  :value="sumaTotal.length"
                >
                  <h1>{{ sumaTotal.length }}</h1>
                </v-progress-circular>
              </v-col>
              <v-col cols="6">
                <v-icon color="white" large style="width: 90px">
                  mdi-account-plus
                </v-icon>
              </v-col>
            </v-row>

            <h3 class="justify-left white--text">Total de Aspirantes</h3>
            <v-card-text class="text-justify white--text"
              >Total de aspirantes de nuevo ingreso</v-card-text
            >
          </v-card>
        </v-col>
        <v-col md="5" lg="3" xl="3" sm="4">
          <v-card
            ripple
            color="green"
            class="pa-5"
            height="100%"
            width="100%"
            :min-height="$vuetify.breakpoint.xs ? 140 : '15vh'"
            :min-width="$vuetify.breakpoint.xs ? 140 : '15vh'"
            
          >
            <v-row align="center">
              <v-col cols="6">
                <v-progress-circular
                  class="justify-center"
                  :size="100"
                  :width="15"
                  color="white"
                  :value="statusProceso.length"
                >
                  <h1>{{ statusProceso.length }}</h1>
                </v-progress-circular>
              </v-col>
              <v-col cols="6">
                <v-icon color="white" large style="width: 90px">
                  mdi-account-check
                </v-icon>
              </v-col>
            </v-row>

            <h3 class="text-left white--text">Proceso Revisado NI</h3>
            <v-card-text class="text-justify white--text">
              Aspirantes que terminaron el proceso de nuevo ingreso
            </v-card-text>
          </v-card>
        </v-col>

        <v-col md="5" lg="3" xl="3" sm="4">
          <v-card
            ripple
            color="orange"
            class="pa-5"
            height="100%"
            width="100%"
            :min-height="$vuetify.breakpoint.xs ? 140 : '15vh'"
            :min-width="$vuetify.breakpoint.xs ? 140 : '15vh'"
          >
            <v-row align="center">
              <v-col cols="6" >
                <v-progress-circular
                  class="justify-center"
                  :size="100"
                  :width="15"
                  color="white"
                  :value="statusPendiente.length"
                >
                  <h1>{{ statusPendiente.length }}</h1>
                </v-progress-circular>
              </v-col>
              <v-col cols="6">
                <v-icon color="white" large style="width: 90px">
                  mdi-account-arrow-right
                </v-icon>
              </v-col>
            </v-row>

            <h3 class="justify-left white--text">Aspirantes Pendientes</h3>
            <v-card-text class="text-justify white--text"
              >Aspirantes que aún no han pagado la ficha
              cuatrimestral</v-card-text
            >
          </v-card>
        </v-col>
        <v-col md="5" lg="3" xl="3" sm="4">
          <v-card
            ripple
            color="pink"
            class="pa-5"
            height="100%"
            width="100%"
            :min-height="$vuetify.breakpoint.xs ? 140 : '15vh'"
            :min-width="$vuetify.breakpoint.xs ? 140 : '15vh'"
          >
            <v-row align="center">
              <v-col cols="6">
                <v-progress-circular
                  class="justify-center"
                  :size="100"
                  :width="15"
                  color="white"
                  :value="statusInscripcion.length"
                >
                  <h1>{{ statusInscripcion.length }}</h1>
                </v-progress-circular>
              </v-col>
              <v-col cols="6">
                <v-icon color="white" large style="width: 90px">
                  mdi-school
                </v-icon>
              </v-col>
            </v-row>

            <h3 class="justify-left white--text">Aspirantes Inscritos</h3>
            <v-card-text class="text-justify white--text"
              >Se muestra la cantidad de aspirantes Inscritos</v-card-text
            >
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Aqui empieza linea de todos los alumnos-->
    <v-container>
      <v-container>
        <v-text-field
          rounded
          clearable
          v-model="search"
          solo
          color="green"
          prepend-inner-icon="mdi-magnify"
          label="Buscar"
        ></v-text-field>

        <v-card class="rounded-xl" width="100%" elevation="5">
          <v-data-table
            :search="search"
            :headers="headers"
            :items="estudiantes"
            sort-by="statusProceso"
          >
            <template v-slot:top>
              <v-toolbar flat class="rounded-xl">
                <v-toolbar-title>Inscripción</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-icon left>mdi-school</v-icon>
              </v-toolbar>
            </template>
            <template v-slot:item.statusInscripcion="{ item }">
              <v-chip :color="getColorInscripcion(item.statusInscripcion)" dark>
                {{ item.statusInscripcion }}
              </v-chip>
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

            <template v-slot:item.documentsInscription="{ item }">
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
      </v-container>

      <documentsModal
        :viewDocumentsInscription="viewDocumentsInscription"
        :item="item"
        @cerrar="viewDocumentsInscription = false"
        @guardado="guardado"
      />

      <userModal
        :viewDetailUser="viewDetailUser"
        :userData="userData"
        @cerrar="viewDetailUser = false"
      />
    </v-container>
    <!-- Aqui termina linea de todos los alumnos-->

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

import Vue from "vue";
import Chartkick from "vue-chartkick";
import Chart from "chart.js";

Vue.use(Chartkick.use(Chart));

export default {
  name: "AdminView",
  computed: {
    ...mapState(["careerSelected", "user"]),
  },
  mounted() {
    this.getData();
    this.Data();
    this.value;
    this.Students();
  },

  components: {
    documentsModal: () => import("../components/DocumentsInscription"),
    userModal: () => import("../components/DetailUser"),
    EliminarEstudiante,
  },
  data: () => ({
    value: 0,
    snackbar: false,
    overlay: false,
    Contaduria: [],
    Tic: [],
    Mantto: [],
    Meca: [],
    Quimica: [],
    Mecanica: [],
    Administracion: [],
    Energias: [],
    IngTi: [],
    IngMantto: [],
    IngMeca: [],
    IngQuimica: [],
    sumaTotal: [],
    statusProceso: [],
    statusInscripcion: [],
    statusPendiente: [],
    viewDocumentsInscription: false,
    viewDetailUser: false,
    loading: false,
    addressData: {},
    documents: {},
    expand: false,
    items: [],
    cardActive: true,
    item: {},
    userData: {},
    dialog: false,
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
        text: "Status Inscripcion",
        value: "statusInscripcion",
      },
      {
        text: "Carrera",
        value: "carrera",
      },
      {
        text: "Documentos",
        value: "documentsInscription",
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
    getColorInscripcion(statusInscripcion) {
      if (statusInscripcion == "Aprobado") return "red";
      else if (statusInscripcion == "Pendiente") return "orange";
    },
    getColorProceso(statusProceso) {
      if (statusProceso == "En revision") return "orange";
      else if (statusProceso == "Revisado") return "green";
    },
    async Data() {
      try {
        const response = await db
          .collection("users")
          .where("carrera", "==", "TSU Contaduria")
          .get();
        const response2 = await db
          .collection("users")
          .where(
            "carrera",
            "==",
            "TSU Tecnologias de Informacion y Comunicacion"
          )
          .get();
        const response3 = await db
          .collection("users")
          .where("carrera", "==", "TSU Mantenimiento Area Industrial")
          .get();
        const response4 = await db
          .collection("users")
          .where("carrera", "==", "TSU Mecatronica Area Automatizacion")
          .get();
        const response5 = await db
          .collection("users")
          .where("carrera", "==", "TSU Quimica Industrial")
          .get();
        const response6 = await db
          .collection("users")
          .where("carrera", "==", "TSU Mecanica Area Automotriz")
          .get();
        const response7 = await db
          .collection("users")
          .where("carrera", "==", "TSU Administracion Area Capital Humano")
          .get();
        const response8 = await db
          .collection("users")
          .where("carrera", "==", "TSU Energias Renovables")
          .get();
        const response9 = await db
          .collection("users")
          .where("carrera", "==", "Ingenieria en Tecnologias de la Informacion")
          .get();
        const response10 = await db
          .collection("users")
          .where("carrera", "==", "Ingenieria en Mantenimiento Industrial")
          .get();
        const response11 = await db
          .collection("users")
          .where("carrera", "==", "Ingenieria en Mecatronica")
          .get();
        const response12 = await db
          .collection("users")
          .where("carrera", "==", "Ingenieria Quimica")
          .get();
        const response13 = await db
          .collection("users")
          .where("statusProceso", "==", "Revisado")
          .get();
        const response14 = await db
          .collection("users")
          .where("statusInscripcion", "==", "Aprobado")
          .get();
        const response15 = await db
          .collection("users")
          .where("statusInscripcion", "==", "Pendiente")
          .get();

        if (response.docs.length > 0) {
          response.docs.forEach((e) => {
            this.Contaduria.push(e.data());
            this.sumaTotal.push(e.data());
          });
        }
        if (response2.docs.length > 0) {
          response2.docs.forEach((e) => {
            this.Tic.push(e.data());
            this.sumaTotal.push(e.data());
          });
        }
        if (response3.docs.length > 0) {
          response3.docs.forEach((e) => {
            this.Mantto.push(e.data());
            this.sumaTotal.push(e.data());
          });
        }
        if (response4.docs.length > 0) {
          response4.docs.forEach((e) => {
            this.Meca.push(e.data());
            this.sumaTotal.push(e.data());
          });
        }
        if (response5.docs.length > 0) {
          response5.docs.forEach((e) => {
            this.Quimica.push(e.data());
            this.sumaTotal.push(e.data());
          });
        }
        if (response6.docs.length > 0) {
          response6.docs.forEach((e) => {
            this.Mecanica.push(e.data());
            this.sumaTotal.push(e.data());
          });
        }
        if (response7.docs.length > 0) {
          response7.docs.forEach((e) => {
            this.Administracion.push(e.data());
            this.sumaTotal.push(e.data());
          });
        }
        if (response8.docs.length > 0) {
          response8.docs.forEach((e) => {
            this.Energias.push(e.data());
            this.sumaTotal.push(e.data());
          });
        }
        if (response9.docs.length > 0) {
          response9.docs.forEach((e) => {
            this.IngTi.push(e.data());
            this.sumaTotal.push(e.data());
          });
        }
        if (response10.docs.length > 0) {
          response10.docs.forEach((e) => {
            this.IngMantto.push(e.data());
            this.sumaTotal.push(e.data());
          });
        }
        if (response11.docs.length > 0) {
          response11.docs.forEach((e) => {
            this.IngMeca.push(e.data());
            this.sumaTotal.push(e.data());
          });
        }
        if (response12.docs.length > 0) {
          response12.docs.forEach((e) => {
            this.IngQuimica.push(e.data());
            this.sumaTotal.push(e.data());
          });
        }
        if (response13.docs.length > 0) {
          response13.docs.forEach((e) => {
            this.statusProceso.push(e.data());
          });
        }
        if (response14.docs.length > 0) {
          response14.docs.forEach((e) => {
            this.statusInscripcion.push(e.data());
          });
        }
        if (response15.docs.length > 0) {
          response15.docs.forEach((e) => {
            this.statusPendiente.push(e.data());
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    ...mapMutations(["setCareerSelected"]),
    goDetailCareer(career) {
      this.setCareerSelected(career);
      this.$router.push({name: 'DetailCareer'});
    },

    async guardado() {
      this.items = [];
      await this.getData();
      this.viewDocumentsInscription = false;
    },
    verDireccion(direccion) {
      this.addressData = direccion;
      this.viewAddress = true;
    },
    verDocumentos(item) {
      this.item = item;
      this.viewDocumentsInscription = true;
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
          .where("statusProceso", "==", "Revisado")
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
};
</script>

<style lang="scss" scoped>
.v-progress-circular {
  margin-top: 0rem;
  margin-bottom: 1rem;
}
</style>
