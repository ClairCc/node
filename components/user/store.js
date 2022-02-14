// Store es almacenamiento de datos
const Model = require('./model');

const addUser = (user) => {
    const myUser = new Model(user);
    return myUser.save();
};
const listUser = () => {
    const myUser = Model.find();
    return myUser;
};

module.exports = {
    add: addUser,
    listUser,
};
