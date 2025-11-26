const {
    createUsersService,
    getAllUsersService,
    getUsersByIdService,
    updateUsersService,
    deleteUsersService
} = require("../models/userModel");

const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({
        status,
        message,
        data,
    });
};

// CREATE USER
const createUser = async (req, res, next) => {
    const { name, email } = req.body;

    try {
        const newUser = await createUsersService(email, name);
        handleResponse(res, 201, "user created successfully", newUser);
    } catch (error) {
        next(error);
    }
};

// GET ALL USERS
const getAllUsers = async (req, res, next) => {
    try {
        const result = await getAllUsersService();
        handleResponse(res, 200, "users fetched successfully", result);
    } catch (error) {
        next(error);
    }
};

// GET USER BY ID
const getUserById = async (req, res, next) => {
    const { id } = req.params;

    try {
        const user = await getUsersByIdService(id);

        if (!user) return handleResponse(res, 404, "user not found");

        handleResponse(res, 200, "user fetched successfully", user);
    } catch (error) {
        next(error);
    }
};

// UPDATE USER
const updateUser = async (req, res, next) => {
    const { id } = req.params;
    const { name, email } = req.body;

    try {
        const user = await updateUsersService(id, name, email);

        if (!user) return handleResponse(res, 404, "user not found");

        handleResponse(res, 200, "user updated successfully", user);
    } catch (error) {
        next(error);
    }
};

// DELETE USER
const deleteUser = async (req, res, next) => {
    const { id } = req.params;

    try {
        const user = await deleteUsersService(id);

        if (!user) return handleResponse(res, 404, "user not found");

        handleResponse(res, 200, "user deleted successfully", user);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};
