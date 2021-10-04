import path from 'path';
    
export default  {
    client: 'sqlite3',
    connection: {
        filename: path.resolve('src','database', 'database.sqlite' ),
    },
    migrations: {
        directory: path.resolve('src', 'database', 'migrations')
    },
    useNullAsDefault: true,
};