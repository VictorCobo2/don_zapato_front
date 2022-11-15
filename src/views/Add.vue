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
      
    <v-form
    ref="form"
    v-model="valid"
    lazy-validation
    >
      <v-text-field
        v-model="referencia"
        :rules="refrenciaRules"
        :counter="15"
        label="Referencia"
        required
        @input="$v.referencia.$touch()"
        @blur="$v.referencia.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="marca"
        :counter="15"
        :rules="marcaRules"
        label="Marca"
        required
        @input="$v.marca.$touch()"
        @blur="$v.marca.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="stock"
        type="number"
        :rules="stockRules"
        :counter="15"
        label="Stock"
        required
        @input="$v.stock.$touch()"
        @blur="$v.stock.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="p_compra"
        v-mask="['$ #.###','$ ##.###','$ ###.###.###']"
        :rules="p_copraRules"
        :counter="15"
        :maxlength="15"
        label="Precio de compra"
        required
        @input="$v.p_compra.$touch()"
        @blur="$v.p_compra.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="p_venta"
        v-mask="['$ #.###','$ ##.###','$ ###.###.###']"
        :rules="p_ventaRules"
        :counter="15"
        :maxlength="15"
        label="Precio de venta"
        required
        @input="$v.p_venta.$touch()"
        @blur="$v.p_venta.$touch()"
      ></v-text-field>
      <v-file-input
                id="file_img"
                accept="image/*"
                v-model="file_img"
                :rules="file_imgRules"
  truncate-length="15"
      ></v-file-input>
    </v-form>
    <v-btn class="mr-4" @click="submit" color="success"> guardar </v-btn>
      <v-btn @click="clear"> limpiar </v-btn>
    <v-snackbar
      v-model="snackbar.estado"
      :color="snackbar.color"
      prominent
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
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-form
    ref="form_input"
    v-model="valid"
    lazy-validation
    >
        <v-card-title>
          <span class="text-h5">Carga de CSV</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
            
              <v-col cols="12">
                <v-file-input
                accept="text/csv"
                id="file_csv"
                :rules="input_csvRules"
                v-model="file"
  truncate-length="15"
