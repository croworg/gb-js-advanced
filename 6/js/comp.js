Vue.component('error', {
    template: `
      <p class="error"><b>Ошибка при обработке запроса:</b> {{ $root.errorText }}</p>`
});

Vue.component('item-list', {
    props:[],
    template: `
      <div class="products" v-if="$root.filtered">
        <item v-for="item of $root.filtered" :item="item" :key="item.id_product"></item>
      </div>`
});

Vue.component('item', {
    props:['item'],
    template: `
      <div class="product-item">
        <img v-if="item.img" :src="item.img" alt="Item image">
        <img v-else :src="$root.imgCatalog" alt="No image">
        <div class="desc">
          <h3>{{item.product_name}}</h3>
          <p>{{item.price}} $</p>
          <button class="buy-btn" @click="$root.addItem(item)">Купить</button>
        </div>
      </div>
    `
});

Vue.component('search', {
    props:[],
    data() {
        return {

        }
    },
    template: `
      <form action="#" class="search-form" @submit.prevent="$root.filter">
        <label>
          <input type="text" class="search-field" v-model="$root.userSearch">
        </label>
        <button class="btn-search" type="submit">
          <i class="fas fa-search"></i>
        </button>
      </form>
    `
});

Vue.component('cart', {
    props:[],
    data() {
        return {

        }
    },
    template: `
      <div class="cart-block" v-if="$root.showCart">
      <p class="empty-cart" v-if="!$root.cartItems.length">Корзина пуста</p>
      <div class="cart-item" v-for="item in $root.cartItems">
        <img v-if="item.img" :src="item.img" alt="Some image">
        <img v-else :src="$root.defaultImgCart" alt="Some image">
        <div class="product-desc">
          <p class="product-title">{{ item.product_name }}</p>
          <p class="product-quantity">Quantity: {{ item.quantity }}</p>
          <p class="product-single-price">$\{{ item.price }} each</p>
        </div>
        <div class="right-block">
          <p class="product-price">$\{{ item.quantity * item.price }}</p>
          <button class="del-btn" @click="$root.removeCartItem(item.id_product)">&times;</button>
        </div>
      </div>
      </div>
    `
});