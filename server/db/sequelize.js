const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://localhost:5432/nmodb');\

//TRY sequelize above first, if it doesn't work try the one below

// const sequelize = new Sequelize({
//   dialect: 'postgres',
//   protocol: 'postgres',
//   port: 5432,
//   host: 'nmodb.cqdxw6kmfwjk.us-west-2.rds.amazonaws.com:5432',
//   dialectOptions: {
//     ssl: true,
//   },
//   logging: false,
//   define: {
//     timestamps: false
//   }
// });
