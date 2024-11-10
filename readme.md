# Customer Server

> Serving APIs for customer and lender recommendations

To see the funnel and the API running, visit the [dev site](https://customer-funnel.fly.dev/)
To see the APIs, visit the [API dev site](https://customer-server.fly.dev/api/v1/lenders)
NOTE: The API above is one of the endpoints.

### Getting started

It's simple as running the following command:

```bash
$ npm install
$ npm start:dev # for development

# [nodemon] starting `ts-node ./src/index.ts`
# Running on port: 3000
```

### Dependencies

express - to run node server.
dotenv - package for managing environment variables.
turso - SQLite for Production.
libsql - a fork of SQLite optimized for low query latency, making it suitable for global applications.
drizzle - orm for the database.
jest - For unit testing.


### API endpoints

Straight forward API endpoints for the customer and lender recommendations. Using a simple CRUD operation.

> [!NOTE]
> Due to the nature of the project and time, the app is only exposing a few endpoints.

| Method | Endpoint                        | Description                                               | Fields needed                            |
|--------|---------------------------------|-----------------------------------------------------------|------------------------------------------|
| GET    | /api/v1/lenders-recommendations | Give a list of recommended lenders' offers                | customer_id, loan_details_id             |
| POST   | /api/v1/lenders-recommendations | Give a list of recommended lenders' offers                | whole customer object from funnel session|
| POST   | /api/v1/customers               | Add a new customer                                        | customer object                          |
| POST   | /api/v1/loan_details            | Update customer information by ID                         | loan_details object & customer_id        |

### Data structure

Here is the diagram representing the data structure of the project.

See the [docs](./docs/db-diagram.png) for more information.
