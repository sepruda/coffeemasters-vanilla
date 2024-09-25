const Store = {
    menu: null,
    cart: []
}

const proxiedStore = new Proxy(Store, {
    set(target, property, value) {
        target[property] = value

        if (property === 'menu') {
            window.dispatchEvent(new Event("app-menu-changed"))
        }

        if (property === 'cart') {
            window.dispatchEvent(new Event("app-cart-changed"))
        }

        return true
    }
})

export default proxiedStore