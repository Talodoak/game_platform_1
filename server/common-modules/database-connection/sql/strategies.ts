import "reflect-metadata"
import {DataSource} from "typeorm"
import {IDbStrategy} from "./interfaces";

class MySqlStrategy implements IDbStrategy {
    async connect() {
        return new DataSource({
            type: "mysql",
            host: "localhost",
            port: 5432,
            username: "root",
            password: "admin",
            database: "test",
            entities: [],
            synchronize: true,
            logging: false,
        });
    }
}

class PostgreSqlStrategy implements IDbStrategy {
    async connect() {
        return new DataSource({
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "root",
            password: "admin",
            database: "test",
            entities: [],
            synchronize: true,
            logging: false,
        });
    }
}

export class DbStrategyFactory {
    static create(type: string): IDbStrategy {
        switch (type) {
            case 'mysql':
                return new MySqlStrategy();
            case 'postgresql':
                return new PostgreSqlStrategy();
            default:
                throw new Error(`Unknown database type: ${type}`);
        }
    }
}