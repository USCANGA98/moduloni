<!--Renderizado para directores de carrera-->
<template>
  <div>
    <v-container>
      <h3>Carreras</h3>
      <v-row>
        <!-- Aqui empieza linea de todos los alumnos-->

        <v-container>
          <v-row>
            <v-expand-transition>
              <v-card
                v-show="expand"
                class="mx-auto"
                width="100%"
                elevation="5"
              >
                <v-data-table
                  :search="search"
                  :headers="headers"
                  :items="estudiantes"
                  sort-by="statusProceso"
                >
                  <template v-slot:item.direccion="{ item }">
                    <v-btn
                      small
                      depressed
                      color="green"
                      dark
                      @click="verDireccion(item.direccion)"
                      >dirección</v-btn
                    >
                  </template>

                  <template v-slot:item.documents="{ item }">
                    <v-btn
                      small
                      depressed
                      color="green"
                      dark
                      @click="verDocumentos(item)"
                      >documentos</v-btn
                    >
                  </template>

                  <template v-slot:item.detalleCompleto="{ item }">
                    <v-btn
                      small
                      depressed
                      color="green"
                      dark
                      @click="verUsuario(item)"
                      >detalle</v-btn
                    >
                  </template>

                  <template v-slot:item.actions="{ item }">
                    <v-icon small class="mr-2" @click="editItem(item)"
                      >mdi-pencil</v-icon
                    >
                    <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
                  </template>
                </v-data-table>
              </v-card>
            </v-expand-transition>
          </v-row>
          <addressModal
            :viewAddress="viewAddress"
            :address="addressData"
            @cerrar="viewAddress = false"
          />
          <documentsModal
            :viewDocuments="viewDocuments"
            :item="item"
            @cerrar="viewDocuments = false"
            @guardado="guardado"
          />

          <userModal
            v-if="viewDetailUser"
            :viewDetailUser="viewDetailUser"
            :data="data"
            @cerrar="viewDetailUser = false"
          />
        </v-container>
        <!-- Aqui termina linea de todos los alumnos-->
        <!-- Aqui empieza renderizado condicional de directores de carrera TECNOLOGIAS-->
        <v-col
          md="3"
          lg="2"
          xl="2"
          sm="4"
          cols="5"
          v-for="career in careerOptionsTi"
          :key="career"
          v-show="user.rol === 'DirectorTi'"
        >
          <v-hover v-slot:default="{ hover }" open-delay="0">
            <v-card
              :min-height="$vuetify.breakpoint.xs ? 140 : '15vh'"
              :min-width="$vuetify.breakpoint.xs ? 140 : '15vh'"
              :class="`elevation-${hover ? 20 : 0}`"
              class="mx-auto transition-swing"
              @click="goDetailCareer(career)"
            >
              <v-img
                v-if="
                  career == 'Ingenieria en Tecnologias de la Informacion' ||
                  career == 'TSU Tecnologias de Informacion y Comunicacion'
                "
                src="../assets/utsv-logo-tic.jpg"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.08), rgba(0,0,0,.7)"
              >
                <h3 class="pa-3 text-subtitle-2 font-weight-medium">
                  {{ career }}
                </h3>
              </v-img>
              <v-img
                v-if="career == 'TSU Contaduria'"
                src="../assets/utsv-logo-conta.png"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.08), rgba(0,0,0,.7)"
              >
                <h3 class="pa-3 text-subtitle-2 font-weight-medium">
                  {{ career }}
                </h3>
              </v-img>
            </v-card>
          </v-hover>
        </v-col>
        <!-- Aqui termina renderizado condicional de directores de carrera TECNOLOGIAS-->
        <!-- Aqui empieza renderizado condicional de directores de carrera QUIMICA-->
        <v-col
          md="3"
          lg="2"
          xl="2"
          sm="4"
          cols="5"
          v-for="career in careerOptionsQuimica"
          :key="career"
          v-show="user.rol === 'DirectorQui'"
        >
          <v-hover v-slot:default="{ hover }" open-delay="0">
            <v-card
              :min-height="$vuetify.breakpoint.xs ? 140 : '15vh'"
              :min-width="$vuetify.breakpoint.xs ? 140 : '15vh'"
              :class="`elevation-${hover ? 20 : 0}`"
              class="mx-auto transition-swing"
              @click="goDetailCareer(career)"
            >
              <v-img
                v-if="
                  career == 'TSU Quimica Industrial' ||
                  career == 'Ingenieria Quimica'
                "
                src="../assets/utsv-logo-quimica.jpg"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.08), rgba(0,0,0,.7)"
              >
                <h3 class="pa-3 text-subtitle-2 font-weight-medium">
                  {{ career }}
                </h3>
              </v-img>
              <v-img
                v-if="career == 'TSU Energias Renovables'"
                src="../assets/utsv-logo-2.jpg"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.08), rgba(0,0,0,.7)"
              >
                <h3 class="pa-3 text-subtitle-2 font-weight-medium">
                  {{ career }}
                </h3>
              </v-img>
              <v-img
                v-if="career == 'TSU Administracion Area Capital Humano'"
                src="../assets/utsv-logo-administracion.jpg"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.08), rgba(0,0,0,.7)"
              >
                <h3 class="pa-3 text-subtitle-2 font-weight-medium">
                  {{ career }}
                </h3>
              </v-img>
            </v-card>
          </v-hover>
        </v-col>
        <!-- Aqui termina renderizado condicional de directores de carrera QUIMICA-->
        <!-- Aqui empieza renderizado condicional de directores de carrera Mantenimiento Industrial-->
        <v-col
          md="3"
          lg="2"
          xl="2"
          sm="4"
          cols="5"
          v-for="career in careerOptionsMantto"
          :key="career"
          v-show="user.rol === 'DirectorMantto'"
        >
          <v-hover v-slot:default="{ hover }" open-delay="0">
            <v-card
              :min-height="$vuetify.breakpoint.xs ? 140 : '15vh'"
              :min-width="$vuetify.breakpoint.xs ? 140 : '15vh'"
              :class="`elevation-${hover ? 20 : 0}`"
              class="mx-auto transition-swing"
              @click="goDetailCareer(career)"
            >
              <v-img
                v-if="
                  career == 'TSU Mantenimiento Area Industrial' ||
                  career == 'Ingenieria en Mantenimiento Industrial'
                "
                src="../assets/utsv-logo-mantto.jpg"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.08), rgba(0,0,0,.7)"
              >
                <h3 class="pa-3 text-subtitle-2 font-weight-medium">
                  {{ career }}
                </h3>
              </v-img>
              <v-img
                v-if="career == 'TSU Mecanica Area Automotriz'"
                src="../assets/utsv-logo-mecanica.jpg"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.08), rgba(0,0,0,.7)"
              >
                <h3 class="pa-3 text-subtitle-2 font-weight-medium">
                  {{ career }}
                </h3>
              </v-img>
            </v-card>
          </v-hover>
        </v-col>
        <!-- Aqui termina renderizado condicional de directores de carrera Mantenimiento Industrial-->
        <!-- Aqui empieza renderizado condicional de directores de carrera Mecatronica-->
        <v-col
          md="3"
          lg="2"
          xl="2"
          sm="4"
          cols="5"
          v-for="career in careerOptionsMecatronica"
          :key="career"
          v-show="user.rol === 'DirectorMeca'"
        >
          <v-hover v-slot:default="{ hover }" open-delay="0">
            <v-card
              :min-height="$vuetify.breakpoint.xs ? 140 : '15vh'"
              :min-width="$vuetify.breakpoint.xs ? 140 : '15vh'"
              :class="`elevation-${hover ? 20 : 0}`"
              class="mx-auto transition-swing"
              @click="goDetailCareer(career)"
            >
              <v-img
                v-if="
                  career == 'TSU Mecatronica Area Automatizacion' ||
                  career == 'Ingenieria en Mecatronica'
                "
                src="../assets/utsv-logo-mecatronica.jpg"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.08), rgba(0,0,0,.7)"
              >
                <h3 class="pa-3 text-subtitle-2 font-weight-medium">
                  {{ career }}
                </h3>
              </v-img>
            </v-card>
          </v-hover>
        </v-col>
        <!-- Aqui empieza renderizado condicional de directores de carrera Mecatronica-->
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { db } from "../services/firebase";
import { mapState } from "vuex";
import { mapMutations } from "vuex";

