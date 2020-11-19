<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h2 class="text-center">
            UNIVERSIDAD TECNOLOGICA DEL SURESTE DE VERACRUZ
          </h2>
        </v-col>
        <!-- Aqui empieza el container con los datos del alumno-->
        <v-container v-if="user.rol == 'Estudiante'">
          <v-row>
            <v-col cols="12">
              <v-expand-transition>
                <v-card max-width="8000" elevation="5">
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
                        <h2 class="mb-5">Dirección</h2></v-container
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
                  </v-container>
                </v-card>
              </v-expand-transition>
            </v-col>
          </v-row>
        </v-container>
        <!-- Aqui termina el container con los datos del alumno-->
        <v-container
          v-if="
            user.rol == 'DirectorTi' ||
              user.rol == 'DirectorQui' ||
              user.rol == 'DirectorMeca' ||
              user.rol == 'DirectorMantto'
          "
        >
          <v-row>
            <v-col cols="12">
              <v-card max-width="8000" elevation="5">
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
              </v-card>
            </v-col>
          </v-row>
        </v-container>
        <!--Aqui termina renderizado de director de carrera-->
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { storage, db } from "../services/firebase";
export default {
  name: "Perfil",
  data: () => ({}),
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
        const response = await db
          .collection("users")
          .doc(uid)
          .set(user);
        if (response == undefined) alert("Documeto actualizado con exito!");
      } catch (error) {
        console.warn(error);
      }
    }
  },
  computed: {
    ...mapState(["user"])
  }
};
</script>

<style lang="scss" scoped></style>
