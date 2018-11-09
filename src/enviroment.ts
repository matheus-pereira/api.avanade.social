const DEV_ENV = {
    production: false,
    database: 'mongodb+srv://avanade:avanade@mongodb-ejmu6.azure.mongodb.net/development',
    secretKey: '6787225D3AF59F9954E9E6AST349CCF81F6352E7A8A4455EA27941C76593FA25'
}

const PROD_ENV = {
    production: true,
    database: 'mongodb+srv://avanade:avanade@mongodb-ejmu6.azure.mongodb.net/production',
    secretKey: '6787225D3AF59F9954E9E6AST349CCF81F6352E7A8A4455EA27941C76593FA25'
}

export const enviroment = (process.env.NODE_ENV == 'production') ? PROD_ENV : DEV_ENV;
