<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2 class="text-center">
          UNIVERSIDAD TECNOLÓGICA DEL SURESTE DE VERACRUZ
        </h2>
        <h3 class="text-center">Módulo para nuevo ingreso</h3>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center">
      <v-col cols="12" md="4">
        <v-card elevation="12">
          <v-row class="ma-0 pa-0">
            <v-col cols="12" class="d-flex justify-center pa-0 ma-0">
              <v-avatar size="150">
                <v-img src="../assets/utsv-logo.png"></v-img>
              </v-avatar>
            </v-col>
            <v-container class="justify-center d-flex pa-0 ma-0">
              <v-hover v-slot:default="{ hover }" open-delay="0">
                <v-btn
                  href="https://www.facebook.com/UTSV1/"
                  class="mx-1"
                  :class="`elevation-${hover ? 10 : 0}`"
                  color="#fff"
                  outlined
                  fab
                  ><v-icon color="blue-grey darken-2"
                    >mdi mdi-facebook</v-icon
                  ></v-btn
                >
              </v-hover>
              <v-hover v-slot:default="{ hover }" open-delay="0">
                <v-btn
                  href="https://twitter.com/UTSV1"
                  class="mx-1"
                  :class="`elevation-${hover ? 10 : 0}`"
                  color="#fff"
                  outlined
                  fab
                  ><v-icon color="blue-grey darken-2"
                    >mdi mdi-twitter</v-icon
                  ></v-btn
                >
              </v-hover>
              <v-hover v-slot:default="{ hover }" open-delay="0">
                <v-btn
                  href="https://www.youtube.com/channel/UCROW9bCyFzCL7lKw1JuFZnA"
                  class="mx-1"
                  :class="`elevation-${hover ? 10 : 0}`"
                  color="#fff"
                  outlined
                  fab
                  ><v-icon color="blue-grey darken-2"
                    >mdi mdi-youtube</v-icon
                  ></v-btn
                >
              </v-hover>
            </v-container>
            <v-col cols="12" v-if="error != ''">
              <v-alert outlined type="error" text dense>{{ error }}</v-alert>
            </v-col>
          </v-row>

          <v-form class="pa-5">
            <v-text-field
              outlined
              dense
              v-model="user.mail"
              color="green"
              label="Usuario"
              required
              @keyup.enter="iniciarSesion"
            ></v-text-field>
            <v-text-field
              outlined
              dense
              v-model="user.password"
              color="green"
              label="Contraseña"
              type="password"
              required
              @keyup.enter="iniciarSesion"
            ></v-text-field>
            <v-btn
              class="mb-0"
              block
              rounded
              color="green"
              dark
              depressed
              :loading="loading"
              @click="iniciarSesion"
              >Ingresar</v-btn
            >
            <v-row>
              <v-col cols="12" class="d-flex justify-end pt-2">
                <router-link
                  to="/registro"
                  class="enlace blue--text text-subtitle-2"
                  >Crear cuenta</router-link
                >
              </v-col>
              <v-col cols="12" class="d-flex justify-end pt-0">
                <router-link
                  class="enlace blue--text text-subtitle-2"
                  to="/recuperarContraseña"
                >
                  ¿Olvidaste tu contraseña?
                </router-link>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { db, auth } from "../services/firebase";
import { mapMutations } from "vuex";

export default {
  name: "Home",

  data: () => ({
    loading: false,
    user: {
      mail: "",
      password: ""
    },
    error: "",
    userData: ""
  }),
  methods: {
    ...mapMutations(["setUser"]),
    async iniciarSesion() {
      this.loading = true;
      try {
        this.userData = await this.getUser();
        this.setUser(this.userData);
        if (this.userData.rol == "admin") {
          console.log("accedió el admin");
          this.$router.push("/admin");
        }
        if (this.userData.rol == "Estudiante") {
          console.log("accedió el estudiante");
          this.$router.push("/student");
        }
        if (
          this.userData.rol == "DirectorTi" ||
          this.userData.rol == "DirectorQui" ||
          this.userData.rol == "DirectorMeca" ||
          this.userData.rol == "DirectorMantto"
        ) {
          console.log("accedió el director de carrera");
          this.$router.push("/director");
        }
      } catch (error) {
        console.warn(error);
      } finally {
        this.loading = false;
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
        const response = await db
          .collection("users")
          .doc(uid)
          .get();
        return response.data();
      } catch (error) {
        console.warn(error);
      }
    }
  }
};
</script>

<style lang="css">
.enlace {
  text-decoration: none;
}

.enlace:hover {
  text-decoration: underline;
}
</style>
