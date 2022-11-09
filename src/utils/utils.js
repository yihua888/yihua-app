// 生成随机字符串
const randomStr = (code) => {
    const num = Math.random()
    if(num > 0.5){
        return String.fromCharCode(code + 65)
    }
    return String.fromCharCode(code + 97)
}

const getToken = (id) => {
    let token = ''
    for(let i = 0; i < 16; i++){
        token += randomStr(parseInt(Math.random()*26))
    }
    token += randomStr(parseInt(id))
    const num = parseInt(Math.random()*27)
    for(let i = 0; i < num; i++){
        token += randomStr(parseInt(Math.random()*26))
    }
    return token
};

export { getToken };
