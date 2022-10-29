'use strict'

const goods = [
    {title: 'Shirt', price: 150},
    {title: 'Socks', price: 50, img: './img/socks.jpg'},
    {title: 'Jacket', price: 350},
    {title: 'Shoes', price: 250},
];

const renderGoodsItem = (item) => {
    const image = item.img ? item.img : './img/default-placeholder.png';
    return `
<div class="col">
    <div class="card text-right bg-light">
        <img class="card-img-top" src="${image}" alt="Card image">
        <div class="card-body">
            <h5 class="card-title">${item.title}</h5>
            <p class="card-text">Price: ${item.price}</p>
            <a href="#" class="btn btn-sm btn-primary">Add to cart</a>
        </div>
    </div>
</div>`;
};

const renderGoodsList = list => {
    document.querySelector('.goods-list').innerHTML =
        list.map(item => renderGoodsItem(item)).join('');
}

renderGoodsList(goods);