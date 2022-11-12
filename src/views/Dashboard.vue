<template>
  <div class="dashboard">
    <v-subheader class="py-0 d-flex justify-space-between rounded-lg">
      <h3>Dashboard</h3>
    </v-subheader>
    <br />
    <v-row>
      <v-col lg="7" cols="12">
        <v-row>
          <v-col
            lg="6"
            cols="12"
            v-for="(item, index) in activityLog"
            :key="index"
          >
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" lg="5"> </v-col>
      <v-col>
        <v-card>
          <v-data-table
            :headers="headers"
            :items="desserts"
            sort-by="calories"
            class="elevation-1"
          >
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
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.referencia"
                              label="Referencia"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.marca"
                              label="Marca"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.stock"
                              label="Stock"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.p_compra"
                              label="Precio de compra"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.p_venta"
                              label="Precio de venta"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.imagen"
                              label="Url imagen"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="red" text @click="close"> Cancelar </v-btn>
                      <v-btn color="success" text @click="save">
                        Guardar
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="500px">
                  <v-card>
                    <v-card-title class="text-h5"
                      >Deseas eliminar este producto?</v-card-title
                    >
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="closeDelete"
                        >Cancelar</v-btn
                      >
                      <v-btn color="red" text @click="deleteItemConfirm"
                        >Eliminar</v-btn
                      >
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                
              </v-toolbar>
              <v-dialog v-if="dialogMasivo" max-width="500px">
                  <v-card>
                    <v-card-title class="text-h5"
                      >Deseas JEJE este producto?</v-card-title
                    >
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="closeMasivo"
                        >Cancelar</v-btn
                      >
                      <v-btn color="red" text @click="closeMasivo"
                        >Eliminar</v-btn
                      >
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon small class="mr-2" @click="showItem(item)">
                mdi-eye
              </v-icon>
              <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
              </v-icon>
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

                <v-card-subtitle> $ {{ tarjeta.precio }} </v-card-subtitle>
              </v-card>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialogShow = false">
              Cerrar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    
  </div>
</template>



<script>
import { mapActions } from "vuex";
export default {
  name: "Dashboard",
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
      activityLog: [],

      image: {
        src: "",
        alt: "Imagen xd",
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
        p_compra: 0,
        p_venta: 0,
        imagen: "",
      },
      defaultItem: {
        referencia: "",
        marca: "",
        stock: 0,
        p_compra: 0,
        p_venta: 0,
        imagen: "",
      },
      desserts: [],
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

  methods: {
    ...mapActions({
      _getAllShoes: "_getAllShoes",
    }),
    async getAllShoes() {
      const respuesta = await this._getAllShoes();
      this.desserts = respuesta.data;
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
      this.image.src = item.image;
      this.tarjeta.referencia = item.referencia;
      this.tarjeta.precio = item.p_venta;
      this.tarjeta.marca = item.marca;

      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogShow = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
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
      console.log("hola");
      this.dialogMasivo = false;
    },
    subirArchivo(id) {
      document.getElementById(id).click();
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
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