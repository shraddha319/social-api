# Social REST API

## Features

- **Error Handling**: centralized error handling mechanism
- **Authentication and Authorization**: using [JWT](https://jwt.io)
- **NoSQL database**: [MongoDB](https://www.mongodb.com)
- **Object Data Modeling**:using [Mongoose](https://mongoosejs.com)
- **Validation**: using [Joi](https://github.com/sideway/joi)
- **CORS**: Cross-Origin Resource Sharing enabled using [cors](https://github.com/expressjs/cors)
- **Environment Variables**: using [dotenv](https://github.com/motdotla/dotenv)
- **Dependency Management**: using [npm](https://www.npmjs.com)
- **Linting**: using [ESLint](https://eslint.org) and [Prettier](https://prettier.io)

## Quick Start

Get started with the below steps:

1. Clone the repo:

```bash
git clone <repo url>
cd social-api
```

2. Install the dependencies

```bash
npm install
```

3. Set the environment variables

```bash
cp .env.example .env

# modify the environment variables in .env if required
```

## Environment Varibles

The environment variables can be found and modified in the .env file.

## Commands

The following commands can be found under `scripts` in `package.json`.

Run locally:

```bash
npm run dev
```

Run in production:

```bash
npm run start
```

Testing:

```bash
# run all tests
npm run test

# run all tests in watch mode
npm run test:watch

# run test coverage
npm run test:coverage
```

Linting:

```bash
# run ESLint
npm run lint

# fix ESLint errors
npm run lint:fix
```

## API Documentation

### API Endpoints

List of available endpoints:

#### Auth routes:

`POST /auth/login` - login user

#### User routes:

`POST /users` - create user\
`GET /users/:userId` - get user by ID\
`POST /users/:userId` - update user by ID\
`DELETE /users/:userId` - delete user by ID

## License

[MIT](LICENSE)
