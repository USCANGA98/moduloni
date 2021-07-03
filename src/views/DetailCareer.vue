<template>
  <v-container>
    <v-row v-if="$route.path == '/admin/detail-career'">
      <v-col cols="12">
        <h2>Alumnos de la carrera {{ careerSelected }}</h2>
      </v-col>
      <v-container>
        <v-text-field
          rounded
          v-model="search"
          clearable
          color="green"
          solo
          prepend-inner-icon="mdi-magnify"
          label="Buscar"
        ></v-text-field>

        <v-col cols="12">
          <v-data-table
            :search="search"
            :loading="loading"
            :headers="headers"
            :items="items"
            sort-by="statusProceso"
            class="elevation-1 rounded-xl"
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
                >detalles</v-btn
              >
            </template>
            <template v-slot:item.eliminarestudiante="{ item }">
              <v-btn icon dark color="red" @click="eliminarEstudiante(item.uid)"
                ><v-icon> mdi-delete </v-icon></v-btn
              >
            </template>
          </v-data-table>
        </v-col>
      </v-container>
    </v-row>
    <!-- renderizado de directores-->
    <v-row v-if="$route.path == '/director/detail-career'">
      <v-col cols="12">
        <h2>Alumnos de la carrera {{ careerSelected }}</h2>
      </v-col>
      <v-container>
        <v-text-field
          rounded
          v-model="search"
          clearable
          color="green"
          solo
          prepend-inner-icon="mdi-magnify"
          label="Buscar"
        ></v-text-field>

        <v-col cols="12">
          <v-data-table
            :search="search"
            :loading="loading"
            :headers="headers"
            :items="items"
            sort-by="statusProceso"
            class="elevation-1 rounded-xl"
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
              <v-btn
                disabled
                icon
                color="red"
                @click="eliminarEstudiante(item.uid)"
                ><v-icon> mdi-delete-off </v-icon></v-btn
              >
            </template>
          </v-data-table>
        </v-col>
      </v-container>
    </v-row>

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
    <EliminarEstudiante
      :snackbar="snackbar"
      :uid="uid"
      :dialog="dialog"
      @cancel="dialog = false"
    />
  </v-container>
</template>

<script>
import { db } from "../services/firebase";
import { mapState } from "vuex";
import EliminarEstudiante from "../components/actions/EliminarUsuario";

export default {
  mounted() {
    this.getData();
  },
  name: "DetailCareer",
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
    items: [],
    snackbar: false,
    item: {},
    dialog: false,
    uid: "",
    userData: {},
    search: "",
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
        text: "Status",
        value: "statusProceso",
      },
      {
        text: "Correo",
        value: "correoElectronico",
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
        text: "Eliminar estudiante",
        value: "eliminarestudiante",
      },
    ],
  }),
  methods: {
    getColorProceso(statusProceso) {
      if (statusProceso == "En revision") return "orange";
      else if (statusProceso == "Revisado") return "green";
    },
    async guardado() {
      this.items = [];
      await this.getData();
      this.viewDocuments = false;
    },
    verDireccion(direccion) {
      this.addressData = direccion;
      this.viewAddress = true;
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
