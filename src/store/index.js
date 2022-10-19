import Vue from "vue";
import Vuex from "vuex";
import http from "../axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async _addShoe({ commit }, {data}) {
      const DATA = {
        referencia: "referencia",
        marca: "marca",
        stock: 10,
        p_compra: 35.0,
        p_venta: 80.0,
        image:"https://static.nike.com/a/images/t_default/27a70d37-7355-4368-9eb4-42d893acdcc2/calzado-air-force-1-shadow-kTgn9J.png",
      };
      try {
        console.log(data, "hola bebe")
        const respuesta = await http({
          //header: {},
          method: "POST",
          url: "shoes/add",
          data
        });
        console.log(respuesta, "peraa hp");
      } catch (error) {
        console.log(error, "erroooooooooooooooooooooooooooooooooo");
      }
    },
  },
  modules: {},
});
