<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2>Alumnos de la carrera {{careerSelected}}</h2>
      </v-col>

      <v-text-field v-model="search" color="green" append-icon="mdi-magnify" label="Buscar"></v-text-field>

      <v-col cols="12">
        <v-data-table :search="search" :headers="headers" :items="items" sort-by="statusProceso" class="elevation-1">
          <template v-slot:item.direccion="{ item }">
            <v-btn
              small
              depressed
              color="green"
              dark
              @click="verDireccion(item.direccion)"
            >dirección</v-btn>
          </template>

          <template v-slot:item.documents="{ item }">
            <v-btn small depressed color="green" dark @click="verDocumentos(item)">documentos</v-btn>
          </template>

          <template v-slot:item.detalleCompleto="{ item }">
            <v-btn small depressed color="green" dark @click="verUsuario(item)">detalle</v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <addressModal :viewAddress="viewAddress" :address="addressData" @cerrar="viewAddress = false" />
    <documentsModal
      :viewDocuments="viewDocuments"
      :item="item"
      @cerrar="viewDocuments = false"
      @guardado="guardado"
    />

    <userModal
      v-if="viewDetailUser"
      :viewDetailUser="viewDetailUser"
      :user="user"
      @cerrar="viewDetailUser = false"
    />
  </v-container>
</template>

<script>
import { db } from "../services/firebase";
import { mapState } from "vuex";

export default {
  mounted() {
    this.getData();
  },
  name: "DetailCareer",
  components: {
    addressModal: () => import("../components/Address"),
    documentsModal: () => import("../components/Documents"),
    userModal: () => import("../components/DetailUser"),
  },
  data: () => ({
    viewAddress: false,
    viewDocuments: false,
    viewDetailUser: false,
    loading: false,
    addressData: {},
    documents: {},
    items: [],
    item: {},
    user: {},
    search: '',
    headers: [
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
        text: "Direccion",
        value: "direccion",
      },
      {
        text: "Documentos",
        value: "documents",
      },
      {
        text: "Detalle completo",
        value: "detalleCompleto",
      },
    ],
  }),
  methods: {
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
      this.user = item;
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
  },
  computed: {
    ...mapState(["careerSelected"]),
  },
};
</script>

<style lang="scss" scoped>
</style>