></v-file-input>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Cerrar
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="subirCsv()"
          >
            Guardar
          </v-btn>
        </v-card-actions>
      </v-form>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="dialogExiste"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">
          {{this.existe.msg}}
        </v-card-title>
        <v-img
        src="../assets/37204-bad-coche.gif"
        >
        </v-img>
        <!-- <v-card-text>Le referencia: {{this.existe.referncia}}, ya existe, por favor corrija e intente nuevamente</v-card-text> -->
        <v-card-text>{{this.mensaje}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="dialogExiste = false"
          >
            Aceptar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="dialogGuardado"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">
          Guardado
        </v-card-title>
        <v-img
        src="../assets/37200-good-coche.gif"
        >

        </v-img>
        <v-card-text>Se guaradaron correctamente {{this.guarados}} productos</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="dialogGuardado = false"
          >
            Aceptar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
  </div>
</template>

<script>
import router from '@/router';
import { validationMixin } from "vuelidate";
import { required, maxLength } from "vuelidate/lib/validators";
import { mapActions } from "vuex";
import money from 'v-money'
import {mask} from 'vue-the-mask'
import Vue from 'vue'
Vue.use(money, {precision: 4})

export default {
  directives: {mask},
  mounted(){
    this.clear();
  },
  mixins: [validationMixin],

  validations: {
    referencia: { required, maxLength: maxLength(15) },
    marca: { required, maxLength: maxLength(10) },
    stock: { required, maxLength: maxLength(10) },
    p_compra: { required, maxLength: maxLength(50) },
    p_venta: { required, maxLength: maxLength(50) },
    imagen:{required} 
  },

  data: () => ({
    referencia: "",
    file: "",
    file_img:"",
    marca: "",
    base64:"",
    dialog:false,
    dialogExiste:false,
    dialogGuardado:false,
    mensaje:"",
    guarados: 0,
    money: {
          thousands: '.',
          prefix: 'COP$ ',
          precision: 3,
          masked: false /* doesn't work with directive */
        },
    existe:{
      msg:"",
      referncia:""
    },
    stock: "",
    p_compra: "",
    p_venta: "",
    imagen:"",
    snackbar: {
      estado: false,
    },
    valid: false,
    valid_csv: false,
    refrenciaRules: [
        v => !!v || 'La referencia es requerida!',
        v => (v && v.length <= 20) || 'La referencia no puede contener mas de 20 caracteres',
      ],
    marcaRules: [
        v => !!v || 'La marca es requerida!',
        v => (v && v.length <= 15) || 'La marca no puede contener mas de 15 caracteres',
    ],
    stockRules: [
        v => !!v || 'El stock es requerido!',
        v => (v && v.length <= 15) || 'El stock no puede contener mas de 15 caracteres',
    ],
    p_copraRules: [
        v => !!v || 'El precio de compra es requerido!',
        v => (v && v.length <= 50) || 'El precio de compra no puede contener mas de 50 caracteres',
    ],
    p_ventaRules: [
        v => !!v || 'El precio de venta es requerido!',
        v => (v && v.length <= 50) || 'El precio de compra no puede contener mas de 50 caracteres',
    ],
    file_imgRules:[
        v => !!v || 'La imagen del producto es requerido!',
    ],
    input_csvRules:[
        v => !!v || 'El csv es requerido',
    ],
  }),
  watch:{
    file_img(){
      this.convertBase64()
    }
  },

  methods: {
    ...mapActions({
      _addShoe: "_addShoe",
      _postManyCsv:"_postManyCsv"
    }),
    async submit() {
      this.valid = this.$refs.form.validate()
      if(this.valid){
      const data = {
        referencia: this.referencia,
        marca: this.marca,
        stock: this.stock,
        p_compra: this.p_compra.split(" ")[1],
        p_venta: this.p_venta.split(" ")[1],
        image: this.base64
      };

      const respuesta = await this._addShoe(data);

      if (respuesta.data.N1) {
        this.msj("Producto agregado correctamente", "green");
        router.push('/')
        this.clear();
      } else {
        this.msj("Error al agregar producto, revise los datos.");
      }
    }
    },
    msj(text, color) {
      this.snackbar.estado = true;
      this.snackbar.text = text;
      this.snackbar.color = color ? `${color} darken-2` : "red darken-3";
    },
    clear() {
      this.$refs.form.reset()
      this.referencia = "";
      this.referencia = "";
      this.marca = "";
      this.stock = "";
      this.p_compra = "";
      this.p_venta = "";
      this.file_img = ""
    },
    async subirCsv(){
      this.valid_csv = this.$refs.form_input.validate()
      if(this.valid_csv){
      const respuesta = await this._postManyCsv(this.file)
      console.log(respuesta.msg)
      if(respuesta.msg) {
        console.log(this.mensaje)
        this.existe = respuesta 
        this.mensaje = `${respuesta.msg} ${respuesta.referncia}`
        this.dialog = false
        this.file = ""
        this.dialogExiste = true
      }else
      if(respuesta.status == 200){
        this.guarados = respuesta.data.length
        this.dialog = false;
        this.dialogGuardado = true
      }else
      if(!respuesta.status){
        this.dialog = false
        this.mensaje = "El CSV no cumple con el formato permitido."
        this.dialogExiste = true
      }
      
    }
    },

    async convertBase64(){
      let prueba = ""
      let reader = new FileReader();

      const miPromesa = new Promise((resolve, reject) => {
        reader.onloadend = function() {
resolve(`${reader.result}`)
}
});
      
      reader.readAsDataURL(this.file_img);
      this.base64 = await miPromesa
     
    },

  },
};
</script>