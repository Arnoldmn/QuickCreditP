import jwt from "jsonwebtoken";
import users from "../db/users";
class UsersController {
  getAllUsers(req, res) {
    res.status(200).json({
      status: 200,
      data: users
    });
  }
}

const usersController = new UsersController();
export default usersController;
