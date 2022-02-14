const Model = require('./model');

function addMessage(message) {
    const myMessage = new Model(message);
    myMessage.save();
}

function getMessages(filterUser, filterMessage) {
    return new Promise((res, rej) => {
        let filter = {};
        if (filterUser !== null) {
            filter = { user: filterUser };
        }
        const messages = Model.find(filter)
            .populate('user')
            .catch((e) => {
                rej(e);
            });
        res(messages);
    });
}

async function updateText(id, message) {
    const messageFound = await Model.findOne({
        _id: id,
    });
    messageFound.message = message;
    const newMessage = await messageFound.save();
    return newMessage;
}

function removeMessage(id) {
    return Model.deleteOne({
        _id: id,
    });
}

module.exports = {
    add: addMessage,
    list: getMessages,
    updateText,
    removeMessage,
};
