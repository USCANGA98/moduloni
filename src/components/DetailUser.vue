<template>
  <v-dialog v-model="viewDetailUser" persistent max-width="750">
    <v-card>
      <v-toolbar dense flat color="green" dark>
        <v-toolbar-title
          >Detalle alumno - {{ user.nombre }} {{ user.apellidoPaterno }}
          {{ user.apellidoMaterno }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="white" text @click="cerrar">Cerrar</v-btn>
      </v-toolbar>
      <v-container class="pa-8">
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
                  disabled
                  fab
                  icon
                  color="#fff"
                >
                  <v-avatar
                    class="transition-swing"
                    color="white"
                    :class="`elevation-${hover ? 8 : 3}`"
                    size="200"
                  >
                    <v-img
                      class="transition-swing"
                      max-height="190"
                      max-width="190"
                      :src="user.documents.fotografia.url"
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
                        placeholder="Ingresa tu nombre(s)"
                        v-model="user.nombre"
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="ma-0 pt-0 pb-0">
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
                    <v-col cols="12" class="ma-0 pt-0 pb-0">
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
                    <v-col cols="12" class="ma-0 pt-0 pb-0">
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
                    <v-col cols="12" class="ma-0 pt-0 pb-0">
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

                    <v-col cols="12" class="ma-0 pt-0 pb-0">
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
                        placeholder="Ingresa tu calle"
                        dense
                        v-model="user.direccion.calle"
                        readonly
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="ma-0 pt-0 pb-0">
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
                    <v-col cols="12" class="ma-0 pt-0 pb-0">
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
                    <v-col cols="12" class="ma-0 pt-0 pb-0">
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
                    <v-col cols="12" class="ma-0 pt-0 pb-0">
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
                    <v-col cols="12" class="ma-0 pt-0 pb-0">
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
                    <v-col cols="12" class="ma-0 pt-0 pb-0">
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
                        placeholder="Ingresa tu escuela de procedencia"
                        dense
                        v-model="user.escuelaProcedencia"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="ma-0 pt-0 pb-0">
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
            </v-hover>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    viewDocumentEdit: false,
    itemData: {},
  }),

  name: "DetailUserComponent",
  props: {
    viewDetailUser: {
      type: Boolean,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
  },
  methods: {
    cerrar() {
      this.$emit("cerrar");
    },
  },
};
</script>

<style lang="scss" scoped></style>
