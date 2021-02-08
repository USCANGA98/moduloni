import { mapMutations } from 'vuex';

<template>
  <div>
    <v-container>
      <v-row>
        <!-- Aqui empieza linea de todos los alumnos-->
        <v-container>
          <v-row>
            <v-container class="text-right">
              <v-tooltip left>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    color="white"
                    rounded
                    class="ma-2 mb-4 my-2"
                    @click="expand = !expand"
                  >
                    <v-icon color="success">mdi-account-search</v-icon>
                  </v-btn>
                </template>
                <span>Buscar Alumno</span>
              </v-tooltip>
            </v-container>
            <v-col cols="12">
              <h2>Todas las carreras</h2>
            </v-col>
            <v-text-field
              rounded
              clearable
              v-show="expand"
              v-model="search"
              solo
              color="green"
              prepend-inner-icon="mdi-magnify"
              label="Buscar"
            ></v-text-field>
            <v-expand-transition>
              <v-card
                v-show="expand"
                class="mx-auto rounded-xl"
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

                  <template v-slot:item.eliminarestudiante="{ item }">
                    <v-btn
                      icon
                      dark
                      color="red"
                      @click="eliminarEstudiante(item.uid)"
                      ><v-icon> mdi-delete </v-icon></v-btn
                    >
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
            :viewDetailUser="viewDetailUser"
            :user="user"
            @cerrar="viewDetailUser = false"
          />
        </v-container>
        <!-- Aqui termina linea de todos los alumnos-->
        <v-col cols="3" v-for="career in careerOptions" :key="career">
          <v-hover v-slot:default="{ hover }" open-delay="0">
            <v-card
              :class="`elevation-${hover ? 20 : 1}`"
              class="mx-auto transition-swing"
              @click="goDetailCareer(career)"
            >
              <v-img
                v-if="
                  career == 'TSU Tecnologias de Informacion y Comunicacion' ||
                  career == 'Ingenieria en Tecnologias de la Informacion'
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
                v-if="career == 'TSU Contaduria'"
                src="../assets/utsv-logo-conta.png"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.08), rgba(0,0,0,.7)"
              >
                <h3 class="pa-3 text-subtitle-2 font-weight-medium">
                  {{ career }}
                </h3>
              </v-img>
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
                v-if="career == 'TSU Mecanica Area Automotriz'"
                src="../assets/utsv-logo-mecanica.jpg"
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
              <v-img
                v-if="career == 'TSU Energias Renovables'"
                src="../assets/utsv-logo.png"
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
      </v-row>
    </v-container>
    <EliminarEstudiante :uid="uid" :dialog="dialog" @cancel="dialog = false" />
  </div>
</template>

<script>
import EliminarEstudiante from "../components/actions/EliminarEstudiante";
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
    EliminarEstudiante,
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
    user: {},
    dialog: false,
    uid: "",
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
      {
        text: "Eliminar Estudiante",
        value: "eliminarestudiante",
      },
    ],

    careerOptions: [
      "TSU Tecnologias de Informacion y Comunicacion",
      "TSU Contaduria",
      "TSU Mantenimiento Area Industrial",
      "TSU Mecatronica Area Automatizacion",
      "TSU Quimica Industrial",
      "TSU Mecanica Area Automotriz",
      "TSU Administracion Area Capital Humano",
      "TSU Energias Renovables",
      "Ingenieria en Tecnologias de la Informacion",
      "Ingenieria en Mantenimiento Industrial",
      "Ingenieria en Mecatronica",
      "Ingenieria Quimica",
    ],
  }),
  methods: {
    ...mapMutations(["setCareerSelected"]),
    goDetailCareer(career) {
      this.setCareerSelected(career);
      this.$router.push("/admin/detail-career");
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
      this.user = Object.assign({}, item);
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
          .where("rol", "==", "Estudiante")
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
    async eliminarEstudiante(uid) {
      this.uid = uid;
      this.dialog = true;
    },
  },

  computed: {
    ...mapState(["careerSelected"]),
  },
};
</script>

<style lang="scss" scoped></style>
