document.addEventListener("DOMContentLoaded" , async () => {

    async function populateProductDetails()
    {
        let prodIdObj = getQueryParams();  // this is object
        console.log(prodIdObj);
        
        if(prodIdObj['id'])
        {
            let prodBasedOnId = await getProductsById(prodIdObj.id);
            console.log(prodBasedOnId);

            // for loader ---> after downloading the content it will disappear
            let loader = document.getElementById("loader");
            loader.style.display = "none";
           
            let actualImg = document.getElementById("img_tag");
            let prodName = document.getElementById("prod_name");
            let prodPrice = document.getElementById("prod_price");
            let prod_description_para = document.getElementById("prod_desc");

            
            actualImg.src = prodBasedOnId.image;
            actualImg.alt = "product image";

            prodName.textContent = prodBasedOnId.title;
            prodPrice.textContent = `$ ${prodBasedOnId.price}`;

            prod_description_para.textContent = prodBasedOnId.description;
        }
    }

    populateProductDetails();
});