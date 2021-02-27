<template>
  <div>
    <v-container>
      <v-col cols="12">
        <h2 class="text-center">
          UNIVERSIDAD TECNOLOGICA DEL SURESTE DE VERACRUZ
        </h2>
      </v-col>
    </v-container>
    <!-- Aqui empieza el container con los datos del alumno-->
    <v-container v-if="user.rol == 'Estudiante'" class="mt-10">
      <v-card class="ma-15 text-center rounded-xl" elevation="10">
        <v-hover v-slot:default="{ hover }" open-delay="0">
          <v-btn class="mt-5 mb-12" depressed disabled fab icon>
            <v-avatar
              v-if="$vuetify.breakpoint.width < 960"
              :class="`elevation-${hover ? 5 : 5}`"
              color="white"
              size="150"
              class="mt-n16 mb-8"
            >
              <!-- <v-img v-if="image != ''" :src="image"></v-img> -->
              <v-img
                max-width="148"
                max-height="148"
                :src="user.documents.fotografia.url"
              >
              </v-img>
            </v-avatar>
            <v-avatar
              v-else
              :class="`elevation-${hover ? 5 : 5}`"
              color="white"
              size="260"
              class="mt-n16 mb-8"
            >
              <!-- <v-img v-if="image != ''" :src="image"></v-img> -->
              <v-img
                max-width="250"
                max-height="250"
                :src="user.documents.fotografia.url"
              >
              </v-img>
            </v-avatar>
          </v-btn>
        </v-hover>

        <h2 class="mt-8">
          {{ user.nombre }} {{ user.apellidoPaterno }}
          {{ user.apellidoMaterno }}
        </h2>

        <br />

        <!-- <v-tooltip bottom> 
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          v-bind="attrs"
                          v-on="on"
                          icon
                          class="mb-5 mt-2 mt-n16"
                          dark
                          @click="$refs.boton.click()"
                        >
                          <v-icon color="grey">mdi-camera</v-icon>
                        </v-btn>
                      </template>
                      <span>Insertar Imagen</span>
                    </v-tooltip>
                    <input
                      type="file"
                      accept="image/*"
                      ref="boton"
                      @change="processImage($event)"
                      class="d-none"
                    />-->

        <v-container>
          <h2 class="mb-5 text-left">Datos personales</h2>
          <v-row>
            <v-col cols="12" md="4" class="ma-0 pt-0 pb-0">
              <v-text-field
                outlined
                color="green"
                label="Nombre(s)"
                placeholder="Ingresa tu nombre(s)"
                v-model="user.nombre"
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" class="ma-0 pt-0 pb-0">
              <v-text-field
                outlined
                color="green"
                label="Apellido paterno"
                placeholder="Ingresa tu apellido paterno"
                v-model="user.apellidoPaterno"
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" class="ma-0 pt-0 pb-0">
              <v-text-field
                disabled
                outlined
                color="green"
                label="Correo electrónico"
                placeholder="Ingresa tu correo electrónico"
                dense
                v-model="user.correoElectronico"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" class="ma-0 pt-0 pb-0">
              <v-text-field
                outlined
                color="green"
                label="Apellido materno"
                placeholder="Ingresa tu apellido materno"
                v-model="user.apellidoMaterno"
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" class="ma-0 pt-0 pb-0">
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                transition="slide-y-transition"
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
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" class="ma-0 pt-0 pb-0">
              <v-text-field
                outlined
                color="green"
                label="Sexo"
                placeholder="Ingresa tu sexo"
                dense
                v-model="user.sexo"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" class="ma-0 pt-0 pb-0">
              <v-text-field
                outlined
                color="green"
                label="Número seguro social"
                placeholder="Ingresa número de seguridad social"
                type="number"
                min="0"
                max="99"
                dense
                v-model="user.numeroSeguroSocial"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4" class="ma-0 pt-0 pb-0">
              <v-text-field
                outlined
                color="green"
                label="Padre o tutor"
                placeholder="Ingresa el nombre de tu padre o tutor"
                dense
                v-model="user.tutor"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-container>
              <h2 class="mb-5 text-left">Dirección</h2></v-container
            >
            <v-col cols="12" md="4" class="ma-0 pt-0 pb-0">
              <v-text-field
                outlined
                color="green"
                label="Calle"
                placeholder="Ingresa tu calle"
                dense
                v-model="user.direccion.calle"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4" class="ma-0 pt-0 pb-0">
              <v-text-field
                outlined
                color="green"
                label="Número exterior"
                placeholder="Ingresa el número exterior"
                type="number"
                min="0"
                max="99999"
                dense
                v-model="user.direccion.numeroExterior"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4" class="ma-0 pt-0 pb-0">
              <v-text-field
                outlined
                color="green"
                label="Número interior"
                placeholder="Ingresa número interior"
                type="number"
                min="0"
                max="99999"
                dense
                v-model="user.direccion.numeroInterior"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" class="ma-0 pt-0 pb-0">
              <v-text-field
                outlined
                color="green"
                label="Colonia"
                placeholder="Ingresa tu colonia"
                dense
                v-model="user.direccion.colonia"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" class="ma-0 pt-0 pb-0">
              <v-text-field
                outlined
                color="green"
                label="Código postal"
                placeholder="Ingresa tu código postal"
                type="number"
                min="0"
                max="99999"
                dense
                v-model="user.direccion.codigoPostal"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" class="ma-0 pt-0 pb-0">
              <v-text-field
                outlined
                color="green"
                label="Estado"
                placeholder="Ingresa tu estado"
                dense
                v-model="user.direccion.estado"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" class="ma-0 pt-0 pb-0">
              <v-text-field
                outlined
                color="green"
                label="Ciudad"
                placeholder="Ingresa tu ciudad"
                dense
                v-model="user.direccion.ciudad"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-container><h2 class="mb-5 text-left">Carrera</h2></v-container>
            <v-col cols="12" md="6">
              <v-text-field
                disabled
                outlined
                color="green"
                label="Carrera"
                placeholder="Carrera"
                dense
                v-model="user.carrera"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                disabled
                outlined
                color="green"
                label="Identificador de Usuario"
                placeholder="UID"
                dense
                v-model="user.uid"
              >
              </v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions class="justify-right">
          <v-container class="text-right">
            <v-tooltip color="grey darken-3" top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  rounded
                  @click="actualizarPerfilAlumno(user)"
                  color="success"
                  >Guardar Cambios</v-btn
                >
              </template>
              <span>Actualizar Información</span>
            </v-tooltip>
          </v-container>
        </v-card-actions>
      </v-card>
    </v-container>
    <!-- Aqui termina el container con los datos del alumno-->
    <v-container
      v-if="
        user.rol == 'DirectorTi' ||
        user.rol == 'DirectorQui' ||
        user.rol == 'DirectorMeca' ||
        user.rol == 'DirectorMantto'
      "
      class="mt-10"
    >
      <v-card class="ma-15 text-center rounded-xl" elevation="10">
        <v-hover v-slot:default="{ hover }" open-delay="0">
          <v-btn class="mt-5 mb-12" depressed disabled fab icon>
            <v-avatar
              v-if="$vuetify.breakpoint.width < 960"
              :class="`elevation-${hover ? 5 : 5}`"
              color="white"
              size="150"
              class="mt-n16 mb-8"
            >
              <!-- <v-img v-if="image != ''" :src="image"></v-img> -->
              <v-img
                max-width="148"
                max-height="148"
                src="../assets/utsv-logo.png"
              >
              </v-img>
            </v-avatar>
            <v-avatar
              v-else
              :class="`elevation-${hover ? 5 : 5}`"
              color="white"
              size="260"
              class="mt-n16 mb-8"
            >
              <!-- <v-img v-if="image != ''" :src="image"></v-img> -->
              <v-img
                max-width="250"
                max-height="250"
                src="../assets/utsv-logo.png"
              >
              </v-img>
            </v-avatar>
          </v-btn>
        </v-hover>
        <h2 class="mt-8">
          {{ user.nombre }} {{ user.apellidoPaterno }}
          {{ user.apellidoMaterno }}
        </h2>

        <br />

        <!-- <v-tooltip bottom> 
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          v-bind="attrs"
                          v-on="on"
                          icon
                          class="mb-5 mt-2 mt-n16"
                          dark
                          @click="$refs.boton.click()"
                        >
                          <v-icon color="grey">mdi-camera</v-icon>
                        </v-btn>
                      </template>
                      <span>Insertar Imagen</span>
                    </v-tooltip>
                    <input
                      type="file"
                      accept="image/*"
                      ref="boton"
                      @change="processImage($event)"
                      class="d-none"
                    />-->

        <v-container>
          <h2 class="mb-5 text-left">Datos personales</h2>
          <v-row>
            <v-col cols="12" md="4" class="ma-0 pt-0 pb-0">
              <v-text-field
                outlined
                color="green"
                label="Nombre(s)"
                placeholder="Ingresa tu nombre(s)"
                v-model="user.nombre"
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" class="ma-0 pt-0 pb-0">
              <v-text-field
                outlined
                color="green"
                label="Apellido paterno"
                placeholder="Ingresa tu apellido paterno"
                v-model="user.apellidoPaterno"
                dense
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4" class="ma-0 pt-0 pb-0">
              <v-text-field
                outlined
                color="green"
                label="Apellido materno"
                placeholder="Ingresa tu apellido materno"
                v-model="user.apellidoMaterno"
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" class="ma-0 pt-0 pb-0">
              <v-text-field
                disabled
                outlined
                color="green"
                label="Correo electrónico"
                placeholder="Ingresa tu correo electrónico"
                dense
                v-model="user.correoElectronico"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" class="ma-0 pt-0 pb-0">
              <v-text-field
                outlined
                dense
                color="green"
                v-model="user.fechaNacimiento"
                label="Fecha de nacimiento"
                placeholder="Ingresa tu fecha de nacimiento"
              ></v-text-field>
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
                dense
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-container class="text-right">
            <v-tooltip color="grey darken-3" top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  rounded
                  @click="actualizarPerfilDirector(user)"
                  color="success"
                  >Guardar Cambios</v-btn
                >
              </template>
              <span>Actualizar Información</span>
            </v-tooltip>
          </v-container>
        </v-card-actions>
      </v-card>
    </v-container>
    <!--Aqui termina renderizado de director de carrera-->
  </div>
