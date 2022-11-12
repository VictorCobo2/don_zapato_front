import Vue from "vue";
import Vuex from "vuex";
import http from "../axios";
import axios from 'axios';

Vue.use(Vuex);

// const URI = "https://donzapato-backend.herokuapp.com/api";
const URI = "http://localhost:9000/api";

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async _addShoe({ commit }, data) {
      try {
        const prueba = await axios.post(`${URI}/shoes/add`, data).then()
        return prueba
      } catch (error) {
        console.log(error);
      }
    },
    async _getAllShoes({ commit }) {
      try {
        const prueba = await axios.get(`${URI}/shoes/all`).then().catch((error)=>{
          console.log(error)
          return error
        })
        console.log(prueba)
        return prueba
      } catch (error) {
        console.log(error);
      }
    },
    async _postManyCsv({commit}){

    }
  },
  modules: {},
});
