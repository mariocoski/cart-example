# Cart

WARNING: full API is not ready yet

The only hardcoded (entities created by migrations) is endpoint available to call (where 1 is a cartId /api/v1/checkouts/:cartId):

```sh
PUT http://localhost:3333:/api/v1/checkouts/1
```

It returns:

```json
{
  "id": 1,
  "cartId": 1,
  "tax": {
    "raw": 9.37,
    "formatted": "9.37",
    "formattedWithSymbol": "$9.37",
    "formattedWithCode": "9.37 USD"
  },
  "currency": {
    "code": "USD",
    "symbol": "$"
  },
  "products": [
    {
      "id": 1,
      "name": "Apple",
      "price": "10.99",
      "quantity": 2
    },
    {
      "id": 3,
      "name": "Strawberry",
      "price": "19.99",
      "quantity": 1
    },
    {
      "id": 4,
      "name": "Pineapple",
      "price": "24.99",
      "quantity": 1
    }
  ],
  "subtotal": {
    "raw": 66.96,
    "formatted": "66.96",
    "formattedWithSymbol": "$66.96",
    "formattedWithCode": "66.96 USD"
  },
  "subtotalAfterTax": {
    "raw": 76.33,
    "formatted": "76.33",
    "formattedWithSymbol": "$76.33",
    "formattedWithCode": "76.33 USD"
  },
  "discounts": [
    {
      "productId": 3,
      "value": {
        "raw": 9.99,
        "formatted": "9.99",
        "formattedWithSymbol": "$9.99",
        "formattedWithCode": "9.99 USD"
      }
    },
    {
      "productId": 4,
      "value": {
        "raw": 2.5,
        "formatted": "2.50",
        "formattedWithSymbol": "$2.50",
        "formattedWithCode": "2.50 USD"
      }
    }
  ],
  "total": {
    "raw": 63.84,
    "formatted": "63.84",
    "formattedWithSymbol": "$63.84",
    "formattedWithCode": "63.84 USD"
  }
}
```

## Postman collection is available in root directory:

Import "Cart API.postman_collection.json" into a postman.
You can also visit: `apps/api/src/presenter/functions/createCheckout.spec.ts` to see the request in integration test.

All data has been inserted into DB via seed:
`apps/api/src/database/migrations/1634071953686-initial_db_seed.ts`

API uses [rules engine](https://github.com/cachecontrol/json-rules-engine)
And rules can be stored in db and are dynamically loaded i.e.

```js
await queryRunner.query(`
        INSERT INTO product_discounts 
             (id, title, description, product_id, rule, discount) 
        VALUES 
            (1, '10% off Pineapple', 'Pineapple is on 10% off', 4, '{"any":[{"all":[{"fact":"id","operator":"equal","value":4}]}]}', 0.1),
            (2, '50% off Strawberry', 'Buy two Apple and get a Strawberry half its price', 3, '{"any":[{"all":[{"fact":"quantity","operator":"greaterThanInclusive","value":2},{"fact":"id","operator":"equal","value":1}]},{"all":[{"fact":"id","operator":"equal","value":3}]}]}', 0.5)
    `);
```

Which translates to:

1. Pinapple (productId = 4) is 10% off (0.1 \* originalPrice) when exists in the basket
2. Strawberry (productId = 3) is 50% off (0.5 \* originalPrice) when exists in the basket AND Apple (productId = 1) exists in the basket and it's quantity is greater or equal 2

TODO: missing APIs

```js
// POST     /carts <- create new cart
// GET      /carts/:cartId <- get cart by id
// DELETE   /carts/:cartId <- delete cart by id
// POST     /carts/:cartId/products <- add product to the cart
// DELETE   /carts/:cartId/products <- empty cart
// PATCH    /carts/:cartId/products/:productId <- update quantity of a product in cart
// DELETE   /carts/:cartId/products/:productId <- remove product from the cart
```

## Prerequesites

1. Make sure you have docker and docker-compose installed on your machine, install all dependencies and build API:

```sh
docker -v
docker-compose -v

# install dependencies
npm install --legacy-peer-deps

# build
npm run build:api


# copy .env.example to .env file used by api and database
cp .env.example .env
```

## Running the app

0. Build the app

```sh
docker-compose build
```

1. Run api and db with docker-compose

```sh
docker-compose up -d
```

2. Migrate database

```sh
docker-compose exec api npm run migrate:up
```

3. Run a single endpoint available i.e. in postman

```sh
PUT http://localhost:3333/api/v1/checkouts/1
```

## Stopping the app

2. Stop api and db with docker-compose

```sh
docker-compose down
```

## Testing the app (integration tests)

1. Make sure you run all of the steps from `Prerequesites` section:

```sh
npm run test:api
```
