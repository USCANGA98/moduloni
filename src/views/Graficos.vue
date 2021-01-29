<template>
  <v-container>
    <div>
      <v-row>
        <v-col cols="7">
          <v-hover v-slot:default="{ hover }" open-delay="0">
            <v-card class="mt-16" max-height="800">
              <v-container>
                <v-card
                  ripple
                  color="teal accent-4"
                  :class="`elevation-${hover ? 10 : 10}`"
                  outlined
                  class="ml-3 mt-n16 mr-3 mt"
                >
                  <pie-chart
                    :messages="{ empty: 'No data' }"
                    :refresh="5"
                    :dataset="{}"
                    :library="{
                      cutoutPercentage: 30,
                      animation: { duration: 3000 },
                    }"
                    class="mt-3 mb-3"
                    :data="[
                      [Contaduria[0].carrera, Contaduria.length],
                      [Tic[0].carrera, Tic.length],
                      [Mantto[0].carrera, Mantto.length],
                      [Meca[0].carrera, Meca.length],
                      [Quimica[0].carrera, Quimica.length],
                      [Mecanica[0].carrera, Mecanica.length],
                      [Administracion[0].carrera, Administracion.length],
                      [Energias[0].carrera, Energias.length],
                      [IngTi[0].carrera, IngTi.length],
                      [IngMantto[0].carrera, IngMantto.length],
                      [IngMeca[0].carrera, IngMeca.length],
                      [IngQuimica[0].carrera, IngQuimica.length],
                    ]"
                  ></pie-chart>
                </v-card>

                <v-card-title class="justify-left"
                  >Aspirantes por carrera</v-card-title
                >
                <v-card-subtitle>
                  Se muestra todos los alumnos mediante una gráfica de pastel
                </v-card-subtitle>
                <v-divider></v-divider>
                <v-card-text>UTSV</v-card-text>
              </v-container>
            </v-card>
          </v-hover>
        </v-col>
        <v-col cols="5">
          <v-hover v-slot:default="{ hover }" open-delay="0">
            <v-card class="mt-16" min-height="100" min-width="100">
              <v-container>
                <v-card
                  color="teal accent-4"
                  outlined
                  ripple
                  :class="`elevation-${hover ? 10 : 10}`"
                  class="pa-1 mt-n16 ml-3 mr-3"
                >
                  <column-chart
                    :dataset="{ borderWidth: 5, backgroundColor: '#fff' }"
                    :messages="{ empty: 'No data' }"
                    :refresh="5"
                    :library="{ animation: { duration: 3000 } }"
                    class="mt-0 mb-0 pa-0"
                    :colors="['#00BFA5']"
                    :data="[
                      [Administracion[0].carrera, Administracion.length],
                      [Energias[0].carrera, Energias.length],
                      [Contaduria[0].carrera, Contaduria.length],
                      [Tic[0].carrera, Tic.length],
                      [Mantto[0].carrera, Mantto.length],
                      [Meca[0].carrera, Meca.length],
                      [Quimica[0].carrera, Quimica.length],
                      [Mecanica[0].carrera, Mecanica.length],
                      [IngTi[0].carrera, IngTi.length],
                      [IngMantto[0].carrera, IngMantto.length],
                      [IngMeca[0].carrera, IngMeca.length],
                      [IngQuimica[0].carrera, IngQuimica.length],
                    ]"
                  ></column-chart>
                </v-card>
                <v-card-title class="text-left">
                  Gráfica de índice de aspirantes
                </v-card-title>
                <v-card-subtitle
                  >Se muestra la cantidad de aspirantes en una gráfica de
                  barras</v-card-subtitle
                >
                <v-divider></v-divider>
                <v-card-text>UTSV</v-card-text>
              </v-container>
            </v-card>
          </v-hover>
        </v-col>

        <v-col cols="5">
          <v-hover v-slot:default="{ hover }" open-delay="0">
            <v-card class="mt-16" min-height="300" min-width="100">
              <v-container>
                <v-card
                  outlined
                  dark
                  color="teal accent-4"
                  :class="`elevation-${hover ? 10 : 10}`"
                  class="text-center pa-2 mt-n16 ml-3 mr-3"
                  ripple
                >
                  <v-progress-circular
                    class="mt-5 justify-center"
                    :size="180"
                    :width="50"
                    :value="sumaTotal.length"
                  >
                    <h1>{{ sumaTotal.length }}</h1>
                  </v-progress-circular>
                </v-card>
                <v-card-title class="text-left"
                  >Total de Aspirantes</v-card-title
                >
                <v-card-subtitle
                  >Se muestra la cantidad de aspirantes en un contador
                  circular</v-card-subtitle
                >
                <v-divider></v-divider>
                <v-card-text>UTSV</v-card-text>
              </v-container>
            </v-card>
          </v-hover>
        </v-col>

        <v-col cols="7">
          <v-hover v-slot:default="{ hover }" open-delay="0">
            <v-card class="mt-16" min-height="200" min-width="100">
              <v-container>
                <v-card
                  color="teal accent-4"
                  dark
                  outlined
                  ripple
                  :class="`elevation-${hover ? 10 : 10}`"
                  class="pa-2 mt-n16 ml-3 mr-3"
                >
                  <v-row>
                    <v-col cols="6">
                      <v-card-text class="text-left ma-2 mt-n3">
                        <v-icon left x-small>mdi-checkbox-blank-circle</v-icon
                        ><strong>{{
                          Administracion[0].direccion.ciudad
                        }}</strong>
                        <br />
                        <v-icon left x-small>mdi-checkbox-blank-circle</v-icon
                        ><strong>{{ Energias[0].direccion.ciudad }}</strong>
                        <br />
                        <v-icon left x-small>mdi-checkbox-blank-circle</v-icon
                        ><strong>{{ Contaduria[0].direccion.ciudad }}</strong>
                        <br />
                        <v-icon left x-small>mdi-checkbox-blank-circle</v-icon
                        ><strong>{{ Tic[0].direccion.ciudad }}</strong>
                        <br />
                        <v-icon left x-small>mdi-checkbox-blank-circle</v-icon
                        ><strong>{{ Mantto[0].direccion.ciudad }}</strong>
                        <br />
                        <v-icon left x-small>mdi-checkbox-blank-circle</v-icon
                        ><strong>{{ Meca[0].direccion.ciudad }}</strong>
                        <br />
                      </v-card-text>
                    </v-col>

                    <v-col cols="6">
                      <v-card-text class="text-right ma-2 mt-n3">
                        <strong>{{ Quimica[0].direccion.ciudad }}</strong
                        ><v-icon right x-small
                          >mdi-checkbox-blank-circle</v-icon
                        >
                        <br />
                        <strong>{{ Mecanica[0].direccion.ciudad }}</strong>
                        <v-icon right x-small>mdi-checkbox-blank-circle</v-icon
                        ><br />
                        <strong>{{ IngTi[0].direccion.ciudad }}</strong
                        ><v-icon right x-small
                          >mdi-checkbox-blank-circle</v-icon
                        >
                        <br />
                        <strong>{{ IngMantto[0].direccion.ciudad }}</strong
                        ><v-icon right x-small
                          >mdi-checkbox-blank-circle</v-icon
                        >
                        <br />
                        <strong>{{ IngMeca[0].direccion.ciudad }}</strong
                        ><v-icon right x-small
                          >mdi-checkbox-blank-circle</v-icon
                        >
                        <br />
                        <strong>{{ IngQuimica[0].direccion.ciudad }}</strong
                        ><v-icon right x-small
                          >mdi-checkbox-blank-circle</v-icon
                        >
                        <br />
                      </v-card-text>
                    </v-col>
                  </v-row>
                </v-card>
                <v-card-title>Ciudades Emisoras</v-card-title>
                <v-card-subtitle
                  >Ciudades de donde aplican los nuevos
                  aspirantes</v-card-subtitle
                >
                <v-divider></v-divider>
                <v-card-text>UTSV</v-card-text>
              </v-container>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script lang="es">

