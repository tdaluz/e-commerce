let userID = 25801;
let prodAddObj = {};
let subtotalFinal = 0;
let btnCheckout = document.getElementById("btnCheckout");
let checkSend = document.getElementById("formSend");
let productsCart = [];
let tableCart = document.getElementById("tableCart");
let arrayShippin = {};

//Declaración de constantes para elefir y validar la forma de pago. 
let cardSegurity = document.getElementById("cardSegurity");
let cardNumber = document.getElementById("cardNumber");
let cardExpiration = document.getElementById("cardExpiration");
let bankNumber = document.getElementById("bankNumber");
let paymentCard = document.getElementById('paymentCard');
let paymentBank = document.getElementById('paymentBank');


productsCart = JSON.parse(localStorage.getItem('addCArt'));
productInfoURL = CART_INFO_URL + userID + EXT_TYPE;
getJSONData(productInfoURL).then(function (resultObj) {
  if (resultObj.status === "ok") {
    saleInfoArray = resultObj.data;
    for (let i = 0; i < saleInfoArray.articles.length; i++) {
      prodAddObj = {
        id: saleInfoArray.articles[i].id,
        name: saleInfoArray.articles[i].name,
        count: 1,
        unitCost: saleInfoArray.articles[i].unitCost,
        currency: saleInfoArray.articles[i].currency,
        image: saleInfoArray.articles[i].image,
        finalCost: 0,
      }
    }
    if (!productsCart) {
      productsCart = [];
      productsCart.push(prodAddObj);
      localStorage.setItem('addCArt', JSON.stringify(productsCart));
    }
    else {
      let prod = productsCart.find((item) => item.id === prodAddObj.id);
      if (!prod) {
        productsCart.push(prodAddObj);
        localStorage.setItem('addCArt', JSON.stringify(productsCart));

      }
      localStorage.setItem('addCArt', JSON.stringify(productsCart));
    }
  }
  showCart()

})
selectPayment()


function showCart() {
  let htmlContentToAppend = "";
  for (let i = 0; i < productsCart.length; i++) {
    infoArticlesArray = productsCart[i];
    htmlContentToAppend = `
          <tr>
            <th><img src=${infoArticlesArray.image} width=100px class="img-thumbnail"></th>
            <td class="text-center">${infoArticlesArray.name}</td>
            <td class="text-center">${infoArticlesArray.currency} ${infoArticlesArray.unitCost}</td>
            <td class="form-group col-1">
              <input type="number" min="1" class="amountValue form-control" id="amountValue" name="amountValue" value="${infoArticlesArray.count}"
              onInput="subTotalInput('${infoArticlesArray.currency}', ${infoArticlesArray.unitCost}, ${i})" required>
              <div class="invalid-feedback">
                La cantidad debe ser mayor a cero.
              </div>
            </td>
            <td class="text-center" id="subTotalValue"><b>USD <span class="subTotalTable"></span></b>
            </td>
            <td><button onclick="deleteProd(${infoArticlesArray.id})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
          </svg></button>
            </td>
          </tr>
    `
    document.getElementById("tableBody").innerHTML += htmlContentToAppend;
    subTotal(infoArticlesArray.currency, infoArticlesArray.unitCost, i);
  }
  subTotalFinalFunction();
  costShipping();
}

// Función que llama las funciones de subtotal y de costos de envío cuando exista una modificación en la cantidad de un artículo. Así se calculan nuevamente los costos.  
function subTotalInput(currency, unitCost, i) {
  subTotal(currency, unitCost, i);
  subtotalFinal = 0;
  subTotalFinalFunction();
  costShipping();
}

// Calcula el subtotal de la compra. Sumando todos los elementos del carrito. Además convierte los precios de moneda UYU a USD.  
function subTotal(currency, unitCost, i) {
  let subTotalItem = 0;
  let subTotalTable = document.getElementsByClassName("subTotalTable");
  let amountValue = document.getElementsByClassName("amountValue");
  let countValue = amountValue[i].value;
  productsCart[i].count = countValue;

  if (currency === 'USD') {
    subTotalItem = (countValue * unitCost)
  }
  else {
    subTotalItem = (countValue * (unitCost / 40));
  }
  subTotalTable[i].innerHTML = Math.round(subTotalItem);

  // Al producto que está dentro del carrito le agregué una propiedad que guarda el importe final del producto. Calculado a partir de la cantidad por el precio unitario.
  productsCart[i].finalCost = subTotalItem; 

  localStorage.setItem('addCArt', JSON.stringify(productsCart));


}

