// const validator = require('validator');
// const { Op } = require("sequelize");

// const { Winner } = require('../models').models;

// const winnerAttributes = [
// 	'uuid',
// 	'name',
// 	'id_user',
// 	'id_competition',
// 	'rank_order',
// 	'score',
// 	'created_at',
// 	'created_by',
// 	'updated_at',
// 	'updated_by',
// 	'deleted_at'
// ];

// exports.index = async (req, res, next) => {
// 	const { offset, limit } = req.query

// 	const validationErrors = [];

// 	if (!offset) validationErrors.push('Offset must be defined.');
// 	if (!limit) validationErrors.push('Limit must be defined.');

// 	if (offset && !validator.isInt(offset)) validationErrors.push('Offset must be number.');
// 	if (limit && !validator.isInt(limit)) validationErrors.push('Limit must be number.');

// 	if (validationErrors.length) {
// 		return res.status(400).json({
// 			status: 'error',
// 			message: validationErrors,
// 		});
// 	}

// 	const winners = await Winner.findAll({ 
// 		offset: parseInt(offset), 
// 		limit: parseInt(limit),
// 		order: [
// 			['name', 'ASC'],
// 		],
// 		attributes: winnerAttributes
// 	});

// 	const totalWinners = await Competition.count({
// 		where: {
// 			deleted_at: {
// 				[Op.is]: null
// 			}
// 		}
// 	});

// 	return res.json({
// 		status: 'success',
// 		data: competitions,
// 		pagination: {
// 			offset: parseInt(offset),
// 			limit: parseInt(limit),
// 			total: totalCompetitions
// 		}
// 	});
// };

// exports.show = async (req, res, next) => {
// 	const uuid = req.params.uuid;

// 	const winner = await Winner.findOne({ where: { uuid: uuid } }, {
// 		attributes: ['id', 'uuid', 'competition_id', 'user_id', 'order']
// 	});

// 	if (!winner) {
// 		return res.status(404).json({
// 			status: 'error',
// 			message: 'Winner not found'
// 		});
// 	}

// 	return res.json({
// 		status: 'success',
// 		data: [
// 			winner
// 		]
// 	});
// };

// exports.store = async (req, res) => {
// 	const data = {
// 		uuid: req.body.uuid,
// 		competition_id: req.body.competition_id, 
// 		user_id: req.body.user_id, 
// 		order: req.body.order,
// 	};

// 	const createdWinner = await Winner.create(data);

// 	return res.json({
// 		status: 'success',
// 		data: createdWinner,
// 	})
// };

// exports.save = async (req, res) => {
// 	const uuid = req.params.uuid;
// 	const winner = await Winner.findOne({ where: { uuid: uuid } });

// 	if (!winner) {
// 		return res.status(404).json({
// 			status: "error",
// 			message: "Winner not found",
// 		});
// 	}

//   	const { competition_id, user_id, order } = req.body;

// 	await winner.update({
// 		competition_id, 
// 		user_id, 
// 		order
// 	});

// 	return res.json({
// 		status: "success",
// 		data: winner,
// 	});
// };

// exports.destroy = async (req, res) => {
// 	const uuid = req.params.uuid;
// 	const winner = await Winner.findOne({ where: { uuid: uuid } });

// 	if (!winner) {
// 		return res.status(404).json({
// 			status: "error",
// 			message: "Winner not found",
// 		});
// 	}

//   	await winner.destroy();

// 	return res.json({
// 		status: "success",
// 		message: "Winner has been deleted"
// 	});
// };