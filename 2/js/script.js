"use strict"

class ProductList {
    constructor(container = '.goods-list') {
        this.container = container;
        this.goods = [];
        this.allProducts = [];
        this._fetchProducts();
    }

    _fetchProducts() {
        this.goods = [
            {id: 1, title: 'Shirt', price: 150},
            {id: 2, title: 'Socks', price: 50, img: './img/socks.jpg'},
            {id: 3, title: 'Jacket', price: 350},
            {id: 4, title: 'Shoes', price: 250},
            {id: 5, title: 'Gloves', price: 79},
        ];
    }

    render() {
        const cardsElem = document.querySelector(this.container);
        for (let item of this.goods) {
            const productObj = new ProductItem(item, item.img);
            this.allProducts.push(productObj);
            cardsElem.insertAdjacentHTML('beforeend', productObj.render());
        }
    }

    getSum() {
        let sum = this.allProducts.reduce((acc, item) => acc + item.price, 0);
        console.log(sum);
        alert(sum);
    }
}

class ProductItem {
    constructor(product, img = './img/default-placeholder.png') {
        this.name = product.title;
        this.price = product.price;
        this.id = product.id;
        this.img = img;
    }

    render() {
        return `
            <div class="col">
                <div class="card text-right bg-light">
                    <img class="card-img-top" src="${this.img}" alt="Card image">
                    <div class="card-body">
                        <h5 class="card-title">${this.name}</h5>
                        <p class="card-text">Price: ${this.price}</p>
                        <a href="#" class="btn btn-sm btn-primary">Add to cart</a>
                    </div>
                </div>
            </div>
        `;
    }
}


class Cart {
    addItem() {

    }

    deleteItem() {

    }

    changeItem() {

    }

    render() {

    }
}

const productList = new ProductList();
productList.render();
productList.getSum();