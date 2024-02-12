getAllUsersQuery = 'SELECT * FROM users';
getUserByIdQuery = 'SELECT * FROM users WHERE id = $1';
addUserQuery = 'INSERT INTO users (user_email, password) VALUES ($1, $2)';
updateUserQuery = ' UPDATE users SET user_name = COALESCE($1, user_email), category_id = COALESCE($2, password) WHERE id = $3;'
deleteUserByIdQuery = 'DELETE FROM users WHERE id = $1 ';

module.exports = {
    getAllUsersQuery,
    getUserByIdQuery,
    addUserQuery,
    updateUserQuery,
    deleteUserByIdQuery
}