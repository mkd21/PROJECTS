// console.log("js is connected..");

document.addEventListener("DOMContentLoaded" , async  () => {

    // function to call the api 

    async function getAPI()
    {
        let products = await axios.get("https://fakestoreapi.com/products");

        return products.data;
    }

    let productListOneTime =  await getAPI();
    
    // will help when user wants to apply filter inside a particular section of product
    let signalForFilter = false;
    let customArr = [];
    // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

    async function categoryBasedFetch(category)
    {   
        let res = await axios.get(`https://fakestoreapi.com/products/category/${category}`);
        signalForFilter = true;
        return res.data;
    }
    
    // for sidebar category 
    async function getCategories()    // calling the API
    {
        let res = await axios.get("https://fakestoreapi.com/products/categories");

        return res.data;
    }


    async function populateCards(flag , productList)
    {

        let response = productList;

        // coming form common.js
        let QueryparamObj = getQueryParams();

        if(flag == true)       // true means the filter is not selected by the user
        {

            if(QueryparamObj['category'])
            {
                response = await categoryBasedFetch(QueryparamObj['category']);
                
                // this part is for filter functionality on specific product section 
                for( let i in response)
                {
                    customArr.push(response[i]);
                }
                // console.log(customArr);
            }
            else 
            {
                response = productListOneTime;
            }
        }
       
        const parentDiv = document.getElementById("prod_img_card_parent");

        response.forEach(product =>{

            const anchor = document.createElement("a");
            anchor.href = `productDetails.html?id=${product.id}`;
            anchor.target = "_blank";

            const imageDIv = document.createElement("div");
            const ProductNameDiv = document.createElement("div");
            const priceDiv = document.createElement("div");

            const imgTag = document.createElement("img");
            imgTag.src = product.image;

            // if size of product name will be greater than 14 then ... will be added after 10 characters 
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

            priceDiv.textContent = `$${product.price}`;


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

    async function populateSideBar()      // Downloading the contents of API
    {
        let response = await getCategories();

        const sidebar = document.getElementById("sideBarParent");

        response.forEach( (categories) => {
            let anchor = document.createElement("a");
            anchor.textContent = categories;
            anchor.href = `All_product.html?category=${categories}`;

            sidebar.appendChild(anchor);
            sidebar.classList.add("categoryList" , "d-flex" ,  "flex-column");
        });
    }


    async function combined()
    {
        Promise.all([populateCards(true) , populateSideBar()])
        .then( () => {
            let loader = document.getElementById("loader");
            loader.style.display = "none";
        });
    }

    combined();

    // TO SET THE FILTER 

    let searchBtn = document.getElementById("search");

    searchBtn.addEventListener("click" , () => {
        
        let minValue = Number(document.getElementById("minValue").value);  // return type will be string so converted into NUMBER
        let maxValue = Number(document.getElementById("maxValue").value);  // return type will be string so converted into NUMBER

        // let products = await getAPI();
        
        let products = productListOneTime;

        if(signalForFilter == true)
        {
            products = customArr;
            console.log(products);
        }

        let filteredProducts = products.filter( (productsElement) => {
           
            if(productsElement.price >= minValue &&  productsElement.price <= maxValue)
            {
                return productsElement;
            }
        });

        // console.log(filteredProducts);
        let parentCardHolder = document.getElementById("prod_img_card_parent");
        parentCardHolder.innerHTML = "";
        populateCards(false , filteredProducts);
    });



    
    // CLEAR FILTER BUTTON

    let resetBtn = document.getElementById("reset");

    resetBtn.addEventListener("click" , () => {

        // let minVAlueSection = document.getElementById("minValue");
        // let maxVAlueSection = document.getElementById("maxValue");

        // minVAlueSection.selectedIndex = 0;
        // maxVAlueSection.selectedIndex = 0;

        
        // this is method 2 to reset the buttons
        location.reload();
    });
      



  

    


});