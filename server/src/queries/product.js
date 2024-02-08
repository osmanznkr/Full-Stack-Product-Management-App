getAllProductsQuery = 'SELECT * FROM products';
addProductQuery = 'INSERT INTO products (product_name, category_id, current_price, stock, past_prices, barcode) VALUES ($1, $2, $3, $4, $5, $6)';
getProductByIdQuery = 'SELECT * FROM products WHERE product_id = $1';
productExistQuery = 'SELECT * FROM products WHERE product_name = $1';
updateProductQuery = ' UPDATE products SET  product_name = COALESCE($1, product_name),category_id = COALESCE($2, category_id),current_price = COALESCE($3, current_price),stock = COALESCE($4, stock),barcode = COALESCE($5, barcode) WHERE product_id = $6;'
deleteProductByIdQuery = 'DELETE FROM products WHERE product_id = $1 ';

module.exports = {
    getAllProductsQuery,
    addProductQuery,
    getProductByIdQuery,
    productExistQuery,
    updateProductQuery,
    deleteProductByIdQuery
}