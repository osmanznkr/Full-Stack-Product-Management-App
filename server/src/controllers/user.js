const pool = require('../config/db.js');
const { getAllUsersQuery, getUserByIdQuery, addUserQuery } = require('../queries/user.js');

const getUsers = async (req, res) => {
    try {
        const allUsers = await pool.query(getAllUsersQuery);
        const users = allUsers.rows;
        return res.status(200).send(users);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const results = await pool.query(getUserByIdQuery, [id]);
        res.status(200).send(results.rows);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


const addUser = async (req, res) => {
    try {
        const values = [ req.body.user_email, req.body.password]
        const {rows} = await pool.query(addUserQuery, values);

        return res.status(201).json({
            success: true,
            createdUser: rows[0]
        })
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const values = [req.body.user_email, req.body.password, id]
        const {rows} = await pool.query(updateProductQuery, values);

        return res.status(200).json({
            success: true,
            message: "Güncellendi",
            updatedProduct: rows
        })
        
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

const deleteUserById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const results = await pool.query(deleteUserByIdQuery, [id]);
        return res.status(200).json({
            success: true,
            message: "User deleted successfully!"
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

module.exports = {
    getUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUserById
};