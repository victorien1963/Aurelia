const bcrypt = require("bcrypt")

// postgres
const cn = {
  host: process.env.PG_HOST,
  port: 5432,
  database: 'aurelia',
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  max: 30
}
const pgp = require('pg-promise')()

const db = pgp(cn)

const initialCheck = async (check, checkParams, init, initParams) => {
    try {
        const result = await db.one(check, checkParams)
        if (result.received === 0) {
            await db.none(init, initParams)
        }
    } catch (e) {
        console.log(e)
        try {
            await db.none(init, initParams)
        } catch (error) {
            console.error(error)
        }
    }
}

const hash = async (password, saltRounds = 10) => {
    const salt = await bcrypt.genSalt(saltRounds) 
    const hashed = await bcrypt.hash(password, salt)
    return hashed
}

const checkAll = async () => {
    await db.none('CREATE TABLE IF NOT EXISTS users (user_id serial PRIMARY KEY, name VARCHAR ( 50 ) NOT NULL, email VARCHAR ( 255 ) UNIQUE NOT NULL, password VARCHAR ( 500 ) NOT NULL, setting JSONB NOT NULL, created_on TIMESTAMP NOT NULL, last_login TIMESTAMP)')
    await db.none('CREATE TABLE IF NOT EXISTS containers (container_id serial PRIMARY KEY, name VARCHAR ( 50 ) NOT NULL, setting JSONB NOT NULL, user_id  serial NOT NULL, created_on TIMESTAMP NOT NULL, FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE cascade)')
    await db.none('CREATE TABLE IF NOT EXISTS tags (tag_id serial PRIMARY KEY, name VARCHAR ( 50 ) NOT NULL, setting JSONB NOT NULL, container_id serial NOT NULL, user_id  serial NOT NULL, created_on TIMESTAMP NOT NULL, FOREIGN KEY (container_id) REFERENCES containers (container_id) ON DELETE cascade, FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE cascade)')
    await db.none('ALTER TABLE containers ADD COLUMN updated_on TIMESTAMP')

    await db.one('SELECT setval(\'users_user_id_seq\', (SELECT MAX(user_id) FROM users)+1)')
    console.log('All Table Checked')
}

const initData = async () => {
    if (!process.env.ADMIN_EMAIL) {
        console.log('admin email and password not set in .env file.')
    }
    console.log('Initing data')
    const hashed = await hash(process.env.ADMIN_PASSWORD)
    try {
      await initialCheck('SELECT * FROM users WHERE email = $1', [process.env.ADMIN_EMAIL], 'INSERT INTO users(user_id, name, email, password, setting, created_on) VALUES($1, $2, $3, $4, $5, current_timestamp) ON CONFLICT DO NOTHING', ['1', 'Narwhal', process.env.ADMIN_EMAIL, hashed, { admin: true }])
    } catch (e) {
      console.log('admin user already exists.')
      console.log(e)
    }
}

const testConnect = async () => {
    try {
        await db.connect()
        await checkAll()
        await initData()
        console.log('db test complete.')
    } catch (e) {
        console.log('db test failed, retry after 5 sec.')
        console.log(e)
        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
        await delay(5000)
        testConnect()
    }
}

testConnect()

module.exports = {
async exec (method, query, param) {
    try {
    const res = await db[method](query, param)
    return res
    } catch (e) {
    return e
    }
}
}