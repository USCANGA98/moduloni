<template>
  <v-dialog scrollable v-model="viewDetailUser" persistent max-width="750">
    <v-card style="overflow-y: hidden;">
      <v-toolbar dense flat color="green" dark>
        <v-toolbar-title
          >Detalle alumno - {{ userData.nombre }} {{ userData.apellidoPaterno }}
          {{ userData.apellidoMaterno }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="white" text @click="cerrar">Cerrar</v-btn>
      </v-toolbar>
      <v-container style="overflow-y: scroll;" class="pa-8">
        <v-row>
          <v-col cols="12">
            <v-hover v-slot:default="{ hover }" open-delay="0">
              <v-card
                class="text-center mt-16 rounded-xl"
                :class="`elevation-${hover ? 10 : 1}`"
              >
                <v-btn
                  class="mb-16 mt-n5"
                  depressed
                  target="_blank"
                  icon
                  color="#fff"
                  @click="mostrarImagen"
                >
                  <v-avatar
                    color="white"
                    :class="`elevation-${hover ? 8 : 3}`"
                    size="200"
                  >
                    <v-img
                      class="transition-swing"
                      max-height="190"
                      max-width="190"
                      :src="userData.documents.fotografia.url"
                    ></v-img>
                  </v-avatar>
                </v-btn>

                <v-container>
                  <h2 class="mb-5 text-left">Datos personales</h2>
                  <v-row>
                    <v-col cols="12" class="ma-0 pt-0 pb-0">
                      <v-text-field
                        readonly
                        outlined
                        color="green"
                        label="Nombre(s)"
                        v-model="userData.nombre"
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="ma-0 pt-0 pb-0">
                      <v-text-field
                        outlined
                        readonly
                        color="green"
                        label="Apellido paterno"
                        v-model="userData.apellidoPaterno"
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="ma-0 pt-0 pb-0">
                      <v-text-field
                        readonly
                        outlined
                        color="green"
                        label="Correo electrónico"
                        dense
                        v-model="userData.correoElectronico"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="ma-0 pt-0 pb-0">
                      <v-text-field
                        readonly
                        outlined
                        color="green"
                        label="Apellido materno"
                        v-model="userData.apellidoMaterno"
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="ma-0 pt-0 pb-0">
                      <v-text-field
                        readonly
                        outlined
                        dense
                        color="green"
                        v-model="userData.fechaNacimiento"
                        label="Fecha de nacimiento"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4" class="ma-0 pt-0 pb-0">
                      <v-text-field
                        outlined
                        readonly
                        color="green"
                        label="Edad"
                        type="number"
                        min="0"
                        max="99"
                        v-model="userData.edad"
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4" class="ma-0 pt-0 pb-0">
                      <v-text-field
                        outlined
                        readonly
                        color="green"
                        label="Sexo"
                        dense
                        v-model="userData.sexo"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4" class="ma-0 pt-0 pb-0">
                      <v-text-field
                        outlined
                        readonly
                        color="green"
                        label="Número seguro social"
                        type="number"
                        min="0"
                        max="99"
                        dense
                        v-model="userData.numeroSeguroSocial"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" class="ma-0 pt-0 pb-0">
                      <v-text-field
                        outlined
                        readonly
                        color="green"
                        label="Padre o tutor"
                        dense
                        v-model="userData.tutor"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-hover v-slot:default="{ hover }" open-delay="0">
              <v-card class="rounded-xl" :class="`elevation-${hover ? 10 : 1}`">
                <v-container>
                  <h2 class="mb-5">Dirección</h2>
                  <v-row>
                    <v-col cols="12" class="ma-0 pt-0 pb-0">
                      <v-text-field
                        outlined
                        color="green"
                        label="Calle"
                        dense
                        v-model="userData.direccion.calle"
                        readonly
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="ma-0 pt-0 pb-0">
                      <v-text-field
                        outlined
                        color="green"
                        label="Número exterior"
                        type="number"
                        min="0"
                        max="99999"
                        dense
                        v-model="userData.direccion.numeroExterior"
                        readonly
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="ma-0 pt-0 pb-0">
                      <v-text-field
                        outlined
                        color="green"
                        label="Número interior"
                        type="number"
                        min="0"
                        max="99999"
                        dense
                        v-model="userData.direccion.numeroInterior"
                        readonly
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="ma-0 pt-0 pb-0">
                      <v-text-field
                        outlined
                        color="green"
                        label="Colonia"
                        dense
                        v-model="userData.direccion.colonia"
                        readonly
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="ma-0 pt-0 pb-0">
                      <v-text-field
                        outlined
                        color="green"
                        label="Código postal"
                        type="number"
                        min="0"
                        max="99999"
                        dense
                        v-model="userData.direccion.codigoPostal"
                        readonly
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="ma-0 pt-0 pb-0">
                      <v-text-field
                        outlined
                        color="green"
                        label="Estado"
                        dense
                        v-model="userData.direccion.estado"
                        readonly
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="ma-0 pt-0 pb-0">
                      <v-text-field
                        outlined
                        color="green"
                        label="Ciudad"
                        dense
                        v-model="userData.direccion.ciudad"
                        readonly
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-hover v-slot:default="{ hover }" open-delay="0">
              <v-card class="rounded-xl" :class="`elevation-${hover ? 10 : 1}`">
                <v-container>
                  <h2 class="mb-5">Datos escolares</h2>
                  <v-row>
                    <v-col cols="12" class="ma-0 pt-0 pb-0">
                      <v-text-field
                        outlined
                        readonly
                        color="green"
                        label="Escuela de procedencia"
                        dense
                        v-model="userData.escuelaProcedencia"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="ma-0 pt-0 pb-0">
                      <v-text-field
                        outlined
                        readonly
                        color="green"
                        label="Carrera"
                        dense
                        v-model="userData.carrera"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="ma-0 pt-0 pb-0">
                      <v-text-field
                        outlined
                        readonly
                        color="green"
                        label="Identificador de usuario"
                        dense
                        v-model="userData.uid"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
      </v-container>
    </v-card>

    <v-dialog v-if="dialog2" v-model="dialog2" max-width="750">
      <v-card>
        <v-img :src="userData.documents.fotografia.url"></v-img>
      </v-card>
    </v-dialog>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    viewDocumentEdit: false,
    itemData: {},
    dialog2: false,
  }),

  name: "DetailUserComponent",
  props: {
    viewDetailUser: {
      type: Boolean,
      required: true,
    },
    userData: {
      type: Object,
      required: true,
    },
  },
  methods: {
    mostrarImagen() {
      this.dialog2 = true;
    },
    cerrar() {
      this.$emit("cerrar");
    },
  },
};
</script>

<style lang="scss" scoped></style>
