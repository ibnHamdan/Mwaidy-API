const dotenv = require("dotenv");
dotenv.config();
const sql = require("mssql");

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
};

const DBConnection = new sql.ConnectionPool(config)
  .connect()
  .then((pool) => {
    console.log("Connected to MSSQL");
    return pool;
  })
  .catch((err) => console.log("Database Connection Failed! Bad Config: ", err));

module.exports = DBConnection;

// const client = async () => {
//   let pool = null;

//   const closePool = async () => {
//     try {
//       await pool.close();
//       pool = null;
//     } catch (err) {
//       pool = null;
//       console.log("Error in close pool");
//     }
//   };

//   const getConnection = async () => {
//     try {
//       if (pool) {
//         return pool;
//       }
//       pool = await sql.connect({
//         user: process.env.DB_USER,
//         password: process.env.DB_PASS,
//         server: process.env.DB_HOST,
//         database: process.env.DB_DATABASE,
//       });
//       pool.on("error", async (err) => {
//         console.log("error in getConnection pool");
//         await closePool();
//       });
//       console.log("connect to DB");
//       return pool;
//     } catch (err) {
//       console.log("error in getConnection ");
//       pool = null;
//     }
//   };
//   return {
//     pool: await getConnection(),
//   };
// };

// module.exports = client;
