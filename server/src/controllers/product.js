const pool = require('../config/db.js')
const {  getAllProductsQuery, getProductByIdQuery, addProductQuery, updateProductQuery } = require('../queries/product.js')

const getProducts = async (req, res) => {
    try {
        const allProducts = await pool.query(getAllProductsQuery);
        const products = allProducts.rows;
        return res.status(200).send(products);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const id = parseInt(req.params.product_id);
        const results = await pool.query(getProductByIdQuery, [id]);
        res.status(200).json(results.rows);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


const addProduct = async (req, res) => {
    try {
        const values = [ req.body.product_name, req.body.category_id, req.body.current_price, req.body.stock, req.body.past_prices, req.body.barcode]
        const {rows} = await pool.query(addProductQuery, values);

        return res.status(201).json({
            success: true,
            createdUser: rows[0]
        })
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const product_id = parseInt(req.params.product_id);
        const values = [req.body.product_name, req.body.category_id, req.body.current_price, req.body.stock, req.body.barcode, product_id]
        const {rows} = await pool.query(updateProductQuery, values);

        return res.status(200).json({
            success: true,
            updatedUser: rows[0]
        })
        
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

const deleteProductById = async (req, res) => {
    try {
        const id = parseInt(req.params.product_id);
        const results = await pool.query(deleteProductByIdQuery, [id]);
        return res.status(200).json({
            success: true,
            message: "Product deleted successfully!"
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

module.exports = {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProductById
};