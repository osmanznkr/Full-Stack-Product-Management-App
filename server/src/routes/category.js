const {Router}= require('express')
const { getCategories, getCategoryById, addCategory, updateCategory } = require('../controllers/category')
const router = Router()

router.get('/categories', getCategories )
router.get('/categories/:category_id', getCategoryById)
router.post('/categories/create',addCategory)
router.put('/categories/update/:category_id', updateCategory)

module.exports = router