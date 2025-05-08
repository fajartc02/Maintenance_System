const { DataTypes } = require('sequelize');
const { epochNow } = require('../config/values');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize) => {
	sequelize.define('User', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true
		},
		uuid: DataTypes.STRING,
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		},
		age: {
			type: DataTypes.INTEGER,
		},
		is_family: {
			type: DataTypes.INTEGER,
		},
		is_male: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		gender: {
			type: DataTypes.VIRTUAL,
			get() {
				return this.is_male == 1 ? 'male' : 'female';
			},
			set(value) {
				throw new Error('Do not try to set the `gender` value!');
			}
		},
		noreg: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		id_division: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		id_parent_user: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		token: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		strava_id: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		strava_token_access: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		strava_token_refresh: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		strava_token_access: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		strava_token_expire_at: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		is_active: {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue: 0,
			get() {
				return this.getDataValue('is_active') ? true : false;
			}
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
	},
	{
		tableName: `m_${process.env.DB_PREFIX}user`,
		timestamps: false,
		indexes: [{
			unique: true,
			fields: ['email']
		}],
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
                delete record.dataValues.password;
            },
            afterUpdate: (record) => {
                delete record.dataValues.id;
                delete record.dataValues.password;
            },
		}
	});
};
