<template>
  <v-container>
    <v-subheader>Proceso Inscripcion</v-subheader>
    <v-container>
      <v-card class="mx-auto">
        <v-card-title class="title font-weight-regular justify-space-between">
          <span>{{ currentTitle }}</span>
          <v-avatar
            color="info"
            class="subheading white--text"
            size="24"
            v-text="step"
          ></v-avatar>
        </v-card-title>

        <v-window v-model="step">
          <v-window-item :value="1">
            <v-card-text>
              <v-alert
                color="blue-grey"
                dark
                icon="mdi-card-account-details-outline"
                border="left"
              >
                ¡Felicidades! al parecer toda tu documentacion se encuentra en
                regla, ahora solo quedan unos ultimos pasos para finalizar toda
                esta documentacion y finalmente seas parte de la familia UTSV.
              </v-alert>
            </v-card-text>
          </v-window-item>

          <v-window-item :value="2">
            <v-card-text>
              <v-alert>
                Al continuar con el proceso aceptas los terminos y condiciones
                de la Universidad Tecnologica del Sureste de Veracruz.
              </v-alert>
            </v-card-text>
            <v-container>
              <v-checkbox class="ml-16" color="info" v-model="checkbox">
                <template v-slot:label>
                  <div>
                    He leído y acepto el contenido del
                    <v-tooltip color="grey darken-3" bottom>
                      <template v-slot:activator="{ on }">
                        <a
                          class="blue--text"
                          target="_blank"
                          href="http://fichas.utsv.mx/fichas/avisoprivacidad.pdf"
                          @click.stop
                          v-on="on"
                        >
                          Aviso de privacidad
                        </a>
                      </template>
                      Abrir en una nueva ventana
                    </v-tooltip>
                  </div>
                </template>
              </v-checkbox>
            </v-container>
          </v-window-item>
          <v-window-item :value="3">
            <v-card-text>
              <v-alert color="info" text dark icon="mdi-alert-circle-outline">
                <div>
                  Procedimiento para pagar en la plataforma de ovh el pago de
                  inscripcion, si eres alumno de Nuevo Ingreso de la UTSV, se
                  les informa que la única forma de realizar el pago es mediante
                  el formato generado por la plataforma de la
                  <v-tooltip color="grey darken-3" bottom>
                    <template v-slot:activator="{ on }">
                      <a
                        class="blue--text"
                        target="_blank"
                        href="https://ovh.veracruz.gob.mx/ovh/menuComunidadesDiversos.jsp?tipo=TEC"
                        @click.stop
                        v-on="on"
                      >
                        OFICINA VIRTUAL DE HACIENDA “OVH”
                      </a>
                    </template>
                    Abrir en una nueva ventana
                  </v-tooltip>
                </div>
              </v-alert>
            </v-card-text>
          </v-window-item>
          <v-window-item :value="4">
            <v-form ref="form" v-model="valid" lazy-validation>
              <div class="text-center">
                <v-img
                  contain
                  height="450"
                  src="../assets/proceso_inscripcion_1.png"
                ></v-img>
              </div>
            </v-form>
          </v-window-item>
          <v-window-item :value="5">
            <v-form ref="form" v-model="valid" lazy-validation>
              <div class="text-center">
                <v-img
                  contain
                  height="450"
                  src="../assets/proceso_inscripcion_2.png"
                ></v-img>
              </div>
            </v-form>
          </v-window-item>
          <v-window-item :value="6">
            <v-form ref="form" v-model="valid" lazy-validation>
              <div class="text-center">
                <v-img
                  contain
                  height="500"
                  src="../assets/proceso_inscripcion_3.png"
                ></v-img>
              </div>
            </v-form>
          </v-window-item>
          <v-window-item :value="7">
            <v-form ref="form" v-model="valid" lazy-validation>
              <div class="text-center">
                <v-img
                  contain
                  height="450"
                  src="../assets/proceso_inscripcion_4.png"
                ></v-img>
              </div>
            </v-form>
          </v-window-item>
          <v-window-item :value="8">
            <v-form ref="form" v-model="valid" lazy-validation>
              <div class="text-center">
                <v-img
                  contain
                  height="650"
                  src="../assets/proceso_inscripcion_5.png"
                ></v-img>
              </div>
            </v-form>
          </v-window-item>
          <v-window-item :value="9">
            <v-form ref="form" v-model="valid" lazy-validation>
              <div class="text-center">
                <v-img
                  contain
                  height="350"
                  src="../assets/proceso_inscripcion_6.png"
                ></v-img>
              </div>
            </v-form>
          </v-window-item>
          <v-window-item :value="10">
            <v-form ref="form" v-model="valid" lazy-validation>
              <div class="text-center">
                <v-img
                  contain
                  height="450"
                  src="../assets/proceso_inscripcion_7.png"
                ></v-img>
              </div>
            </v-form>
          </v-window-item>

          <v-window-item :value="11">
            <v-form ref="form" v-model="valid" lazy-validation>
              <div class="text-center">
                <v-img
                  contain
                  height="140"
                  src="../assets/utsv-logo-2.jpg"
                ></v-img>
                <h3 class="title font-weight-light mb-2">UTSV</h3>
                <span class="caption grey--text">Un mejor futuro...</span>
              </div>
              <v-row>
                <v-col cols="12">
                  <v-card flat>
                    <v-container>
                      <v-row>
                        <v-col cols="6" class="ma-0 pt-0 pb-0">
                          <v-file-input
                            color="green"
                            prepend-icon
                            prepend-inner-icon="mdi-file-document-outline"
                            label="Ficha UTSV"
                            outlined
                            show-size
                            dense
                            :rules="ruleDocument"
                            accept="application/pdf, image/*"
                            @change="input($event, 'ficha')"
                          ></v-file-input>
                        </v-col>
                        <v-col cols="6" class="ma-0 pt-0 pb-0">
                          <v-file-input
                            color="green"
                            prepend-icon
                            prepend-inner-icon="mdi-file-document-outline"
                            label="Pago De Cuatrimestre"
                            outlined
                            show-size
                            dense
                            :rules="ruleDocument"
                            accept="application/pdf, image/*"
                            @change="input($event, 'pagoCuatrimestre')"
                          ></v-file-input>
                        </v-col>
                      </v-row>
                    </v-container>
                    <v-card-actions>
                      <v-tooltip color="grey darken-3" top>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            v-bind="attrs"
                            v-on="on"
                            block
                            large
                            depressed
                            color="green"
                            dark
                            @click="subirArchivos"
                            >Enviar información</v-btn
                          >
                        </template>
                        <span>Enviar Información</span>
                      </v-tooltip>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
            </v-form>
          </v-window-item>
        </v-window>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn :disabled="step === 1" text @click="step--"> Atrás </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            :disabled="step === 11 || (step == 2 && checkbox == false)"
            color="info"
            depressed
            @click="step++"
          >
            Siguiente
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>

    <v-snackbar v-model="snackbar" :timeout="timeout">{{ text }}</v-snackbar>

    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script>
