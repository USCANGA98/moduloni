<template>
  <v-container>
    <v-subheader
      >Alumnos en proceso de Inscripcion
      {{ new Date().getFullYear() }}</v-subheader
    >

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
          <!--Renderizado de Director de Tecnologias de la informacion-->
          <v-data-table
            v-if="user.rol == 'DirectorTi'"
            :search="search"
            :headers="headers"
            :items="estudiantesTi"
            sort-by="statusProceso"
          >
            <template v-slot:top>
              <v-toolbar flat class="rounded-xl">
                <v-toolbar-title>Inscripción</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-icon left>mdi-school</v-icon>
              </v-toolbar>
            </template>
            <template v-slot:item.statusProceso="{ item }">
              <v-chip :color="getColorProceso(item.statusProceso)" dark>
                {{ item.statusProceso }}
              </v-chip>
            </template>
            <template v-slot:item.statusInscripcion="{ item }">
              <v-chip :color="getColorInscripcion(item.statusInscripcion)" dark>
                {{ item.statusInscripcion }}
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
              <v-btn
                disabled
                icon
                color="red"
                @click="eliminarEstudiante(item.uid)"
                ><v-icon> mdi-delete-off </v-icon></v-btn
              >
            </template>
          </v-data-table>
          <!--Renderizado de Director de Quimica-->
          <v-data-table
            v-if="user.rol == 'DirectorQui'"
            :search="search"
            :headers="headers"
            :items="estudiantesQui"
            sort-by="statusProceso"
          >
            <template v-slot:top>
              <v-toolbar flat class="rounded-xl">
                <v-toolbar-title>Inscripción</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-icon left>mdi-school</v-icon>
              </v-toolbar>
            </template>
            <template v-slot:item.statusProceso="{ item }">
              <v-chip :color="getColorProceso(item.statusProceso)" dark>
                {{ item.statusProceso }}
              </v-chip>
            </template>
            <template v-slot:item.statusInscripcion="{ item }">
              <v-chip :color="getColorInscripcion(item.statusInscripcion)" dark>
                {{ item.statusInscripcion }}
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
              <v-btn
                disabled
                icon
                color="red"
                @click="eliminarEstudiante(item.uid)"
                ><v-icon> mdi-delete-off </v-icon></v-btn
              >
            </template>
          </v-data-table>
          <!--Renderizado de Director de mecatronica-->
          <v-data-table
            v-if="user.rol == 'DirectorMeca'"
            :search="search"
            :headers="headers"
            :items="estudiantesMeca"
            sort-by="statusProceso"
          >
            <template v-slot:top>
              <v-toolbar flat class="rounded-xl">
                <v-toolbar-title>Inscripción</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-icon left>mdi-school</v-icon>
              </v-toolbar>
            </template>
            <template v-slot:item.statusProceso="{ item }">
              <v-chip :color="getColorProceso(item.statusProceso)" dark>
                {{ item.statusProceso }}
              </v-chip>
            </template>
            <template v-slot:item.statusInscripcion="{ item }">
              <v-chip :color="getColorInscripcion(item.statusInscripcion)" dark>
                {{ item.statusInscripcion }}
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
              <v-btn
                disabled
                icon
                color="red"
                @click="eliminarEstudiante(item.uid)"
                ><v-icon> mdi-delete-off </v-icon></v-btn
              >
            </template>
          </v-data-table>
          <!--Renderizado para director de mantenimiento area industrial-->
          <v-data-table
            v-if="user.rol == 'DirectorMantto'"
            :search="search"
            :headers="headers"
            :items="estudiantesMantto"
            sort-by="statusProceso"
          >
            <template v-slot:top>
              <v-toolbar flat class="rounded-xl">
                <v-toolbar-title>Inscripción</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-icon left>mdi-school</v-icon>
              </v-toolbar>
            </template>
            <template v-slot:item.statusProceso="{ item }">
              <v-chip :color="getColorProceso(item.statusProceso)" dark>
                {{ item.statusProceso }}
              </v-chip>
            </template>
            <template v-slot:item.statusInscripcion="{ item }">
              <v-chip :color="getColorInscripcion(item.statusInscripcion)" dark>
                {{ item.statusInscripcion }}
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
              <v-btn
                disabled
                icon
                color="red"
                @click="eliminarEstudiante(item.uid)"
                ><v-icon> mdi-delete-off </v-icon></v-btn
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

    <EliminarEstudiante :uid="uid" :dialog="dialog" @cancel="dialog = false" />
  </v-container>
</template>

<script>
import EliminarEstudiante from "../components/actions/EliminarEstudiante";
import { db } from "../services/firebase";
import { mapState } from "vuex";
import { mapMutations } from "vuex";

