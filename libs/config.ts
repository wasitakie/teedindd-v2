import mysql from "mysql2/promise";

const globalForMysql = global as unknown as {
  connection: mysql.Pool | undefined;
};

const pool =
  globalForMysql.connection ??
  mysql.createPool({
    host: process.env.DB_HOST,
    port: 4000,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 5, // จำกัดจำนวนการเชื่อมต่อพร้อมกัน
    queueLimit: 0,
    ssl: {
      rejectUnauthorized: true, // TiDB Cloud บังคับ SSL
    },
  });
if (process.env.NODE_ENV !== "production") {
  globalForMysql.connection = pool;
}
export default pool;
