import { createConnection } from 'typeorm';

/*----Class initialize database----*/
class Database {
    static async initDatabase() {
        try {
            const connection = await createConnection();
            // console.log(connection);
            return connection;
        } catch (e) {
            console.log(e);
        }
    }
}

export { Database };
