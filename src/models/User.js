import knex from '../database/connection.js';

class User {
    create = async (user) => {
        try {
            await knex.insert(user).table("users");
            return { status: true }
        } catch (err) {
            console.log(err);
            return { status: false }
        }
    }

    findEmail = async (email) => {
        try {
            const result = await knex.select("email")
                .table("users")
                .where({ email: email });

            if (result.length > 0) {
                return { status: true, result: result[0] };
            } else {
                return { status: false };
            }

        } catch (err) {
            console.log(err);
            return { status: false }
        }
    }
}

export default new User();