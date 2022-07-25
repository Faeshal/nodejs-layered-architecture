## Node.JS Layered Architecture

🥇 Service Layer Architecture for Node.js Boilerplate REST API

![img](https://cdn.buttercms.com/MeGKGWTZRZmCh0pNgSNP)

❓ As you already know Express.js is an **unopinionated** Node.js framework, this means that developer free to determine how to structure the project. in Contrast with **opinionated** framework like Laravel or SpringBoot where developers are forced to follow their existing standard rules. However, one of the drawbacks of unopinionated framework is to finding best practices. There are no definite rules on how the project should be structure, each developer has own style to determining it. So i created this template as a backend boilerplate project that i usually use. I call this structure Service Layer Architecture & i will continuously update it when needed.

💡 There are 3 main layers:

1. Controller layer (for request handler) 🌐

   This is the module of your code where the API routes are defined. Here you define only, and only your API routes. In the route handler functions, you can deconstruct the request object, pick the important data pieces and pass them to the service layer for processing.

2. Service layer (for business logic) 🚀

   This is where your business logic lives, even the secret sauce of your application. It contains a bunch of classes and methods that take up singular responsibility and are reusable (and also follow other S.O.L.I.D programming principles). This layer allows you to effectively decouple the processing logic from where the routes are defined.

3. Data Access Layer / Repository (for interacting with the database)🛡️

   The Data Access layer can take up the responsibility of talking to the database - fetching from, writing to, and updating it. All your SQL queries, database connections, models, ORM (object-relational mappers), etc. are supposed to be defined here. In this version i use an sql database with Sequelize ORM. So if you use NoSQL database or other ORM you can customize it, basically the concept is the same, you must create a repository layer.

This three-layer setup serves as a reliable scaffolding for most Node.js applications, making your applications easier to code, maintain, debug and test.

🗡 **July 2022 - [faeshal.com](https://faeshal.com)**
