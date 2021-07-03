<template>
  <v-row>
    <v-dialog v-model="dialog" persistent max-width="500">
      <v-card class="rounded-lg">
        <v-card-title v-if="$route.name != 'Agregar-Admin'" class="headline">
          Borrar cuenta
        </v-card-title>
        <v-card-title
          v-if="$route.name == 'Agregar-Admin'"
          class="justify-center headline"
        >
          Acceso requerido <v-icon right>mdi-account-circle</v-icon>
        </v-card-title>
        <!-- Estudiante/Aspirante -->
        <div class="pr-10 pl-10" v-if="$route.name != 'Agregar-Admin'">
          <v-alert text type="error"   :color="$vuetify.theme.dark ? 'error' : '#C20808'" class="caption font-weight-bold"  >
            Después de borrar una cuenta, esta se borra de manera permanente. Esta acción no se puede deshacer.
          </v-alert>
          <span class="caption grey--text"  >Identificador de usuario</span> <br>
          <span class="caption font-weight-medium">{{uid}}</span>
        </div>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          v-if="$route.name == 'Agregar-Admin'"
          class="pr-5 pl-5 pt-5"
        >
          <v-text-field
            outlined
            color="green"
            label="Confirmar contraseña"
            placeholder="Contraseña"
            type="password"
            dense
            :rules="ruleRequired"
            v-model="password"
          ></v-text-field>
        </v-form>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="text-capitalize" color="grey" text @click="$emit('cancel')"> Cancelar </v-btn>
          <v-btn class="text-capitalize white--text" depressed color="#C20808"  @click="init()"> Eliminar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      :timeout="timeout"
      transition="slide-y-reverse-transition"
      bottom
      
      v-model="snackbar"
    >
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
  </v-row>
</template>
<script>
import { mapState } from "vuex";
import { db, storage } from "../../services/firebase";
export default {
  props: {
    dialog: {
      type: Boolean,
      required: true,
    },
    uid: {
      type: String,
    },
    estudiantes: {
      type: Array,
    },
  },
  data: () => ({
    valid: true,
    password: "",
    snackbar: false,
    timeout: 4000,
    text: "",
    ruleRequired: [(v) => !!v || "Campo requerido"],
  }),

  methods: {
    async init() {
      if (this.$route.name == "Agregar-Admin") {
        if (!this.$refs.form.validate()) {
          this.text =
            "Faltan campos por llenar y/o la información es incorrecta.";
          this.snackbar = true;
        }

        if (this.$refs.form.validate()) {
          this.overlay = true;
          await this.validarContraseña();
          this.overlay = false;
        }
      } else {
        this.eliminarUsuario();
      }
    },
    async validarContraseña() {
      let contrasena = this.user.contrasena;
      if (this.password == contrasena) {
        this.eliminarUsuario();
      } else {
        this.snackbar = true;
        this.text = "Contraseña incorrecta";
      }
    },
    async eliminarUsuario() {
      try {
        const response = await db.collection("users").doc(this.uid).delete();
        console.log(response);
        this.snackbar = true;
        this.text = "Eliminado correctamente de Firestore";
        this.$emit("cancel");
      } catch (error) {
        console.log(error);
        this.snackbar = true;
        this.text = "hubo un error al eliminar de Firestore";
      }
    },
    async eliminarDocumento() {
      const uid = this.user.uid;
      let extension = this.user.documents[document].url.name.split(".")[1];
      let storageRef = await storage.child(`${uid}/${document}.${extension}`);

      // Delete the file
      storageRef
        .delete()
        .then(function () {
          // File deleted successfully
          alert("Eliminado de Storage");
        })
        .catch(function (error) {
          // Uh-oh, an error occurred!
          console.log(error);
          alert("No se pudo eliminar de Storage");
        });
    },
  },
  computed: {
    ...mapState(["user"]),
  },
};
</script>
