<template>
  <v-container>
    <v-subheader>Agregar Administrador </v-subheader>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-row>
        <v-col cols="12" sm="5" lg="5" md="5">
          <v-card elevation="5" class="pa-2 rounded-xl">
            <v-card flat>
              <v-card-title> <strong> Roles</strong> </v-card-title>
              <v-chip class="ma-1" color="red" dark>admin</v-chip>
            </v-card>
            <v-data-table
              mobile-breakpoint="1125"
              :items-per-page="5"
              :loading="loading"
              :items="administradores"
              :headers="headers"
            >
              <template v-slot:item.rol="{ item }">
                <v-chip color="red" dark>
                  {{ item.rol }}
                </v-chip>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
        <v-col cols="12" sm="7" lg="7" md="7">
          <v-card class="pa-2 rounded-xl" elevation="5">
            <h3 class="pl-2 pt-2">
              Nuevo Administrador <v-icon right>mdi-account-circle</v-icon>
            </h3>
            <v-container>
              <h2 class="mb-5">Cuenta Administrador</h2>

              <v-row>
                <v-col cols="12" md="6" class="ma-0 pt-0 pb-0">
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
                <v-col cols="12" md="6" class="ma-0 pt-0 pb-0">
                  <v-text-field
                    outlined
                    color="green"
                    label="Apellidos"
                    placeholder="Ingresa tus apellidos(s)"
                    v-model="user.apellidos"
                    :rules="ruleRequired"
                    dense
                  ></v-text-field>
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
            <v-card-actions>
              <v-col cols="12">
                <v-tooltip color="grey darken-3" top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      rounded
                      v-bind="attrs"
                      v-on="on"
                      large
                      block
                      color="green"
                      dark
                      @click="setInfo"
                      >Crear cuenta</v-btn
                    >
                  </template>
                  <span>Enviar información</span>
                </v-tooltip>
              </v-col>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-form>

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

  mounted() {
    this.users();
  },
  data: () => ({
    valid: true,
    overlay: false,
    text: "",
    administradores: [],
    mail: "",
    mailRepeat: "",
    loading: false,
    password: "",
    passwordRepeat: "",
    snackbar: false,
    timeout: 5000,
    show1: false,
    show2: false,
    user: {
      nombre: "",
      apellidos: "",
      rol: "admin",
      uid: "",
    },
    headers: [
      {
        text: "Nombre",
        value: "nombre",
      },
      {
        text: "Apellidos",
        value: "apellidos",
      },

      {
        text: "Rol",
        value: "rol",
      },
    ],
    menu: false,

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
  }),
  methods: {
    async users() {
      this.loading = true;
      try {
        const response = await db
          .collection("users")
          .where("rol", "==", "admin")
          .get();

        if (response.docs.length > 0) {
          response.docs.forEach((e) => {
            this.administradores.push(e.data());
          });
        }
      } catch (error) {
        console.warn(error);
      } finally {
        this.loading = false;
      }
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
        const response = await db.collection("users").doc(uid).set(this.user);
        if (response == undefined) {
          alert("Cuenta creada con exito!");
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