export default {
  name: "AdminView",
  mounted() {
    this.getData();
    this.Students();
  },
  components: {
    addressModal: () => import("../components/Address"),
    documentsModal: () => import("../components/Documents"),
    userModal: () => import("../components/DetailUser"),
  },
  data: () => ({
    viewAddress: false,
    viewDocuments: false,
    viewDetailUser: false,
    loading: false,
    addressData: {},
    documents: {},
    expand: false,
    items: [],
    item: {},
    data: {},
    search: "",
    estudiantes: [],
    headers: [
      {
        text: "Nombre",
        value: "nombre",
      },
      {
        text: "Apellido Paterno",
        value: "apellidoPaterno",
      },
      {
        text: "Apellido Materno",
        value: "apellidoMaterno",
      },
      {
        text: "Edad",
        value: "edad",
      },
      {
        text: "Status",
        value: "statusProceso",
      },
      {
        text: "Carrera",
        value: "carrera",
      },
      {
        text: "Direccion",
        value: "direccion",
      },
      {
        text: "Documentos",
        value: "documents",
      },
      {
        text: "Detalle completo",
        value: "detalleCompleto",
      },
    ],

    careerOptionsTi: [
      "TSU Tecnologias de Informacion y Comunicacion",
      "TSU Contaduria",
      "Ingenieria en Tecnologias de la Informacion",
    ],
    careerOptionsMantto: [
      "TSU Mantenimiento Area Industrial",
      "TSU Mecanica Area Automotriz",
      "Ingenieria en Mantenimiento Industrial",
    ],
    careerOptionsMecatronica: [
      "TSU Mecatronica Area Automatizacion",
      "Ingenieria en Mecatronica",
    ],
    careerOptionsQuimica: [
      "TSU Quimica Industrial",
      "TSU Administracion Area Capital Humano",
      "TSU Energias Renovables",
      "Ingenieria Quimica",
    ],
  }),
  methods: {
    ...mapMutations(["setCareerSelected"]),
    goDetailCareer(career) {
      this.setCareerSelected(career);
      this.$router.push({ name: "DetailCareerDirector" });
    },

    async guardado() {
      this.items = [];
      await this.getData();
      this.viewDocuments = false;
    },
    verDireccion(direccion) {
      this.addressData = direccion;
      this.viewAddress = true;
    },
    verDocumentos(item) {
      this.item = item;
      this.viewDocuments = true;
    },
    verUsuario(item) {
      this.data = Object.assign({}, item);
      this.viewDetailUser = true;
    },
    async getData() {
      this.loading = true;
      try {
        const response = await db
          .collection("users")
          .where("carrera", "==", this.careerSelected)
          .get();

        if (response.docs.length > 0) {
          response.docs.forEach((e) => {
            this.items.push(e.data());
          });
        }
      } catch (error) {
        console.warn(error);
      } finally {
        this.loading = false;
      }
    },
    async Students() {
      this.loading = true;
      try {
        const response = await db
          .collection("users")
          .where("carrera", "==", "TSU Contaduria")
          .get();
        if (response.docs.length > 0) {
          response.docs.forEach((e) => {
            this.estudiantes.push(e.data());
          });
        }
      } catch (error) {
        console.warn(error);
      } finally {
        this.loading = false;
      }
    },
  },

  computed: {
    ...mapState(["careerSelected", "user"]),
  },
};
</script>

<style lang="scss" scoped></style>
