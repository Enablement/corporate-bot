const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

function getProducts(){
  console.log('Get Products')
  const xhr = new XMLHttpRequest()
  xhr.withCredentials = false;

  xhr.open("GET", "https://services.odata.org/V2/Northwind/Northwind.svc/Products", false)

  xhr.setRequestHeader("Content-Type", "application/json")
  xhr.setRequestHeader("Accept", "application/json")

  console.log('Sending Data')
  xhr.send()
  const data = JSON.parse(xhr.responseText);
  console.log(data.d.results)
  const product_list = data.d.results

  const cards = product_list.slice(0, 5).map(product => ({
    title: `${product.ProductName}`,
    subtitle: `$${product.UnitPrice}`,
    imageUrl: 'http://www.fromthetree.co.uk/wpimages/wp3528cd8a_06.png',
    buttons: [
      {title: '세부내역 조회', type: 'postback', value: '세부내역 조회'},
    ],
  }))

  return [{
    type: 'carousel',
    content: cards
  }]
}
module.exports = getProducts
