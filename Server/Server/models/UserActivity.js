const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserActivity = sequelize.define('UserActivity', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	uuid: DataTypes.UUID,
    id_activity: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER,
    id_competition: DataTypes.INTEGER,
    distance: DataTypes.INTEGER,
    moving_time: DataTypes.INTEGER,
    elapsed_time: DataTypes.INTEGER,
    strava_activity_id: DataTypes.INTEGER,
    strava_activity_data: DataTypes.JSON,
    submission_file:DataTypes.TEXT,
    submission_desc:DataTypes.TEXT,
    is_disqualified:{
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    deleted_at:DataTypes.INTEGER,
    updated_at:
    DataTypes.INTEGER,
    created_at:DataTypes.INTEGER,
    updated_by:DataTypes.INTEGER,
    created_by:DataTypes.INTEGER,
    created_by:DataTypes.INTEGER,
}, {
	// tableName: 'o_user_activity',
	tableName:`o_${process.env.DB_PREFIX}user_activity`,
	timestamps: true,
	createdAt: 'created_at',
	updatedAt: 'updated_at'
});

module.exports = UserActivity;