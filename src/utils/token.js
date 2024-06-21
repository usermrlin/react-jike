// 封装token的相关方法 存 取 删
const TOKENKEY = 'token'
function setToken(token){
    localStorage.setItem(TOKENKEY,token)
}

function getToken(){
   return localStorage.getItem(TOKENKEY)
}

function removeToken() {
    localStorage.removeItem(TOKENKEY)
}

export {
    setToken,
    getToken,
    removeToken
}