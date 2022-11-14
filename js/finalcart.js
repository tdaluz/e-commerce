let btnSharp = document.getElementById("btnSharp")
document.addEventListener("DOMContentLoaded", () => {
    cartShow = JSON.parse(localStorage.getItem('addCArt'));
    cartShipping = JSON.parse(localStorage.getItem('arrayShippin'));
    let htmlContentToAppend = "";
    let valueShippin = "";
    for (let i = 0; i < cartShow.length; i++) {
        productsShipping = cartShow[i];
        htmlContentToAppend = `
            <tr>
              <th><img src=${productsShipping.image} width=100px class="img-thumbnail"></th>
              <td class="text-center">${productsShipping.name}</td>
              <td class="text-center">${productsShipping.currency} ${productsShipping.unitCost}</td>
              <td class="text-center"> ${productsShipping.count}</td>
              <td class="text-center" id="subTotalValue"><b>USD ${productsShipping.finalCost}</b>
            </tr>
      `
        document.getElementById("tableBodyShippin").innerHTML += htmlContentToAppend;
    }

    if (cartShipping.valueShippingObj == 15) {
        valueShippin = ` Premium 2 a 5 días (15%)`
    } else if (cartShipping.valueShippingObj == 7) {
        valueShippin = `Express de 5 a 8 días (7%)`
    } else if (cartShipping.valueShippingObj == 5) {
        valueShippin = `Standar de 12 a 15 días (5%)`
    }
    document.getElementById("typeSendShipping").innerHTML = valueShippin;
    console.log(cartShipping.adressCornerObj)
    document.getElementById("adressStreetShipping").innerHTML = cartShipping.adressNameObj;
    document.getElementById("adressNumberShipping").innerHTML = cartShipping.adressNumberObj;
    document.getElementById("adressCornerShipping").innerHTML = cartShipping.adressCornerObj;
})

btnSharp.addEventListener("click", () => {
    if (window.print) {
        window.print();
    }
    localStorage.removeItem('addCArt');
    localStorage.removeItem('arrayShippin');
    window.location = "init.html"
})

