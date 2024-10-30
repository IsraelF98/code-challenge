# To run this project

In order to execute this Node.js app, the following steps are necessary:

- Have a MySQL server running. Update the variables in config/database
- Have a Redis server running. Update the variables in config/redis
- Install the dependencies with _npm run install_

## The available endpoints

- POST: localhost:3000/v1/products _(require Product)_
- GET: localhost:3000/v1/products
- GET: localhost:3000/v1/products/:id
- PUT: localhost:3000/v1/products/:id _(require Product)_
- DELETE: localhost:3000/v1/products/:id

### Product

Product is formed by the fields:

- name: string
- price: number
- colorID: number
