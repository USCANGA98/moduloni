<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="500">
      <v-card>
        <v-card-title class="headline">
          Está a punto de eliminar a este usuario
        </v-card-title>
        <v-card-text>Esta acción es irreversible</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="$emit('cancel')">
            Cancelar
          </v-btn>
          <v-btn color="green darken-1" text @click="eliminarEstudiante()">
            Aceptar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { db } from "../../services/firebase";
export default {
  props: {
    dialog: {
      type: Boolean,
      required: true
    },
    uid: {
      type: String
    }
  },
  data: () => ({}),
  methods: {
    async eliminarEstudiante() {
      try {
        const response = await db
          .collection("users")
          .doc(this.uid)
          .delete();
        console.log(response);
        alert("eliminado correctamente");
        this.$emit("cancel");
      } catch (error) {
        console.log(error);
        alert("no se ha podido eliminar");
      }
    }
  }
};
</script>
