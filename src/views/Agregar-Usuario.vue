<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2 class="text-center">
          UNIVERSIDAD TECNOLÓGICA DEL SURESTE DE VERACRUZ
        </h2>
        <h3 class="text-center">Control de directores de carrera</h3>
      </v-col>
    </v-row>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-container>
              <h2 class="mb-5">Datos personales</h2>
              <v-row>
                <v-col cols="12" md="4" class="ma-0 pt-0 pb-0">
                  <v-text-field
                    outlined
                    color="green"
                    label="Nombre(s)"
                    placeholder="Ingresa tu nombre(s)"
                    v-model="user.nombre"
                    :rules="ruleRequired"
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4" class="ma-0 pt-0 pb-0">
                  <v-text-field
                    outlined
                    color="green"
                    label="Primer apellido"
                    placeholder="Apellido paterno"
                    v-model="user.apellidoPaterno"
                    :rules="ruleRequired"
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4" class="ma-0 pt-0 pb-0">
                  <v-text-field
                    outlined
                    color="green"
                    label="Segundo apellido "
                    placeholder="Apellido materno"
                    v-model="user.apellidoMaterno"
                    :rules="ruleRequired"
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4" class="ma-0 pt-0 pb-0">
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="true"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        outlined
                        dense
                        color="green"
                        v-model="user.fechaNacimiento"
                        label="Fecha de nacimiento"
                        placeholder="Ingresa tu fecha de nacimiento"
                        v-bind="attrs"
                        v-on="on"
                        :rules="ruleRequired"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      :max="new Date().toISOString()"
                      v-model="user.fechaNacimiento"
                      color="green"
                      @input="menu = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" md="4" class="ma-0 pt-0 pb-0">
                  <v-text-field
                    outlined
                    color="green"
                    label="Edad"
                    placeholder="Ingresa tu edad"
                    type="number"
                    min="0"
                    max="99"
                    v-model="user.edad"
                    :rules="ruleRequired"
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4" class=" ma-0 pt-0 pb-0">
                  <v-select
                    outlined
                    color="green"
                    label="Rol"
                    placeholder="Area de director"
                    dense
                    :items="rolOptions"
                    v-model="user.rol"
                    :rules="ruleRequired"
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-container>
              <h2 class="mb-5">Cuenta</h2>
              <v-row>
                <v-col cols="12">
                  <v-alert
                    text
                    dense
                    color="info"
                    icon="mdi-information"
                    border="left"
                    >Es importante que guarde los siguientes datos en un lugar
                    seguro, ya que serán los accesos para que puedas ingresara a
                    la plataforma y saber el status de tu trámite.</v-alert
                  >
                </v-col>
                <v-col cols="12" md="6" class="ma-0 pt-0 pb-0">
                  <v-text-field
                    outlined
                    color="green"
                    label="Correo electrónico"
                    placeholder="Ingresa tu correo electrónico"
                    dense
                    v-model="mail"
                    :rules="ruleMail"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6" class="ma-0 pt-0 pb-0">
                  <v-text-field
                    outlined
                    color="green"
                    label="Correo electrónico"
                    placeholder="Repite tu correo electrónico"
                    dense
                    :disabled="mail == ''"
                    v-model="mailRepeat"
                    :rules="ruleMailRepeat"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6" class="ma-0 pt-0 pb-0">
                  <v-text-field
                    outlined
                    color="green"
                    label="Contraseña"
                    placeholder="Ingresa tu contraseña"
                    dense
                    v-model="password"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                    @click:append="show1 = !show1"
                    :rules="rulePassword"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6" class="ma-0 pt-0 pb-0">
                  <v-text-field
                    outlined
                    color="green"
                    label="Contraseña"
                    placeholder="Repite tu contraseña"
                    dense
                    v-model="passwordRepeat"
                    :rules="rulePasswordRepeat"
                    :disabled="password == ''"
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show2 ? 'text' : 'password'"
                    @click:append="show2 = !show2"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-form>
    <v-row>
      <v-col cols="12">
        <v-btn block large depressed color="green" dark @click="setInfo"
          >Enviar información</v-btn
        >
      </v-col>
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
  name: "Control-direct",

  data: () => ({
    valid: true,
    overlay: false,
    text: "",
    mail: "",
    mailRepeat: "",
    password: "",
    passwordRepeat: "",
    snackbar: false,
    timeout: 5000,
    show1: false,
    show2: false,
    user: {
      nombre: "",
      apellidoPaterno: "",
      apellidoMaterno: "",
      fechaNacimiento: "",
      edad: "",
      rol: "",
      uid: ""
    },
    menu: false,
    rolOptions: ["DirectorTi", "DirectorMeca", "DirectorQui", "DirectorMantto"],
    ruleRequired: [v => !!v || "Campo requerido"],
    rulePassword: [
      v => !!v || "Campo requerido",
      v =>
        (v && v.length >= 6) ||
        "La contraseña debe contener al menos 6 caracteres"
    ],
    ruleMail: [
      v => !!v || "Campo requerido",
      v => /.+@.+\..+/.test(v) || "Ingresa un correo válido"
    ]
  }),
  methods: {
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
    async setInfo() {
      if (!this.$refs.form.validate()) {
        this.text = "Faltan campos por llenar y/o estan mal llenados.";
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
        const response = await db
          .collection("users")
          .doc(uid)
          .set(this.user);
        if (response == undefined) {
          alert(
            "Cuenta creada con exito!, puedes iniciar sesión para ver tu status"
          );
          console.log(response);
          this.$router.push("/admin");
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
    }
  },
  computed: {
    rulePasswordRepeat() {
      return [
        v => {
          if (this.passwordRepeat == this.password) return true;
          if (this.password != this.passwordRepeat)
            return "Las contraseñas deben coincidir";
          if (v.length < 6)
            return "La contraseña debe contener al menos 6 caracteres";
        }
      ];
    },
    ruleMailRepeat() {
      return [
        v => {
          if (v == this.mail) return true;
          if (v != this.mail) return "Los correos deben coincidir";
        }
      ];
    }
  }
};
</script>

<style lang="scss" scoped></style>