</template>

<script>
import { mapState } from "vuex";
import { storage, db } from "../services/firebase";
export default {
  name: "Perfil",
  data: () => ({
    image: "",
    imgUrl: "",
    imageFile: "",
    menu: false,
  }),
  components: {},
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
    async actualizarPerfilAlumno(user) {
      // await this.subirImagen();
      const uid = user.uid;

      const response = await db.collection("users").doc(uid);

      // Set the "capital" field of the city 'DC'
      return response
        .update({
          nombre: user.nombre,
          apellidoPaterno: user.apellidoPaterno,
          apellidoMaterno: user.apellidoMaterno,
          fechaNacimiento: user.fechaNacimiento,
          edad: user.edad,
          sexo: user.sexo,
          numeroSeguroSocial: user.numeroSeguroSocial,
          tutor: user.tutor,
          direccion: {
            calle: user.direccion.calle,
            ciudad: user.direccion.ciudad,
            codigoPostal: user.direccion.codigoPostal,
            colonia: user.direccion.colonia,
            estado: user.direccion.estado,
            numeroExterior: user.direccion.numeroExterior,
            numeroInterior: user.direccion.numeroInterior,
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
    async actualizarPerfilDirector(user) {
      // await this.subirImagen();
      const uid = user.uid;

      const response = await db.collection("users").doc(uid);

      // Set the "capital" field of the city 'DC'
      return response
        .update({
          nombre: user.nombre,
          apellidoPaterno: user.apellidoPaterno,
          apellidoMaterno: user.apellidoMaterno,
          fechaNacimiento: user.fechaNacimiento,
          edad: user.edad,
        })
        .then(function () {
          alert("Documento Actualizado Correctamente!");
        })
        .catch(function (error) {
          // The document probably doesn't exist.
          alert("Ocurrió un error", error);
        });
    },
    //Linea para subir imagen de perfil desde icono de camara que ya se comentó
    // processImage(e) {
    //   this.imageFile = e.target.files[0];
    //   const reader = new FileReader();
    //   reader.readAsDataURL(this.imageFile);
    //   reader.onload = async (e) => {
    //     this.image = await e.target.result;
    //   };
    // },
    // async subirImagen() {
    //   try {
    //     const upload = await storage
    //       .child(`uid/${this.imageFile.name}`)
    //       .put(this.imageFile);
    //     const urlImg = await upload.ref.getDownloadURL();
    //     console.log(urlImg);
    //     this.estacion.imgUrl = urlImg;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
  },
  computed: {
    ...mapState(["user"]),
  },
};
</script>

<style lang="scss" scoped>
.input {
  position: relative;
  top: 20%;
  left: 10%;
  right: 20%;
}
</style>
