import jwt from 'jsonwebtoken';
import users from '../db/users';

class UsersController {
  constructor() {
    this.users = [];
  }

  getAllUsers(res) {
    res.status(200).json({
      status: 200,
      data: users,
    });
  }

  signup(req, res) {
    const {
      email,
      firstname,
      lastname,
      password,
      address,
    } = req.body;

    const userExists = users.find(user => user.email === email);

    if (userExists) {
      res.status(400).json({
        status: 400,
        error: 'User already exists',
      });
    }

    const user = {};
    user.id = users.length + 1;
    user.email = email;
    user.firstname = firstname;
    user.lastname = lastname;
    user.password = password;
    user.address = address;
    user.status = 'pending';
    user.isAdmin = true || false;
    users.push(user);
    jwt.sign(
      {
        userId: users.id,
        email: users.email,
        password: users.password,
      },
      'secretkey',
      (error, token) => {
        if (error) {
          return res.status(401).json({
            status: 401,
            data: 'user already exits',
          });
        }
        user.token = token;
        const resp = {
          status: 200,
          data: {
            token: user.token,
            id: user.id,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            password: user.password,
            address: user.address,
            status: user.status === 'rejected' || 'approved',
            isAdmin: user.isAdmin === true || false,
          },
        };

        res.status(200).json(resp);
      },
    );
  }
}


const usersController = new UsersController();
export default usersController;

