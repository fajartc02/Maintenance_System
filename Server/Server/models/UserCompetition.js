const { DataTypes } = require('sequelize');
const { epochNow } = require('../config/values');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize) => {
	sequelize.define('UserCompetition', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true
		},
		uuid: DataTypes.STRING,
		id_user: DataTypes.INTEGER,
		id_competition: DataTypes.INTEGER,
		is_disqualified: {
			type: DataTypes.INTEGER,
			defaultValue: 0
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
		tableName: `o_${process.env.DB_PREFIX}user_competition`,
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
