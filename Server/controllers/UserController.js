const bcrypt = require('bcryptjs');
const validator = require('validator');
const { Op } = require("sequelize");

const { User } = require('../models').models;

const userAttributes = [
	'uuid',
	'name',
	'email',
	'noreg',
	'is_male',
	'age',
	'is_family',
	'id_parent_user',
	'id_division',
	'strava_token_refresh',
	'strava_token_access',
	'strava_token_expire_at',
	'is_active',
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

	try {
		const users  = await User.findAll({ 
			offset: parseInt(offset), 
			limit: parseInt(limit),
			order: [
				['name', 'ASC'],
			],
			where: {
				deleted_at: {
					[Op.is]: null
				}
			},
			attributes: userAttributes
		});

		const totalUsers = await User.count({
			where: {
				deleted_at: {
					[Op.is]: null
				}
			}
		});

		return res.json({
			status: 'success',
			data: users,
			count: users.length,
			pagination: {
				offset: parseInt(offset),
				limit: parseInt(limit),
				total: totalUsers
			}
		});
	} catch (error) {
		return res.status(500).json({ 
			status: 'error',
			message: 'Server error. Something went wrong',
		})
	}
};

exports.show = async (req, res, next) => {
	const uuid = req.params.uuid;

	const validationErrors = [];

	if (!uuid) validationErrors.push('UUID must be defined.');

	const user = await User.findOne({ 
		where: { uuid: uuid },
		attributes: userAttributes
	});

	if (!user) {
		return res.status(404).json({
			status: 'error',
			message: 'User not found'
		});
	}

	return res.json({
		status: 'success',
		data: [
			user
		]
	});
};

exports.store = async (req, res) => {
	const user = await User.findOne({ where: { email: req.body.email } });

	if (user) {
		return res.status(409).json({
			status: 'error',
			message: 'Email unavailable',
		});
	}

	const password = await bcrypt.hash(req.body.password, 10);

	const data = {
		name: req.body.name,
		email: req.body.email,
		noreg: req.body.noreg,
		age: req.body.age,
		is_family: req.body.is_family,
		is_male: req.body.is_male,
		id_parent_user: req.body.id_parent_user,
		id_division: req.body.id_division,
		password,
	};

	try {
		const createdUser = await User.create(data);
		
		return res.status(201).json({
			status: 'success',
			data: {
				uuid: createdUser.uuid,
			},
		});
	} catch (error) {
		return res.status(409).json({
			status: 'error',
			message: error.message,
		});
		
	}
};

exports.save = async (req, res) => {
	const uuid = req.params.uuid;
	const user = await User.findOne({ where: { uuid: uuid } });

	if (!user) {
		return res.status(404).json({
			status: "error",
			message: "User not found",
		});
	}

	const { name, email, noreg, age, is_family, is_male, id_parent_user, id_division, old_password, new_password } = req.body;

	const validationErrors = [];

	if (old_password) {
		if ((old_password && new_password) && validator.equals(old_password, new_password))
			validationErrors.push('New password must be different from old password');

		if (validationErrors.length) {
			return res.status(400).json({
				status: 'error',
				message: validationErrors,
			});
		}

		let match

		if (old_password && new_password) 
			match = await bcrypt.compare(old_password, user.password)

		if (!match)
			return res.status(401).json({
				status: 'error',
				message: 'Invalid password',
			});
	}

	const password = await bcrypt.hash(new_password, 10);

	try {
		await user.update({
			name,
			email,
			noreg,
			age,
			is_family,
			is_male,
			id_parent_user,
			id_division,
			password,
		});

		return res.json({
			status: "success",
			data: user,
		});	
	} catch (error) {
		return res.status(500).json({
			status: 'error',
			message: 'Server error. Something went wrong',
		});
	}	
};

exports.destroy = async (req, res) => {
	const uuid = req.params.uuid;
	const user = await User.findOne({ where: { uuid: uuid } });

	if (!user) {
		return res.status(404).json({
			status: "error",
			message: "User not found",
		});
	}

	try {
		await user.destroy();

		return res.json({
			status: "success",
			message: "User has been deleted"
		});
	} catch (error) {
		return res.status(409).json({
			status: 'error',
			message: error.message,
		});
	}
};

exports.activate = async (req, res) => {
	const uuid = req.params.uuid;
	const user = await User.findOne({ where: { uuid: uuid } });

	if (!user) {
		return res.status(404).json({
			status: "error",
			message: "User not found",
		});
	}

	if (user.is_active == 1)
		return res.status(400).json({
			status: "error",
			message: "User already activated",
		});

	try {
		await user.update({ 
			is_active: 1
		});

		return res.json({
			status: "success",
			message: "User has been activated"
		});
	} catch (error) {
		return res.status(409).json({
			status: 'error',
			message: error.message,
		});
	}
};