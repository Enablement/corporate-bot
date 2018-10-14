const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

function getSuppliers(){
  console.log('Get Suppliers')
  const xhr = new XMLHttpRequest()
  xhr.withCredentials = false;

  xhr.open("GET", "https://services.odata.org/V2/Northwind/Northwind.svc/Suppliers", false)

  xhr.setRequestHeader("Content-Type", "application/json")
  xhr.setRequestHeader("Accept", "application/json")

  console.log('Sending Data')
  xhr.send()
  const data = JSON.parse(xhr.responseText);
  console.log(data.d.results)
  const supplier_list = data.d.results

  const cards = supplier_list.slice(0, 5).map(supplier => ({
    title: `${supplier.CompanyName} ${supplier.FirstName}, ${supplier.LastName}`,
    subtitle: `${supplier.Address}, ${supplier.City}, ${supplier.Country}`,
    imageUrl: '',
    buttons: [
      {title: 'Add to Cart', type: 'postback', value: 'Add to Cart'},
    ],
  }))

  return [{
    type: 'carousel',
    content: cards
  }]
}
module.exports = getSuppliers
