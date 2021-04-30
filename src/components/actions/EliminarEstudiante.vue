<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">
          Desea eliminar a este usuario?
        </v-card-title>
        <v-card-text
          >Está a punto de eliminar a éste usuario de la base de datos, ésta
          acción es irreversible.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="$emit('cancel')">
            Cancelar
          </v-btn>
          <v-btn color="green darken-1" text @click="eliminarEstudiante()">
            Continuar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      :timeout="timeout"
      transition="slide-x-transition"
      bottom
      left
      v-model="snackbar"
    >
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
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
  data: () => ({
    snackbar: false,
    timeout: 2000,
    text: "",
  }),
  methods: {
    async eliminarEstudiante() {
      try {
        const response = await db.collection("users").doc(this.uid).delete();
        console.log(response);
        this.snackbar = true;
        this.text = "Eliminado correctamente de Firestore";

        this.$emit("cancel");
      } catch (error) {
        console.log(error);
        this.snackbar = true;
        this.text = "hubo un error al eliminar de Firestore";
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
