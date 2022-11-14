const PRODUCTS = "https://japceibal.github.io/emercado-api/cats_products/";
let productsArray = [];
const ORDER_ASC_BY_PRICE = "Menor Precio";
const ORDER_DESC_BY_PRICE = "Mayor Precio";
const ORDER_BY_RELEVANCE = " Más Relevantes";
let currentSortCriteria = undefined;
let minCost = undefined;
let maxCost = undefined;
let productsURL = "";


productsURL = PRODUCTS + localStorage.getItem("catID") + EXT_TYPE;
getJSONData(productsURL).then(function (resultObj) {
    if (resultObj.status === "ok") {
        productsArray = resultObj.data;
        showProductsList();
        document.getElementById("productsSubtitle").innerHTML = productsArray.catName;
    }
});



document.getElementById("rangeFilterCost").addEventListener("click", function () {
    minCost = document.getElementById("rangeFilterCostMin").value;
    maxCost = document.getElementById("rangeFilterCostMax").value;

    if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0) {
        minCost = parseInt(minCost);
    }
    else {
        minCost = undefined;
    }

    if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0) {
        maxCost = parseInt(maxCost);
    }
    else {
        maxCost = undefined;
    }

    showProductsList();
});


// Limpia los filtros
document.getElementById("clearRangeCostFilter").addEventListener("click", function () {
    document.getElementById("rangeFilterCostMin").value = "";
    document.getElementById("rangeFilterCostMax").value = "";

    minCost = undefined;
    maxCost = undefined;

    showProductsList();
});


function showProductsList() {
    let htmlContentToAppend = "";
    for (let i = 0; i < productsArray.products.length; i++) {
        let products = productsArray.products[i];
        if (((minCost == undefined) || (minCost != undefined && parseInt(products.cost) >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && parseInt(products.cost) <= maxCost))) {

            htmlContentToAppend += `
        <div onclick="setProductsID(${products.id})" class="list-group-item list-group-item-action cursor-active">
            <div class="row">
                <div class="col-3">
                    <img src="${products.image}" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4> ${products.name} - ${products.cost}  ${products.currency} </h4> 
                        <p> ${products.description} </p> 
                        </div>
                        <small class="text-muted">${products.soldCount} artículos</small> 
                    </div>
                </div>
            </div>
        </div>
       `
            document.getElementById("products").innerHTML = htmlContentToAppend;
        }
    }
}

// Evento en botón de ordenar de manera ascendente por precio. 
document.getElementById("sortAscProd").addEventListener("click", function () {
    sortProducts(ORDER_ASC_BY_PRICE, productsArray);
});

// Evento en botón de ordenar de manera descendente por precio. 
document.getElementById("sortDescProd").addEventListener("click", function () {
    sortProducts(ORDER_DESC_BY_PRICE, productsArray);
});

// Evento en botón de ordenar de forma descendente en función a la relevancia
document.getElementById("sortBySales").addEventListener("click", function () {
    sortProducts(ORDER_BY_RELEVANCE, productsArray);
});

// Función para ordenar según el criterio elegido. 
function sortProducts(criteria, array) {
    if (criteria === ORDER_ASC_BY_PRICE) {
        result = (array.products).sort(function (a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_PRICE) {
        result = (array.products).sort(function (a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_RELEVANCE) {
        result = (array.products).sort(function (a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });
    }
    showProductsList();
}


function setProductsID(id) {
    localStorage.setItem("productID", id);
    window.location = "product-info.html"
}

function search(data) {
    let result = productsArray.findIndex((item) => item.name === data);

}