// Esta función recorre todo el arreglo y suma los costos finales de los productos que está en el carrito. Con esto calcula el subtotal final del carrito. 
function subTotalFinalFunction() {
  for (let i = 0; i < productsCart.length; i++) {
    let arrayCost = productsCart[i];

    console.log(arrayCost.finalCost)
    subtotalFinal += Math.round(arrayCost.finalCost);

    document.getElementById("subTotalContainer").innerHTML = `USD ${subtotalFinal}`;
    arrayShippin.subtotalFinalObj = subtotalFinal;
  }
}

// Función para calcular costos de envío. 
function costShipping() {
  checkedShipping = document.querySelector('input[name="send"]:checked');
  if (checkedShipping) {
    shippingCostCostResult = Math.round(subtotalFinal * (checkedShipping.value / 100));
    document.getElementById("shippingCostContainer").innerHTML = `USD ${shippingCostCostResult}`;
    
    costTotal = Math.round(subtotalFinal + shippingCostCostResult);
    document.getElementById("totalCostContainer").innerHTML = `USD ${costTotal}`;
    // Estas dos líneas se agregaron para que guarde los valores en un array para mostrar en la pantalla siguiente donde finalizada la compra, de opción a imprimirla. 
    arrayShippin.shippingCostCostResultObj = shippingCostCostResult;
    arrayShippin.valueShippingObj = checkedShipping.value;
  }
  else {
    shippingCostCostResult = 0;
    costTotal = Math.round(subtotalFinal + shippingCostCostResult);
    document.getElementById("shippingCostContainer").innerHTML = `USD ${shippingCostCostResult}`;
    document.getElementById("totalCostContainer").innerHTML = `USD ${costTotal}`;
  }

  arrayShippin.costTotalObj = costTotal;
}


// Función para seleccionar forma de pago. 
function selectPayment() {
  let paymentSelect = document.getElementById("selectPaymentID");
  paymentCard.addEventListener('click', function (e) {
    cardNumber.disabled = false;
    cardSegurity.disabled = false;
    cardExpiration.disabled = false;
    bankNumber.disabled = true;
    paymentSelect.innerHTML = "Tarjeta de crédito"
  });

  paymentBank.addEventListener('click', function (e) {
    cardNumber.disabled = true;
    cardSegurity.disabled = true;
    cardExpiration.disabled = true;
    bankNumber.disabled = false;
    paymentSelect.innerHTML = "Transferencia bancaria"
  });

}

// Función que valida que todos los campos de la compra estén completos. En caso de estar Ok devuelve una alerta de compra finalizada. En caso de faltar algún campo, devuelve una alerta que pide que se verifiquen todos los campos. 
function checkout() {
  let arrayShippin = {}
  let adressName = document.getElementById("adressStreet");
  let adressNumber = document.getElementById("adressNumber");
  let adressCorner = document.getElementById("adressCorner");
  let btnCloseAlert = document.getElementById("btn-close-success-alert")
  arrayShippin.adressCornerObj = adressCorner.value
  arrayShippin.adressNumberObj = adressNumber.value
  arrayShippin.adressNameObj = adressName.value

  validData(adressName);
  validData(adressNumber);
  validData(adressCorner);
  validAmount();
  validSendCheck();
  validPayment()

  if (adressName.classList.contains("is-valid") && adressNumber.classList.contains("is-valid") && adressCorner.classList.contains("is-valid") && tableCart.classList.contains("is-valid") && checkSend.classList.contains("is-valid") && paymentCheck.classList.contains("is-valid")) {

    document.getElementById("alert-success").classList.add("show");
    localStorage.setItem('arrayShippin', JSON.stringify(arrayShippin))
    btnCloseAlert.addEventListener("click", () => {

      window.location = "finalcart.html"
    })

  }
  else {
    document.getElementById("alert-danger").classList.add("show");
  }

}