export default {
  name: "DirectorInscripcion",
  computed: {
    ...mapState(["user"]),
  },
  mounted() {
    this.value;
    this.studentsTi();
    this.studentsQui();
    this.studentsMeca();
    this.studentsMantto();
  },

  components: {
    documentsModal: () => import("../components/DocumentsInscription"),
    userModal: () => import("../components/DetailUser"),
    EliminarEstudiante,
  },
  data: () => ({
    value: 0,
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
    viewDocumentsInscription: false,
    viewDetailUser: false,
    loading: false,
    documents: {},
    items: [],
    item: {},
    userData: {},
    dialog: false,
    uid: "",
    search: "",
    estudiantesTi: [],
    estudiantesQui: [],
    estudiantesMeca: [],
    estudiantesMantto: [],

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
    getColorProceso(statusProceso) {
      if (statusProceso == "En revision") return "orange";
      else if (statusProceso == "Revisado") return "green";
    },
    getColorInscripcion(statusInscripcion) {
      if (statusInscripcion == "Pendiente") return "orange";
      else if (statusInscripcion == "Aprobado") return "red";
      else if (statusInscripcion == undefined)
        return (statusInscripcion = "En espera");
    },
    ...mapMutations(["setCareerSelected"]),

    async guardado() {
      this.items = [];
      await this.getData();
      this.viewDocumentsInscription = false;
    },

    verDocumentos(item) {
      this.item = item;
      this.viewDocumentsInscription = true;
    },
    verUsuario(item) {
      this.userData = Object.assign({}, item);
      this.viewDetailUser = true;
    },

    async studentsTi() {
      this.loading = true;
      try {
        const response = await db
          .collection("users")
          .where("statusProceso", "==", "Revisado")
          .where(
            "carrera",
            "==",
            "TSU Tecnologias de Informacion y Comunicacion"
          )
          .get();
        if (response.docs.length > 0) {
          response.docs.forEach((e) => {
            this.estudiantesTi.push(e.data());
          });
        }
        const response2 = await db
          .collection("users")
          .where("statusProceso", "==", "Revisado")
          .where("carrera", "==", "TSU Contaduria")
          .get();
        if (response2.docs.length > 0) {
          response2.docs.forEach((e) => {
            this.estudiantesTi.push(e.data());
          });
        }
        const response3 = await db
          .collection("users")
          .where("statusProceso", "==", "Revisado")
          .where("carrera", "==", "Ingenieria en Tecnologias de la Informacion")
          .get();
        if (response3.docs.length > 0) {
          response3.docs.forEach((e) => {
            this.estudiantesTi.push(e.data());
          });
        }
      } catch (error) {
        console.warn(error);
      }
    },
    async studentsQui() {
      this.loading = true;
      try {
        const response = await db
          .collection("users")
          .where("statusProceso", "==", "Revisado")
          .where("carrera", "==", "TSU Quimica Industrial")
          .get();
        if (response.docs.length > 0) {
          response.docs.forEach((e) => {
            this.estudiantesQui.push(e.data());
          });
        }
        const response2 = await db
          .collection("users")
          .where("statusProceso", "==", "Revisado")
          .where("carrera", "==", "TSU Administracion Area Capital Humano")
          .get();
        if (response2.docs.length > 0) {
          response2.docs.forEach((e) => {
            this.estudiantesQui.push(e.data());
          });
        }
        const response3 = await db
          .collection("users")
          .where("statusProceso", "==", "Revisado")
          .where("carrera", "==", "TSU Energias Renovables")
          .get();
        if (response3.docs.length > 0) {
          response3.docs.forEach((e) => {
            this.estudiantesQui.push(e.data());
          });
        }
        const response4 = await db
          .collection("users")
          .where("statusProceso", "==", "Revisado")
          .where("carrera", "==", "Ingenieria Quimica")
          .get();
        if (response4.docs.length > 0) {
          response4.docs.forEach((e) => {
            this.estudiantesQui.push(e.data());
          });
        }
      } catch (error) {
        console.warn(error);
      }
    },
    async studentsMeca() {
      this.loading = true;
      try {
        const response = await db
          .collection("users")
          .where("statusProceso", "==", "Revisado")
          .where("carrera", "==", "TSU Mecatronica Area Automatizacion")
          .get();
        if (response.docs.length > 0) {
          response.docs.forEach((e) => {
            this.estudiantesMeca.push(e.data());
          });
        }

        const response2 = await db
          .collection("users")
          .where("statusProceso", "==", "Revisado")
          .where("carrera", "==", "Ingenieria en Mecatronica")
          .get();
        if (response2.docs.length > 0) {
          response2.docs.forEach((e) => {
            this.estudiantesMeca.push(e.data());
          });
        }
      } catch (error) {
        console.warn(error);
      }
    },
    async studentsMantto() {
      this.loading = true;
      try {
        const response = await db
          .collection("users")
          .where("statusProceso", "==", "Revisado")
          .where("carrera", "==", "TSU Mantenimiento Area Industrial")
          .get();
        if (response.docs.length > 0) {
          response.docs.forEach((e) => {
            this.estudiantesMantto.push(e.data());
          });
        }
        const response2 = await db
          .collection("users")
          .where("statusProceso", "==", "Revisado")
          .where("carrera", "==", "TSU Mecanica Area Automotriz")
          .get();
        if (response2.docs.length > 0) {
          response2.docs.forEach((e) => {
            this.estudiantesMantto.push(e.data());
          });
        }

        const response3 = await db
          .collection("users")
          .where("statusProceso", "==", "Revisado")
          .where("carrera", "==", "Ingenieria en Mantenimiento Industrial")
          .get();
        if (response3.docs.length > 0) {
          response3.docs.forEach((e) => {
            this.estudiantesMantto.push(e.data());
          });
        }
      } catch (error) {
        console.warn(error);
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
