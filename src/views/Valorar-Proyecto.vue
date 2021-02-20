<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2 class="text-center">
          UNIVERSIDAD TECNOLÓGICA DEL SURESTE DE VERACRUZ
        </h2>
        <h3 class="text-center">Encuesta de satisfacción</h3>
      </v-col>
    </v-row>
    <v-form class="mr-16 ml-16" ref="form" v-model="valid" lazy-validation>
      <v-row>
        <v-col cols="12">
          <v-card
            class="mr-15 ml-15"
            min-height="5000"
            color="grey lighten-4"
            elevation="12"
          >
            <v-card
              elevation="0"
              tile
              min-height="150"
              color="deep-purple lighten-1"
            >
            </v-card>
            <v-alert
              elevation="2"
              colored-border
              class="mr-16 mt-n16 ml-16"
              color="deep-purple lighten-3 "
              border="top"
            >
              <v-container>
                <h1 class="mb-10 ma-10 text-justify">
                  Encuesta de satisfaccion del Alumno-Aspirante
                </h1>
                <p class="ml-10 mr-10 text-justify">
                  La siguiente encuesta de satisfacción está dirigida con el
                  único propósito de recoger datos que nos ayuda a conocer la
                  opinión e impresiones, cualitativas y cuantitativas, de
                  nuestros clientes. También nos permite analizar otros aspectos
                  como su experiencia de uso, sus defectos y valoraciones de la
                  marca y del servicio, etc.
                </p>
                <span class="red--text ml-10 text-justify">
                  *Obligatorio*
                </span>

                <v-row>
                  <v-col cols="12" md="5">
                    <h3 class="ml-10 mt-10">
                      Nombre <span class="red--text">*</span>
                    </h3>
                    <v-text-field
                      class="ml-10 mt-10"
                      label="Nombre del participante"
                      color="success"
                      lazy-validation="true"
                      dense
                      :rules="ruleRequired"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="5">
                    <h3 class="ml-10 mt-10">
                      Correo <span class="red--text">*</span>
                    </h3>
                    <v-text-field
                      class="ml-10 mt-10"
                      label="Correo de participante"
                      color="success"
                      lazy-validation="true"
                      dense
                      :rules="ruleRequired"
                    >
                    </v-text-field>
                  </v-col>
                  <h3 class="ml-10 mt-10">
                    ¿Cómo calificarías tu experiencia general con nuestro
                    producto?
                    <span class="red--text">*</span>
                  </h3>
                  <v-col>
                    <v-radio-group>
                      <v-radio
                        color="red"
                        class="ml-10 mt-10"
                        label="Mala"
                        v-model="user.satisfaccion.mala"
                      ></v-radio>
                      <v-radio
                        color="orange"
                        class="ml-10 mt-10"
                        label="Regular"
                        v-model="user.satisfaccion.regular"
                      ></v-radio>
                      <v-radio
                        color="yellow"
                        class="ml-10 mt-10"
                        label="Buena"
                        v-model="user.satisfaccion.buena"
                      ></v-radio>
                      <v-radio
                        color="success"
                        class="ml-10 mt-10"
                        label="Muy buena"
                        v-model="user.satisfaccion.muyBuena"
                      ></v-radio>
                      <v-radio
                        color="info"
                        class="ml-10 mt-10"
                        label="Excelente"
                        v-model="user.satisfaccion.excelente"
                      ></v-radio>
                    </v-radio-group>
                  </v-col>
                </v-row>
              </v-container>
              <v-card-actions>
                <v-container class="text-right">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        block
                        v-bind="attrs"
                        v-on="on"
                        depressed
                        color="deep-purple lighten-1"
                        dark
                        @click="actualizarPerfilAlumno(user)"
                      >
                        Enviar<v-icon right outlined>mdi-send</v-icon></v-btn
                      >
                    </template>
                    <span>Enviar Datos</span>
                  </v-tooltip>
                </v-container>
              </v-card-actions>
            </v-alert>
          </v-card>
        </v-col>
      </v-row>
    </v-form>

    <v-row>
      <v-col cols="12"> </v-col>
    </v-row>

    <v-snackbar v-model="snackbar" :timeout="timeout">{{ text }}</v-snackbar>

    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script>
import { auth, storage, db } from "../services/firebase";
export default {
  name: "ValorarView",

  data: () => ({
    valid: true,
    overlay: false,
    text: "",
    user: {
      satisfaccion: {
        mala: "Mala",
        regular: "Regular",
        buena: "Buena",
        muyBuena: "Muy Buena",
        excelente: "Excelente",
      },
    },

    snackbar: false,
    timeout: 5000,

    menu: false,
    sexOptions: ["Femenino", "Masculino", "No binario"],
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
    rulePassword: [
      (v) => !!v || "Campo requerido",
      (v) =>
        (v && v.length >= 6) ||
        "La contraseña debe contener al menos 6 caracteres",
    ],
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
    async actualizarPerfilAlumno(user) {
      // await this.subirImagen();
      const uid = user.uid;

      const response = await db.collection("users").doc(uid);

      // Set the "capital" field of the city 'DC'
      return response
        .update({
          nivelSatisfaccion: {
            mala: user.nivelSatisfaccion.mala,
            regular: user.nivelSatisfaccion.regular,
            buena: user.nivelSatisfaccion.buena,
            muyBuena: user.nivelSatisfaccion.muyBuena,
            excelente: user.nivelSatisfaccion.excelente,
          },
        })
        .then(function () {
          alert("Documento Actualizado Correctamente!");
        })
        .catch(function (error) {
          // The document probably doesn't exist.
          alert("Ocurrió un error", error);
        });
    },
    async createAccount() {
      try {
        const response = await auth.createUserWithEmailAndPassword(
          this.mailRepeat,
          this.passwordRepeat
        );
        this.user.uid = response.user.uid;
        await this.subirArchivos();
      } catch (error) {
        this.text = error.message;
        this.snackbar = true;
        console.warn(error);
      }
    },
    input(e, tipo) {
      this.user.documents[tipo].url = e;
    },
    async setInfo() {
      if (!this.$refs.form.validate()) {
        this.text =
          "Faltan campos por llenar y/o la información es incorrecta.";
        this.snackbar = true;
      }

      if (this.$refs.form.validate()) {
        this.overlay = true;
        await this.createAccount();
        this.overlay = false;
      }
    },
    async subirDatosFirebase() {
      this.user.contrasena = this.password;
      this.user.correoElectronico = this.mail;
      let uid = this.user.uid;

      console.log(this.user);

      try {
        const response = await db.collection("users").doc(uid).set(this.user);
        if (response == undefined) {
          alert(
            "Cuenta creada con exito!, puedes iniciar sesión para ver tu status"
          );
          this.$router.push("/");
        }
      } catch (error) {
        console.warn(error);
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
