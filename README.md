# Book-Meal-App 

Book-Meal-App is an application that allows customers to make food orders and helps the food
vendor know what the customers want to eat.

## Features

### Required features

* Users can create an account and log in.
* Admin (Caterer) should be able to manage (i.e: add, modify and delete) meal options in
  the application.
* Admin (Caterer) should be able to setup menu for a specific day by selecting from the
  meal options available on the system.
* Authenticated users (customers) should be able to see the menu for a specific day and
  select an option out of the menu.
* Authenticated users (customers) should be able to change their meal choice.
* Admin (Caterer) should be able to see the orders made by the user.
* Admin should be able to see amount of money made by end of day.
* Authenticated users (customers) should be able to see their order history.
* Authenticated users (customers) should be able to get notifications when the menu for
  the day has been set.
* Admin (Caterer) should be able to see order history.
* The application should be able to host more than one caterer.

## Installation

To get the application running follow this steps:

* Install NodeJs and Postgres on your local machine
* clone the repository `$ git clone https://github.com/adebayoileri/Book-Meal-App`
* Navigate to project folder `$ cd Book-Meal-App`
* Make a copy of the `.env.example` file and rename it to `.env`
* Update `.env` with necessary environment details e.g database credentials
* Install npm dependencies by running `npm install`
* Migrate tables to the db using `npm run db:migrate`
* Seed database with test data using `npm run seed` (optional)
* start the server in development mode by running `npm run dev:server`

## Testing

Run `npm run test` to run serverside tests .
See Deploy Link https://book-meal.netlify.app/

## Technologies

### Backend

* [NodeJS](http://nodejs.org/en) is a JavaScript runtime built on Chrome's V8 JavaScript engine
* [Express JS](http://express.com) A minimalist web framework
* [PostgreSQL](https://www.postgresql.org/) A powerful, open source object-relational database system.
* [ESLint](eslint.org) provides a pluggable linting utility for JavaScript.
* [Mocha](https://mochajs.org/) Mocha is a feature-rich JavaScript test framework running on [NodeJS](nodejs.org/en) for testing [Javascript](javascript.com) applications.

### Frontend

* [React](https://facebook.github.io/react/) A JavaScript library for building user interfaces.
* [ChakraUI](https://chakra-ui.com/) Chakra UI is a simple, modular and accessible component library that gives you the building blocks you need to build your React applications.
* [Webpack](https://webpack.js.org/) A JavaScript tool for bundling scripts, images, styles and other assets
* [Babel](https://babeljs.io/) A JavaScript compiler for converting codes written in ES6 or JSX to ES5 that is supported by many browsers


## Contributing

To help make this project even better you can fork this repo and create a pull request using the pull request template.

## License and Copyright

Licensed under the [MIT License](LICENSE).
