import "reflect-metadata"
import { DataSource } from "typeorm"

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "root",
  password: "admin",
  database: "test",
  entities: [Photo],
  synchronize: true,
  logging: false,
})