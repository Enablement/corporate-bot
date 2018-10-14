const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

function getEmployees(){

  console.log('Get Employees')
  const xhr = new XMLHttpRequest()
  xhr.withCredentials = false;

  xhr.open("GET", "https://services.odata.org/V2/Northwind/Northwind.svc/Employees", false)

  xhr.setRequestHeader("Content-Type", "application/json")
  xhr.setRequestHeader("Accept", "application/json")

  console.log('Sending Data')
  xhr.send()

  const data = JSON.parse(xhr.responseText);
  console.log(data.d.results)
  const employee_list = data.d.results

  const cards = employee_list.slice(0, 5).map(employee => ({
    title: `${employee.TitleOfCourtesy} ${employee.FirstName}, ${employee.LastName}`,
    subtitle: `${employee.Title}`,
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
module.exports = getEmployees
