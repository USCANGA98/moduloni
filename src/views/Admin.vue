import { mapMutations } from 'vuex';
<template>
  <v-container>
   
      <input type="text">

      <v-btn class="mb-20"
              color="green"
              dark
              depressed
              rounded
              :loading="loading"
              @click="searchData">
              Buscar
        </v-btn>
   
      <v-row>
      <v-col cols="12">
        <h2>Administrador</h2> 
      </v-col>     
      <v-col cols="3" v-for="career in careerOptions" :key="career">
        <v-card @click="goDetailCareer(career)">
          <v-img
            src="../assets/utsv-logo.png"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.8)"
          >
            <h3 class="pa-3 text-subtitle-2 font-weight-medium">{{career}}</h3>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "AdminView",
  data: () => ({
    careerOptions: [
      "TSU Tecnologías de Información y Comunicación",
      "TSU Contaduría",
      "TSU Mantenimiento Área Industrial",
      "TSU Mecatrónica área Automatización",
      "TSU Química Industrial",
      "TSU Mecánica área Automotriz",
      "TSU Administración área Capital Humano",
      "TSU Energías Renovables",
      "Ingeniería en Tecnologías de la Información",
      "Ingeniería en Mantenimiento Industrial",
      "Ingeniería en Mecatrónica",
      "Ingeniería Química",
    ],
  }),
  methods: {
    ...mapMutations(["setCareerSelected"]),
    goDetailCareer(career) {
      this.setCareerSelected(career);
      this.$router.push("/admin/detail-career");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>