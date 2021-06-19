import axios from 'axios'
// const devBase = 'http://ctf.com:8080' // 开发环境
const devBase = 'http://192.168.10.160:8000' // 开发环境
export const base =  devBase

axios.interceptors.response.use(
  res => {
    if (res.status === 200 && res.data.IsSucceed) {
      return res.data
    } else {
      return res
    }
  },
  err => {
    console.log('err', err.response)
    return Promise.reject(err)
  }
)

export const POST = (url, params) => {
  return axios.post(`${base}/${url}`, params).then(res =>
    res
  )
}

export const PUT = (url, params) => {
  return axios.put(`${base}/${url}`, params).then(res => res)
}

export const GET = (url, params) => {
  return axios
    .get(`${base}/${url}`, {
      params: params
    })
    .then(res => res)
}

export const UploadForm = (url, params) => {
  return axios.post(`${base}/${url}`, params, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const Download = (url, params) => {
  return axios.post(`${base}/${url}`, params, {
    responseType: 'blob'
  })
}

// 获得返回值中的JSON
export function pickJson (rawRes) {
  let result
  try {
    result = JSON.parse(rawRes[0].Value)
  } catch (err) {
    result = rawRes[0].Value
  }
  return result
}
export function getBase () {
  return base
}
