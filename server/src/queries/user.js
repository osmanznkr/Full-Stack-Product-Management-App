getAllUsersQuery = 'SELECT * FROM users';
getUserByIdQuery = 'SELECT * FROM users WHERE id = $1';
getUserByUsernameQuery = 'SELECT * FROM users WHERE username = $1';
addUserQuery = 'INSERT INTO users (username, password, user_email, user_phone, user_role) VALUES ($1, $2, $3, $4, $5)';
updateUserQuery = ' UPDATE users SET username = COALESCE($1, username), user_password = COALESCE($2, user_password), user_email = COALESCE($3, user_email), user_phone = COALESCE($4, user_phone), user_role = COALESCE($5, user_role) WHERE id = $6;'
deleteUserByIdQuery = 'DELETE FROM users WHERE id = $1 ';

module.exports = {
    getAllUsersQuery,
    getUserByIdQuery,
    getUserByUsernameQuery,
    addUserQuery,
    updateUserQuery,
    deleteUserByIdQuery
}