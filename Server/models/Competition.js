const { DataTypes } = require('sequelize');
const { epochNow } = require('../config/values');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize) => {
	sequelize.define('Competition', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true
		},
		uuid: DataTypes.STRING,
		name: {
			type: DataTypes.STRING,
			allowNull: true
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		pic: {
			type: DataTypes.STRING,
			allowNull: true
		},
		phone_number: {
			type: DataTypes.STRING,
			allowNull: true
		},
		file_rule: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		banner: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		id_event: DataTypes.INTEGER,
		competition_start_date: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		competition_end_date: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		registration_start_date: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		registration_end_date: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		is_strava: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		created_at: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		created_by: {
			type: DataTypes.STRING,
			allowNull: true
		},
		updated_at: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		updated_by: {
			type: DataTypes.STRING,
			allowNull: true
		},
		deleted_at: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
	}, {
		tableName: `o_${process.env.DB_PREFIX}competition`,
		timestamps: false,
		hooks: {
			beforeCreate : (record, options) => {
				record.dataValues.uuid = uuidv4();
				record.dataValues.created_at = epochNow;
				record.dataValues.updated_at = epochNow;
			},
			beforeUpdate : (record, options) => {
				record.dataValues.updated_at = epochNow;
			},
			afterCreate: (record) => {
                delete record.dataValues.id;
            },
            afterUpdate: (record) => {
                delete record.dataValues.id;
            },
		}
	});
}
