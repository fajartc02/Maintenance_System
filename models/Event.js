const { DataTypes } = require('sequelize');
const { epochNow } = require('../config/values');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize) => {
	sequelize.define('Event', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true
		},
		uuid: DataTypes.STRING,
		name: DataTypes.STRING,
		description: DataTypes.TEXT,
		pic: DataTypes.STRING,
		phone_number: DataTypes.STRING,
		file_banner: DataTypes.STRING,
		event_start_date: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		event_end_date: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		created_at: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		updated_at: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		deleted_at: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
	}, {
		tableName: `o_${process.env.DB_PREFIX}event`,
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