<template>
  <div class="dashboard">
    <v-subheader class="py-0 d-flex justify-space-between rounded-lg">
      <h3>Dashboard</h3>
    </v-subheader>
    <br />
    <v-row>
      <v-col lg="7" cols="12">
        <v-row>
          <v-col lg="6" cols="12" v-for="(item, index) in activityLog" :key="index"> </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" lg="5"> </v-col>
      <v-col>
        <v-card>
          <v-data-table :headers="headers" :items="desserts" sort-by="calories" class="elevation-1">
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Lista de zapatos</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                  <template v-slot:activator="{}">
                    <router-link to="/add" tag="button">
                      <v-btn color="success" class="ma-2">
                        Agregar Producto
                        <v-icon right> mdi-plus-circle-outline </v-icon>
                      </v-btn>
                    </router-link>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="text-h5">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-form ref="form" v-model="valid" lazy-validation>
                          <v-row>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field disabled v-model="editedItem.referencia" label="Referencia"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="editedItem.marca" label="Marca" :rules="marcaRules"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field v-model="editedItem.stock" type="number" label="Stock" :maxlength="10" :rules="stockRules"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field
                                v-model="editedItem.p_compra"
                                :rules="p_copraRules"
                                v-mask="['$ #.###', '$ ##.###', '$ ###.###.###']"
                                label="Precio de compra"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field
                                v-model="editedItem.p_venta"
                                :rules="p_ventaRules"
                                v-mask="['$ #.###', '$ ##.###', '$ ###.###.###']"
                                label="Precio de venta"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-file-input
                                label="imagen"
                                id="file_img"
                                accept="image/*"
                                v-model="editedItem.imagen"
                                :rules="file_imgRules"
                                truncate-length="15"
                              ></v-file-input>
                            </v-col>
                          </v-row>
                        </v-form>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="red" text @click="close"> Cancelar </v-btn>
                      <v-btn color="success" text @click="save"> Guardar </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="500px">
                  <v-card>
                    <v-card-title class="text-h5">Deseas eliminar este producto?</v-card-title>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
                      <v-btn color="red" text @click="deleteItemConfirm">Eliminar</v-btn>
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
              <v-dialog v-if="dialogMasivo" max-width="500px">
                <v-card>
                  <v-card-title class="text-h5">Deseas este producto?</v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeMasivo">Cancelar</v-btn>
                    <v-btn color="red" text @click="closeMasivo">Eliminar</v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon small class="mr-2" @click="showItem(item)"> mdi-eye </v-icon>
              <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
              <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
            </template>
            <template v-slot:no-data>
              <v-btn color="primary" :on-click="getAllShoes()"> Reset </v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-dialog v-model="dialogShow" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="text-h5">{{ tarjeta.referencia }}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-card class="mx-auto" max-width="344">
                <v-img v-bind="image" height="200px"></v-img>

                <v-card-title> {{ tarjeta.marca }} </v-card-title>

                <v-card-subtitle>{{ tarjeta.precio }} </v-card-subtitle>
              </v-card>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialogShow = false"> Cerrar </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import money from "v-money";
import { mask } from "vue-the-mask";
import Vue from "vue";
Vue.use(money, { precision: 4 });

