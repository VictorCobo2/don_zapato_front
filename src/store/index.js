import Vue from "vue";
import Vuex from "vuex";
import http from "../axios";
import axios from 'axios';
import FormData from "form-data";

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
    async _editShoe({ commit }, data) {
      try {
        const prueba = await axios.put(`${URI}/shoes/edit`, data).then()
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
    async _postManyCsv({commit}, data){
      let file = new FormData();
      file.append("file", data);

      try {
        const prueba = await axios.post(`${URI}/shoes/csv`, file).then().catch((ERR)=>{
          if(ERR.request.status == 405) return JSON.parse(ERR.request.response)
          else return ERR
        })
        console.log(prueba)
        return prueba
      } catch (error) {
        console.log(error);
      }
    },
    async _deleteShoe({commit}, data){
      try {
        const prueba = await axios.delete(`${URI}/shoes/delete/${data}`).then().catch((error)=>{
          console.log(data)
          console.log(error)
          return error
        })
        console.log(prueba)
        return prueba
      } catch (error) {
        console.log(error);
      }
    },
    async _editUser({ commit }, data) {
      try {
        const prueba = await axios.put(`${URI}/user/edit`, data).then()
        return prueba
      } catch (error) {
        console.log(error);
      }
    },
    async _changePass({ commit }, data) {
      try {
        const prueba = await axios.put(`${URI}/user/changePassword`, data).then()
        return prueba
      } catch (error) {
        return error.response
      }
    },
    async _login({ commit }, data) {
      try {
        const prueba = await axios.put(`${URI}/user/login`, data).then()
        return prueba
      } catch (error) {
        return error.response
      }
    },
  },
  modules: {},
});
