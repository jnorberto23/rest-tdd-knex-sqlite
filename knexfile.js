import path from 'path';

const __dirname = path.resolve();

export default  {
    client: 'sqlite3',

    connection: {
        filename: path.resolve(__dirname, 'src','database', 'database.sqlite'),
    },

    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },

    useNullAsDefault: true,
};