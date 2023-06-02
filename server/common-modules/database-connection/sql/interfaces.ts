export interface IDbStrategy {
    connect();
}

export enum DBTypes {
    MYSQL = 'mysql',
    POSTGRESQL = 'postgresql',
}