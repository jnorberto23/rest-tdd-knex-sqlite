import knex from '../database/connection.js';

class User {
    create = async (user) => {
        try {
            await knex.insert(user).table("users");

            return { status: true }

        } catch (err) {
            return { status: false }
        }
    }
}

export default new User();