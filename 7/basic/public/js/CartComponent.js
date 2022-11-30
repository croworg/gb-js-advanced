Vue.component('cart', {
    data() {
        return {
            cartItems: [],
            imgCart: 'https://via.placeholder.com/70',
            showCart: false
        }
    },
    mounted() {
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let item of data.contents) {
                    item.imgPath = `img/catalog/${item.id_product}s.jpg`;
                    this.$data.cartItems.push(item);
                }
            });
    },
    methods: {
        addProduct(item) {
            let find = this.cartItems.find(el => +el.id_product === +item.id_product);
            if (find) {
                this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: 1})
                    .then(data => {
                        if (data.result === 1) {
                            find.quantity++
                        }
                    })
            } else {
                const tempItem = {...item, imgPath: `img/catalog/${item.id_product}s.jpg`, quantity: 1};
                console.log(tempItem);
                this.$parent.postJson(`/api/cart`, tempItem)
                    .then(data => {
                        if (data.result === 1) {
                        }
                    });
                this.cartItems.push(tempItem);
            }
        },
        // remove(item) {
        //     this.$parent.getJson(`${API}/addToBasket.json`)
        //         .then(data => {
        //             if (data.result === 1) {
        //                 this.cartItems.splice(this.cartItems.indexOf(item), 1);
        //             }
        //         })
        // },
        subtract(item) {
            this.$parent.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        if (item.quantity > 1) {
                            item.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        }
                    }
                })
        },
        remove(item) {
            if (item.quantity > 1) {
                this.$parent.putJson(`/api/cart/${item.id_product}`, {quantity: -1})
                    .then(data => {
                        if (data.result) {
                            item.quantity--;
                        }
                    })
            } else {
                this.$parent.delJson(`/api/cart/${item.id_product}`, item)
                    .then(data => {
                        if (data.result) {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        } else {
                            console.log('error');
                        }
                    })
            }
        },
    },
    template: `
      <div>
      <button class="btn-cart" type="button" @click="showCart = !showCart">Корзина</button>
      <div class="cart-block" v-show="showCart">
        <div class="cart-empty" v-show="!cartItems.length">Cart is empty</div>
        <cart-item v-for="item of cartItems"
                   :key="item.id_product"
                   :img="item.imgPath"
                   :cart-item="item"
                   @remove="remove"
                   @subtract="subtract"
                   @add="addProduct">
        </cart-item>
      </div>
      </div>
    `
});

Vue.component('cart-item', {
    props: ['img', 'cartItem'],
    template: `
      <div class="cart-item">
      <div class="product-bio">
        <img :src="img" alt="Some img">
        <div class="product-desc">
          <div class="product-title">{{ cartItem.product_name }}</div>
          <button class="btn del-btn" @click="$emit('remove', cartItem)">&minus;</button>
          <div class="product-quantity"> {{ cartItem.quantity }}</div>
          <button class="btn" @click="$emit('add', cartItem)">&plus;</button>
          <div class="product-single-price">{{ '$' + cartItem.price }} each</div>
        </div>
      </div>
      <div class="right-block">
        <div class="product-price">{{ '$' + (cartItem.quantity * cartItem.price).toFixed(2) }}</div>
      </div>
      </div>
    `
})