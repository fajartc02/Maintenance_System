const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const { Sequelize } = require("sequelize");

const { JWT_SECRET_KEY, JWT_ACCESS_TOKEN_EXPIRED } = process.env;

const { Competition, User, UserCompetition, Division, Event } = require('../models').models;

exports.login = async (req, res) => {
	const validationErrors = [];

	if (!req.body.email || !validator.isEmail(req.body.email)) validationErrors.push('Please enter a valid email address.');

	if (!req.body.password || validator.isEmpty(req.body.password)) validationErrors.push('Password cannot be blank.');

	if (validationErrors.length) {
		return res.status(400).json({
			status: 'error',
			message: validationErrors,
		});
	}

	const user = await User.findOne({
		where: {
			email: req.body.email,
		},
		attributes: ['uuid', 'name', 'email', 'password', 'token'],
	});

	if (user) {
		bcrypt.compare(req.body.password, user.password)
			.then(async (doMatch) => {
				if (doMatch) {
					let data = {
						uuid: user.uuid,
						name: user.name,
						email: user.email,
					};

					const token = jwt.sign({ data }, JWT_SECRET_KEY, {
						expiresIn: JWT_ACCESS_TOKEN_EXPIRED,
					});

					await User.update({ token: token },
						{
							where: {
								email: req.body.email,
							},
						}
					);

					return res.json({
						status: 'success',
						data: [
							{
								uuid: user.uuid,
								name: user.name,
								email: user.email,
								id_token: token,
							},
						],
					});
				}

				return res.status(401).json({
					status: 'error',
					message: 'Invalid email or password',
				});
			})
			.catch((err) => {
				return res.status(500).json({
					status: 'error',
					message: 'Server error. Something went wrong',
				});
			});
	} else {
		return res.status(401).json({
			status: 'error',
			message: 'Invalid email or password',
		});
	}
};

exports.logout = async (req, res) => {
	await User.update({ token: '' }, {
		where: {
			email: req.user.data.email,
		},
	});

	return res.json({
		status: 'success',
		message: 'Log out successfully'
	})
};

exports.verify = async (req, res) => {	
	return res.json({
		status: 'success',
		message: 'User authorization verified'
	})
};

exports.profile = async (req, res) => {
	const uuid = req.user.data.uuid;

	if (!uuid)
		return res.status(403).json({
			status: 'error',
			message: 'Access forbidden'
		});

	// Get user data
	const users = await User.findAll({ 
		attributes: [
			'id',
			'uuid',
			'name',
			'email',
			'gender',
			'age',
			[Sequelize.col('Division.name'), 'division_name'],
		],
		include: [{
			model: Division,
			attributes: [],
		}],
		where: { 
			uuid: uuid, 
		},
	});

	if (!users) {
		return res.status(404).json({
			status: 'error',
			message: 'User profile not found'
		});
	}

	let objectUsers = users.map(user => user.toJSON())[0];

	// User competitions
	const userCompetitions = await UserCompetition.findAll({ 
		attributes: [
			'uuid',
			[Sequelize.col('Competition.id_event'), 'id_event'],
			[Sequelize.col('Competition.name'), 'name'],
		],
		include: [{
			model: Competition,
			attributes: [],
		}],
		where: { 
			id_user: objectUsers.id, 
		},
	});
	
	delete objectUsers.id;

	let objectUserCompetitions = userCompetitions.map(competition => competition.toJSON());
	let eventIds = new Set(objectUserCompetitions.map(competition => competition.id_event));

	objectUserCompetitions.map(competition => {
		delete competition.id_event;
	});

	// User events
	const userEvents = await Event.findAll({ 
		attributes: [
			'uuid',
			'name',
		],
		where: { 
			id: [...eventIds], 
		},
	});

	let objectUserEvents = userEvents.map(competition => competition.toJSON());

	let responseUserProfile = {
		...objectUsers,
		your_events: [...objectUserEvents],
		your_competitions: [...objectUserCompetitions],
		your_activity_strava: []
	}

	return res.json({
		status: 'success',
		data: [
			responseUserProfile
		]
	});
}
