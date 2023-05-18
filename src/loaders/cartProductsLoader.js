import { getShoppingCart } from "../utilities/fakedb";

const cartPorductsLoader = async () =>{
    const loadedProducts = await fetch('products.json')
    const products = await loadedProducts.json();

    // if cart data is in database, you have to use async await 
    const storedCart = getShoppingCart();
    const savedCart = [];


    // console.log(storedCart)
    for(const id in storedCart){
        const addedProduct = products.find(pd=> pd.id === id);
        // console.log(addedProduct)
        if(addedProduct){
            const quantity = storedCart[id];
            addedProduct.quantity = quantity;
            savedCart.push(addedProduct);
        }
    }







    // console.log(products)
    return savedCart;
}

export default cartPorductsLoader;