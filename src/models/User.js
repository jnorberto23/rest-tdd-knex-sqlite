import knex from '../database/connection.js';

class User {
    create = async (user) => {
        try {
            const result = await knex.insert(user).table("users");
            return { status: true, id: result }
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

    findById = async(id) => {
        try {
            const result = await knex.select(["id", "name", "nationality", "date_created"])
                .table("users")
                .where({ id: id });

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
/*
    delete = async (email) => {
        try {
            const result = await knex.delete()
                .table("users")
                .where({ email: email });

            return { status: true }

        } catch (err) {
            console.log(err);
            return { status: false }
        }
    }*/

}

export default new User();