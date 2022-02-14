const store = require('./store');

function addMessage(chat, user, message, file) {
    return new Promise((res, rej) => {
        if (!user || !message) {
            console.error('[messageController] No hay usuario o mensaje ');
            return rej('Los datos son incorrectos');
        } else {
            console.log(file);
            let fileUrl = '';
            if (file) {
                fileUrl = 'http://localhost:3000/app/uploads/' + file.filename;
            }
            const fullMessage = {
                chat,
                user,
                message,
                date: new Date(),
                fileUrl,
            };
            store.add(fullMessage);
            res(fullMessage);
        }
    });
}

function getMessages(filterUser) {
    return new Promise((res, rej) => {
        res(store.list(filterUser));
    });
}

function updateMessage(id, message) {
    return new Promise(async (res, rej) => {
        console.log(id, message);
        let result;
        if (id && message) {
            result = await store.updateText(id, message);
        } else {
            rej('Invalid Data');
            return false;
        }
        res(result);
    });
}

function deleteMessage(id) {
    return new Promise((res, rej) => {
        if (!id) {
            rej('Parametros o id invalido');
            return false;
        }
        store
            .removeMessage(id)
            .then(res())
            .catch((e) => {
                rej(e);
            });
    });
}

module.exports = {
    addMessage,
    getMessages,
    updateMessage,
    deleteMessage,
};
