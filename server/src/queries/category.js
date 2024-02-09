getAllCategoriesQuery = 'SELECT * FROM categories';
getCategoryByIdQuery = 'SELECT * FROM categories WHERE category_id = $1';
addCategoryQuery = 'INSERT INTO categories (category_name) VALUES ($1)';
updateCategoryQuery = ' UPDATE categories SET category_name = COALESCE($1, category_name) WHERE category_id = $2;'

module.exports = {
    getAllCategoriesQuery,
    getCategoryByIdQuery,
    addCategoryQuery,
    updateCategoryQuery
}