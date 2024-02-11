const pool = require('../config/db.js');
const { getAllCategoriesQuery, getCategoryByIdQuery, addCategoryQuery, updateCategoryQuery } = require('../queries/category')

const getCategories = async(req,res) =>{
    try {
       const allCategories = await pool.query(getAllCategoriesQuery )
       const categories = allCategories.rows

       return res.status(200).send(categories)
    } catch (error) {
        res.status(500).json({
            message: "Server Error"
        })
    }
}

const getCategoryById = async (req, res) => {
    try {
        const id = parseInt(req.params.category_id);
        const results = await pool.query(getCategoryByIdQuery, [id]);
        res.status(200).json(results.rows);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

const addCategory = async (req, res) => {
    try {
        const values = [ req.body.category_name]
        const {rows} = await pool.query(addCategoryQuery, values);

        return res.status(201).json({createdUser: rows[0]})
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateCategory = async (req, res) => {
    try {
        const category_id = parseInt(req.params.category_id);
        const values = [req.body.category_name, category_id]
        const {rows} = await pool.query(updateCategoryQuery, values);

        return res.status(200).json({
            success: true,
            updatedCategory: rows[0]
        })
        
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

module.exports = {
    getCategories,
    getCategoryById,
    addCategory,
    updateCategory
}