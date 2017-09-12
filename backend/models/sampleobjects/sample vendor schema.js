/* Vendor Schema 

{
  imgURL: "",
  vendorName: "",
  foodCategory: "",
  menu: [
    {
      name: "",
      price: "",
      description: "",
      productImageUrl: "",
      vendor:{
        vendorName:"",
        id: "93234098adk324jdas"
      },
      quantityOrdered: 0 // used primarily for tracking orders not in menu
    }, ..... more product objects
  ],
  locations: [
    {
      locationOrders: [
        {
          order: [
            {
              name: "",
              price: "",
              description: "",
              productImageUrl: "",
              vendor:{
                vendorName:"",
                id: "93234098adk324jdas"
              },
              quantityOrdered: 0 // used primarily for tracking orders not in menu
            }, ..... more product objects
          ],
          
          completed: true or false // used to notify the customer that their order is completed,

          comments: // optional, 

          customer: {
            firstName: "Melissa",
            lastName: "Roberts",
            userName: "Roberts523"
          },

          orderNumber: "125238dak342d",
          orderTaken: // date object default is Date(),
          total: 24.25 
        } ... more orders for this location
      ],

      locationNumber: 323 // number corresponding to matching location in stadium,

      completedOrders: [
        {
      name: "Hot dog",
      price: 5.25,
      description: "some random description",
      productImageUrl: "http://www.hotdog.com",
      vendor:{
        vendorName:"",
        id: "93234098adk324jdas"
      },
      quantityOrdered: 3 
        }, ..... more product objects/ completed orders
      ]
    }, ...more locations

  ]

}


*/