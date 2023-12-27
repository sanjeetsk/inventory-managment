

export default class UserModal{
    constructor(id, name, email, password){
        this.id = id,
        this.name = name,
        this.email= email,
        this.password = password;
    }

    static add(name, email, password){
        const newUser = new UserModal((users.length+1), name, email, password);
        users.push(newUser);
    }

    static isValidUser(email, password){
        const result = users.find((u) => u.email == email && u.password == password)
        console.log("result", result);
        return result;
    }
}

let users=[];