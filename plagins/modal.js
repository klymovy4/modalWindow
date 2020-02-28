/* global defaultOptions, fruits, $ */

const getTime = () => {
    const date = new Date()
    return date.toLocaleTimeString()
}
const renderTime = (timeHere) => {
    setInterval(() => {
        timeHere.innerHTML = getTime()
    }, 1000);
}

Element.prototype.appendAfter = function (element) {
    element.parentNode.insertBefore(this, element.nextSibling)
    console.log(element);

}

function noop() { }
function _CreateModalFooter(buttons = []) {
    if (buttons.length === 0) {
        return document.createElement('div')
    }
    const wrap = document.createElement('div')
    wrap.classList.add('modal-footer')

    buttons.forEach(btn => {
        const $btn = document.createElement('button')
        $btn.textContent = btn.text
        $btn.classList.add('btn')
        $btn.classList.add(`btn-${btn.type || 'secondary'}`)
        $btn.onclick = btn.handler || noop

        wrap.appendChild($btn)
    })

    return wrap
}

function _createModal(options) {
    const DEFAULT_WIDTH = '600px'
    const modal = document.createElement('div')
    modal.classList.add('rmodal');
    modal.insertAdjacentHTML('afterbegin', `
        <div class="modal-overlay" data-close='true'>
            <div class="modal-window" style=width:${options.width || DEFAULT_WIDTH}>
                <div class="modal-header">
                    <span class="modal-title">${options.title || 'Window'}</span>
                    ${options.closable ? `<span class="modal-close" data-close='true'>&times;</span>` : ''}
                </div>
                    <div class='modal-time' id='timeHere'></div>
                    <img class="modal-img" src="" />
                <div class="modal-body" data-content></div>
                
            </div>
        </div>
    `)

    const footer = _CreateModalFooter(options.footerButtons)
    console.log(footer);

    footer.appendAfter(modal.querySelector('[data-content]'))

    document.body.append(modal)
    const timeHere = modal.querySelector('#timeHere')
    renderTime(timeHere)
    return modal
}

$.modal = function (options) {
    const ANIMATION_SPEED = 200
    const $modal = _createModal(options)
    let closing = false
    let destroyed = false
    let modalType = 'modal';

    const modal = {
        open(id) {
            // onModalOpen(modalType, $modal, id, closing, destroyed)

            let options = defaultOptions;
            const img = $modal.querySelector('.modal-img')
        
            const title = $modal.querySelector('.modal-title')
            const content = $modal.querySelector('.modal-body')
            if (id) {
                options = fruits.find(element => element.id === id) || defaultOptions;
            }
            title.innerHTML = options.title
            // img.setAttribute('src', options.img)
            // content.innerHTML = renderModalContent(options, modalType)
            // =================================
            if (destroyed) {
                return console.log('modal is destroyed')
            }
            !closing && $modal.classList.add('open')


        },
        close() {
            closing = true
            $modal.classList.remove('open')
            $modal.classList.add('hide')
            setTimeout(() => {
                $modal.classList.remove('hide')
                closing = false
            }, ANIMATION_SPEED)
        },
    }

    const listener = event => {
        if (event.target.dataset.close)
            modal.close()
    }

    $modal.addEventListener('click', listener)

    return Object.assign(modal, {
        destroy() {
            $modal.parentNode.removeChild($modal)
            $modal.removeEventListener('click', listener)
            destroyed = true
        },
        setContent(html) {
            $modal.querySelector('[data-content]').innerHTML = html
        }
    })
}






















