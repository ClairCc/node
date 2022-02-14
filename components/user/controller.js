const store = require('./store');

const addUser = (name) => {
    if (!name) {
        return Promise.reject('invalid name');
    }
    const user = {
        name,
        date: new Date(),
    };
    return store.add(user);
};

const listUser = async () => {
    const list = await store.listUser();
    return list;
};

module.exports = {
    addUser,
    listUser,
};
