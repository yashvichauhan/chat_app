const messageDetail = (name,text)=>{
    return{
        text,
        createdAt :new Date().getTime(),
        username: name
    }
}

module.exports = {
    messageDetail
}