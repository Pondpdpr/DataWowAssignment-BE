# DataWowAssignment-FE

This is a [NestJS](https://docs.nestjs.com/) project that was created for Prach Boonud's Data Wow assignment. This project uses docker to run both the NestJS project and the Postgres database.

## Running the application
Inside the project directory run:

```bash
$ docker-compose up -d
```

The backend application is then exposed to [http://localhost:3001](http://localhost:3001) and automatically connects to the Postgres database.

## Run Unit Test
Inside the project directory run:

```bash
$ npm run test
```
## Included packages:
### TypemORM [[doc](https://typeorm.io/)]
  This is an ORM that is used to connect to the project's Postgres database.
### Passport [[doc](https://docs.nestjs.com/recipes/passport)], express-session [doc](https://docs.nestjs.com/techniques/session), and jsonwebtoken [doc](https://www.npmjs.com/package/jsonwebtoken)
  these packages are included to deal with the authentication process of the project using a JWT token.
### argon2 [[doc](https://www.npmjs.com/package/argon2)]
  This library is used to encrypt user passwords and validate users' credentials.

## Project structure
This project has 4 modules which are user, concert, reservation, and auth.

### user module *endpoint(none)*
This module has no controller and contains only the service and repository of the user entity.

### concert module *endpoint('/concert')*
This module is used to modify the concert entity.

#### controller endpoints

##### *GET('/')*         get all concert
##### *GET('/stat')*     get concerts' combined stat
##### *POST('/')*        create concert with request body
##### *DELETE('/:id')*   delete concert with id parameter

### reservation module
This module is used to modify both the reservation and reservationLog entities.
#### reservation endpoints

##### *GET('/')*                 get all reservations of the user inside the request token
##### *GET('/log')*              get all reservation logs of the user inside the request token
##### *GET('/log/admin')*        get all reservation logs of every user
##### *POST('/:concertId')*      create a reservation of concert with concertId parameter using user inside the request token 
##### *PUT('/:reservationId')*   cancel a reservation with reservationId parameter

### auth module
this module deals with the authentication process and uses the user module's service to validate use credentials.

#### auth endpoints

##### *POST('/signup')*      create a user using request body
##### *POST('/login')*       authenticate user and return access token

## Database migration
This project uses TypeORM CLI to create a migration process. To alter the database tables the steps are
1. Change the entities in the entities directory to the desired state
2. run
```
npm run build
```
3. to create the migration file run:
```
npm run migrations src/migrations/your-migration-name
```
4. to migrate or revert run:
```
npm run migration:run
```
or
```
npm run migration:revert
```
