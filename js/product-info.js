let prodcutInfoArray = [];
let prodcutCommentArray = [];
let commentArray = [];
let btnSend = document.getElementById("btnSend");
let commentArea = document.getElementById("commentArea");
let scoreComment = document.getElementById("scoreComment");


document.addEventListener("DOMContentLoaded", e => {
    document.getElementById("showEmail").innerHTML = localStorage.getItem("user");
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

        }
    });
}
function CommentFunction() {
    productCommentURL = PRODUCT_INFO_COMMENTS_URL + localStorage.getItem("productID") + EXT_TYPE;
    getJSONData(productCommentURL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            prodcutCommentArray = resultObj.data;
            showComment();

        }});
}
function showProductInfo() {
    let htmlContentToAppend = "";
    htmlContentToAppend += `
        <margin
        <div class="container" id = "product-data-container">
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
        <h6><b>Imágenes ilustrativas</b></h6>
        <div class="row">
        <div class="col-50">
        `
    for (let i = 0; i < prodcutInfoArray.images.length; i++) {
        let productImagesData = prodcutInfoArray.images[i];
        htmlContentToAppend += `
        <img src="` + productImagesData + `" alt="product images" class="img-thumbnail" width="400" height="400">
    `}
    `</div>
    </div>
    `
    document.getElementById("product-data-container").innerHTML = htmlContentToAppend;
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
        <p><b>${productData.user}</b> ${productData.description}<p>
        <p>${productData.dateTime} `
        for (let x = 0; x < productData.score ; x++) {
        htmlContentToAppend += `<span class="fa fa-star score"></span>`
        }       
        for (let x = 0; x < (5 - productData.score); x++) {
        htmlContentToAppend += `<span class="fa fa-star "></span>`
        } 
        }
        `</p>
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
                    <p><b>${userValue}</b> ${commentValue}<p>
                    <p>${dateValue} `
                    for (let x = 0; x < scoreValue ; x++) {
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

