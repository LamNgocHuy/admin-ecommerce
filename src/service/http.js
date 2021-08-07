import axios from 'axios'

const handleSuccessResponse = (response, resolve) => {
    resolve(response)
}

const handleErrorResponse = (error, reject) => {
    reject(error)
}

let API_URL = "https://shopee-ecommerce-nh7bkdn.cleverapps.io"

const service = {
  get(endPoint) {
      return new Promise ((resolve, reject) => {
          axios.get(`${API_URL}${endPoint}`, {
              headers: localStorage.getItem('token')
              ? { Authorization: `Bearer ${localStorage.getItem('token')}`}
              : null,
          })
          .then((response) => {
              handleSuccessResponse(response, resolve);
          })
          .catch((error) => {
              handleErrorResponse(error, reject);
          })
      })
  },
  post(endPoint, params) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${API_URL}${endPoint}`, params, {
            headers: localStorage.getItem("token")
              ? { Authorization: `Bearer ${localStorage.getItem("token")}` }
              : null,
          })
          .then((response) => {
            handleSuccessResponse(response, resolve)
          })
          .catch((error) => {
            handleErrorResponse(error, reject)
          });
      });
  },
  put(endPoint, params) {
      return new Promise((resolve, reject) => {
        axios
          .put(`${API_URL}${endPoint}`, params, {
            headers: localStorage.getItem("token")
              ? { Authorization: `Bearer ${localStorage.getItem("token")}` }
              : null,
          })
          .then((response) => {
            handleSuccessResponse(response, resolve);
          })
          .catch((error) => {
            handleErrorResponse(error, reject);
          });
      });
  },
}

export default service;