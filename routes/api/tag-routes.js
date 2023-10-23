const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
	// find all tags
	// be sure to include its associated Product data
	try {
		const tagsData = await Tag.findAll({
			include: [{ model: Product, through: ProductTag, as: 'products' }],
		});
		const tags = tagsData.map((tag) => tag.get({ plain: true }));
		res.status(200).json(tags);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/:id', async (req, res) => {
	// find a single tag by its `id`
	// be sure to include its associated Product data
	try {
		const id = req.params.id;
		const tagData = await Tag.findByPk(id, {
			include: [{ model: Product, through: ProductTag, as: 'products' }],
		});
		const tag = tagData.get({ plain: true });
		res.status(200).json(tag);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.post('/', async (req, res) => {
	// create a new tag
	try {
		const tagData = await Tag.create(req.body);
		res.status(200).json(tagData);
	} catch (err) {
		res.status(400).json(err);
	}
});

router.put('/:id', async (req, res) => {
	// update a tag's name by its `id` value
	try {
		const id = req.params.id;
		const tagData = await Tag.update(req.body, {
			where: {
				id,
			},
		});
	} catch (err) {
		res.status(400).json(err);
	}
});

router.delete('/:id', async (req, res) => {
	// delete on tag by its `id` value
	try {
		const id = req.params.id;
		const tagData = await Tag.destroy({
			where: {
				id,
			},
		});
	} catch (err) {
		res.status(400).json(err);
	}
});

module.exports = router;
