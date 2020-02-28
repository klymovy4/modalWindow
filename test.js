function renderCards(options) {
    const row = document.createElement('div')
    row.classList.add('row')
    document.querySelector('.container').append(row)
    options.forEach(card => {
        const $card = `
        <div id=${card.id} class="col my-1">
            <div  class="card" style="width: 18rem;">
                <img class="card-img-top" src=${card.img} alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${card.title}</h5>
      
                    <a href="#" onclick="modal.open(${card.id})" class="btn btn-primary">Посмотреть Цену</a>
                    <a href="#" onclick="removeModal.open(${card.id})" class="btn btn-danger">Удалить</a>
                </div>
            </div>
        </div>
        `
        row.insertAdjacentHTML('beforeend', $card)
    })
}
renderCards(fruits)


function _createRemoveModal() {
    const modal = document.createElement('div')
    modal.classList.add('rmodal')

    modal.insertAdjacentHTML('afterbegin', `
        <div class="modal-overlay" data-close='true'>
            <div id='removeModal' class="modal-window" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                    <h5 class="modal-title"></h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span data-close="true" aria-hidden="true">&times;</span>
                    </button>
                    </div>
                    <img class='modal-img' src="" />
                    <div class="modal-body">
                    <p></p>
                    </div>
                    <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    `)

    document.body.append(modal)
    return modal
}

$.removeModal = function () {
    const $modal = _createRemoveModal()
    let closing = false
    let modalType = 'remove';

    const modal = {
        open(id) {

            onModalOpen(modalType, $modal, id, closing)


        },
        close() {
            closing = true
            $modal.classList.remove('open')
            $modal.classList.add('hide')
            setTimeout(() => {
                $modal.classList.remove('hide')
                closing = false
            }, 200)
        }
    }
    const listener = event => {
        if (event.target.dataset.close)
            modal.close()
    }
    $modal.addEventListener('click', listener)

    return modal
}


function renderModalContent(options, modalType) {
    const modalContent = options.content || `Цена за ${options.title} ${options.price}$`
    const removeContent = "Something"
    if (modalType === 'remove') {
        return removeContent
    } else {
        return modalContent
    }
}

function onModalOpen(modalType, $modal, id, closing, destroyed = false) {
    let options = defaultOptions;
    const img = $modal.querySelector('.modal-img')

    const title = $modal.querySelector('.modal-title')
    const content = $modal.querySelector('.modal-body')
    if (id) {
        options = fruits.find(element => element.id === id) || defaultOptions;
    }
    title.innerHTML = options.title
    img.setAttribute('src', options.img)
    content.innerHTML = renderModalContent(options, modalType)
    // =================================
    if (destroyed) {
        return console.log('modal is destroyed')
    }
    !closing && $modal.classList.add('open')
}



const removeModal = $.removeModal({})