let userID = 25801;



document.addEventListener("DOMContentLoaded", e => {
  infoCart();
})

function infoCart() {
  productInfoURL = CART_INFO_URL + userID + EXT_TYPE;
  getJSONData(productInfoURL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      saleInfoArray = resultObj.data;

      showCart();
    }
  });
}

function showCart() {
  let htmlContentToAppend = "";
  for (let i = 0; i < saleInfoArray.articles.length; i++) {
    let infoArticlesArray = saleInfoArray.articles[i];
    console.log(infoArticlesArray)
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
        <td>${infoArticlesArray.currency} ${infoArticlesArray.unitCost}</td>
        <td class = "text-center">Otto</td>
        <td class = "text-center">@mdo</td>
      </tr>
    </tbody>
  </table>`
  document.getElementById("table").innerHTML = htmlContentToAppend;
}}