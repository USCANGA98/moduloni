import { mapMutations } from 'vuex';

<template>
  <div>
    <v-container>
      <v-row>
        <!-- Aqui empieza linea de todos los alumnos-->
        <v-container>
          <v-row>
            <v-container class="text-right">
              <v-btn
                color="green"
                rounded
                dark
                depressed
                class="ma-2 mb-4 my-2"
                @click="expand = !expand"
              >
                Buscar Alumno <v-icon right>mdi-account-search</v-icon>
              </v-btn>
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
              append-icon="mdi-magnify"
              label="Buscar"
            ></v-text-field>
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
            v-if="viewDetailUser"
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
    EliminarEstudiante
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
        value: "nombre"
      },
      {
        text: "Apellido Paterno",
        value: "apellidoPaterno"
      },
      {
        text: "Apellido Materno",
        value: "apellidoMaterno"
      },
      {
        text: "Edad",
        value: "edad"
      },
      {
        text: "Status",
        value: "statusProceso"
      },
      {
        text: "Carrera",
        value: "carrera"
      },
      {
        text: "Direccion",
        value: "direccion"
      },
      {
        text: "Documentos",
        value: "documents"
      },
      {
        text: "Detalle completo",
        value: "detalleCompleto"
      },
      {
        text: "Eliminar Estudiante",
        value: "eliminarestudiante"
      }
    ],

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
      "Ingeniería Química"
    ]
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
          response.docs.forEach(e => {
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
          response.docs.forEach(e => {
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
    }
  },

  computed: {
    ...mapState(["careerSelected"])
  }
};
</script>

<style lang="scss" scoped></style>
