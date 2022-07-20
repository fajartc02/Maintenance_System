const validator = require('validator');
const { Op } = require("sequelize");

const { User, Competition, Event, UserCompetition, Winner } = require('../models').models;

const competitionAttributes = [
	'uuid',
	'name',
	'description',
	'pic',
	'phone_number',
	'file_rule',
	'banner',
	'id_event',
	'competition_start_date',
	'competition_end_date',
	'registration_start_date',
	'registration_end_date',
	'is_strava',
	'created_at',
	'created_by',
	'updated_at',
	'updated_by',
	'deleted_at'
];

exports.index = async (req, res) => {
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
	
	const { registration_start_date } = req.query

	let whereStatements = {};

	if (registration_start_date) {
		whereStatements.registration_start_date = registration_start_date;
	}
			
	const competitions = await Competition.findAll({ 
		offset: parseInt(offset), 
		limit: parseInt(limit),
		include: [{
			model: Event,
			as: 'event',
			required: false,
		}],
		order: [
			['name', 'ASC'],
		],
		attributes: competitionAttributes,
		where: whereStatements,
	});

	const totalCompetitions = await Competition.count({
		where: {
			deleted_at: {
				[Op.is]: null
			}
		}
	});

	return res.json({
		status: 'success',
		data: competitions,
		pagination: {
			offset: parseInt(offset),
			limit: parseInt(limit),
			total: totalCompetitions
		}
	});
};

exports.show = async (req, res) => {
	const uuid = req.params.uuid;

	const validationErrors = [];

	if (!uuid) validationErrors.push('UUID must be defined.');

	const competition = await Competition.findOne({ 
		where: { uuid: uuid },
		include: [{
			model: Event,
			as: 'event',
			required: false,
		}],
		attributes: competitionAttributes
	});

	if (!competition) {
		return res.status(404).json({
			status: 'error',
			message: 'Competition not found'
		});
	}

	return res.json({
		status: 'success',
		data: [
			competition
		]
	});
};

exports.store = async (req, res) => {
	try {
		const data = {
			name: req.body.name,
			description: req.body.description,
			pic: req.body.pic,
			phone_number: req.body.phone_number,
			file_rule: req.body.file_rule,
			banner: req.body.banner,
			competition_start_date: req.body.competition_start_date,
			competition_end_date: req.body.competition_end_date,
			registration_start_date: req.body.registration_start_date,
			registration_end_date: req.body.registration_end_date,
			is_strava: req.body.is_strava
		};

		const createdCompetition = await Competition.create(data);

		return res.json({
			status: 'success',
			data: createdCompetition,
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
	const competition = await Competition.findOne({ where: { uuid: uuid } });

	if (!competition) {
		return res.status(404).json({
			status: "error",
			message: "Competition not found",
		});
	}

	try {
		const { 
			name, 
			description, 
			pic, 
			phone_number, 
			file_rule, 
			banner, 
			id_event, 
			competition_start_date, 
			competition_end_date, 
			registration_start_date, 
			registration_end_date,
			is_strava 
		} = req.body;

		await competition.update({
			name,
			description,
			pic,
			phone_number,
			file_rule,
			banner,
			id_event,
			competition_start_date,
			competition_end_date,
			registration_start_date,
			registration_end_date,
			is_strava
		});

		return res.json({
			status: "success",
			data: competition,
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
	const competition = await Competition.findOne({ where: { uuid: uuid } });

	if (!competition) {
		return res.status(404).json({
			status: "error",
			message: "Competition not found",
		});
	}

	try {
		await competition.destroy();

		return res.json({
			status: "success",
			message: "Competition has been deleted"
		});
	} catch (error) {
		return res.status(409).json({
			status: 'error',
			message: error.message,
		});
	}
};

exports.registration = async (req, res) => {
	const uuid = req.params.uuid;
	const competition = await Competition.findOne({ where: { uuid: uuid } });

	if (!competition) {
		return res.status(404).json({
			status: "error",
			message: "Competition not found",
		});
	}

	const user = await User.findOne({ where: { uuid: req.user.data.uuid } });
	
	if (!user) {
		return res.status(404).json({
			status: "error",
			message: "User not found",
		});
	}

	const userCompetition = await UserCompetition.findOne({ 
		where: { 
			id_competition: competition.id, 
			id_user: user.id, 
		} 
	});
	
	if (userCompetition) {
	return res.status(409).json({
			status: "error",
			message: "User already registered",
		});
	}

  	try {
		const data = {
			id_competition: competition.id, 
			id_user: user.id, 
		};

		const createdUserCompetition = await UserCompetition.create(data);

		return res.status(201).json({
			status: "success",
			message: "User has been registered to competition",
			data: [
				createdUserCompetition
			]
		});
	} catch (error) {
		return res.status(409).json({
			status: 'error',
			message: error.message,
		});
	}	
};

exports.getWinners = async (req, res) => {
	const uuid = req.params.uuid;

	const validationErrors = [];

	if (!uuid) validationErrors.push('UUID must be defined.');

	const competition = await Competition.findOne({ 
		where: { uuid: uuid },
		attributes: ['id']
	});

	if (!competition) {
		return res.status(404).json({
			status: 'error',
			message: 'Competition not found'
		});
	}

	const winners = await Winner.findAll({ 
		where: { id_competition: competition.id },
		include: [{
			model: User,
			as: 'user',
			required: true,
		}],
	});

	if (!winners) {
		return res.status(404).json({
			status: 'error',
			message: 'Winners not found in this competition.'
		});
	}

	return res.json({
		status: 'success',
		data: [
			winners
		],
		count: winners.length
	});
};

exports.createWinners = async (req, res) => {
	const uuid = req.params.uuid;

	const validationErrors = [];

	if (!uuid) validationErrors.push('UUID must be defined.');

	const competition = await Competition.findOne({ 
		where: { uuid: uuid },
		attributes: ['id']
	});

	if (!competition) {
		return res.status(404).json({
			status: 'error',
			message: 'Competition not found'
		});
	}

	const users = await User.findAll({ 
		where: { 
			uuid: req.body.winners.map(winner => winner.uuid_user) 
		}
	});

	let difference = req.body.winners.map(winner => winner.uuid_user).filter(uuid => !users.map(user => user.uuid).includes(uuid));

	if (users.length !== req.body.winners.length) {
		return res.status(404).json({
			status: 'error',
			message: difference.map(uuid => `User UUID ${uuid} not found`),
		});
	}

	const createdWinners = await Winner.bulkCreate(
		users.map(user => (
			{
				id_user: user.id,
				id_competition: competition.id,
				rank_order: req.body.winners.map(winner => winner.uuid_user === user.uuid).rank_order,
			}
		)
	));

	return res.json({
		status: 'success',
		data: [
			createdWinners
		],
	});
};