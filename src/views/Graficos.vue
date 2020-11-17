<template>
  <v-container>
    <div>
      <v-card-title
        ><h1>Grafica de alumnos de todas las carreras</h1>
      </v-card-title>
      <v-row>
        <v-col cols="6">
          <v-card elevation="7" class="my-8 mx-auto pa-3">
            <area-chart
              :data="[
                {
                  name: 'Tecnologias',
                  data: {
                    '2017-05-13': 50,

                    '2017-05-14': 57,

                    '2017-05-15': 78,

                    '2017-05-19': 120,

                    '2017-05-22': 97,

                    '2017-05-27': 100
                  }
                },
                {
                  name: 'Quimica',
                  data: {
                    '2017-05-13': 7,

                    '2017-05-14': 6,

                    '2017-05-15': 2,

                    '2017-05-19': 25,

                    '2017-05-22': 15,

                    '2017-05-27': 12
                  }
                },

                {
                  name: 'Mantto',
                  data: {
                    '2017-05-13': 40,
                    '2017-05-14': 38,
                    '2017-05-15': 27,
                    '2017-05-19': 23,
                    '2017-05-22': 45,
                    '2017-05-27': 32
                  }
                },

                {
                  name: 'Mecatronica',
                  data: {
                    '2017-05-13': 12,
                    '2017-05-14': 15,
                    '2017-05-15': 2,
                    '2017-05-19': 39,
                    '2017-05-22': 45,
                    '2017-05-27': 52
                  }
                }
              ]"
            ></area-chart>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card elevation="7" class="my-8 mx-auto pa-3">
            <pie-chart
              :data="[
                ['Mantto', 30],
                ['Quimica', 23],
                ['Tecnologias', 87],
                ['Mecatronica', 67],
                ['RH', 56],
                ['Contabilidad', 43],
                ['Areas R', 44],
                ['Derecho', 23]
              ]"
            ></pie-chart>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card elevation="7" class="my-0 mx-auto pa-3">
            <column-chart
              :colors="['#A3FF25']"
              :data="[
                ['Mantto', 30],
                ['Quimica', 23],
                ['Tecnologias', 87],
                ['Mecatronica', 67],
                ['RH', 56],
                ['Contabilidad', 43],
                ['Areas R', 44],
                ['Derecho', 23]
              ]"
            ></column-chart>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script lang="es">

import Vue from 'vue'
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'

Vue.use(Chartkick.use(Chart))
export default {
  name: "ViewGraficos",

  data: () => ({

  }),
};
</script>
<style lang="css"></style>
