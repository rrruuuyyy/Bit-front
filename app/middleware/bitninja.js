const axios = require('axios').default

exports.getTokenBitNinja = async () => {
  return new Promise((resolve, reject) => {
    const data = {
      email: process.env.EMAIL_BITNINJA,
      password: process.env.PASSWORD_BITNINJA
    }
    axios
      .post('https://api.bitninja.io/v2/authentication/login/credentials', data)
      .then((response) => {
        resolve(response.data)
      })
      .catch((err) => {
        reject(err)
        console.log(err)
      })
  })
}
