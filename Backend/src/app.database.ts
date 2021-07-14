import { createConnection } from 'typeorm';

/*----Class initialize database----*/
class Database {
    static initDatabase() {
        try {
            const connection = createConnection();
            return connection;
        } catch (e) {
            console.log(e);
        }
    }
}

export { Database };
