<template>
  <v-container>
    <v-subheader>Alumnos Egresados</v-subheader>

    <v-form ref="form" v-model="valid" lazy-validation>
      <v-row>
        <v-col cols="12" sm="5" lg="5" md="5">
          <v-card elevation="5" class="pa-2 rounded-xl">
            <v-card flat>
              <v-card-title> <strong> Egresados</strong> </v-card-title>
              <v-chip class="ma-1" color="blue-grey lighten-2" dark
                >Año de Ingreso</v-chip
              >
              <v-chip class="ma-1" color="cyan darken-1" dark>Rol</v-chip>
            </v-card>
            <v-data-table
              mobile-breakpoint="960"
              :items-per-page="5"
              :loading="loading"
              :items="estudiantesEgresados"
              :headers="headers"
            >
              <template v-slot:item.anoIngreso="{ item }">
                <v-chip color="blue-grey lighten-2" dark>
                  {{ item.anoIngreso }}
                </v-chip>
              </template>
              <template v-slot:item.rol="{ item }">
                <v-chip color="cyan darken-1" dark>
                  {{ item.rol }}
                </v-chip>
              </template>
            </v-data-table>
          </v-card>
          <v-col cols="12" >
            <v-hover v-slot:default="{ hover }" open-delay="0">
              <v-card class="mt-16 rounded-xl" min-height="100" min-width="100">
                <v-container>
                  <v-card
                    outlined
                    ripple
                    :class="`elevation-${hover ? 10 : 10}`"
                    class="pa-2 mt-n16 ml-3 mr-3 rounded-xl"
                  >
                    <area-chart
                      :library="{ animation: { duration: 3000 } }"
                      :data="[
                        ['Año 2018', anoIngreso18.length],
                        ['Año 2019', anoIngreso19.length],
                        ['Año 2020', anoIngreso20.length],
                        ['Año en curso', anoIngreso21.length],
                      ]"
                    ></area-chart>
                  </v-card>
                  <v-card-title class="text-left">
                    Gráfica de aspirantes anuales
                  </v-card-title>
                  <v-card-subtitle
                    >Se muestra la cantidad de aspirantes que ingresan desde el
                    año 2018</v-card-subtitle
                  >
                  <v-divider></v-divider>
                  <v-card-text>UTSV</v-card-text>
                </v-container>
              </v-card>
            </v-hover>
          </v-col>
        </v-col>
        <v-col cols="12" sm="7" lg="7" md="7">
          <v-card class="pa-2 rounded-xl" elevation="5">
            <h3 class="pl-2 pt-2">
              Agregar Alumno Egresado <v-icon right>mdi-account-tie</v-icon>
            </h3>
            <v-container>
              <h2 class="mb-5">Datos personales</h2>
              <v-row>
                <v-col cols="12" md="4" class="ma-0 pt-0 pb-0">
                  <v-text-field
                    outlined
                    color="green"
                    label="Nombre(s)"
                    placeholder="Ingresa tu nombre(s)"
                    v-model="user.nombre"
                    :rules="ruleRequired"
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4" class="ma-0 pt-0 pb-0">
                  <v-text-field
                    outlined
                    color="green"
                    label="Apellido paterno"
                    placeholder="Ingresa tu apellido paterno"
                    v-model="user.apellidoPaterno"
                    :rules="ruleRequired"
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4" class="ma-0 pt-0 pb-0">
                  <v-text-field
                    outlined
                    color="green"
                    label="Apellido materno"
                    placeholder="Ingresa tu apellido materno"
                    v-model="user.apellidoMaterno"
                    :rules="ruleRequired"
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4" class="ma-0 pt-0 pb-0">
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    transition="slide-y-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        outlined
                        dense
                        color="green"
                        v-model="user.fechaNacimiento"
                        label="Fecha de nacimiento"
                        placeholder="Ingresa tu fecha de nacimiento"
                        v-bind="attrs"
                        v-on="on"
                        :rules="ruleRequired"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      :max="new Date().toISOString()"
                      v-model="user.fechaNacimiento"
                      color="green"
                      @input="menu = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" md="4" class="ma-0 pt-0 pb-0">
                  <v-text-field
                    outlined
                    color="green"
                    label="Edad"
                    placeholder="Ingresa tu edad"
                    type="number"
                    min="0"
                    max="99"
                    v-model="user.edad"
                    :rules="ruleRequired"
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4" class="ma-0 pt-0 pb-0">
                  <v-select
                    outlined
                    color="green"
                    label="Sexo"
                    placeholder="Ingresa tu sexo"
                    dense
                    :items="sexOptions"
                    v-model="user.sexo"
                    :rules="ruleRequired"
                  ></v-select>
                </v-col>
                <v-col cols="12" md="4" class="ma-0 pt-0 pb-0">
                  <v-text-field
                    outlined
                    color="green"
                    label="Número seguro social"
                    placeholder="Ingresa número de seguridad social"
                    type="number"
                    min="0"
                    max="99"
                    dense
                    v-model="user.numeroSeguroSocial"
                    :rules="ruleRequired"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="8" class="ma-0 pt-0 pb-0">
                  <v-text-field
                    outlined
                    color="green"
                    label="Padre o tutor"
                    placeholder="Ingresa el nombre de tu padre o tutor"
                    dense
                    v-model="user.tutor"
                    :rules="ruleRequired"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <h2 class="mb-5">Dirección</h2>
                  <v-row>
                    <v-col cols="12" md="4" class="ma-0 pt-0 pb-0">
                      <v-text-field
                        outlined
                        color="green"
                        label="Calle"
                        placeholder="Ingresa tu calle"
                        dense
                        v-model="user.direccion.calle"
                        :rules="ruleRequired"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4" class="ma-0 pt-0 pb-0">
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
                        :rules="ruleRequired"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4" class="ma-0 pt-0 pb-0">
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
                        :rules="ruleRequired"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4" class="ma-0 pt-0 pb-0">
                      <v-text-field
                        outlined
                        color="green"
                        label="Colonia"
                        placeholder="Ingresa tu colonia"
                        dense
                        v-model="user.direccion.colonia"
                        :rules="ruleRequired"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4" class="ma-0 pt-0 pb-0">
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
                        :rules="ruleRequired"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4" class="ma-0 pt-0 pb-0">
                      <v-text-field
                        outlined
                        color="green"
                        label="Estado"
                        placeholder="Ingresa tu estado"
                        dense
                        v-model="user.direccion.estado"
                        :rules="ruleRequired"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4" class="ma-0 pt-0 pb-0">
                      <v-text-field
                        outlined
                        color="green"
                        label="Ciudad"
                        placeholder="Ingresa tu ciudad"
                        dense
                        v-model="user.direccion.ciudad"
                        :rules="ruleRequired"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <h2 class="mb-5">Datos escolares</h2>
                  <v-row>
                    <v-col cols="12" md="4" class="ma-0 pt-0 pb-0">
                      <v-text-field
                        outlined
                        color="green"
                        label="Escuela de procedencia"
                        placeholder="Ingresa tu escuela de procedencia"
                        dense
                        v-model="user.escuelaProcedencia"
                        :rules="ruleRequired"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4" class="ma-0 pt-0 pb-0">
                      <v-select
                        outlined
                        color="green"
                        label="Año de ingreso"
                        placeholder="Selecciona el año de ingreso del estudiante"
                        dense
                        :items="ingresoOptions"
                        v-model="user.anoIngreso"
                        :rules="ruleRequired"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" md="4" class="ma-0 pt-0 pb-0">
                      <v-select
                        outlined
                        color="green"
                        label="Carrera de egreso"
                        placeholder="Selecciona la carrera a la que deseas inscribirte"
                        dense
                        :items="careerOptions"
                        v-model="user.carreraEgreso"
                        :rules="ruleRequired"
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-container>
            <v-card-actions>
              <v-col cols="12">
                <v-tooltip color="grey darken-3" top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      rounded
                      v-bind="attrs"
                      v-on="on"
                      block
                      large
                      color="green"
                      dark
                      @click="subirDatosAlumno"
                      >Enviar información</v-btn
                    >
                  </template>
                  <span>Enviar Información</span>
                </v-tooltip>
              </v-col>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <!-- <v-row>
        <v-col cols="12">
          <v-card class="pa-2 rounded-xl" elevation="5">
            <v-container>
              <h2 class="mb-5">Cuenta</h2>
              <v-row>
                <v-col cols="12">
                  <v-alert text dense color="info" type="info" border="left"
                    >Es importante que guarde los siguientes datos en un lugar
                    seguro, ya que serán los accesos para que puedas ingresara a
                    la plataforma y saber el status de su trámite.</v-alert
                  >
                </v-col>
                <v-col cols="12" md="6" class="ma-0 pt-0 pb-0">
                  <v-text-field
                    outlined
                    color="green"
                    label="Correo electrónico"
                    placeholder="Ingresa tu correo electrónico"
                    dense
                    v-model="mail"
                    :rules="ruleMail"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6" class="ma-0 pt-0 pb-0">
                  <v-text-field
                    outlined
                    color="green"
                    label="Correo electrónico"
                    placeholder="Repite tu correo electrónico"
                    dense
                    :disabled="mail == ''"
                    v-model="mailRepeat"
                    :rules="ruleMailRepeat"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6" class="ma-0 pt-0 pb-0">
                  <v-text-field
                    outlined
                    color="green"
                    label="Contraseña"
                    placeholder="Ingresa tu contraseña"
                    dense
                    v-model="password"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                    @click:append="show1 = !show1"
                    :rules="rulePassword"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6" class="ma-0 pt-0 pb-0">
                  <v-text-field
                    outlined
                    color="green"
                    label="Contraseña"
                    placeholder="Repite tu contraseña"
                    dense
                    v-model="passwordRepeat"
                    :rules="rulePasswordRepeat"
                    :disabled="password == ''"
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show2 ? 'text' : 'password'"
                    @click:append="show2 = !show2"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row> -->

      <!-- <v-row>
        <v-col cols="12">
          <v-card class="pa-2 rounded-xl" elevation="5">
            <v-container>
              <h2 class="mb-5">Documentos</h2>
              <v-row>
                <v-col cols="12">
                  <v-alert
                    text
                    dense
                    type="info"
                    icon="mdi-information"
                    border="left"
                  >
                    Adjunta la documentación en formato
                    <strong>PDF</strong> y una fotografía en formato
                    <strong>JPG</strong> o <strong>PNG</strong> con buena
                    calidad, con peso máximo de <strong>2 MB</strong>, en caso
                    de no contar con la credencial de elector, subir una imagen
                    con el texto "Credencial de elector en trámite".
                  </v-alert>
                </v-col>
                <v-col cols="6" md="4" class="ma-0 pt-0 pb-0">
                  <v-file-input
                    color="green"
                    prepend-icon
                    prepend-inner-icon="mdi-file-document-outline"
                    label="Acta de nacimiento"
                    outlined
                    show-size
                    dense
                    :rules="ruleDocument"
                    accept="application/pdf, image/*"
                    @change="input($event, 'actaNacimiento')"
                  ></v-file-input>
                </v-col>
                <v-col cols="6" md="4" class="ma-0 pt-0 pb-0">
                  <v-file-input
                    color="green"
                    prepend-icon
                    prepend-inner-icon="mdi-file-document-outline"
                    label="CURP"
                    outlined
                    show-size
                    dense
                    :rules="ruleDocument"
                    accept="application/pdf, image/*"
                    @change="input($event, 'curp')"
                  ></v-file-input>
                </v-col>
                <v-col cols="6" md="4" class="ma-0 pt-0 pb-0">
                  <v-file-input
                    color="green"
                    prepend-icon
                    prepend-inner-icon="mdi-file-document-outline"
                    label="Comprobante de domicilio"
                    outlined
                    show-size
                    dense
                    :rules="ruleDocument"
                    accept="application/pdf, image/*"
                    @change="input($event, 'comprobanteDomicilio')"
                  ></v-file-input>
                </v-col>
                <v-col cols="6" md="3" class="ma-0 pt-0 pb-0">
                  <v-file-input
                    color="green"
                    prepend-icon
                    prepend-inner-icon="mdi-file-document-outline"
                    label="Certificado preparatoria"
                    outlined
                    show-size
                    dense
                    :rules="ruleDocument"
                    accept="application/pdf, image/*"
                    @change="input($event, 'certificadoPreparatoria')"
                  ></v-file-input>
                </v-col>
                <v-col cols="6" md="3" class="ma-0 pt-0 pb-0">
                  <v-file-input
                    color="green"
                    prepend-icon
                    prepend-inner-icon="mdi-file-document-outline"
                    label="Credencial de elector"
                    outlined
                    show-size
                    dense
                    :rules="ruleDocument"
                    accept="application/pdf, image/*"
                    @change="input($event, 'credencialElector')"
                  ></v-file-input>
                </v-col>
                <v-col cols="6" md="3" class="ma-0 pt-0 pb-0">
                  <v-file-input
                    color="green"
                    prepend-icon
                    prepend-inner-icon="mdi-file-document-outline"
                    label="Fotografía"
                    outlined
                    show-size
                    dense
                    :rules="ruleDocument"
                    accept="application/pdf, image/*"
                    @change="input($event, 'fotografia')"
                  ></v-file-input>
                </v-col>
                <v-col cols="6" md="3" class="ma-0 pt-0 pb-0">
                  <v-file-input
                    color="green"
                    prepend-icon
                    prepend-inner-icon="mdi-file-document-outline"
                    label="Analisis VDRL"
                    outlined
                    show-size
                    dense
                    type="file"
                    accept="application/pdf, image/*"
                    :rules="ruleDocument"
                    @change="input($event, 'analisisVDRL')"
                  ></v-file-input>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row> -->
    </v-form>

    <v-snackbar
      transition="slide-x-transition"
      bottom
      left
      multi-line
      v-model="snackbar"
      :timeout="timeout"
      >{{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template></v-snackbar
    >

    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import { db } from "../services/firebase";
import Vue from "vue";
import Chartkick from "vue-chartkick";
import Chart from "chart.js";

Vue.use(Chartkick.use(Chart));
export default {
  name: "RegistroView",
  mounted() {
    this.egresados();
    this.Data();
  },
  data: () => ({
    valid: true,
    overlay: false,
    text: "",
    anoIngreso18: [],
    anoIngreso19: [],
    anoIngreso20: [],
    anoIngreso21: [],

    snackbar: false,
    timeout: 5000,

    user: {
      statusProceso: "En revision",
      nombre: "",
      apellidoPaterno: "",
      apellidoMaterno: "",
      fechaNacimiento: "",
      edad: "",
      sexo: "",
      numeroSeguroSocial: "",
      tutor: "",
      direccion: {
        calle: "",
        numeroExterior: "",
        numeroInterior: "",
        colonia: "",
        codigoPostal: "",
        estado: "",
        ciudad: "",
      },
      escuelaProcedencia: "",
      anoIngreso: "",
      carreraEgreso: "",

      rol: "Egresado",
    },
    menu: false,
    sexOptions: ["Femenino", "Masculino", "No binario"],
    ingresoOptions: [
      "2000",
      "2001",
      "2002",
      "2003",
      "2004",
      "2005",
      "2006",
      "2007",
      "2008",
      "2009",
      "2010",
      "2011",
      "2012",
      "2013",
      "2014",
      "2015",
      "2016",
      "2017",
      "2018",
      "2019",
      "2020",
      "2021",
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
    ruleRequired: [(v) => !!v || "Campo requerido"],

    loading: false,
    estudiantesEgresados: [],
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
        text: "Carrera de Egreso",
        value: "carreraEgreso",
      },
      {
        text: "año Ingreso",
        value: "anoIngreso",
      },
      {
        text: "Roles",
        value: "rol",
      },
    ],
  }),
  methods: {
    async Data() {
      try {
        const response16 = await db
          .collection("users")
          .where("anoIngreso", "==", "2018")
          .get();
        const response17 = await db
          .collection("users")
          .where("anoIngreso", "==", "2019")
          .get();
        const response18 = await db
          .collection("users")
          .where("anoIngreso", "==", new Date().getFullYear().toString())
          .get();
        const response19 = await db
          .collection("users")
          .where("anoIngreso", "==", "2020")
          .get();
        if (response16.docs.length > 0) {
          response16.docs.forEach((e) => {
            this.anoIngreso18.push(e.data());
            let anoIngreso18 = this.anoIngreso18;
            console.log(anoIngreso18);
          });
        }
        if (response17.docs.length > 0) {
          response17.docs.forEach((e) => {
            this.anoIngreso19.push(e.data());
            let anoIngreso19 = this.anoIngreso19;
            console.log(anoIngreso19);
          });
        }
        if (response18.docs.length > 0) {
          response18.docs.forEach((e) => {
            this.anoIngreso21.push(e.data());
            let anoIngreso21 = this.anoIngreso21;
            console.log(anoIngreso21);
          });
        }
        if (response19.docs.length > 0) {
          response19.docs.forEach((e) => {
            this.anoIngreso20.push(e.data());
            let anoIngreso20 = this.anoIngreso20;
            console.log(anoIngreso20);
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    async egresados() {
      this.loading = true;
      try {
        const response = await db
          .collection("users")
          .where("rol", "==", "Egresado")
          .get();

        if (response.docs.length > 0) {
          response.docs.forEach((e) => {
            this.estudiantesEgresados.push(e.data());
          });
        }
      } catch (error) {
        console.warn(error);
      } finally {
        this.loading = false;
      }
    },
    async subirDatosAlumno() {
      this.overlay = true;
      await db
        .collection("users")
        .add({
          nombre: this.user.nombre,
          apellidoPaterno: this.user.apellidoPaterno,
          apellidoMaterno: this.user.apellidoMaterno,
          fechaNacimiento: this.user.fechaNacimiento,
          edad: this.user.edad,
          sexo: this.user.sexo,
          numeroSeguroSocial: this.user.numeroSeguroSocial,
          tutor: this.user.tutor,
          direccion: {
            calle: this.user.direccion.calle,
            numeroExterior: this.user.direccion.numeroExterior,
            numeroInterior: this.user.direccion.numeroInterior,
            colonia: this.user.direccion.colonia,
            codigoPostal: this.user.direccion.codigoPostal,
            estado: this.user.direccion.estado,
            ciudad: this.user.direccion.ciudad,
          },
          escuelaProcedencia: this.user.escuelaProcedencia,
          anoIngreso: this.user.anoIngreso,
          carreraEgreso: this.user.carreraEgreso,
          rol: this.user.rol,
        })

        .then((docRef) => {
          this.snackbar = true;
          this.text = `"Documento creado correctamente" ${docRef.id}`;

          console.log(this.user);
          this.overlay = false;
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    },
  },
  computed: {
    ...mapState({ userData: "user" }),
  },
};
</script>

<style lang="scss" scoped></style>
