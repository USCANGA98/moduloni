<template>
  <div>
    <v-container>
      <v-subheader>Proceso Inscripcion 2</v-subheader>
      <v-row>
        <!-- Aqui empieza el container con los datos del alumno-->
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-container class="text-left">
                <v-stepper value="2" class="ma-0 pa-0">
                  <v-card flat max-width="auto">
                    <v-card-subtitle
                      v-if="user.statusInscripcion == 'Aprobado'"
                      class="text-center"
                      ><strong>
                        ¡Tu proceso de evaluación ha concluido
                        satisfactoriamente!, Espera las indicaciones de
                        servicios escolares.</strong
                      >
                    </v-card-subtitle>
                  </v-card>
                  <v-stepper-header>
                    <v-stepper-step step="1" color="success" complete>
                      Documentos enviados
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step
                      v-if="user.statusProceso != 'Revisado'"
                      editable
                      step="2"
                      color="info"
                    >
                      En revisión
                      <small>Proceso de evaluación</small>
                    </v-stepper-step>

                    <v-stepper-step
                      v-if="user.statusProceso == 'Revisado'"
                      step="2"
                      color="success"
                      complete
                    >
                      En revisión
                      <small>Proceso de evaluación</small>
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step
                      v-if="user.statusProceso == 'Revisado'"
                      step="3"
                      color="success"
                      complete
                    >
                      Finalizado
                      <small>Proceso nuevo ingreso</small>
                    </v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step
                      v-if="user.statusInscripcion != 'Aprobado'"
                      step="4"
                      editable
                      color="info"
                    >
                      Pagos
                      <small>Ficha-Cuatri</small>
                    </v-stepper-step>
                    <v-stepper-step
                      v-if="user.statusInscripcion == 'Aprobado'"
                      step="4"
                      color="success"
                      complete
                    >
                      Pagos
                      <small>Ficha-Cuatri</small>
                    </v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step
                      v-if="user.statusInscripcion != 'Aprobado'"
                      step="5"
                    >
                      Finalizado</v-stepper-step
                    >

                    <v-stepper-step
                      v-if="user.statusInscripcion == 'Aprobado'"
                      step="5"
                      color="success"
                      complete
                    >
                      Finalizado
                      <small>Proceso Inscripcion</small>
                    </v-stepper-step>
                  </v-stepper-header>
                </v-stepper>
              </v-container>
            </v-col>
          </v-row>
        </v-container>
        <!-- Aqui termina el container con los datos del alumno-->

        <v-col
          md="4"
          lg="4"
          sm="6"
          cols="12"
          v-for="(document, index) in user.documentsInscription"
          :key="document.name"
        >
          <v-card elevation="5">
            <v-card-title
              >{{ document.name }}
              <v-icon v-if="document.aprobado == true" color="success" right
                >mdi-checkbox-marked-circle-outline</v-icon
              >
            </v-card-title>
            <v-card-text>
              <strong> Status:</strong>
              <br />
              {{ document.aprobado ? "Aprobado" : "Pendiente" }}
            </v-card-text>
            <v-card-text>
              <strong> Mensaje:</strong>
              <br />
              {{ document.mensaje }}
            </v-card-text>
            <v-card-actions>
              <v-row>
                <v-col cols="8">
                  <v-file-input
                    :disabled="document.aprobado"
                    color="green"
                    prepend-icon
                    prepend-inner-icon="mdi-file-document-outline"
                    label="Editar documento"
                    outlined
                    show-size
                    dense
                    accept="application/pdf, image/*"
                    @change="input($event, index)"
                  ></v-file-input>
                </v-col>
                <v-col
                  v-if="
                    document.aprobado == true ||
                    document.mensaje != 'No ha sido revisado'
                  "
                  cols="3"
                >
                  <v-tooltip color="grey darken-3" top>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        icon
                        v-bind="attrs"
                        v-on="on"
                        color="blue"
                        dark
                        depressed
                        @click="abrir(document.url)"
                        ><v-icon>mdi-file-move-outline</v-icon></v-btn
                      >
                    </template>
                    <span>Abrir documento</span>
                  </v-tooltip>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-overlay :value="overlay">
          <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { storage, db } from "../services/firebase";
export default {
  name: "Student",
  data: () => ({
    overlay: false,
  }),
  components: {},
  methods: {
    abrir(url) {
      this.user.documents.url = url;
      window.open(url, "_blank");
    },
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
          data.documentsInscription[tipo].url = url;
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

<style lang="scss" scoped></style>
