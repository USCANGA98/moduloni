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
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-container class="text-left">
                <v-card
                  v-if="user.rol == 'Estudiante'"
                  max-width="auto"
                  elevation="2"
                >
                  <v-card-subtitle
                    v-if="user.statusProceso != 'Revisado'"
                    class="text-center"
                  >
                    <strong
                      >¡Hola {{ user.nombre }}!, podrás actualizar tus
                      documentos hasta que el 'Status' haya cambiado a
                      'Aprobado'.</strong
                    ></v-card-subtitle
                  >
                  <v-card-subtitle
                    v-if="user.statusProceso == 'Revisado'"
                    class="text-center"
                    ><strong>
                      Tu proceso de evaluación ha concluido satisfactoriamente,
                      espera las indicaciones de servicios escolares.</strong
                    >
                  </v-card-subtitle>
                  <v-stepper value="2" class="mt-0">
                    <v-stepper-header>
                      <v-stepper-step step="1" color="success" complete>
                        Documentos enviados
                      </v-stepper-step>

                      <v-divider></v-divider>

                      <v-stepper-step
                        v-if="user.statusProceso != 'Revisado'"
                        editable
                        step="2"
                        color="info"
                      >
                        En revisión
                        <small>Proceso de evaluación</small>
                      </v-stepper-step>

                      <v-stepper-step
                        v-if="user.statusProceso == 'Revisado'"
                        step="2"
                        color="success"
                        complete
                      >
                        En revisión
                        <small>Proceso de evaluación</small>
                      </v-stepper-step>

                      <v-divider></v-divider>

                      <v-stepper-step
                        v-if="user.statusProceso != 'Revisado'"
                        step="3"
                      >
                        Finalizado</v-stepper-step
                      >
                      <v-stepper-step
                        v-if="user.statusProceso == 'Revisado'"
                        step="3"
                        color="success"
                        complete
                      >
                        Finalizado</v-stepper-step
                      >
                    </v-stepper-header>
                  </v-stepper>
                </v-card>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      v-bind="attrs"
                      v-on="on"
                      rounded
                      color="white"
                      class="ma-2 mb-4 my-5"
                      elevation="2"
                      @click="expand = !expand"
                    >
                      <v-icon color="info">mdi-account-details</v-icon>
                    </v-btn>
                  </template>
                  <span>Informacion Personal</span>
                </v-tooltip>
              </v-container>
              <v-expand-transition>
                <v-card
                  v-show="expand"
                  width="100%"
                  class="mx-auto"
                  elevation="5"
                >
                  <v-container>
                    <v-alert text dense type="info" border="left"
                      >Tu información es de carácter sensible, no compartas tu
                      usuario y contraseña.
                    </v-alert>
                    <h2 class="mb-5">Datos personales</h2>
                    <v-row>
                      <v-col cols="12" md="4" class="ma-0 pt-0 pb-0">
                        <v-text-field
                          disabled
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
                          disabled
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
                          disabled
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
                          disabled
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
                          disabled
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
                          disabled
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
                          disabled
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
                          disabled
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
                          disabled
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
                          disabled
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
                          disabled
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
                          disabled
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
                          disabled
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
                          disabled
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
                          disabled
                        ></v-text-field>
                      </v-col>
                      <v-container
                        ><h2 class="mb-5">Datos Escolares</h2></v-container
                      >
                      <v-col cols="12" md="6" class="ma-0 pt-0 pb-0">
                        <v-text-field
                          outlined
                          disabled
                          color="green"
                          label="Escuela de procedencia"
                          placeholder="Ingresa tu escuela de procedencia"
                          dense
                          v-model="user.escuelaProcedencia"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6" class="ma-0 pt-0 pb-0">
                        <v-text-field
                          outlined
                          disabled
                          color="green"
                          label="Carrera"
                          placeholder="Selecciona la carrera a la que deseas inscribirte"
                          dense
                          v-model="user.carrera"
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

        <v-col
          cols="4"
          v-for="(document, index) in user.documents"
          :key="document.name"
        >
          <v-card elevation="5">
            <v-card-title
              >{{ document.name }}
              <v-icon v-if="document.aprobado == true" color="success" right
                >mdi-checkbox-marked-circle-outline</v-icon
              >
            </v-card-title>
            <v-card-text>
              Status:
              <br />
              {{ document.aprobado ? "Aprobado" : "No aprobada" }}
            </v-card-text>
            <v-card-text>
              Mensaje:
              <br />
              {{ document.mensaje }}
            </v-card-text>
            <v-card-actions>
              <v-file-input
                :disabled="document.aprobado"
                color="green"
                prepend-icon
                prepend-inner-icon="mdi-file-document-outline"
                label="Editar documento"
                outlined
                show-size
                dense
                accept="application/pdf, image/*"
                @change="input($event, index)"
              ></v-file-input>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-overlay :value="overlay">
          <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { storage, db } from "../services/firebase";
export default {
  name: "Student",
  data: () => ({
    overlay: false,
    expand: false,
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
  },
  computed: {
    ...mapState(["user"]),
  },
};
</script>

<style lang="scss" scoped></style>
