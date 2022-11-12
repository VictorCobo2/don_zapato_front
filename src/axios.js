import { default as axios } from "axios";

//const URI = "https://donzapato-backend.herokuapp.com/api";
const URI = "http://localhost:9000/api";

const axiosSc = ({ url, data = {}, method = "POST", header = {}, responseType = "json" }) => {
  return new Promise((resolve, reject) => {
    let config = {
      url: `${URI}${url}`,
      method,
      data,
      headers: {
        "content-type": "application/json",
        ...header,
      },
      responseType,
      validateStatus: function (status) {
        return status >= 200 && status < 400;
      },
    };
    console.log(`${URI}${url}`)
    axios(config)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        if (error.response.status == 0) {
          let response = { status: -1, message: null };
        }
        if (error.response) {
          response.message = error.response.data;
          response.status = error.response.status;
          response.status == -1;
        } else if (response.request) {
          response.message = error.request;
          response.status == -1;
        } else {
          response.message = error.message;
          response.status == -1;
        }
        reject(response);
      });
  });
};
function error_console(form, error, data = null) {
  console.debug("-> Error:", form, error, data);
}
export default axiosSc;