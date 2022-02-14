const store = require('./store');

function addMessage(chat, user, message) {
    return new Promise((resolve, reject) => {
        if (!chat || !user || !message) {
            console.error('[messageController] No hay chat usuario o mensaje');
            reject('Los datos son incorrectos');
            return false;
        }

        const fullMessage = {
            chat: chat,
            user: user,
            message: message,
            date: new Date(),
        };

        store.add(fullMessage);

        resolve(fullMessage);
    });
}
const listUsers = (userId) => {
    return store.list(userId);
};

module.exports = {
    addMessage,
    listUsers,
};
