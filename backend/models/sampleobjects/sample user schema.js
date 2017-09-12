/* User Schema 

// holds two categories of users: customers and vendors
// The vendor version holds the login info for vendors so they get the right location number ignore currentOrder object except for vendorName which is required here
// The customer version holds the login info for customers along with their current order

{
  username: "janie325",
  password: "53somerandom#pasword",
  firstName: "Janie",
  lastName: "Zetta",
  role: "vendor" // either vendor or customer,
  sectionNumber: 523 // for customer, represents their ticket's section number, for vendor, represents the vendors location number,
  currentOrder: {
    vendorName: "The Slice" // or "1871 Grille", // for role:vendor, this field will identify the vendorName for that user, and for role:customer, this will identify the restaurant the customer chose,
    order: [
      {
        name: "hot dog",
        price: 5.25,
        description: optional,
        productImageUrl: optional,
        vendor: {
          vendorName: "The Slice or 1871 Grille",
          id: //backend generated id
        },
        quantityOrdered: 2
      } .. more product objects
    ],

    orderNumber: // random generated number,
    orderTaken: Date object,
    completed: true or false // default: false,
    comments: optional,
    locationNumber: assigned from calling the schema.locationFinder() function on the backend,

  }
}



*/