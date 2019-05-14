import jwt from "jsonwebtoken";
import users from "../db/users";
class UsersController {
  getAllUsers(req, res) {
    res.status(200).json({
      status: 200,
      data: users
    });
  }

  signup(req, res) {
    const {
      email,
      firstname,
      lastname,
      password,
      address,
      status,
      isAdmin
    } = req.body;

    const userExists = users.find(user => user.email === email);

    if (userExists) {
      res.status(400).json({
        status: 400,
        error: "User already exists"
      });
    }

    const user = {};
    user.id = users.length + 1;
    user.email = email;
    user.firstname = firstname;
    user.lastname = lastname;
    user.password = password;
    user.address = address;
    user.status = "pending" || "approved";
    user.isAdmin = true || false;
    users.push(user);
    jwt.sign(
      {
        userId: users.id,
        email: users.email,
        password: users.password
      },
      "secretkey",
      (error, token) => {
        if (error) {
          return res.status(401).json({
            status: 401,
            data: "user already exits"
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
            status: user.status === "rejected" || "approved",
            isAdmin: user.isAdmin === true || false
          }
        };

        res.status(200).json(resp);
      }
    );
  }
  signin(req, res) {
    const { email, password } = req.body;
    const user = users.find(
      user => user.email === email && user.password === password
    );
    if (!user) {
      res.status(401).json({
        status: 401,
        token: null,
        auth: false,
        error: "invalid username or password"
      });
    }

    jwt.sign(
      {
        userId: users.id,
        email: users.email,
        password: users.password
      },
      "secretkey",
      (error, token) => {
        if (error) {
          return res.json({
            status: 401,
            data: "user doesnt exit"
          });
        }
        user.token = token;
        const resp = {
          status: 201,
          data: {
            token,
            userId: users.id,
            firstName: users.firstName,
            lastname: users.lastName
          }
        };
        res.status(201).json(resp);
      }
    );
  }
  UserIsVerified(req, res) {
    const user = users.find(user => user.email === req.params.email);
    if (!user) {
      return res.json({
        status: 404,
        error: "User not found"
      });
    }
    singleUser.status = req.body.status;
    const resp = {
      email: users.email,
      firstname: users.firstname,
      lastname: users.lastname,
      address: users.address,
      status: users.status
    };
    return res.json({
      status: 200,
      data: resp
    });
  }
}

const usersController = new UsersController();
export default usersController;
