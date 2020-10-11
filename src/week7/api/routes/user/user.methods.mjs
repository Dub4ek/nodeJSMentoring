import UserResponse from '../../../dto/UserResponse.mjs';
import UserDto from '../../../dto/UserDto.mjs';

export const getUser = (userService) => async (req, res, next) => {
  const request = req.body;

  try {
    const getUserResult = await userService.getUser(request);

    return res.status(200).json(UserResponse.fromObject(getUserResult));
  } catch (e) {
    return next(e);
  }
};

export const addUser = (userService) => async (req, res, next) => {
  const userDTO = UserDto.fromObject(req.body);

  try {
    const addUserResult = await userService.addUser(userDTO);

    return res.status(201).json(UserResponse.fromObject(addUserResult));
  } catch (e) {
    return next(e);
  }
};

export const updateUser = (userService) => async (req, res, next) => {
  try {
    const userDTO = UserDto.fromObject(req.body);
    const updateUserResult = await userService.updateUser(userDTO);

    return res.json(UserResponse.fromObject(updateUserResult));
  } catch (e) {
    return next(e);
  }
};

export const deleteUser = (userService) => async (req, res, next) => {
  try {
    const request = req.body;
    await userService.deleteUser(request);

    return res.json({ text: 'User successfully has been deleted' });
  } catch (e) {
    return next(e);
  }
};

export const listUsers = (userService) => async (req, res, next) => {
  try {
    const request = req.body;
    const listUsersResult = await userService.listUsers(request);

    return res.json(listUsersResult);
  } catch (e) {
    return next(e);
  }
};

export const addUsersToGroup = (userService) => async (req, res, next) => {
  try {
    const request = req.body;
    await userService.addUsersToGroup(request);

    return res.json({ test: "Users have been successfully added to the group" });
  } catch (e) {
    return next(e);
  }
};

export const loginUser = (userService) => async (req, res, next) => {
  try {
    const request = req.body;
    const signinResult = await userService.loginUser(request);

    return res.json({ user: UserResponse.fromObject(signinResult.user), token: signinResult.token });
  } catch (e) {
    return next(e);
  }
};

