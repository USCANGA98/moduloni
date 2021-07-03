<template>
  <v-dialog scrollable v-model="viewDocumentsInscription" persistent max-width="750">
    <v-card style="overflow-y: hidden;">
      <v-toolbar dense flat color="green" dark>
        <v-toolbar-title
          >Documentos de {{ item.nombre }} {{ item.apellidoPaterno }}
          {{ item.apellidoMaterno }}</v-toolbar-title
        >
        <v-spacer></v-spacer>
        <v-btn color="white" text @click="cerrar">Cerrar</v-btn>
        <v-btn color="white" text @click="guardar">Guardar cambios</v-btn>
      </v-toolbar>
      <v-container style="overflow-y: scroll;">
        <v-row>
          <v-col
            cols="12"
            v-for="item in item.documentsInscription"
            :key="item.name"
          >
            <v-hover v-slot:default="{ hover }" open-delay="0">
              <v-card
                :class="`elevation-${hover ? 10 : 1}`"
                class="pa-8 rounded-xl"
              >
                <v-card-title class="mb-5"
                  >{{ item.name }}
                  <v-card-text
                    v-if="item.aprobado == true"
                    class="mb-0 pa-0 text-right"
                    >Documento Revisado</v-card-text
                  >
                </v-card-title>
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
                  <strong> Aprobado:</strong>
                  {{ item.aprobado }}
                </v-card-text>
                <v-card-text class="mb-0 mt-0 pb-5 pt-0">
                  <strong> Mensaje:</strong>
                  {{ item.mensaje }}
                </v-card-text>
                <v-card-actions>
                  <v-btn
                    block
                    depressed
                    color="green"
                    dark
                    @click="editar(item)"
                    >Editar</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <edit
      :viewDocumentInscriptionEdit="viewDocumentInscriptionEdit"
      :item="itemData"
      @cerrar="viewDocumentInscriptionEdit = false"
    />
    <v-dialog v-model="dialog2" max-width="1020">
      <iframe
        allowfullscreen
        width="650px"
        height="650px"
        :src="item.url"
      ></iframe>
    </v-dialog>
  </v-dialog>
</template>

<script>
import { db } from "../services/firebase";
import { mapState } from "vuex";
export default {
  name: "AddressComponent",
  components: {
    edit: () => import("./DocumentInscriptionEdit"),
  },
  props: {
    viewDocumentsInscription: {
      type: Boolean,
      required: true,
    },
    item: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    dialog2: false,
    viewDocumentInscriptionEdit: false,
    itemData: {},
  }),
  methods: {
    cerrar() {
      this.$emit("cerrar");
    },
    abrir(url) {
      this.dialog2 = true;
      this.item.url = url;
      // window.open(url, "_blank");
    },
    editar(item) {
      this.itemData = item;
      this.viewDocumentInscriptionEdit = true;
    },
    async guardar() {
      let uid = this.item.uid;
      if (this.estaAprobado()) {
        this.item.statusInscripcion = "Aprobado";
      }
      if (!this.estaAprobado()) {
        this.item.statusInscripcion = "Pendiente";
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

      for (const propiedad in this.item.documentsInscription) {
        if (!this.item.documentsInscription[propiedad].aprobado) {
          aprobado = false;
        }
      }
      return aprobado;
    },
  },
  computed: {
    ...mapState(["user"]),
  },
};
</script>

<style lang="scss" scoped></style>
