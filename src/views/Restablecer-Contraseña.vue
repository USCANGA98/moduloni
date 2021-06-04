<template>
  <div>
    <v-app-bar
      style="border-bottom: 1px solid #eceff1; background-color: white"
      elevation="0"
      height="55"
    >
      <router-link :to="{ name: 'Home' }">
        <v-img max-height="85" max-width="124" src="../assets/UTSV.png">
        </v-img>
      </router-link>

      <v-spacer></v-spacer>
      <v-btn
        class="ma-1 text-capitalize font-weight-bold white--text"
        color="#2D74DE"
        dark
        depressed
        :to="{ name: 'Home' }"
        >Iniciar sesión</v-btn
      >
    </v-app-bar>

    <v-row class="d-flex justify-center align-center">
      <v-col md="6" lg="6" sm="8" cols="12">
        <v-container class="d-flex justify-center">
          <v-card class="mt-10" rounded="lg" color="white">
            <p class="font-weight-bold title pt-4 pl-4">Recupera tu cuenta</p>
            <v-divider></v-divider>
            <p class="font-weight-light subtitle-1 pt-2 pl-4 pr-2">
              Ingresa tu correo electrónico para restablecer tu contrasena.
            </p>

            <v-text-field
              v-model="mail"
              class="mr-4 ml-4"
              outlined
              color="blue"
              label="Usuario"
              required
              @keyup.enter="init"
            ></v-text-field>
            <v-divider></v-divider>
            <v-row align="center" justify="end" class="mb-5">
              <v-card-actions class="mr-3 d-flex align-end">
                <v-btn
                  class="ma-1 text-capitalize font-weight-bold black--text"
                  style="background-color: #f4f6f6"
                  text
                  :to="{ name: 'Home' }"
                  >Cancelar</v-btn
                >
                <v-btn
                  class="ma-1 text-capitalize font-weight-bold white--text"
                  color="#2D74DE"
                  dark
                  depressed
                  @click="init"
                  :loading="loading"
                  >Enviar datos</v-btn
                >
              </v-card-actions>
            </v-row>
          </v-card>
        </v-container>
      </v-col>
    </v-row>

    <v-footer style="border-top: 1px solid #eceff1" height="100%" padless>
      <v-card flat tile class="white--text text-center">
        <v-card-text>
          <v-btn
            v-for="(icon, i) in icons"
            :key="i"
            class="mx-4"
            :color="icon.color"
            icon
            :href="icon.link"
            :target="icon.target"
          >
            <v-icon size="24px">
              {{ icon.icon }}
            </v-icon>
          </v-btn>
        </v-card-text>
        <v-card-text class="white--text pt-0">
          Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet.
          Mauris cursus commodo interdum. Praesent ut risus eget metus luctus
          accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim
          a sit amet dui. Duis commodo vitae velit et faucibus.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="black--text">
          {{ new Date().getFullYear() }} —
          <strong>Universidad Tecnológica del Sureste de Veracruz</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </div>
</template>

<script>
import { auth } from "../services/firebase";
export default {
  name: "PasswordReset",

  data: () => ({
    icons: [
      {
        icon: "mdi-facebook",
        color: "#3b5998",
        link: "https://www.facebook.com/UTSV1/",
        target: "_blank",
      },
      {
        icon: "mdi-twitter",
        color: "#00acee",
        link: "https://twitter.com/UTSV1",
        target: "_blank",
      },
      {
        icon: "mdi-linkedin",
        color: "#0e76a8",
        link: "https://www.linkedin.com/school/utsv/mycompany/",
        target: "_blank",
      },
      {
        icon: "mdi-instagram",
        color: "#C13584",
        link: "https://www.instagram.com/utsvnanchital/",
        target: "_blank",
      },
    ],
    loading: false,

    mail: "",
  }),
  methods: {
    async init() {
      this.loading = true;
      await this.resetPassword();
      this.loading = false;
      this.$router.push({ name: "Home" });
    },
    async resetPassword() {
      const emailAddress = this.mail;

      await auth
        .sendPasswordResetEmail(emailAddress)
        .then(function () {
          // Email sent.
          alert(
            `Te hemos enviado un correo a esta direccion con un enlace para restablecer tu contraseña.`
          );
        })
        .catch(function (error) {
          // An error happened.
          alert("ocurrió un error ", error);
        });
    },
  },
};
</script>

<style lang="css">
</style>
