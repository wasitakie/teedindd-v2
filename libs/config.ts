import mysql from "mysql2/promise";

const globalForMysql = global as unknown as {
  pool: mysql.Pool | undefined;
};

const pool =
  globalForMysql.pool ?? mysql.createPool(process.env.DATABASE_URL as string);

if (process.env.NODE_ENV !== "production") {
  globalForMysql.pool = pool;
}

export default pool;
