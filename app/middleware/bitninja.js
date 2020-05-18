const axios = require('axios').default

exports.getTokenBitNinja = async (email=null,password=null) => {
  return new Promise((resolve, reject) => {
    var data = ""
    if( email === null ){
      data = {
        email: process.env.EMAIL_BITNINJA,
        password: process.env.PASSWORD_BITNINJA
      }
    }else{
      data = {
        email: email,
        password: password
      }
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
