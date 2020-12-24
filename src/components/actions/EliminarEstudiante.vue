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
import { db, storage } from "../../services/firebase";
export default {
  props: {
    dialog: {
      type: Boolean,
      required: true,
    },
    uid: {
      type: String,
    },
  },
  data: () => ({}),
  methods: {
    async eliminarEstudiante() {
      try {
        const response = await db.collection("users").doc(this.uid).delete();
        console.log(response);
        alert("Eliminado correctamente de Firestore");

        this.$emit("cancel");
      } catch (error) {
        console.log(error);
        alert("No se ha podido eliminar de Firestore");
      }
    },
    async eliminarDocumento() {
      const uid = this.user.uid;
      let extension = this.user.documents[document].url.name.split(".")[1];
      let storageRef = await storage.child(`${uid}/${document}.${extension}`);

      // Delete the file
      storageRef
        .delete()
        .then(function () {
          // File deleted successfully
          alert("Eliminado de Storage");
        })
        .catch(function (error) {
          // Uh-oh, an error occurred!
          console.log(error);
          alert("No se pudo eliminar de Storage");
        });
    },
  },
};
</script>
