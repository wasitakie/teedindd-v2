import mysql from "mysql2/promise";

const globalForMysql = global as unknown as {
  pool: mysql.Pool | undefined;
};

const pool =
  globalForMysql.pool ??
  mysql.createPool({
    uri: process.env.DATABASE_URL!,
    waitForConnections: true,
    connectionLimit: 5,
  });

if (process.env.NODE_ENV !== "production") {
  globalForMysql.pool = pool;
}

export default pool;
