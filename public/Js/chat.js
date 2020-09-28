const clilentSocket = io()

//elements
const form_dom = document.querySelector("#inp-form")
const send_btn=form_dom.querySelector("button")
const send_loc = document.querySelector("#send-location")
const msg_inp=form_dom.querySelector("input")
const message_box = document.querySelector("#messages")
const message_template =document.querySelector("#message-template").innerHTML 
//client 
clilentSocket.on('message',(msg)=>{
    const html =Mustache.render(message_template,{
        message:msg.text,
        sendTime: moment(msg.createdAt).format('h:mm a'),
        username: msg.username
    })
    message_box.insertAdjacentHTML('beforeend',html)
})
//testing

//query string parsing
const {username, room} = Qs.parse(location.search,{ignoreQueryPrefix:true})
//message sending
send_btn.addEventListener('click',(e)=>{
    e.preventDefault()
    send_btn.setAttribute('disabled','disabled')
    const msg=msg_inp.value
    clilentSocket.emit('send-msg',{username,room},msg,(error)=>{
        if(error){
            return console.log(error)
        }
        msg_inp.focus()
        form_dom.reset()
        send_btn.removeAttribute('disabled')
        console.log("message delieverd")
    })
})
//share location
send_loc.addEventListener('click',()=>{
    if(!navigator.geolocation){
        return ("Geolocation is not supported!")
    }
    navigator.geolocation.getCurrentPosition((position)=>{
        console.log(position)
    })
})
//send query
clilentSocket.emit('joinPage',{username,room},(error)=>{
    if(error){
        window.location.href = "/";
        alert(''+error+'!')
    }
})