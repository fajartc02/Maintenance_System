const validator = require('validator');
const { Op } = require("sequelize");

const { Activity } = require('../models').models;

const activityAttributes = [
	'uuid',
	'name',
	'description',
	'file_logo',
	'is_strava',
	'created_at',
	'created_by',
	'updated_at',
	'updated_by',
	'deleted_at'
];
exports.index = async (req, res, next) => {
	const { offset, limit } = req.query

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

	const activities = await Activity.findAll({ 
		offset: parseInt(offset), 
		limit: parseInt(limit),
		order: [
			['name', 'ASC'],
		],
		attributes: activityAttributes
	});

	const totalActivities = await Activity.count({
		where: {
			deleted_at: {
				[Op.is]: null
			}
		}
	});

	return res.json({
		status: 'success',
		data: activities,
		pagination: {
			offset: parseInt(offset),
			limit: parseInt(limit),
			total: totalActivities
		}
	});
};

exports.show = async (req, res, next) => {
	const uuid = req.params.uuid;

	const validationErrors = [];

	if (!uuid) validationErrors.push('UUID must be defined.');

	const activity = await Activity.findOne({ 
		where: { uuid: uuid },
		attributes: activityAttributes
	});

	if (!activity) {
		return res.status(404).json({
			status: 'error',
			message: 'Activity not found'
		});
	}

	return res.json({
		status: 'success',
		data: [
			activity
		]
	});
};

exports.store = async (req, res) => {
	try {
		const data = {
			name: req.body.name,
			description: req.body.description,
			file_logo: req.body.file_logo,
			is_strava: req.body.is_strava,
		};

		const createdActivity = await Activity.create(data);

		return res.json({
			status: 'success',
			data: createdActivity,
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
	const activity = await Activity.findOne({ where: { uuid: uuid } });

	if (!activity) {
		return res.status(404).json({
			status: "error",
			message: "Activity not found",
		});
	}

	try {
		const { name, description, file_logo, is_strava, } = req.body;

		await activity.update({
			name,
			description,
			file_logo,
			is_strava,
		});

		return res.json({
			status: "success",
			data: activity,
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
	const activity = await Activity.findOne({ where: { uuid: uuid } });

	if (!activity) {
		return res.status(404).json({
			status: "error",
			message: "Activity not found",
		});
	}

  	await activity.destroy();

	return res.json({
		status: "success",
		message: "Activity has been deleted"
	});
};