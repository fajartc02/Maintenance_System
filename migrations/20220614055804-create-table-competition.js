'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('o_family_day_competition', { 
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
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      details: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      activity_type_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      event_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      pic: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      started_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      ended_at: {
        type: Sequelize.DATE,
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

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
