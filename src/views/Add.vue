<template>
  <div>
    <v-subheader class="py-0 d-flex justify-space-between rounded-lg">
      <h3>Agregar Producto</h3>
    </v-subheader>
    <br />
    <router-link to="/" tag="button">
      <v-btn class="ma-2" color="success" dark>
        <v-icon dark left> mdi-arrow-left </v-icon>Volver
      </v-btn>
    </router-link>
    <v-btn class="ma-2" color="success" @click="dialog = true">
      Carga masiva
    </v-btn>

    <form>
      <v-text-field
        v-model="referencia"
        :error-messages="referenciaErrors"
        :counter="15"
        label="Referencia"
        required
        @input="$v.referencia.$touch()"
        @blur="$v.referencia.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="marca"
        :error-messages="marcaErrors"
        :counter="15"
        label="Marca"
        required
        @input="$v.marca.$touch()"
        @blur="$v.marca.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="stock"
        :error-messages="stockErrors"
        :counter="15"
        label="Stock"
        required
        @input="$v.stock.$touch()"
        @blur="$v.stock.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="p_compra"
        :error-messages="p_compraErrors"
        :counter="15"
        label="Precio de compra"
        required
        @input="$v.p_compra.$touch()"
        @blur="$v.p_compra.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="p_venta"
        :error-messages="p_ventaErrors"
        :counter="15"
        label="Precio de compra"
        required
        @input="$v.p_venta.$touch()"
        @blur="$v.p_venta.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="imagen"
        :error-messages="imagenErrors"
        :counter="15"
        label="Url de imagen"
        required
        @input="$v.imagen.$touch()"
        @blur="$v.imagen.$touch()"
      ></v-text-field>

      <v-btn class="mr-4" @click="submit" color="success"> guardar </v-btn>
      <v-btn @click="clear"> limpiar </v-btn>
    </form>
    <v-snackbar
      v-model="snackbar.estado"
      :color="snackbar.color"
      :timeout="1500"
      bottom
      left
    >
      {{ snackbar.text }}
      <template v-slot:action="{ attrs }">
        <v-btn icon dark text @click="snackbar.estado = false" v-bind="attrs">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <template>
      <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="600px">
          <v-card>
            <v-card-title>
              <span class="text-h5">User Profile</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-file-input truncate-length="15"></v-file-input>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false">
                Close
              </v-btn>
              <v-btn color="blue darken-1" text @click="dialog = false">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
  </div>
</template>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength } from "vuelidate/lib/validators";
import { mapActions } from "vuex";

export default {
  mixins: [validationMixin],

  validations: {
    referencia: { required, maxLength: maxLength(15) },
    marca: { required, maxLength: maxLength(10) },
    stock: { required, maxLength: maxLength(10) },
    p_compra: { required, maxLength: maxLength(10) },
    p_venta: { required, maxLength: maxLength(10) },
    imagen: { required },
  },

  data: () => ({
    referencia: "",
    marca: "",
    dialog: false,
    stock: "",
    p_compra: "",
    p_venta: "",
    imagen: "",
    rules: [
      (value) =>
        !value || value.size < 2000000 || "No puede pesar mas de 2 MB!",
    ],
    snackbar: {
      estado: false,
    },
  }),

  computed: {
    referenciaErrors() {
      const errors = [];
      if (!this.$v.referencia.$dirty) return errors;
      !this.$v.referencia.maxLength &&
        errors.push("La referencia no puede contener mas de 15 caracteres!");
      !this.$v.referencia.required && errors.push("La referencia es requireda");
      return errors;
    },
    marcaErrors() {
      const errors = [];
      if (!this.$v.marca.$dirty) return errors;
      !this.$v.marca.maxLength &&
        errors.push("La marca no puede contener mas de 10 caracteres!");
      !this.$v.marca.required && errors.push("La marca es requireda");
      return errors;
    },
    stockErrors() {
      const errors = [];
      if (!this.$v.stock.$dirty) return errors;
      !this.$v.stock.maxLength &&
        errors.push("La stock no puede contener mas de 10 caracteres!");
      !this.$v.stock.required && errors.push("La stock es requiredo");
      return errors;
    },
    p_compraErrors() {
      const errors = [];
      if (!this.$v.p_compra.$dirty) return errors;
      !this.$v.p_compra.maxLength &&
        errors.push(
          "El precio de compra no puede contener mas de 10 caracteres!"
        );
      !this.$v.p_compra.required &&
        errors.push("El precio de compra es requiredo");
      return errors;
    },
    p_ventaErrors() {
      const errors = [];
      if (!this.$v.p_venta.$dirty) return errors;
      !this.$v.p_venta.maxLength &&
        errors.push(
          "El precio de venta no puede contener mas de 10 caracteres!"
        );
      !this.$v.p_venta.required &&
        errors.push("El precio de venta es requiredo");
      return errors;
    },
    imagenErrors() {
      const errors = [];
      if (!this.$v.imagen.$dirty) return errors;
      !this.$v.imagen.required && errors.push("La imagen es requerida");
      return errors;
    },
  },

  methods: {
    ...mapActions({
      _addShoe: "_addShoe",
    }),
    async submit() {
      const data = {
        referencia: this.referencia,
        marca: this.marca,
        stock: this.stock,
        p_compra: this.p_compra,
        p_venta: this.p_venta,
        image: this.imagen,
      };

      const respuesta = await this._addShoe(data);

      if (respuesta.data.N1) {
        this.msj("Producto agregado correctamente", "green");
        this.clear();
      } else {
        this.msj("Error al agregar producto, revise los datos.");
      }
    },
    msj(text, color) {
      this.snackbar.estado = true;
      this.snackbar.text = text;
      this.snackbar.color = color ? `${color} darken-2` : "red darken-3";
    },
    clear() {
      this.$v.$reset();
      this.referencia = "";
      this.referencia = "";
      this.marca = "";
      this.stock = "";
      this.p_compra = "";
      this.p_venta = "";
      this.imagen = "";
    },
  },
};
</script>