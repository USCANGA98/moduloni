<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2 class="text-center">
          UNIVERSIDAD TECNOLÓGICA DEL SURESTE DE VERACRUZ
        </h2>
        <h3 class="text-center">Módulo para nuevo ingreso</h3>
      </v-col>
    </v-row>

    <v-form ref="form" v-model="valid" lazy-validation>
      <v-row>
        <v-col cols="12">
          <v-card>
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
            </v-container>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-card>
            <v-container>
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
            </v-container>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-card>
            <v-container>
              <h2 class="mb-5">Datos escolares</h2>
              <v-row>
                <v-col cols="12" md="6" class="ma-0 pt-0 pb-0">
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
                <v-col cols="12" md="6" class="ma-0 pt-0 pb-0">
                  <v-select
                    outlined
                    color="green"
                    label="Carrera"
                    placeholder="Selecciona la carrera a la que deseas inscribirte"
                    dense
                    :items="careerOptions"
                    v-model="user.carrera"
                    :rules="ruleRequired"
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-card>
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
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-card>
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
      </v-row>
    </v-form>

    <v-row>
      <v-col cols="12">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              block
              large
              depressed
              color="green"
              dark
              @click="setInfo"
              >Enviar información</v-btn
            >
          </template>
          <span>Enviar Información</span>
        </v-tooltip>
      </v-col>
    </v-row>

    <v-snackbar v-model="snackbar" :timeout="timeout">{{ text }}</v-snackbar>

    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script>
import { auth, storage, db } from "../services/firebase";
export default {
  name: "RegistroView",

  data: () => ({
    valid: true,
    overlay: false,
    text: "",
    mail: "",
    mailRepeat: "",
    password: "",
    passwordRepeat: "",
    snackbar: false,
    timeout: 5000,
    show1: false,
    show2: false,
    user: {
      statusProceso: "En revision",
      anoIngreso: new Date().getFullYear().toString(),
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
      carrera: "",
      correoElectronico: "",
      contrasena: "",
      documents: {
        actaNacimiento: {
          name: "Acta de nacimiento",
          url: "",
          aprobado: false,
          mensaje: "No ha sido revisado",
        },
        curp: {
          name: "CURP",
          url: "",
          aprobado: false,
          mensaje: "No ha sido revisado",
        },
        comprobanteDomicilio: {
          name: "Comprobante de domicilio",
          url: "",
          aprobado: false,
          mensaje: "No ha sido revisado",
        },
        certificadoPreparatoria: {
          name: "Certificado de preparatoria",
          url: "",
          aprobado: false,
          mensaje: "No ha sido revisado",
        },
        credencialElector: {
          name: "Credencial de elector",
          url: "",
          aprobado: false,
          mensaje: "No ha sido revisado",
        },
        fotografia: {
          name: "Fotografia",
          url: "",
          aprobado: false,
          mensaje: "No ha sido revisado",
        },
        analisisVDRL: {
          name: "Analisis VDRL",
          url: "",
          aprobado: false,
          mensaje: "No ha sido revisado",
        },
      },
      rol: "Estudiante",
      uid: "",
    },
    menu: false,
    sexOptions: ["Femenino", "Masculino", "No binario"],
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
    rulePassword: [
      (v) => !!v || "Campo requerido",
      (v) =>
        (v && v.length >= 6) ||
        "La contraseña debe contener al menos 6 caracteres",
    ],
    ruleMail: [
      (v) => !!v || "Campo requerido",
      (v) => /.+@.+\..+/.test(v) || "Ingresa un correo válido",
    ],
    ruleDocument: [
      (v) => !!v || "Campo requerido",
      (v) => !v || v.size < 2000000 || "El archivo solo puede pesar 2 MB!",
    ],
  }),
  methods: {
    async createAccount() {
      try {
        const response = await auth.createUserWithEmailAndPassword(
          this.mailRepeat,
          this.passwordRepeat
        );
        this.user.uid = response.user.uid;
        await this.subirArchivos();
      } catch (error) {
        this.text = error.message;
        this.snackbar = true;
        console.warn(error);
      }
    },
    input(e, tipo) {
      this.user.documents[tipo].url = e;
    },
    async setInfo() {
      if (!this.$refs.form.validate()) {
        this.text =
          "Faltan campos por llenar y/o la información es incorrecta.";
        this.snackbar = true;
      }

      if (this.$refs.form.validate()) {
        this.overlay = true;
        await this.createAccount();
        this.overlay = false;
      }
    },
    async subirDatosFirebase() {
      this.user.contrasena = this.password;
      this.user.correoElectronico = this.mail;
      let uid = this.user.uid;

      console.log(this.user);

      try {
        const response = await db.collection("users").doc(uid).set(this.user);
        if (response == undefined) {
          alert(
            "Cuenta creada con exito!, puedes iniciar sesión para ver tu status"
          );
          this.$router.push({name: 'Home'});
        }
      } catch (error) {
        console.warn(error);
      }
    },
    async subirArchivos() {
      const uid = this.user.uid;
      try {
        for (const document in this.user.documents) {
          if (this.user.documents[document] != "") {
            let file = this.user.documents[document].url;
            let extension = this.user.documents[document].url.name.split(
              "."
            )[1];
            let storageRef = storage.ref(`${uid}/${document}.${extension}`);
            const response = await storageRef.put(file);
            if (response.state == "success") {
              let url = await storageRef.getDownloadURL();
              this.user.documents[document].url = url;
            }
          }
        }

        this.subirDatosFirebase();
      } catch (error) {
        console.warn(error);
      }
    },
  },
  computed: {
    rulePasswordRepeat() {
      return [
        (v) => {
          if (this.passwordRepeat == this.password) return true;
          if (this.password != this.passwordRepeat)
            return "Las contraseñas deben coincidir";
          if (v.length < 6)
            return "La contraseña debe contener al menos 6 caracteres";
        },
      ];
    },
    ruleMailRepeat() {
      return [
        (v) => {
          if (v == this.mail) return true;
          if (v != this.mail) return "Los correos deben coincidir";
        },
      ];
    },
  },
};
</script>

<style lang="scss" scoped></style>
