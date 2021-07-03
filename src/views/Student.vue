<template>
  <div>
    <v-container>
      <v-subheader>Proceso Nuevo Ingreso</v-subheader>
      <v-row>
        <!-- Aqui empieza el container con los datos del alumno-->
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-container class="text-left">
                <v-stepper value="2" class="ma-0 pa-0">
                  <v-card flat max-width="auto">
                    <v-card-subtitle
                      v-if="user.statusProceso != 'Revisado'"
                      class="text-center"
                    >
                      <strong
                        >¡Hola {{ user.nombre }}!, podrás actualizar tus
                        documentos hasta que el 'Status' haya cambiado a
                        'Revisado'.</strong
                      ></v-card-subtitle
                    >
                    <v-card-subtitle
                      v-if="user.statusProceso == 'Revisado'"
                      class="text-center"
                      ><strong>
                        ¡Tu proceso de evaluación ha concluido
                        satisfactoriamente!, Espera las indicaciones de
                        servicios escolares.</strong
                      >
                    </v-card-subtitle>
                  </v-card>
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

                <v-tooltip color="grey darken-3" right>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      v-bind="attrs"
                      v-on="on"
                      rounded
                      color="white"
                      class="ma-2 mb-4 my-5"
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
                  class="mx-auto rounded-xl"
                  elevation="5"
                >
                  <v-container>
                    <v-alert text dense type="info" class="font-weight-medium" border="left"
                      >Tu información es de carácter sensible, no compartas tu
                      usuario y contraseña.
                    </v-alert>
                    <h2 class="mb-5">Datos personales</h2>
                    <v-row>
                      <v-col cols="12" md="4" class="ma-0 pt-0 pb-0">
                        <v-text-field
                          readonly
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
                          readonly
                          color="green"
                          label="Apellido paterno"
                          placeholder="Ingresa tu apellido paterno"
                          v-model="user.apellidoPaterno"
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="4" class="ma-0 pt-0 pb-0">
                        <v-text-field
                          readonly
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
                          readonly
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
                          readonly
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
                          readonly
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
                          readonly
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
                          readonly
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
                          readonly
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
                          readonly
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
                          readonly
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
                          readonly
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
                          readonly
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
                          readonly
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
                          readonly
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
                          readonly
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
                          readonly
                        ></v-text-field>
                      </v-col>
                      <v-container
                        ><h2 class="mb-5">Datos Escolares</h2></v-container
                      >
                      <v-col cols="12" md="6" class="ma-0 pt-0 pb-0">
                        <v-text-field
                          outlined
                          readonly
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
                          readonly
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
          md="4"
          lg="4"
          sm="6"
          cols="12"
          v-show="document.mensaje != null"
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
              <strong> Status:</strong>
              <br />
              {{ document.aprobado ? "Revisado" : "En revisión" }}
            </v-card-text>
            <v-card-text>
              <strong> Mensaje:</strong>
              <br />
              {{ document.mensaje }}
            </v-card-text>
            <v-card-actions>
              <v-row>
                <v-col cols="8">
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
                </v-col>
                <v-col v-if="document.aprobado == true || document.mensaje != 'No ha sido revisado'" cols="3">
                  <v-tooltip color="grey darken-3" top>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        icon
                        v-bind="attrs"
                        v-on="on"
                        
                        color="blue"
                        dark
                        depressed
                        @click="abrir(document.url)"
                        ><v-icon>mdi-file-move-outline</v-icon></v-btn
                      >
                    </template>
                    <span>Abrir documento</span>
                  </v-tooltip>
                </v-col>
              </v-row>
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
    dialog2: false,
    overlay: false,
    expand: false,
  }),
  components: {},
  methods: {
    abrir(url) {
      this.user.documents.url = url;
      window.open(url, "_blank");
    },
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
