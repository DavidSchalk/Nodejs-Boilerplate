import fs from 'fs/promises';
import { ErrorBadRequest } from '../../core/error';

const createUser = async (firstname, lastname, email, password) => {
    const user = {
        firstname,
        lastname,
        email,
        password
    }
     
    const users = await fs.readFile('./database/users.json');
    const usersJson = JSON.parse(users);

    const findIndex = usersJson.findIndex(item => item.email === user.email);
    if (findIndex > -1) {
        throw new ErrorBadRequest('User already exists');
    }
    usersJson.push(user);
    await fs.writeFile('./database/users.json', JSON.stringify(usersJson));

    return {
        message: "Created user successfully"
    }
}

const findUser = async (email) => {
    const users = await fs.readFile('./database/users.json');
    const usersJson = JSON.parse(users);

    const user = usersJson.find(item => item.email === email);
    if (user) {
        return user;
    }
    return null;
}

export {
    createUser,
    findUser
}