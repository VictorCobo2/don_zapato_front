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
      <v-file-input
        :rules="rules"
        accept="image/png, image/jpeg, image/bmp"
        placeholder="Click aqui para subir la imagen"
        prepend-icon="mdi-camera"
        label="Imagen del producto"
      ></v-file-input>

      <v-btn class="mr-4" @click="submit" color="success"> guardar </v-btn>
      <v-btn @click="clear"> limpiar </v-btn>
    </form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],

  validations: {
    referencia: { required, maxLength: maxLength(15) },
    marca: { required, maxLength: maxLength(10) },
    stock: { required, maxLength: maxLength(10) },
    p_compra: { required, maxLength: maxLength(10) },
    p_venta: { required, maxLength: maxLength(10) },
  },

  data: () => ({
    referencia: "",
    marca: "",
    stock: "",
    p_compra: "",
    p_venta: "",
    rules: [
      (value) =>
        !value || value.size < 2000000 || "No puede pesar mas de 2 MB!",
    ],
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
  },

  methods: {
    submit() {
      this.$v.$touch();
    },
    clear() {
      this.$v.$reset();
      this.referencia = "";
    },
  },
};
</script>