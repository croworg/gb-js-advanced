const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ProductList {
    constructor(cart, container = '.goods-list') {
        this.cart = cart;
        this.container = container;
        this.goods = [];
        this._getProducts()
            .then(data => {
                this.goods = data;
                this.render();
            });
        this._clickAdd();
    }

    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });
    }

    _clickAdd() {
        document.querySelector(this.container).addEventListener('click', e => {
            if (e.target.classList.contains('buy-btn')) {
                const id = e.target.closest('.product-item').dataset.id;
                const idx = this.goods.findIndex(item => item.id_product === +id);
                this.cart.addItem(+id, this.goods[idx]);
                // this.cart.addItem(e.target.closest('.product-item').dataset.id, 1);
            }
        })
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new ProductItem(product);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }
    }
}

class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }

    render() {
        return `
            <div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="product-descr">
                    <h4>${this.title}</h4>
                    <p>$${this.price}</p>
                </div>
                <button class="buy-btn btn btn-dark">Купить</button>
            </div>
        `;
    }
}

class Cart {
    constructor(container = '.cart-block') {
        this.container = container;
        this.goods = [];
        this._initEvents();
        this._getBasketItem()
            .then(data => {
                this.goods = data.contents;
                this.render();
            });
    }

    _getBasketItem() {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new CartItem();
            block.insertAdjacentHTML('beforeend', productObj.render(product));
        }
    }

    _initEvents() {
        document.querySelector(".cart-button").addEventListener('click', () => {
            document.querySelector(this.container).classList.toggle('invisible');
        });
        document.querySelector(".cart-block").addEventListener('click', e => {
            if (e.target.classList.contains('del-btn')) {
                this.deleteItem(e.target.closest('.cart-item').dataset.id);
            }
        });
    }

    addItem(id, item) {
        const idx = this.goods.findIndex(item => item.id_product === +id);
        const cartItem = new CartItem();

        if (this.goods[idx]?.quantity) {
            this.goods[idx].quantity++;
            cartItem.rerender(this.container, this.goods[idx]);
        } else {
            item.quantity = 1;
            this.goods.push(item);
            document
                .querySelector(this.container)
                .insertAdjacentHTML('beforeend', cartItem.render(item));
        }
    }

    deleteItem(id) {
        const idx = this.goods.findIndex(item => item.id_product === +id);
        const cartItem = new CartItem();

        if (this.goods[idx].quantity >= 2) {
            this.goods[idx].quantity--;
            cartItem.rerender(this.container, this.goods[idx]);
        } else {
            this.goods.splice(idx, 1);
            const remove = el => el.parentElement.removeChild(el);
            const emptyItem = document.querySelector(
                `${this.container} .cart-item[data-id="${id}"]`
            );
            remove(emptyItem);
        }
    }
}

class CartItem {

    render(item, img = 'https://via.placeholder.com/50x50') {
        return `
            <div class="cart-item" data-id="${item.id_product}">
                <div class="product-bio">
                    <img src="${img}" alt="Some image">
                    <div class="product-desc">
                        <p class="product-title">${item.product_name}</p>
                        <p class="product-quantity">Quantity: <span>${item.quantity}</span></p>
                        <p class="product-single-price">$${item.price} each</p>
                    </div>
                </div>
                <div class="right-block">
                    <p class="product-price">$<span>${item.quantity * item.price}</span></p>
                    <button class="del-btn btn btn-sm btn-outline-danger" title="Удалить товар" data-id="${item.id_product}">&times;</button>
                </div>
            </div>
        `;
    }

    rerender(container, item) {
        // this.goods[idx].quantity += +rate;
        const cartItem = document.querySelector(
            `${container} .cart-item[data-id="${item.id_product}"]`
        );
        cartItem.querySelector('.product-quantity > span')
            .innerHTML = item.quantity;
        cartItem.querySelector('.product-price > span')
            .innerHTML = `${item.price * item.quantity}`;
    }
}

const cart = new Cart();
new ProductList(cart);
