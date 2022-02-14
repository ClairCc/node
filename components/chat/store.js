const Model = require('./model');

const addChat = async (chat) => {
    const myChat = new Model(chat);
    return await myChat.save();
};

const listChats = (userId) => {
    return new Promise((res, rej) => {
        let filter = {};
        if (userId) {
            filter = {
                users: userId,
            };
            let list = Model.find(filter)
                .populate('users')
                .catch((e) => {
                    console.log(e);
                    rej(e);
                });
            res(list);
        }
    });
};

module.exports = {
    listChats,
    addChat,
};