// Función que valida que los campos no estén vacios. 
function validData(data) {
  if (data.value.length == 0) {
    data.classList.add("is-invalid")
  }
  else {
    data.classList.add("is-valid");
  }

  data.addEventListener("input", () => {
    data.classList.remove("is-valid")
    data.classList.remove("is-invalid")
    validData(data);
  });

}


//Función que valida que las cantidades sean mayor a cero. 
function validAmount() {
  let amountValue = document.getElementsByClassName("amountValue")

  for (let i = 0; i < productsCart.length; i++) {
    let arrayCart = productsCart[i];

    if (arrayCart.count == 0) {
      amountValue[i].classList.add("is-invalid")
      tableCart.classList.add("is-invalid")
      tableCart.classList.remove("is-valid")
    }
    else {
      amountValue[i].classList.add("is-valid");
    }

    amountValue[i].addEventListener("input", () => {
      removeClass(amountValue[i])
      removeClass(tableCart)
      tableCart.classList.add("is-valid")
      validAmount();
    });
  }
}

// Función que valida que se haya elegido un tipo de envío.
function validSendCheck() {
  let checkedShipping = document.querySelector('input[name="send"]:checked');
  if (checkedShipping) {
    checkSend.classList.add("is-valid");
    checkSend.style.color = "green";
  }
  else { checkSend.classList.add("is-invalid"); }
  
  checkSend.addEventListener("change", () => {
    checkSend.classList.remove("is-invalid");
    validSendCheck();
  });
}


// Función que valida que se haya elegido una forma de pago y los campos de esta estén llenos. 
function validPayment() {
  let paymentCheck = document.getElementById("selectPayment");
  let paymentSelect = document.getElementById("paymentCheck")

  if (paymentBank.checked) {
    validData(bankNumber)
  }

  if (paymentCard.checked) {
    validData(cardNumber)
    validData(cardSegurity)
    validData(cardExpiration)
  }

  if (!paymentBank.checked && !paymentCard.checked) {
    invalidClass()
  }
  else {
    if (isvalid()) {
      validClass()
    }
    else {
      invalidClass()
    }
  }

  paymentCheck.addEventListener("input", () => {
    if (isvalid()) {
      validClass()
    }
  })

  paymentSelect.addEventListener("change", () => {
    removeClass(paymentCheck)
    removeClass(cardNumber)
    removeClass(cardExpiration)
    removeClass(cardSegurity)
    removeClass(bankNumber)
    validPayment();
  });
}


// Función que devuelve true cuando los campos del formulario de la forma de pago elegida, están completos. 
function isvalid() {
  return ((cardNumber.classList.contains("is-valid") && cardExpiration.classList.contains("is-valid") && cardSegurity.classList.contains("is-valid")) || bankNumber.classList.contains("is-valid"))
}

// Remueve clase válida e inválida según el parámetro que se le envíe. 
function removeClass(x) {
  x.classList.remove("is-valid")
  x.classList.remove("is-invalid")
}


function validClass() {
  paymentCheck.classList.add("is-valid")
  paymentCheck.classList.remove("is-invalid")
  selectPaymentID.style.color = "green"
  btnCheckModal.style.color = "green"
}

function invalidClass() {
  paymentCheck.classList.remove("is-valid")
  paymentCheck.classList.add("is-invalid")
  selectPaymentID.style.color = "red"
  btnCheckModal.style.color = "red"
}


// Alertas de compra exitosa o con problemas. 
function showAlertSuccess() {
  document.getElementById("alert-success").classList.add("show");
  window.location = "finalcart.html"
}

function showAlertDanger() {
  document.getElementById("alert-danger").classList.add("show");
}


// Función para eliminar artículos del carrito. 
function deleteProd(x) {
  console.log(x)
  let prod = productsCart.findIndex((item) => item.id === x);

  productsCart.splice(prod, 1)
  localStorage.setItem('addCArt', JSON.stringify(productsCart));
  window.location = "cart.html"
}

