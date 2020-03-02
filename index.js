
/* global $ */
// const cityRussia = ['Вяземский', 'Москва', 'Киев', 'Уфа']
// const cityEurope = ['Paris', 'Berlin', 'Milan', 'Brno']

// const russianPopulation = {
//     Вяземский: 2,
//     Москва: 10,
//     Киев: 5,
//     Уфа: 3
// }
// const arr = Object.values({ ...russianPopulation })
// console.log(Math.max(...arr));

// const europePopulation = {
//     Вяземский: 26,
//     Paris: 4,
//     Berlin: 5,
//     Milano: 6,
//     Brno: 9
// }

// const allCitys = [...cityRussia, ...cityEurope]
// const all = cityEurope.concat(cityEurope)
// console.log('newCitys', allCitys);
// console.log('all', all);

// console.log('новый объект', { ...europePopulation, ...russianPopulation });

// Практика
// const numbers = [5, 37, 54, 33, 444, 1]
// console.log(Math.max(5, 37, 54, 33, 444, 1));
// console.log(Math.max(...numbers));
// console.log(Math.max.apply(null, numbers)); // старый способ

// const divs = document.querySelectorAll('div')
// const nodes = [...divs]
// console.log(divs, Array.isArray(divs));
// console.log(nodes, Array.isArray(nodes));


// Rest 

// function sum(a, b, ...rest) {
//     console.log(...rest);

//     return a + b + rest.reduce((a, i) => a + i, 0)
// }
// const num = [1, 2, 3, 4, 5]

// console.log(sum(...num));

// const [a, b, ...other] = num
// console.log(a, b, other);

// const { Paris, Brno, ...adress } = europePopulation

// console.log(Paris, Brno, adress);


// ==============================================

const defaultOptions = {
    title: 'Цена на товар',
    closable: true,
    width: '500px',
    footerButtons: [
        {
            text: 'Okл', type: 'primary', handler() {
                priceModal.close()
            }
        }
    ]
}

// const confirmModal = $.modal({
//     title: 'Уверены?',
//     closable: true,
//     width: '450px',
//     footerButtons: [
//         {
//             text: 'Отменить', type: 'secondary', handler() {
//                 confirmModal.close()
//             }
//         },
//         {
//             text: 'Удалить', type: 'danger', handler() {
//                 confirmModal.close()
//             }
//         }
//     ]
// })

let fruits = [
    { id: 1, title: 'apple', price: 10, img: 'https://picsum.photos/id/4/286/180', text: 'Далеко-далеко за словесными горами.' },
    { id: 2, title: 'Microsoft', price: 20, img: 'https://picsum.photos/id/15/286/180', text: 'Далеко-далеко за словесными горами.' },
    { id: 3, title: 'AliExpress', price: 30, img: 'https://picsum.photos/id/1/286/180', text: 'Далеко-далеко за словесными горами.' },
]


const toHTML = fruit => `
        <div class="card my-1" style="width: 18rem;">
            <img src=${fruit.img} class="card-img-top" alt="${fruit.title}">
            <div class="card-body">
                <h5 class="card-title">${fruit.title}</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" class="btn btn-primary" data-btn="price" data-id=${fruit.id}>Посмотреть цену</a>
                <a href="#" class="btn btn-danger" data-btn="remove" data-id=${fruit.id}>Удалить</a>
            </div>
        </div>
`



function renderCard() {
    const html = fruits.map(toHTML).join('')
    document.querySelector('#fruits').innerHTML = html
}
renderCard()

document.addEventListener('click', event => {
    event.preventDefault()
    const target = event.target.dataset.btn
    const id = +event.target.dataset.id
    const fruit = fruits.find(el => el.id === id)
    if (target === 'price') {
        priceModal.setContent(`
            <img style="width:100px" src=${fruit.img} />
            <p>Цена на<strong> ${fruit.title}</strong> состовляет: <strong>${fruit.price}$</strong> </p>
        `)
        priceModal.open()
    } else if (target === 'remove') {
        $.confirm({
            title: 'Вы уверены?',
            content: `<img style="width:100px" src=${fruit.img} /><p>Вы удаляете  <strong>${fruit.title}</strong></p>
            `
        }).then(() => {
        }).catch(() => {
            fruits = fruits.filter(el => el.id !== id)
            renderCard()
        })

    }
})

const priceModal = $.modal(defaultOptions)



