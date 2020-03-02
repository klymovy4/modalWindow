$.confirm = function (options) {
    return new Promise((resolve, reject) => {
        const modal = $.modal({
            title: options.title,
            img: options.img,
            width: '400px',
            closable: false,
            content: options.content,
            onClose() {
                modal.destroy()
            },
            footerButtons: [
                {
                    text: 'Отменить', type: 'secondary', handler() {
                        modal.close()
                        resolve()

                    }
                },
                {
                    text: 'Удалить', type: 'danger', handler() {
                        modal.close()
                        reject()
                    }
                }
            ]
        })
        setTimeout(() => modal.open(), 100)
    })
}