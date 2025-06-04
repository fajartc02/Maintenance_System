const validator = require('validator');
const { Op } = require("sequelize");

const { Division } = require('../models').models;

const divisionAttributes = [
	'uuid',
	'name',
	'sname',
	'description',
	'created_at',
	'created_by',
	'updated_at',
	'updated_by',
	'deleted_at'
];

exports.index = async (req, res) => {
	const { offset, limit } = req.query;

	const validationErrors = [];

	if (!offset) validationErrors.push('Offset must be defined.');
	if (!limit) validationErrors.push('Limit must be defined.');

	if (offset && !validator.isInt(offset)) validationErrors.push('Offset must be number.');
	if (limit && !validator.isInt(limit)) validationErrors.push('Limit must be number.');

	if (validationErrors.length) {
		return res.status(400).json({
			status: 'error',
			message: validationErrors,
		});
	}

	const divisions = await Division.findAll({ 
		offset: parseInt(offset), 
		limit: parseInt(limit),
		order: [
			['name', 'ASC'],
		],
		attributes: divisionAttributes
	});

	const totalDivisions = await Division.count({
		where: {
			deleted_at: {
				[Op.is]: null
			}
		}
	});

	return res.json({
		status: 'success',
		data: divisions,
		pagination: {
			offset: parseInt(offset),
			limit: parseInt(limit),
			total: totalDivisions
		}
	});
};

exports.show = async (req, res) => {
	const uuid = req.params.uuid;

	const validationErrors = [];

	if (!uuid) validationErrors.push('UUID must be defined.');

	const division = await Division.findOne({ 
		where: { uuid: uuid },
		attributes: divisionAttributes
	});

	if (!division) {
		return res.status(404).json({
			status: 'error',
			message: 'Division not found'
		});
	}

	return res.json({
		status: 'success',
		data: [
			division
		]
	});
};

exports.store = async (req, res) => {
	try {
		const data = {
			uuid: req.body.uuid,
            name: req.body.name,
            sname: req.body.sname,
			description: req.body.description,
		};

		const createdDivision = await Division.create(data);

		return res.status(201).json({
			status: 'success',
			data: createdDivision,
		})
	} catch (error) {
		return res.status(409).json({
			status: 'error',
			message: error.message,
		});
	}
};

exports.save = async (req, res) => {
	const uuid = req.params.uuid;
	const division = await Division.findOne({ where: { uuid: uuid } });

	if (!division) {
		return res.status(404).json({
			status: "error",
			message: "Division not found",
		});
	}

	try {
		const { name, sname, description } = req.body;

		await division.update({
			name,
			sname,
			description
		});

		return res.json({
			status: "success",
			data: division,
		});
	} catch (error) {
		return res.status(409).json({
			status: 'error',
			message: error.message,
		});
	}
};

exports.destroy = async (req, res) => {
	const uuid = req.params.uuid;
	const division = await Division.findOne({ where: { uuid: uuid } });

	if (!division) {
		return res.status(404).json({
			status: "error",
			message: "Division not found",
		});
	}

	try {
		await division.destroy();

		return res.json({
			status: "success",
			message: "Division has been deleted"
		});
	} catch (error) {
		return res.status(409).json({
			status: 'error',
			message: error.message,
		});
	}
};

exports.users = async (req, res) => {
	const uuid = req.params.uuid;
	const division = await Division.findOne({ where: { uuid: uuid } });

	if (!division) {
		return res.status(404).json({
			status: "error",
			message: "Division not found",
		});
	}

	try {
		await division.destroy();

		return res.json({
			status: "success",
			message: "Division has been deleted"
		});
	} catch (error) {
		return res.status(409).json({
			status: 'error',
			message: error.message,
		});
	}
};

exports.dropdown = async (req, res) => {
	const { offset, limit } = req.query;

	const validationErrors = [];

	if (!offset) validationErrors.push('Offset must be defined.');
	if (!limit) validationErrors.push('Limit must be defined.');

	if (offset && !validator.isInt(offset)) validationErrors.push('Offset must be number.');
	if (limit && !validator.isInt(limit)) validationErrors.push('Limit must be number.');

	if (validationErrors.length) {
		return res.status(400).json({
			status: 'error',
			message: validationErrors,
		});
	}

	const divisions = await Division.findAll({ 
		offset: parseInt(offset), 
		limit: parseInt(limit),
		order: [
			['name', 'ASC'],
		],
		attributes: [
				['uuid', 'id'],
				['name', 'label'],
			]
	});

	const totalDivisions = await Division.count({
		where: {
			deleted_at: {
				[Op.is]: null
			}
		}
	});

	return res.json({
		status: 'success',
		data: divisions,
		pagination: {
			offset: parseInt(offset),
			limit: parseInt(limit),
			total: totalDivisions
		}
	});
};

