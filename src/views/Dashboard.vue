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
        <router-link to="/add" tag="button">
          <v-btn color="success" class="ma-2" @click="addShoe()">
            Agregar Producto
            <v-icon right> mdi-plus-circle-outline </v-icon>
          </v-btn>
        </router-link>
        <v-card>
          <v-data-table
            caption="Lista de inventario"
            :headers="headers"
            :items="desserts"
            :items-per-page="5"
            class="elevation-1"
          >
            <template v-slot:item.action="">
              <v-btn color="success" class="ma-2">
                <v-icon> mdi-eye </v-icon>
              </v-btn>
              <v-btn color="orange" class="ma-2">
                <v-icon> mdi-pencil </v-icon>
              </v-btn>
              <v-btn color="red" class="ma-2">
                <v-icon> mdi-delete </v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>



<script>
import { mapActions } from "vuex";
export default {
  name: "Dashboard",
  data() {
    return {
      dialog: false,
      activityLog: [],
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
        { text: "Actions", value: "action" },
      ],
      desserts: [
        {
          referencia: "Frozen Yogurt",
          marca: "nike",
          stock: 6,
          p_compra: 2.4,
          p_venta: 4.0,
        },
        {
          referencia: "Ice cream sandwich",
          marca: "nike",
          stock: 9,
          p_compra: 3.7,
          p_venta: 4.3,
        },
        {
          referencia: "Eclair",
          marca: "nike",
          stock: 1,
          p_compra: 2.3,
          p_venta: 6.0,
        },
        {
          referencia: "Cupcake",
          marca: "nike",
          stock: 3,
          p_compra: 6.7,
          p_venta: 4.3,
        },
        {
          referencia: "Gingerbread",
          marca: "nike",
          stock: 1,
          p_compra: 4.9,
          p_venta: 3.9,
        },
        {
          referencia: "Jelly bean",
          marca: "nike",
          stock: 0,
          p_compra: 9.4,
          p_venta: 0.0,
        },
        {
          referencia: "Lollipop",
          marca: "nike",
          stock: 0,
          p_compra: 9.8,
          p_venta: 0.0,
        },
        {
          referencia: "Honeycomb",
          marca: "nike",
          stock: 3,
          p_compra: 8.7,
          p_venta: 6.5,
        },
        {
          referencia: "Donut",
          marca: "nike",
          stock: 2,
          p_compra: 5.1,
          p_venta: 4.9,
        },
        {
          referencia: "KitKat",
          marca: "nike",
          stock: 2,
          p_compra: 6.5,
          p_venta: 700,
        },
      ],
    };
  },
  methods: {
    ...mapActions({
      _addShoe: "_addShoe",
    }),
    async addShoe() {
      const data = {
        referencia: "referencia",
        marca: "marca",
        stock: 10,
        p_compra: 35.0,
        p_venta: 80.0,
        image:"https://static.nike.com/a/images/t_default/27a70d37-7355-4368-9eb4-42d893acdcc2/calzado-air-force-1-shadow-kTgn9J.png",
      };
      const respuesta = await this._addShoe({data});
      console.log(respuesta)
    },
    onButtonClick(item) {
      console.log("click on " + item.no);
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