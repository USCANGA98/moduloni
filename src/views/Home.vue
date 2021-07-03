<template>
  <v-container class="fondo">
    <v-row class="d-flex justify-center align-center">
      <v-col md="6" lg="7" sm="6" cols="12">
        <v-card color="rgba(0,0,0,0)" elevation="5" flat rounded="xl" style="">
          <!-- <h2 class="text-center" style="color: grey" >
            Universidad tecnologica del sureste de veracruz
          </h2> -->
          <v-carousel
            hide-delimiter-background
            cycle
            show-arrows-on-hover
            interval="4000"
          >
            <v-carousel-item
              gradient="to top, rgba(0,0,0,.1), rgba(0,0,0,.4)"
              v-for="(item, i) in items"
              :key="i"
              :src="item.src"
            >
              <div class="text-center">
                <v-avatar size="150">
                  <v-img src="../assets/utsv-logo-3.jpg"></v-img>
                </v-avatar>

                <h3 class="title font-weight-bold mb-2">
                  Universidad Tecnológica del Sureste de Veracruz
                </h3>
                <span class="caption font-weight-light"
                  >Un mejor futuro...</span
                >
              </div>
            </v-carousel-item>
          </v-carousel>
        </v-card>
      </v-col>
      <v-col md="6" lg="4" sm="6" cols="12">
        <v-container>
          <v-card
            elevation="5"
            rounded="lg"
            style="
              border-top: solid 8px rgb(76, 175, 80);
              border-bottom: solid 8px rgb(76, 175, 80);
            "
          >
            <v-card-subtitle class="text-center">
              Módulo de alumnos de nuevo ingreso</v-card-subtitle
            >

            <v-col cols="12" class="d-flex justify-center">
              <v-hover v-slot:default="{ hover }" open-delay="0">
                <v-btn
                  href="http://www.utsv.com.mx/wp/"
                  target="_blank"
                  class="mt-5 mb-10"
                  fab
                  icon
                  color="#fff"
                >
                  <v-avatar
                    :class="`elevation-${hover ? 5 : 0}`"
                    class="transition-swing"
                    size="150"
                  >
                    <v-img src="../assets/utsv-logo.png"></v-img>
                  </v-avatar>
                </v-btn>
              </v-hover>
            </v-col>

            <v-col class="d-flex justify-center">
              <v-hover v-slot:default="{ hover }" open-delay="0">
                <v-btn
                  href="https://www.facebook.com/UTSV1/"
                  target="_blank"
                  class="mx-1"
                  :class="`elevation-${hover ? 5 : 0}`"
                  color="#fff"
                  outlined
                  fab
                  ><v-icon color="#3b5998">mdi mdi-facebook</v-icon></v-btn
                >
              </v-hover>
              <v-hover v-slot:default="{ hover }" open-delay="0">
                <v-btn
                  href="https://wa.me/9212532929?text=Hola,%20quiero%20más%20detalles"
                  target="_blank"
                  class="mx-1"
                  :class="`elevation-${hover ? 5 : 0}`"
                  color="#fff"
                  outlined
                  fab
                  ><v-icon color="#4fce5d">mdi mdi-whatsapp</v-icon></v-btn
                >
              </v-hover>
              <v-hover v-slot:default="{ hover }" open-delay="0">
                <v-btn
                  href="https://twitter.com/UTSV1"
                  target="_blank"
                  class="mx-1"
                  :class="`elevation-${hover ? 5 : 0}`"
                  color="#fff"
                  outlined
                  fab
                  ><v-icon color="#00acee">mdi mdi-twitter</v-icon></v-btn
                >
              </v-hover>
              <v-hover v-slot:default="{ hover }" open-delay="0">
                <v-btn
                  href="https://www.youtube.com/channel/UCROW9bCyFzCL7lKw1JuFZnA"
                  target="_blank"
                  class="mx-1"
                  :class="`elevation-${hover ? 5 : 0}`"
                  color="#fff"
                  outlined
                  fab
                  ><v-icon color="#c4302b">mdi mdi-youtube</v-icon></v-btn
                >
              </v-hover>
            </v-col>
            <v-col cols="12" v-if="error != ''">
              <v-alert outlined type="error" text dense>{{ error }}</v-alert>
            </v-col>

            <v-form class="pr-5 pl-5" @submit.prevent="iniciarSesion()">
              <v-text-field
                outlined
                dense
                v-model="user.mail"
                color="green"
                label="Usuario"
                required
              ></v-text-field>
              <v-text-field
                outlined
                dense
                v-model="user.password"
                color="green"
                label="Contraseña"
                type="password"
                required
              ></v-text-field>
              <v-btn
                class="text-capitalize font-weight-bold white--text"
                block
                color="green"
                dark
                depressed
                :loading="loading"
                type="submit"
                >Iniciar sesión</v-btn
              >
              <v-row>
                <v-col cols="12" class="d-flex justify-center pt-2">
                  <router-link
                    :to="{ name: 'PasswordReset' }"
                    class="enlace font-weight-light blue--text text-subtitle-2"
                    >¿Olvidaste tu contraseña?</router-link
                  >
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-col cols="12" class="d-flex justify-center">
                <v-btn
                  depressed
                  width="200px"
                  :to="{ name: 'Registro' }"
                  color="blue"
                  class="text-capitalize font-weight-bold white--text"
                >
                  Crear Cuenta
                </v-btn>
              </v-col>
            </v-form>
          </v-card>
        </v-container>
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
    items: [
      {
        src: "https://firebasestorage.googleapis.com/v0/b/moduloni.appspot.com/o/GENERAL-768x769.jpeg?alt=media&token=2c2f2dc7-d972-4448-b0a1-818e00f87e47",
      },
      {
        src: "https://firebasestorage.googleapis.com/v0/b/moduloni.appspot.com/o/5d665487cda12patio.jpg?alt=media&token=fc542297-8f28-4c1a-af27-2f4747e9af0d",
      },
      {
        src: "https://firebasestorage.googleapis.com/v0/b/moduloni.appspot.com/o/unnamed.png?alt=media&token=4b21c083-3dc6-498c-bf28-585f3a70d83e",
      },
      {
        src: "https://firebasestorage.googleapis.com/v0/b/moduloni.appspot.com/o/unnamed.jpg?alt=media&token=6def235e-2af2-4a43-bb7f-b735ebdd3e5c",
      },
      {
        src: "http://parquealis.com/img/data/galerias/EventosParqueAlis/Taller%22AnalisisdelaSituaciondelTrabajo%22enlaUTSV/7a099bfa-5dda-42bf-91bd-b45345caadd1png.png",
      },
      {
        src: "https://firebasestorage.googleapis.com/v0/b/moduloni.appspot.com/o/unnamed%20(1).jpg?alt=media&token=1ad19a5c-b8b9-4f8a-8d41-39f7ea757c9b",
      },
    ],
    loading: false,
    user: {
      mail: "",
      password: "",
    },
    error: "",
    userData: "",
  }),
  methods: {
    ...mapMutations(["setUser"]),
    async iniciarSesion() {
      const directores = [
        "DirectorTi",
        "DirectorQui",
        "DirectorMeca",
        "DirectorMantto",
      ];
      this.loading = true;
      try {
        this.userData = await this.getUser();
        this.setUser(this.userData);
        if (this.userData.rol == "admin") {
          console.log("accedió el admin");
          this.$router.push({ name: "Admin" });
        }
        if (this.userData.rol == "Estudiante") {
          console.log("accedió el estudiante");
          this.$router.push({ name: "Student" });
        }
        if (directores.includes(this.userData.rol)) {
          console.log("accedió el director de carrera");
          this.$router.push({ name: "Director" });
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
        const response = await db.collection("users").doc(uid).get();
        return response.data();
      } catch (error) {
        console.warn(error);
      }
    },
  },
};
</script>

<style lang="css">
.enlace {
  text-decoration: none;
}

.enlace:hover {
  text-decoration: underline;
}
.img {
  background-image: url("../assets/utsv_portada.jpg");

  height: 100%;
  background-position: center;
  background-size: cover;
}
.fondo {
  background-color: #fafafa;
}
</style>
