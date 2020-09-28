const users = []

// addUser, removeUser, getUser, getUsersInRoom
//adduser
const addUser = ({ id, username, room }) => {
    // Clean the data
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    // Validate the data
    if (!username || !room) {
        return {
            error: 'Username and room are required!'
        }
    }

    // Check for existing user
    const existingUser = users.find((user) => {
        return user.room === room && user.username === username
    })

    // Validate username
    if (existingUser) {
        return {
            error:"username is taken!"
        }
    }

    // Store user
    const user = { id, username, room }
    users.push(user)
    return { user }
}
//remove user
const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id)

    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}
//getuser
const getUser = (id)=>{
    const index = users.findIndex((user)=> user.id===id)
    if(index===-1){
        return {
            error:"Couldn't find user!"
        }
    }
    return users[index]
}
module.exports= {
    addUser,
    removeUser,
    getUser
}