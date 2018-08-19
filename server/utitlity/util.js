const bcrypt = require('bcryptjs');

module.exports = {
    USER_TABLE_NAME :'users',
    JWT_SECRET: 'codeworkrauthentication',
    mysql: {
        client: 'mysql',
        connection: {
            host: 'sql12.freemysqlhosting.net',
            user: 'sql12252060',
            password: 'ZhgGIqD133',
            database: 'sql12252060'
        }
    },
    isPasswordValidate : async (firstPassword,secondPassword)=>{
        const isMatch = await bcrypt.compare(firstPassword , secondPassword);
        console.log(isMatch,'isMatch');
        return isMatch
    }
}