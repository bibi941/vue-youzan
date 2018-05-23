import axios from 'axios'

function fetch(url, arg) {
  return new Promise((resolve, reject) => {
    axios.post(url, arg).then(res => {
      let status = res.arg.status
      if (status === 200) {
        resolve(res)
      } else if (status === 300) {
        location.href = 'login.html'
        resolve(res)
      }
      reject(res)
    }, (error) => {
      reject(error)
    })
  })
}

export default fetch
