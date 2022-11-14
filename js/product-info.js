let prodcutInfoArray = [];
let prodcutCommentArray = [];
let commentArray = [];
let addArray = [];
let btnSend = document.getElementById("btnSend");
let commentArea = document.getElementById("commentArea");
let scoreComment = document.getElementById("scoreComment");
let btnAdd = document.getElementById("buttonAdd");

document.addEventListener("DOMContentLoaded", e => {
    ProductInfoFunction();
    addCommentsFunction();
    CommentFunction();

})
function ProductInfoFunction() {
    productInfoURL = PRODUCT_INFO_URL + localStorage.getItem("productID") + EXT_TYPE;
    getJSONData(productInfoURL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            prodcutInfoArray = resultObj.data;
            showProductInfo();
            imagesIlustrative();
            showRelatedProducts();
        }
    });
}
function CommentFunction() {
    productCommentURL = PRODUCT_INFO_COMMENTS_URL + localStorage.getItem("productID") + EXT_TYPE;
    getJSONData(productCommentURL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            prodcutCommentArray = resultObj.data;
            showComment();
        }
    });
}
function showProductInfo() {
    let htmlContentToAppend = "";
    htmlContentToAppend += `
    <margin 
    <div class="container" id="product-data-container">
        <h2>${prodcutInfoArray.name}</h2>
        <hr>
        <h6><b>Precio</b></h6>
        <p>${prodcutInfoArray.currency} ${prodcutInfoArray.cost}</p>
        <h6><b>Descripción</b></h6>
        <p>${prodcutInfoArray.description} </p>
        <h6><b>Categoría</b></h6>
        <p>${prodcutInfoArray.category} </p>
        <h6><b>Cantidad de vendidos</b></h6>
        <p>${prodcutInfoArray.soldCount} </p>
    </div>
    `
    document.getElementById("product-data-container").innerHTML += htmlContentToAppend;
}
function imagesIlustrative() {
    let htmlContentToAppend = "";
    htmlContentToAppend += `
    <h6><b>Imágenes ilustrativas</b></h6>
    <div class="carousel-item active">
        <img src="${prodcutInfoArray.images[0]}" class="d-block w-100">
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
    </button>
    `
    for (let i = 1; i < prodcutInfoArray.images.length; i++) {
        let productImagesData = prodcutInfoArray.images[i];
        htmlContentToAppend += ` <div class="carousel-item">
            <img src="${productImagesData}" class="d-block w-100">
            </div>
            `
    }
    document.getElementById("carouselImages").innerHTML += htmlContentToAppend;
}

function showComment() {
    let htmlContentToAppend = "";
    htmlContentToAppend += `
    <h4>Comentarios</h4>
    <div class="list-group-item list-group-item-action" id="listComment">
        <div class="d-flex w-100 justify-content-between">
            <div class="mb-1">
            `
    for (let i = 0; i < prodcutCommentArray.length; i++) {
        let productData = prodcutCommentArray[i];
        htmlContentToAppend += `
                    <p><b>${productData.user}</b> ${productData.description}</p>
                    <p>${productData.dateTime} `
        for (let x = 0; x < productData.score; x++) {
            htmlContentToAppend += `<span class="fa fa-star score"></span>`
        }
        for (let x = 0; x < (5 - productData.score); x++) {
            htmlContentToAppend += `<span class="fa fa-star "></span>`
        }
        `</p>`
    } `

        </div>
        </div>
        </div>
        `
    document.getElementById("product-comment-container").innerHTML += htmlContentToAppend;
}
function cleanForm() {
    // Función para limpiar el formulario y dejar el arreglo vacío para volver a comentar. 
    commentArea.value = "";
    scoreComment.value = "1";
    commentArray = [];
}
function dateComment() {
    //Función que devuelve la fecha y hora con formato YYYY-MM-DD HH:mm:ss
    var hoy = new Date();
    var date = hoy.getFullYear() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getDate() + " " + hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();
    return date
}
function addCommentsFunction() {
    btnSend.addEventListener("click", e => {
        commentArray.push(localStorage.getItem("user"), commentArea.value, scoreComment.value, dateComment());
        [userValue, commentValue, scoreValue, dateValue] = commentArray;
        let htmlContentToAppend = ""
        htmlContentToAppend += `
        <p><b>${userValue}</b> ${commentValue}
        <p>
        <p>${dateValue} `
        for (let x = 0; x < scoreValue; x++) {
            htmlContentToAppend += `<span class="fa fa-star score"></span>`
        }
        for (let x = 0; x < (5 - scoreValue); x++) {
            htmlContentToAppend += `<span class="fa fa-star "></span>`
        } `
        </p>
        </div>
        </div>
       `
        document.getElementById("listComment").innerHTML += htmlContentToAppend;
        cleanForm();
    })
}
function showRelatedProducts() {
    let productsRelated = prodcutInfoArray.relatedProducts;
    let htmlContentToAppend = "";
    htmlContentToAppend += `
        <margin
        <div class="container">
        <h4>Productos Relacionados:</h4>
        <div class="row">
        <div class="col-md-5">
        <table>
        `
    for (let i = 0; i < productsRelated.length; i++) {
        let productImagesData = productsRelated[i];
        htmlContentToAppend += `
            <td>
            <div class="card mb-4 shadow-sm custom-card cursor-active" onclick="setRelatedID(${productImagesData.id})">
            <div class="img-thumbnail">
            <img src="${productImagesData.image}" height="150px">
            <figcaption class="figure-caption">${productImagesData.name}</figcaption>
            </div>
            </div>
            </td>
        `}
    `
        </table>
        </div>
        </div>
        `
    document.getElementById("related-products-container").innerHTML = htmlContentToAppend;
}
function setRelatedID(id) {
    localStorage.setItem("productID", id);
    window.location = "product-info.html"
}

function addCart() {
    addArray = JSON.parse(localStorage.getItem('addCArt'));
    prodAddObj = {
        id: prodcutInfoArray.id,
        name: prodcutInfoArray.name,
        count: 1,
        unitCost: prodcutInfoArray.cost,
        currency: prodcutInfoArray.currency,
        image: prodcutInfoArray.images[0],
        finalCost: 0,
    }
    if (!addArray) {
        addArray = [];
        addArray.push(prodAddObj);
    }
    else {
        let prod = addArray.find((item) => item.id === prodcutInfoArray.id);
        if (prod) {
            prod.count++
        }
        else {
            addArray.push(prodAddObj);
        }
    }
    localStorage.setItem('addCArt', JSON.stringify(addArray));
    window.location = "cart.html"

}
