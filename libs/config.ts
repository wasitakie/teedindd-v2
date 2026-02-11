import mysql from "mysql2/promise";

const globalForMysql = global as unknown as {
  pool?: mysql.Pool;
};

function createPool() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined");
  }

  return mysql.createPool({
    uri: process.env.DATABASE_URL,
    waitForConnections: true,
    connectionLimit: 5,
  });
}

export const pool = globalForMysql.pool ?? createPool();

if (process.env.NODE_ENV !== "production") {
  globalForMysql.pool = pool;
}

export default pool;