export default {
  name: "Dashboard",
  directives: { mask },
  mounted() {
    // invocar los métodos
    this.getAllShoes();
  },

  data() {
    return {
      dialog: false,
      dialogDelete: false,
      dialogShow: false,
      dialogMasivo: false,
      base64: "",
      valid: "",
      activityLog: [],
      image: {
        src: "",
        alt: "Imagen",
      },
      tarjeta: {
        referencia: "",
        precio: "",
        marca: "",
      },
      headers: [
        {
          text: "Referencia",
          align: "start",
          sortable: false,
          value: "referencia",
        },
        { text: "Marca", value: "marca" },
        { text: "Stock", value: "stock" },
        { text: "Precio  de compra", value: "p_compra" },
        { text: "Precio de venta", value: "p_venta" },
        { text: "Acciones", value: "actions" },
      ],
      editedItem: {
        referencia: "",
        marca: "",
        stock: 0,
        p_compra: "",
        p_venta: "",
        imagen: "",
      },
      defaultItem: {
        referencia: "",
        marca: "",
        stock: 0,
        p_compra: "",
        p_venta: "",
        imagen: "",
      },
      desserts: [],
      marcaRules: [(v) => !!v || "La marca es requerida!", (v) => (v && v.length <= 15) || "La marca no puede contener mas de 15 caracteres"],
      stockRules: [(v) => !!v || "El stock es requerido!"],
      p_copraRules: [
        (v) => !!v || "El precio de compra es requerido!",
        (v) => (v && v.length <= 50) || "El precio de compra no puede contener mas de 50 caracteres",
      ],
      p_ventaRules: [
        (v) => !!v || "El precio de venta es requerido!",
        (v) => (v && v.length <= 50) || "El precio de compra no puede contener mas de 50 caracteres",
      ],
      file_imgRules: [(v) => !!v || "La imagen del producto es requerido!"],
      input_csvRules: [(v) => !!v || "El csv es requerido"],
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Editar producto";
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  created() {
    if (!localStorage.user) this.$router.push("/login");
  },
  methods: {
    ...mapActions({
      _getAllShoes: "_getAllShoes",
      _deleteShoe: "_deleteShoe",
      _editShoe: "_editShoe",
    }),
    async getAllShoes() {
      const respuesta = await this._getAllShoes();
      for (let i = 0; i < respuesta.data.length; i++) {
        respuesta.data[i].p_compra = `$ ${respuesta.data[i].p_compra}`;
        respuesta.data[i].p_venta = `$ ${respuesta.data[i].p_venta}`;
      }
      this.desserts = respuesta.data;
    },

    formarNumber_(val = 0, scale = 0) {
      let mask = IMask.createMask({
        mask: Number,
        scale: 0,
        thousandsSeparator: ",",
        radix: ".",
      });

      mask.resolve(val.toString());
      return `${mask.value}`;
    },

    editItem(item) {
      this.image.src = item.image;
      this.tarjeta.referencia = item.referencia;
      this.tarjeta.precio = item.p_venta;
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.editedItem.imagen = item.image;
      this.dialog = true;
    },

    showItem(item) {
      if (item.image && item.image != "null") this.image.src = item.image;
      else if( item.image === "null") this.image.src = "https://upload.wikimedia.org/wikipedia/commons/6/66/Sin_datos.jpg";
      else this.image.src = "https://upload.wikimedia.org/wikipedia/commons/6/66/Sin_datos.jpg";
      this.tarjeta.referencia = item.referencia;
      this.tarjeta.precio = item.p_venta;
      this.tarjeta.marca = item.marca;

      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogShow = true;
    },

    async deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      const respuesta = await this._deleteShoe(this.editedItem._id);
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.editedItem.p_compra = "";
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeMasivo() {
      this.dialogMasivo = false;
    },
    subirArchivo(id) {
      document.getElementById(id).click();
    },
    async convertBase64() {
      let prueba = "";
      let reader = new FileReader();

      const miPromesa = new Promise((resolve, reject) => {
        reader.onloadend = function () {
          resolve(`${reader.result}`);
        };
      });

      reader.readAsDataURL(this.editedItem.imagen);
      this.base64 = await miPromesa;
    },

    async save() {
      if (this.editedIndex > -1) {
        if (this.editedItem.imagen != this.image.src) {
          console.log("jejejje");
          await this.convertBase64();
          this.editedItem.image = this.base64;
        }
        if (this.$refs.form.validate()) {
          this.editedItem.p_compra = this.editedItem.p_compra.split(" ")[1];
          this.editedItem.p_venta = this.editedItem.p_venta.split(" ")[1];
          console.log("this.editedItem");
          console.log(this.editedItem);
          const respuesta = await this._editShoe(this.editedItem);
          console.log(respuesta);
          this.close();
          this.getAllShoes();
        }
      } else {
        this.desserts.push(this.editedItem);
      }
    },
  },
};
</script>

<style scoped>
.overlap-icon {
  position: absolute;
  top: -33px;
  text-align: center;
  padding-top: 12px;
}
</style>