import { auth, storage, db } from "../services/firebase";
export default {
  name: "RegistroView",

  data: () => ({
    checkbox: false,
    valid: true,
    overlay: false,
    step: 1,
    text: "",
    mail: "",
    mailRepeat: "",
    expand: false,
    password: "",
    passwordRepeat: "",
    snackbar: false,
    timeout: 5000,
    show1: false,
    show2: false,

    user: {
      documentsInscription: {
        ficha: {
          name: "Ficha UTSV",
          url: "",
          aprobado: false,
          mensaje: "No ha sido revisado",
        },
        pagoCuatrimestre: {
          name: "Pago de cuatrimestre",
          url: "",
          aprobado: false,
          mensaje: "No ha sido revisado",
        },
      },
      statusInscripcion: "Pendiente",
    },

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
  computed: {
    currentTitle() {
      switch (this.step) {
        case 1:
          return "Proceso de Inscripción";
        case 2:
          return "Términos y condiciones";
        default:
          return "Ficha y pago cuatrimestral";
      }
    },
  },
  methods: {
    input(e, tipo) {
      this.user.documentsInscription[tipo].url = e;
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

    async subirArchivos() {
      this.overlay = true;
      console.log(auth.currentUser.uid);

      try {
        for (const document in this.user.documentsInscription) {
          if (this.user.documentsInscription[document] != "") {
            let file = this.user.documentsInscription[document].url;
            let extension = this.user.documentsInscription[
              document
            ].url.name.split(".")[1];
            let uid = auth.currentUser.uid;
            let storageRef = storage.ref(`${uid}/${document}.${extension}`);
            const response = await storageRef.put(file);

            if (response.state == "success") {
              let url = await storageRef.getDownloadURL();
              this.user.documentsInscription[document].url = url;
              console.log(this.user.documentsInscription[document].url);
            }
          }
        }

        this.subirDatosFirebase();
      } catch (error) {
        console.warn(error);
      }
    },
    async subirDatosFirebase() {
      this.overlay = false;
      let uid = auth.currentUser.uid;

      const response = await db.collection("users").doc(uid);
      response.update({
        documentsInscription: {
          ficha: this.user.documentsInscription.ficha,
          pagoCuatrimestre: this.user.documentsInscription.pagoCuatrimestre,
        },
        statusInscripcion: this.user.statusInscripcion,
      });
      try {
        if (response) {
          alert(
            "Documentos enviados, inisia sesión nuevamente para actualizar los cambios"
          );
          this.$router.push("/student/proceso-inscripcion-2");
        }
      } catch (error) {
        console.log(error);
      }
    },

    async getUser() {
      try {
        const response = await auth.signInWithEmailAndPassword(
          this.user.mail,
          this.user.password
        );
        let user = await this.getDataUser(response.user.uid);
        return user;
      } catch (error) {
        this.error = error.message;

        setTimeout(() => {
          this.error = "";
        }, 5000);
      }
    },
    async getDataUser(uid) {
      try {
        const response = await db.collection("users").doc(uid).get();
        return response.data();
      } catch (error) {
        console.warn(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
