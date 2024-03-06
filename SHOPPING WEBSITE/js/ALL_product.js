// console.log("js is connected..");

document.addEventListener("DOMContentLoaded" , () => {

    // function to call the api 

    async function getAPI()
    {
        let products = await axios.get("https://fakestoreapi.com/products");

        return products.data;
    }


    async function populateCards()
    {
        let response = await getAPI();
        console.log(response);

        const parentDiv = document.getElementById("prod_img_card_parent");

        response.forEach(product =>{

            const anchor = document.createElement("a");
            anchor.href = "productDetails.html";
            anchor.target = "_blank";

            const imageDIv = document.createElement("div");
            const ProductNameDiv = document.createElement("div");
            const priceDiv = document.createElement("div");

            const imgTag = document.createElement("img");
            imgTag.src = product.image;

            if(product.title.length > 14)
            {
                let newtitle = product.title.substring(0 , 10);

                ProductNameDiv.textContent = newtitle + "....";
                // console.log(newtitle);
            }
            else 
            {
                ProductNameDiv.textContent = product.title;
            }

            priceDiv.textContent = `&#8377; ${product.price}`;


            // adding classes 
            anchor.classList.add("prod_card");
            imageDIv.classList.add("image_holder");
            ProductNameDiv.classList.add("someProd");
            priceDiv.classList.add("price");

            // appending the divs 

            imageDIv.appendChild(imgTag);
            // anchor.appendChild(imageDIv);
            // anchor.appendChild(ProductNameDiv);
            // anchor.appendChild(priceDiv);

            anchor.appendChild(imageDIv)
            anchor.appendChild(ProductNameDiv);
            anchor.appendChild(priceDiv);

            // appending on the parent node 
            parentDiv.appendChild(anchor);

        });
    }

    populateCards();
});