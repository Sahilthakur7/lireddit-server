"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
require('dotenv').config();
const db_1 = require("./config/db");
const Post_1 = require("./entities/Post");
const main = async () => {
    console.log('First run this');
    const connection = await (0, typeorm_1.createConnection)(db_1.dbConfig);
    const post = await connection
        .createQueryBuilder()
        .insert()
        .into(Post_1.Post)
        .values([{ title: 'First Post' }])
        .execute();
    console.log('post', post);
};
main();
//# sourceMappingURL=index.js.map