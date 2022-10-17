let userID = 25801;
let subTotalValue = "";

document.addEventListener("DOMContentLoaded", e => {
  productInfoURL = CART_INFO_URL + userID + EXT_TYPE;
  getJSONData(productInfoURL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      saleInfoArray = resultObj.data;
      showCart();
      typeSend();
      adressSend();
    }
  });
})

function showCart() {
  let htmlContentToAppend = "";
  for (let i = 0; i < saleInfoArray.articles.length; i++) {
  infoArticlesArray = saleInfoArray.articles[i];
  htmlContentToAppend = `
  <margin
  <div class="container" id = "product-data-container">
  <center><h2>Carrito de compras</h2></center>
  <h5>Artículos a comprar</h5>
  <hr>
  <table class="table table-hover">
    <thead>
      <tr>
        <th class = "text-center" ></th>
        <th class = "text-center">Nombre</th>
        <th  class = "text-center">Costo</th>
        <th  class = "text-center">Cantidad</th>
        <th  class = "text-center">Subtotal</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th><img src=${infoArticlesArray.image} width= 100px class="img-thumbnail"></th>
        <td class = "text-center">${infoArticlesArray.name}</td>
        <td class = "text-center">${infoArticlesArray.currency} ${infoArticlesArray.unitCost}</td>
        <td class="form-group col-1">
          <input type="number" min="1" class="form-control" id="amountValue" value="${infoArticlesArray.count}" onInput="subTotal()">
        </td>
        <td class = "text-center" id="subTotalValue" ><b>${infoArticlesArray.currency} <span id="subTotalSpan"></span></b></td>
      </tr>
    </tbody>
  </table>`
  document.getElementById("table").innerHTML = htmlContentToAppend;
  subTotal ();
}}

function subTotal (){
 let valorCantidad = document.getElementById("amountValue").value;
 let varCost = infoArticlesArray.unitCost;
 let varResult = "";
  varResult = valorCantidad * varCost;
  document.getElementById("subTotalSpan").innerHTML = varResult; 
}

function typeSend(){
  let htmlContentToAppend = "";
  htmlContentToAppend=`
  <h5>Tipos de envío</h5>
  <div class="form-check">
  <input class="form-check-input" type="radio" name="send" id="premiumSend" checked>
  <label class="form-check-label" for="premiumSend">Premium 2 a 5 días (15%)</label>
</div>
<div class="form-check">
  <input class="form-check-input" type="radio" name="send" id="expressSend">
  <label class="form-check-label" for="expressSend">Express de 5 a 8 días (7%)</label>
</div>
<div class="form-check">
  <input class="form-check-input" type="radio" name="send" id="standarSend" >
  <label class="form-check-label" for="expressSend">Standar de 12 a 15 días (5%)</label>
</div>
  `
  document.getElementById("formSend").innerHTML = htmlContentToAppend;
}

function adressSend(){
  let htmlContentToAppend = "";
  htmlContentToAppend=`
  <div class="row">
  <div class="col-6">
  <label for="street">Calle</label>
    <input type="text" class="form-control" aria-label="Street name">
  </div>
  <div class="col"6>
  <label for="number">Número</label>
    <input type="text" class="form-control" aria-label="Number adress">
  </div>
<div class="col-6">
<label for="corner">Esquina</label>
  <input type="text" class="form-control" aria-label="Corner adress">
</div>
</div>
  `
  document.getElementById("adressSend").innerHTML = htmlContentToAppend;
}