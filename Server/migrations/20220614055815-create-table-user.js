"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("m_family_day_user", {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			uuid: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			password: {
				type: Sequelize.STRING,
				allowNull: false,
			},

			// timestamps

			created_at: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			created_by: {
				type: Sequelize.INTEGER,
				allowNull: true,
			},
			updated_at: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			updated_by: {
				type: Sequelize.INTEGER,
				allowNull: true,
			},
		});
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add reverting commands here.
		 *
		 * Example:
		 * await queryInterface.dropTable('users');
		 */
	},
};
