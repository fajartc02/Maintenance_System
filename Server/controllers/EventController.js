const validator = require('validator');
const { Op } = require("sequelize");

const { Competition, Event } = require('../models').models;

const eventAttributes = [
	'uuid',
	'name',
	'description',
	'pic',
	'phone_number',
	'file_banner',
	'event_start_date',
	'event_end_date',
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

	const events = await Event.findAll({ 
		offset: parseInt(offset), 
		limit: parseInt(limit),
		include: [{
			model: Competition,
			as: 'competitions',
			required: false,
		}],
		order: [
			['name', 'ASC'],
		],
		attributes: eventAttributes
	});

	const totalEvents = await Event.count({
		where: {
			deleted_at: {
				[Op.is]: null
			}
		}
	});

	return res.json({
		status: 'success',
		data: events,
		pagination: {
			offset: parseInt(offset),
			limit: parseInt(limit),
			total: totalEvents
		}
	});
};

exports.show = async (req, res, next) => {
	const uuid = req.params.uuid;

	const validationErrors = [];

	if (!uuid) validationErrors.push('UUID must be defined.');

	const event = await Event.findOne({
		where: { uuid: uuid },
		include: [{
			model: Competition,
			as: 'competitions',
			required: false,
		}],
		attributes: eventAttributes
	});

	if (!event) {
		return res.status(404).json({
			status: 'error',
			message: 'Event not found'
		});
	}

	return res.json({
		status: 'success',
		data: [
			event
		]
	});
};

exports.store = async (req, res) => {
	const data = {
		name: req.body.name,
		description: req.body.description,
		pic: req.body.pic,
		phone_number: req.body.phone_number,
		file_banner: req.body.file_banner,
		event_start_date: req.body.event_start_date,
		event_end_date: req.body.event_end_date,
	};

	const createdEvent = await Event.create(data);

	return res.status(201).json({
		status: 'success',
		data: createdEvent,
	})
};

exports.save = async (req, res) => {
	const uuid = req.params.uuid;
	const event = await Event.findOne({ where: { uuid: uuid } });

	if (!event) {
		return res.status(404).json({
			status: "error",
			message: "Event not found",
		});
	}

  	const {
		name,
		description,
		pic,
		phone_number,
		file_banner,
		event_start_date,
		event_end_date
	 } = req.body;

	await event.update({
		name,
		description,
		pic,
		phone_number,
		file_banner,
		event_start_date,
		event_end_date,
	});

	return res.json({
		status: "success",
		data: event,
	});
};

exports.destroy = async (req, res) => {
	const uuid = req.params.uuid;
	const event = await Event.findOne({ where: { uuid: uuid } });

	if (!event) {
		return res.status(404).json({
			status: "error",
			message: "Event not found",
		});
	}

  	await event.destroy();

	return res.json({
		status: "success",
		message: "Event has been deleted"
	});
};