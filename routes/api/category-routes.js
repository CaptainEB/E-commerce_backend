const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
	// find all categories
	// be sure to include its associated Products
	try {
		const categoriesData = await Category.findAll({ include: Product });
		const categories = categoriesData.map((category) => category.get({ plain: true }));
		res.status(200).json(categories);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/:id', async (req, res) => {
	// find one category by its `id` value
	// be sure to include its associated Products
	try {
		const id = req.params.id;
		const categoryData = await Category.findByPk(id, { include: Product });
		const category = categoryData.get({ plain: true });
		res.status(200).json(category);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.post('/', async (req, res) => {
	// create a new category
	try {
		const { category_name } = req.body;
		const categoryData = await Category.create({ category_name });
		const category = categoryData.get({ plain: true });
		res.status(200).json(category);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.put('/:id', async (req, res) => {
	// update a category by its `id` value
	try {
		const id = req.params.id;
		const { cateogy_name } = req.body;
		const categoryData = await Category.update({ category_name }, { where: { id } });
		const category = categoryData.get({ plain: true });
		res.status(200).json(category);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.delete('/:id', async (req, res) => {
	// delete a category by its `id` value
	try {
		const id = req.params.id;
		const categoryData = await Category.destroy({ where: { id } });
		res.status(200).json({ message: `Category with the id of ${id} got deleted` });
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
