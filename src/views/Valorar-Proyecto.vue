<template>
  <v-container>
    <v-subheader>Valorar proyecto</v-subheader>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-row>
        <v-col>
          <v-container>
            <v-alert
              style="border: solid 1px #dcdcdc; border-radius: 8px"
              class="ma-auto mb-3"
              max-width="700"
              border="top"
              colored-border
              color="#673AB7"
            >
              <h1 class="mb-8 ma-3 text-justify font-weight-medium">
                Encuesta de satisfacción de la UTSV
              </h1>
              <p class="ml-10 mr-10 text-justify font-weight-medium">
                La siguiente encuesta de satisfacción está dirigida con el único
                propósito de recoger datos que nos ayuda a conocer la opinión e
                impresiones. También nos permite analizar otros aspectos como su
                experiencia de uso, sus defectos y valoraciones del servicio,
                etc.
              </p>
              <p class="ml-10 mr-10 text-justify font-weight-medium">
                Total de incisos:
                <v-avatar size="30" color="#673AB7" class="white--text" rounded>
                  4
                </v-avatar>
              </p>

              <p class="ml-10 mr-10 text-justify font-weight-medium">
                Encuestado:
                <strong>
                  {{ userData.nombre }} {{ userData.apellidoPaterno }}
                  {{ userData.apellidoMaterno }}
                </strong>
              </p>
            </v-alert>

            <v-alert
              style="border: solid 1px #dcdcdc; border-radius: 8px"
              colored-border
              class="ma-auto mb-3"
              max-width="700"
              color="white"
            >
              <h4 class="font-weight-medium">
                1. ¿Cual fué tu nivel de satisfacción utilizando la app?
                <span class="red--text">*</span>
              </h4>
              <v-row align="center">
                <v-col>
                  <v-radio-group
                    :rules="ruleRequired"
                    v-model="user.encuesta.nivelSatisfaccion"
                  >
                    <v-radio
                      class="ml-10 pt-5"
                      :color="getColorSatisfaccion(item)"
                      v-for="item in satisfaccionOptions"
                      :key="item"
                      :label="item"
                      :value="item"
                    ></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
            </v-alert>
            <v-alert
              style="border: solid 1px #dcdcdc; border-radius: 8px"
              colored-border
              class="ma-auto mb-3"
              max-width="700"
              color="white"
            >
              <h4 class="font-weight-medium">
                2. ¿Consideras que el proceso en linea llevó mas o menos tiempo
                que de manera presencial?
                <span class="red--text">*</span>
              </h4>
              <v-row align="center">
                <v-col>
                  <v-radio-group
                    :rules="ruleRequired"
                    v-model="user.encuesta.tiempo"
                  >
                    <v-radio
                      class="ml-10 pt-5"
                      :color="getColorTiempo(item)"
                      v-for="item in tiempoOptions"
                      :key="item"
                      :label="item"
                      :value="item"
                    ></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
            </v-alert>
            <v-alert
              style="border: solid 1px #dcdcdc; border-radius: 8px"
              colored-border
              class="ma-auto mb-5"
              max-width="700"
              color="white"
            >
              <h4 class="font-weight-medium">
                3. ¿Cómo calificarías la app tomando en cuenta tú experiencia?
                <span class="red--text">*</span>
              </h4>
              <v-row align="center">
                <v-col>
                  <v-radio-group
                    :rules="ruleRequired"
                    v-model="user.encuesta.calificacion"
                  >
                    <v-radio
                      class="ml-10 pt-5"
                      :color="getColor(item)"
                      v-for="item in calificacionOptions"
                      :key="item"
                      :label="item"
                      :value="item"
                    ></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
            </v-alert>
            <v-alert
              style="border: solid 1px #dcdcdc; border-radius: 8px"
              colored-border
              class="ma-auto"
              max-width="700"
              color="white"
            >
              <h4 class="font-weight-medium">
                4. ¿Nos ayudarias mucho dejandonos una breve reseña donde
                comentes que fué lo que más te gustó de la aplicación y cuáles
                serían tus sugerencias para mejorarla?
                <span class="red--text">*</span>
              </h4>
              <v-textarea
                v-model="user.encuesta.reseña"
                label="Comentarios..."
                :rules="ruleRequired"
                prepend-icon="mdi-message-reply-text"
                class="pt-5"
                filled
                auto-grow
                color="#673AB7"
                outlined
              >
              </v-textarea>
            </v-alert>
          </v-container>

          <v-card class="ma-auto" max-width="700">
            <v-tooltip color="grey darken-3" bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  block
                  :loading="loading"
                  v-bind="attrs"
                  v-on="on"
                  depressed
                  color="#673AB7"
                  dark
                  @click="setInfo"
                >
                  Enviar<v-icon right outlined>mdi-send</v-icon></v-btn
                >
              </template>
              <span>Enviar Datos</span>
            </v-tooltip>
          </v-card>
        </v-col>
      </v-row>
    </v-form>

    <v-row>
      <v-col cols="12"> </v-col>
    </v-row>

    <v-snackbar
      :timeout="timeout"
      multi-line
      transition="slide-x-transition"
      bottom
      left
      v-model="snackbar"
      >{{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import { auth, storage, db } from "../services/firebase";
import { mapState } from "vuex";
export default {
  name: "ValorarView",

  data: () => ({
    valid: true,
    loading: false,
    timeout: 2000,

    text: "",
    user: {
      encuesta: {
        calificacion: "",
        nivelSatisfaccion: "",
        tiempo: "",
        reseña: "",
      },
    },

    snackbar: false,

    sexOptions: ["Femenino", "Masculino", "No binario"],
    satisfaccionOptions: [
      "Insatisfecho",
      "Poco satisfecho",
      "Satisfecho",
      "Muy satisfecho",
      "Me encantó",
    ],
    tiempoOptions: ["Sí, es más tardado", "No, es más rápido", "Es lo mismo"],
    calificacionOptions: ["Mala", "Regular", "Buena", "Muy buena", "Excelente"],
    careerOptions: [
      "TSU Tecnologias de Informacion y Comunicacion",
      "TSU Contaduria",
      "TSU Mantenimiento Area Industrial",
      "TSU Mecatronica Area Automatizacion",
      "TSU Quimica Industrial",
      "TSU Mecanica Area Automotriz",
      "TSU Administracion Area Capital Humano",
      "TSU Energias Renovables",
      "Ingenieria en Tecnologias de la Informacion",
      "Ingenieria en Mantenimiento Industrial",
      "Ingenieria en Mecatronica",
      "Ingenieria Quimica",
    ],
    ruleRequired: [(v) => !!v || "Campo requerido"],

    ruleMail: [
      (v) => !!v || "Campo requerido",
      (v) => /.+@.+\..+/.test(v) || "Ingresa un correo válido",
    ],
    ruleDocument: [
      (v) => !!v || "Campo requerido",
      (v) => !v || v.size < 2000000 || "El archivo solo puede pesar 2 MB!",
    ],
  }),
  methods: {
    getColor(calificacion) {
      if (calificacion == "Mala") return "red";
      else if (calificacion == "Regular") return "orange";
      else if (calificacion == "Buena") return "yellow";
      else if (calificacion == "Muy buena") return "green";
      else if (calificacion == "Excelente") return "blue";
    },
    getColorSatisfaccion(satisfaccion) {
      if (satisfaccion == "Insatisfecho") return "red";
      else if (satisfaccion == "Poco satisfecho") return "orange";
      else if (satisfaccion == "Satisfecho") return "yellow";
      else if (satisfaccion == "Muy satisfecho") return "green";
      else if (satisfaccion == "Me encantó") return "blue";
    },
    getColorTiempo(tiempo) {
      if (tiempo == "Sí, es más tardado") return "orange";
      else if (tiempo == "No, es más rápido") return "blue";
      else if (tiempo == "Es lo mismo") return "default";
      else if (tiempo == "Me encantó") return "blue";
    },
    async subirDatosFirebase() {
      let uid = auth.currentUser.uid;
      this.overlay = true;
      const response = await db.collection("users").doc(uid);

      response.update({
        encuesta: {
          calificacion: this.user.encuesta.calificacion,
          nivelSatisfaccion: this.user.encuesta.nivelSatisfaccion,
          tiempo: this.user.encuesta.tiempo,
          reseña: this.user.encuesta.reseña,
        },
      });
      try {
        if (response) {
          this.snackbar = true;
          this.text = "Datos de encuesta enviados correctamente";
        }
      } catch (error) {
        console.log(error);
      }
    },

    input(e, tipo) {
      this.user.documents[tipo].url = e;
    },
    async setInfo() {
      if (!this.$refs.form.validate()) {
        this.text = "Faltan campos por llenar";
        this.snackbar = true;
      }

      if (this.$refs.form.validate()) {
        this.overlay = true;
        await this.subirDatosFirebase();
        this.overlay = false;
      }
    },

    async subirArchivos() {
      const uid = this.user.uid;
      try {
        for (const document in this.user.documents) {
          if (this.user.documents[document] != "") {
            let file = this.user.documents[document].url;
            let extension = this.user.documents[document].url.name.split(
              "."
            )[1];
            let storageRef = storage.ref(`${uid}/${document}.${extension}`);
            const response = await storageRef.put(file);
            if (response.state == "success") {
              let url = await storageRef.getDownloadURL();
              this.user.documents[document].url = url;
            }
          }
        }

        this.subirDatosFirebase();
      } catch (error) {
        console.warn(error);
      }
    },
  },
  computed: {
    ...mapState({
      userData: "user",
    }),
    rulePasswordRepeat() {
      return [
        (v) => {
          if (this.passwordRepeat == this.password) return true;
          if (this.password != this.passwordRepeat)
            return "Las contraseñas deben coincidir";
          if (v.length < 6)
            return "La contraseña debe contener al menos 6 caracteres";
        },
      ];
    },
    ruleMailRepeat() {
      return [
        (v) => {
          if (v == this.mail) return true;
          if (v != this.mail) return "Los correos deben coincidir";
        },
      ];
    },
  },
};
</script>

<style lang="scss" scoped></style>
