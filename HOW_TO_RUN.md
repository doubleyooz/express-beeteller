<div align="center">
<h1>beeteller: backend</h1>

</div>

## BeforeHand
This application is meant to run on linux and it's using mongodb, make sure to create an account and set a cluster here https://www.mongodb.com/cloud/atlas/register

## Installation

Please make a copy of the `.env.example` following the instructions in it and set the name as `.env.dev` and other copy as `.env.dev`. Example:

```
# .env.dev and #.env.test

PORT=9999
DB_CONNECTION=mmongodb+srv://<user>:<password>@cluster0.oa5fk.mongodb.net/beeteller?retryWrites=true&w=majority
HASH_SALT=452
...
```
`.env.test` needs the variable `TEST_EMAIL` to be set in order to run the tests
```
# .env.test
...
TEST_EMAIL=test3@gmail.com
```


After that, install the project dependencies

```bash
$ yarn install
```

## Running the application

### development
```
$ yarn start:dev
```

### production
```
$ yarn build
$ yarn start:prod
```

## Running tests

```bash
# all tests
$ yarn test

# e2e tests
$ yarn test:e2e

# unit tests
$ yarn test:unit

```