import { db } from '../services/firebase'
import Vue from 'vue'
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'

Vue.use(Chartkick.use(Chart))

export default {
  name: "ViewGraficos",
  colors: [ '#4572A7', '#AA4643', '#89A54E', '#80699B', '#3D96AE', '#DB843D', '#92A8CD', '#A47D7C', '#B5CA92' ], plotOptions: { column: { colorByPoint: true } },



  data: () => ({

    value: 0,
    Contaduria: [],
    Tic: [],
    Mantto: [],
    Meca: [],
    Quimica: [],
    Mecanica: [],
    Administracion: [],
    Energias: [],
    IngTi: [],
    IngMantto: [],
    IngMeca: [],
    IngQuimica: [],
    sumaTotal: []


  }),

  mounted() {
    this.Data(),
    this.value
  },

  methods: {
    async Data() {
      this.loading = true;
      try {
        const response = await db
          .collection("users")
          .where("carrera", "==", "TSU Contaduria")
          .get();
          const response2 = await db
          .collection("users")
          .where("carrera", "==", "TSU Tecnologias de Informacion y Comunicacion")
          .get();
          const response3 = await db
          .collection("users")
          .where("carrera", "==", "TSU Mantenimiento Area Industrial")
          .get();
          const response4 = await db
          .collection("users")
          .where("carrera", "==", "TSU Mecatronica Area Automatizacion")
          .get();
          const response5 = await db
          .collection("users")
          .where("carrera", "==", "TSU Quimica Industrial")
          .get();
          const response6 = await db
          .collection("users")
          .where("carrera", "==", "TSU Mecanica Area Automotriz")
          .get();
          const response7 = await db
          .collection("users")
          .where("carrera", "==", "TSU Administracion Area Capital Humano")
          .get();
          const response8 = await db
          .collection("users")
          .where("carrera", "==", "TSU Energias Renovables")
          .get();
          const response9 = await db
          .collection("users")
          .where("carrera", "==", "Ingenieria en Tecnologias de la Informacion")
          .get();
          const response10 = await db
          .collection("users")
          .where("carrera", "==", "Ingenieria en Mantenimiento Industrial")
          .get();
          const response11 = await db
          .collection("users")
          .where("carrera", "==", "Ingenieria en Mecatronica")
          .get();
          const response12 = await db
          .collection("users")
          .where("carrera", "==", "Ingenieria Quimica")
          .get();

        if (response.docs.length > 0) {
          response.docs.forEach(e => {
            this.Contaduria.push(e.data());
            this.sumaTotal.push(e.data());
            let Contaduria = this.Contaduria;
            console.log(Contaduria);
          });
        }
        if (response2.docs.length > 0) {
          response2.docs.forEach(e => {
            this.Tic.push(e.data());
            this.sumaTotal.push(e.data());
          });
        }
        if (response3.docs.length > 0) {
          response3.docs.forEach(e => {
            this.Mantto.push(e.data());
            this.sumaTotal.push(e.data());
          });
        }
        if (response4.docs.length > 0) {
          response4.docs.forEach(e => {
            this.Meca.push(e.data());
            this.sumaTotal.push(e.data());
          });
        }
        if (response5.docs.length > 0) {
          response5.docs.forEach(e => {
            this.Quimica.push(e.data());
            this.sumaTotal.push(e.data());
            
          });
        }
        if (response6.docs.length > 0) {
          response6.docs.forEach(e => {
            this.Mecanica.push(e.data());
            this.sumaTotal.push(e.data());
          });
        }
        if (response7.docs.length > 0) {
          response7.docs.forEach(e => {
            this.Administracion.push(e.data());
            this.sumaTotal.push(e.data());
          });
        }
        if (response8.docs.length > 0) {
          response8.docs.forEach(e => {
            this.Energias.push(e.data());
            this.sumaTotal.push(e.data());
          });
        }
        if (response9.docs.length > 0) {
          response9.docs.forEach(e => {
            this.IngTi.push(e.data());
            this.sumaTotal.push(e.data());
          });
        }
        if (response10.docs.length > 0) {
          response10.docs.forEach(e => {
            this.IngMantto.push(e.data());
            this.sumaTotal.push(e.data());
          });
        }
        if (response11.docs.length > 0) {
          response11.docs.forEach(e => {
            this.IngMeca.push(e.data());
            this.sumaTotal.push(e.data());
          });
        }
        if (response12.docs.length > 0) {
          response12.docs.forEach(e => {
            this.IngQuimica.push(e.data());
            this.sumaTotal.push(e.data());
          });
        }
      } catch (error) {
        console.warn(error);
      } finally {
        this.loading = false;
      }
    },













  },
};
</script>
<style scoped lang="css">
.v-progress-circular {
  margin-top: 0rem;
  margin-bottom: 1rem;
}
</style>
