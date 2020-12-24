<template>
  <v-container>
    <div>
      <v-row>
        <v-col class="text-center" cols="3">
          <v-hover v-slot:default="{ hover }" open-delay="0">
            <v-card
              :class="`elevation-${hover ? 10 : 1}`"
              class="pa-2 transition-swing"
              ripple
            >
              <v-card-title class="justify-center"
                ><strong>Total de Aspirantes</strong></v-card-title
              >
              <v-progress-circular
                :rotate="360"
                :size="215"
                :width="50"
                :value="sumaTotal.length"
                color="green"
              >
                <h1>{{ sumaTotal.length }}</h1>
              </v-progress-circular>
              <v-card-subtitle class="text-left">UTSV</v-card-subtitle>
            </v-card>
          </v-hover>
        </v-col>

        <v-col cols="4">
          <v-hover v-slot:default="{ hover }" open-delay="0">
            <v-card
              outlined
              ripple
              :class="`elevation-${hover ? 10 : 1}`"
              class="pa-2 transition-swing"
            >
              <v-card-title class="justify-center"
                ><strong>Gráfica de índice de aspirantes</strong></v-card-title
              >
              <column-chart
                :colors="['#1FC2BA']"
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
              <v-card-subtitle>UTSV</v-card-subtitle>
            </v-card>
          </v-hover>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="5">
          <v-hover v-slot:default="{ hover }" open-delay="0">
            <v-card
              color=""
              ripple
              :class="`elevation-${hover ? 10 : 1}`"
              outlined
              class="pa-2 transition-swing"
            >
              <v-card-title class="justify-center"
                ><strong>Aspirantes por carrera</strong></v-card-title
              >
              <pie-chart
                :library="{ cutoutPercentage: 40 }"
                class="mt-3 mb-5"
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
              <v-card-subtitle>UTSV</v-card-subtitle>
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
          .where("carrera", "==", "TSU Contaduría")
          .get();
          const response2 = await db
          .collection("users")
          .where("carrera", "==", "TSU Tecnologías de Información y Comunicación")
          .get();
          const response3 = await db
          .collection("users")
          .where("carrera", "==", "TSU Mantenimiento Área Industrial")
          .get();
          const response4 = await db
          .collection("users")
          .where("carrera", "==", "TSU Mecatrónica área Automatización")
          .get();
          const response5 = await db
          .collection("users")
          .where("carrera", "==", "TSU Química Industrial")
          .get();
          const response6 = await db
          .collection("users")
          .where("carrera", "==", "TSU Mecánica área Automotriz")
          .get();
          const response7 = await db
          .collection("users")
          .where("carrera", "==", "TSU Administración área Capital Humano")
          .get();
          const response8 = await db
          .collection("users")
          .where("carrera", "==", "TSU Energías Renovables")
          .get();
          const response9 = await db
          .collection("users")
          .where("carrera", "==", "Ingeniería en Tecnologías de la Información")
          .get();
          const response10 = await db
          .collection("users")
          .where("carrera", "==", "Ingeniería en Mantenimiento Industrial")
          .get();
          const response11 = await db
          .collection("users")
          .where("carrera", "==", "Ingeniería en Mecatrónica")
          .get();
          const response12 = await db
          .collection("users")
          .where("carrera", "==", "Ingeniería Química")
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
