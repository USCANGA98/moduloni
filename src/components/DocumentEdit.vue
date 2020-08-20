<template>
  <v-dialog v-model="viewDocumentEdit" persistent max-width="600">
    <v-card>
      <v-toolbar dense flat color="green" dark>
        <v-toolbar-title>Editar documento - {{item.name}}</v-toolbar-title>
      </v-toolbar>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-switch
              color="green"
              v-model="item.aprobado"
              :label="item.aprobado ? 'Aprobado' : 'Pendiente'"
            ></v-switch>
          </v-col>
          <v-col cols="12">
            <v-textarea v-model="item.mensaje" dense outlined color="green"></v-textarea>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-btn color="green darken-1" text @click="cerrar">Cerrar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "AddressComponent",
  props: {
    viewDocumentEdit: {
      type: Boolean,
      required: true,
    },
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    cerrar() {
      this.$emit("cerrar");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>