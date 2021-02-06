<template>
  <v-dialog v-model="viewAddress" persistent max-width="750">
    <v-card>
      <v-toolbar dense flat color="green" dark>
        <v-toolbar-title>Detalle dirección alumno</v-toolbar-title>
      </v-toolbar>
      <v-hover v-slot:default="{ hover }" open-delay="0">
        <v-card class="ma-8 rounded-xl" :class="`elevation-${hover ? 10 : 1}`">
          <v-container>
            <h2 class="mb-5">Direccion</h2>
            <v-row>
              <v-col cols="12" md="6" class="ma-0 pt-0 pb-0">
                <v-text-field
                  readonly
                  outlined
                  color="green"
                  label="Calle"
                  placeholder="Ingresa tu calle"
                  dense
                  v-model="address.calle"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" class="ma-0 pt-0 pb-0">
                <v-text-field
                  readonly
                  outlined
                  color="green"
                  label="Número exterior"
                  placeholder="Ingresa el número exterior"
                  type="number"
                  min="0"
                  max="99999"
                  dense
                  v-model="address.numeroExterior"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" class="ma-0 pt-0 pb-0">
                <v-text-field
                  readonly
                  outlined
                  color="green"
                  label="Número interior"
                  type="number"
                  min="0"
                  max="99999"
                  dense
                  v-model="address.numeroInterior"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" class="ma-0 pt-0 pb-0">
                <v-text-field
                  readonly
                  outlined
                  color="green"
                  label="Colonia"
                  placeholder="Ingresa tu colonia"
                  dense
                  v-model="address.colonia"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" class="ma-0 pt-0 pb-0">
                <v-text-field
                  readonly
                  outlined
                  color="green"
                  label="Código postal"
                  placeholder="Ingresa tu código postal"
                  type="number"
                  min="0"
                  max="99999"
                  dense
                  v-model="address.codigoPostal"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" class="ma-0 pt-0 pb-0">
                <v-text-field
                  readonly
                  outlined
                  color="green"
                  label="Estado"
                  placeholder="Ingresa tu estado"
                  dense
                  v-model="address.estado"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" class="ma-0 pt-0 pb-0">
                <v-text-field
                  readonly
                  outlined
                  color="green"
                  label="Ciudad"
                  placeholder="Ingresa tu ciudad"
                  dense
                  v-model="address.ciudad"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-hover>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="cerrar">Cerrar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "AddressComponent",
  props: {
    viewAddress: {
      type: Boolean,
      required: true,
    },
    address: {
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
