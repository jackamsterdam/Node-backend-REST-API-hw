import express, { Request, Response } from 'express'

const coffeeProducts = [
    {id: 1, code: 1, type: 'arbaska', price: 55.33, strength: 3},
    {id: 2, code: 2, type: 'vanilla', price: 40.28, strength: 1},
    {id: 3, code: 3, type: 'espresso', price: 37.13, strength: 5}
]

/* Creating a new express server. */
const server = express()

server.use(express.json())


/* The server.get method is used to define a route that will respond to HTTP GET requests. 
The route is then passed a function that will be executed when the route is requested. 
The function returns the data that will be sent back to the client. */
/* The server.get method is used to create a GET request. 
The first parameter is the route, which is the URL that the request will be sent to. 
The second parameter is the callback function, which is executed when the request is completed. 
The callback function returns the response object, which is the JSON response to the request. */
server.get('/api/coffee-products', (request: Request, response: Response) => {
    response.json(coffeeProducts)
})

//Get one coffee product 
server.get('/api/coffee-products/:id', (request: Request, response: Response) => {
  const id = +request.params.id 
  
  const coffeeProduct = coffeeProducts.find(c => c.id === id)
  response.json(coffeeProduct)
})

server.post('/api/coffee-products', (request: Request, response: Response) => {
    const coffeeProduct = request.body 
    coffeeProduct.id = coffeeProducts[coffeeProducts.length -1].id + 1
    coffeeProducts.push(coffeeProduct)
    response.status(201).json(coffeeProduct)
})

server.put('/api/coffee-products/:id', (request: Request, response: Response) => {
    const id = +request.params.id 
    const coffeeProduct = request.body 
     // Rest Specification - you need to get id from url not from body 
    coffeeProduct.id = id 
    const indexToUpdate = coffeeProducts.findIndex(c => c.id === id)
    coffeeProducts[indexToUpdate] = coffeeProduct
    response.json(coffeeProduct)  
})

server.patch('/api/coffee-products/:id', (request: Request, response: Response) => {
    const id = +request.params.id 
    const partialCoffeeProduct = request.body

   // Rest Specification - you need to get id from url not from body 
    partialCoffeeProduct.id = id
    const dbCoffeeProduct = coffeeProducts.find(c => c.id === id)

    for (const prop in partialCoffeeProduct) {
     dbCoffeeProduct[prop] = partialCoffeeProduct[prop]
    }

    //no need to put it back in array cause its by reference 
    response.json(dbCoffeeProduct)
})
 

server.delete('/api/coffee-products/:id', (request: Request, response: Response) => {
    const id = +request.params.id 
    const indexToDelete = coffeeProducts.findIndex(c => c.id === id)
    console.log("indexToDelete", indexToDelete);
  if (indexToDelete >= 0) {
    coffeeProducts.splice(indexToDelete,1)
  }

    response.sendStatus(204)  
})












/* Creating a server that listens on port 3001 and prints out the message "Listening on port 3001..."
when it is ready. */
server.listen(3001, () => console.log('Listening on port 3001...'))