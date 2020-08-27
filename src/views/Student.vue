<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2>
          Bienvenido(a):
          <br />
          {{user.nombre}} {{user.apellidoPaterno}} {{user.apellidoMaterno}}
        </h2>
      </v-col>
      <v-col cols="4" v-for="(document, index) in user.documents" :key="document.name">
        <v-card>
          <v-card-title>{{document.name}}</v-card-title>
          <v-card-text>
            Status:
            <br />
            {{document.aprobado ? 'Aprobado': 'No aprobada'}}
          </v-card-text>
          <v-card-text>
            Mensaje:
            <br />
            {{document.mensaje}}
          </v-card-text>
          <v-card-actions>
            <v-file-input
              :disabled="document.aprobado"
              color="green"
              prepend-icon
              prepend-inner-icon="mdi-file-document-outline"
              label="Editar documento"
              outlined
              dense
              accept="application/pdf, image/*"
              @change="input($event, index)"
            ></v-file-input>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-overlay :value="overlay">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import { storage, db } from "../services/firebase";
export default {
  name: "Student",
  data: () => ({
    overlay: false,
  }),
  methods: {
    async input(e, tipo) {
      this.overlay = true;
      const uid = this.user.uid;
      let extension = e.name.split(".")[1];
      let storageRef = storage.ref(`${uid}/${e}.${extension}`);
      try {
        const response = await storageRef.put(e);
        if (response.state == "success") {
          let url = await storageRef.getDownloadURL();
          let data = this.user;
          data.documents[tipo].url = url;
          await this.actualizarFirebase(data);
        }
      } catch (error) {
        console.warn(error);
      } finally {
        this.overlay = false;
      }
    },
    async actualizarFirebase(user) {
      const uid = user.uid;

      try {
        const response = await db.collection("users").doc(uid).set(user);
        if (response == undefined) alert("Documeto actualizado con exito!");
      } catch (error) {
        console.warn(error);
      }
    },
  },
  computed: {
    ...mapState(["user"]),
  },
};
</script>

<style lang="scss" scoped>
</style>