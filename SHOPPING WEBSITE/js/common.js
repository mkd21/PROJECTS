function getQueryParams()
{
    const urlSearchParams = new URLSearchParams(window.location.search);
    const Queryparam = Object.fromEntries(urlSearchParams.entries());

    return Queryparam;
}

async function getProductsById(id)
{
    let res = await axios.get(`https://fakestoreapi.com/products/${id}`);

    return res.data;
}

async function getCartById(id)
{
    let cart = await axios.get(`https://fakestoreapi.com/carts/${id}`);
    return cart.data;
}