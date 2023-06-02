import {DataSource} from "typeorm";
import {DBTypes} from "./interfaces";
import {DbStrategyFactory} from "./strategies";
import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseService {
    private connection: DataSource;

    async connect(type: DBTypes) {
        try {
            const strategy = DbStrategyFactory.create(type);
            this.connection = await strategy.connect();
            return this.connection;
        } catch (error) {
            throw new Error(`Failed to connect to database: ${error.message}`);
        }
    }
}