<template>
  <v-dialog v-model="viewDocuments" persistent max-width="600">
    <v-card>
      <v-toolbar dense flat color="green" dark>
        <v-toolbar-title>Documentos</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="white" text @click="cerrar">Cerrar</v-btn>
        <v-btn color="white" text @click="guardar">Guardar cambios</v-btn>
      </v-toolbar>
      <v-container>
        <v-row>
          <v-col cols="12" v-for="item in item.documents" :key="item.name">
            <v-card>
              <v-card-title>{{ item.name }}</v-card-title>
              <v-card-text>
                <v-btn
                  block
                  depressed
                  color="green"
                  dark
                  @click="abrir(item.url)"
                  >Ver documento</v-btn
                >
              </v-card-text>
              <v-card-text class="mb-0 pb-0">
                Aprobado:
                <strong>{{ item.aprobado }}</strong>
              </v-card-text>
              <v-card-text class="mb-0 mt-0 pb-5 pt-0">
                Mensaje:
                <strong>{{ item.mensaje }}</strong>
              </v-card-text>
              <v-card-actions>
                <v-btn block depressed color="green" dark @click="editar(item)"
                  >Editar</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <edit
      :viewDocumentEdit="viewDocumentEdit"
      :item="itemData"
      @cerrar="viewDocumentEdit = false"
    />
  </v-dialog>
</template>

<script>
import { db } from "../services/firebase";
export default {
  name: "AddressComponent",
  components: {
    edit: () => import("./DocumentEdit"),
  },
  props: {
    viewDocuments: {
      type: Boolean,
      required: true,
    },
    item: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    viewDocumentEdit: false,
    itemData: {},
  }),
  methods: {
    cerrar() {
      this.$emit("cerrar");
    },
    abrir(url) {
      window.open(url, "_blank");
    },
    editar(item) {
      this.itemData = item;
      this.viewDocumentEdit = true;
    },
    async guardar() {
      let uid = this.item.uid;
      if (this.estaAprobado()) {
        this.item.statusProceso = "Revisado";
      }
      if (!this.estaAprobado()) {
        this.item.statusProceso = "En revision";
      }

      try {
        const response = await db.collection("users").doc(uid).set(this.item);
        if (response == undefined) this.$emit("guardado");
      } catch (error) {
        console.warn(error);
      }
    },
    estaAprobado() {
      let aprobado = true;

      for (const propiedad in this.item.documents) {
        if (!this.item.documents[propiedad].aprobado) {
          aprobado = false;
        }
      }
      return aprobado;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>