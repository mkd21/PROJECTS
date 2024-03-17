document.addEventListener("DOMContentLoaded" , () => {
    const loader = document.getElementById("loader");

    function createAddedProducts(products , quantityObj)
    {
        const parent = document.getElementById("parentDivForProductSection");
        parent.classList.add("productsList" , "container");

        const product = document.createElement("div");
        product.classList.add("product");

        const imageDiv = document.createElement("div");
        const imgTag = document.createElement("img");
        imgTag.src = products.image;
        imgTag.alt = "Product Image";

        imageDiv.classList.add("prod_img_div");
        imgTag.classList.add("image_Tag");


        const productDetails = document.createElement("div");
        const ProductName = document.createElement("p");
        const ProductPrice = document.createElement("p");

        ProductName.textContent = products.title;
        ProductPrice.textContent = products.price;

        productDetails.classList.add("prod_details");
        ProductName.classList.add("Details");
        ProductPrice.classList.add("Details");

        const quantityAndRemoveDiv = document.createElement("div");
        quantityAndRemoveDiv.classList.add("quantityAndRemove");

        const quantity = document.createElement("p");
        quantity.textContent = "Quantity";

        const dropDown = document.createElement("select");
        dropDown.classList.add("form-select");

        for(let i = 1; i <= 10; i++)
        {
            const option = document.createElement("option");
            option.textContent = i;
            option.value = i;

            if(i == quantityObj[products.id])
            {
                console.log(i);
                console.log(quantityObj[products.id]);
                option.selected = quantityObj[products.id];
            }
            dropDown.appendChild(option);
        }

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";

        removeBtn.classList.add("btn", "btn-danger");

        const hrTag = document.createElement("hr");

        // appending image part 
        imageDiv.appendChild(imgTag);
        product.appendChild(imageDiv);

        // product details section appending work 
        productDetails.appendChild(ProductName);
        productDetails.appendChild(ProductPrice);
        product.appendChild(productDetails);


        // appending p tag and remove button tag and select tag
        quantityAndRemoveDiv.appendChild(quantity);
        quantityAndRemoveDiv.appendChild(dropDown);
        quantityAndRemoveDiv.appendChild(removeBtn);
        product.appendChild(quantityAndRemoveDiv);

        // appending hr tag 
        
        // appending product section to the parent 
        parent.appendChild(product);
        parent.appendChild(hrTag);

        loader.style.display = "none";
    }

    async function populateCart()
    {
        let cart = await getCartById(2);
        console.log(cart);

        let productarr = cart.products;

        console.log(productarr);

        let productQuantity = {};

        let productArrFinalInPromiseType = productarr.map( (elements) => {
            productQuantity[elements.productId] = elements.quantity;
            return getProductsById(elements.productId);
        });


        console.log(productQuantity);
        // console.log(productArr);
        console.log(productArrFinalInPromiseType);
        
        let finalArr = await Promise.all(productArrFinalInPromiseType);
        
        console.log(finalArr);


        // finalArr.forEach(element => {
        //     console.log(element.id , element.title , element.price , productQuantity[element.id]);
        // });

        let totalPrice = 0;
        finalArr.forEach(product =>{
            createAddedProducts(product , productQuantity);
            totalPrice += product.price * productQuantity[product.id];
        });
        // console.log(totalPrice);

        const priceDiv = document.getElementById("price");
        const totalPriceDiv = document.getElementById("totalPrice");

        priceDiv.textContent = totalPrice;
        totalPriceDiv.textContent = totalPrice - 10;

    }

    populateCart();
});