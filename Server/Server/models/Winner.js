const { DataTypes } = require('sequelize');
const { epochNow } = require('../config/values');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize) => {
	sequelize.define('Winner', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true
		},
		uuid: DataTypes.STRING,
		id_user: DataTypes.INTEGER,
		id_competition: DataTypes.INTEGER,
		rank_order: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		score: {
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
		tableName: `o_${process.env.DB_PREFIX}winner`,
		timestamps: false,
		hooks: {
			beforeCreate: (record, options) => {
				record.dataValues.uuid = uuidv4();
				record.dataValues.created_at = epochNow;
				record.dataValues.updated_at = epochNow;
			},
			beforeBulkCreate: (records, options) => {
				for (const record of records) {
					record.dataValues.uuid = uuidv4();
					record.dataValues.created_at = epochNow;
					record.dataValues.updated_at = epochNow;
				}
			},
			beforeUpdate: (record, options) => {
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
