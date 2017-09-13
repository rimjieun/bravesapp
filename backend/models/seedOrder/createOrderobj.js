const faker = require('faker');
const fs = require('fs');

let productArray = () => {

  const arraySize = (Math.floor(Math.random() * 6 )) + 2;
  let productArray = [];
  const names = [`M&M's candy`, `Popcorn`, `Hotdog`, `Hamburger`, `Cheese Pizza Slice`, `Curly Fries`, `Burgerizza`, `Peanuts`, `Breadsicks`];
  const vendors = ['The Slice', '1871 Grille'];
  
  const price = [1.00, 1.25, 1.50, 2.00, 2.25, 2.50, 3.25, 3.50, 4.00, 4.50, 5.00, 5.50, 6.00, 6.50, 7.00, 7.50, 8.00, 9.00, 9.50];


  for (let i=0; i < arraySize; i++) {
    let product = {
      name: names[Math.floor(Math.random() * names.length )],
      price: price[Math.floor(Math.random() * price.length )].toFixed(2),
      vendor: {
        vendorName: vendors[Math.floor(Math.random() * vendors.length )]
      },
      quantityOrdered: Math.floor(Math.random() * 5)
    };

    productArray.push(product);

  }

  return productArray;

};



let order = () => {
  const role = ['vendor, customer'];
  const vendors = ['The Slice', '1871 Grille'];
  
  let orderObj = {
  
    currentOrder: {
      order: productArray(),
      vendorName: vendors[Math.floor(Math.random() * vendors.length )]
    },
    completed: false,
    comments: faker.lorem.paragraph(),
   
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    userName: faker.internet.userName(),
    password: faker.internet.password(),
    role: role[Math.floor(Math.random() * role.length)],
    sectionNumber: Math.floor(Math.random() * 444)

  };
  console.log(JSON.stringify(orderObj, null, 2));
  return orderObj;


  };



const theorder = order();

fs.appendFile('./backend/models/seedOrder/order.js', JSON.stringify(theorder, null, 2), () => {
  console.log('File appended!');
});