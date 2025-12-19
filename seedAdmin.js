const userStorage = require('./src/models/userStorage');
const { hash } = require('./src/controllers/authController');

async function seedAdmin() {
    const existing = await userStorage.getUser('admin');
    if (!existing) {
        await userStorage.createUser({
            username: 'admin',
            password: hash('Admin123!'),
            role: 'admin'
        });
        console.log('Admin utworzony: admin / Admin123!');
    } else {
        console.log('Admin już istnieje.');
    }
}

seedAdmin().then(() => process.exit());
