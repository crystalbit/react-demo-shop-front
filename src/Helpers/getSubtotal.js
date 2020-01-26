export default function getSubtotal(cart) {
    let _subtotal = 0;
    for (let id of Object.keys(cart)) {
        _subtotal = _subtotal + cart[id].price * cart[id].quantity;
    }
    return _subtotal;
}
