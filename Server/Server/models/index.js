const { Sequelize } = require('sequelize');
const sequelize = require('../config/database');

const modelDefiners = [
	require('./Activity'),
	require('./Competition'),
	require('./Division'),
	require('./Event'),
	require('./User'),
	require('./UserCompetition'),
	require('./Winner'),
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize);
}

// We execute any extra setup after the models are defined, such as adding associations.
const { 
	User, 
	Event, 
	Competition, 
	UserCompetition, 
	Division, 
	Winner 
} = sequelize.models;

Event.hasMany(Competition, { foreignKey: 'id_event', as: 'competitions' });
Competition.belongsTo(Event, { foreignKey: 'id_event', as: 'event' });

// User >--->UserCompetition<---< Competition
User.belongsToMany(Competition, { 
	through: UserCompetition, 
	foreignKey: 'id_user',
  	otherKey: 'id_competition',
	as: 'your_competitions'
});
Competition.belongsToMany(User, { 
	through: UserCompetition,
	foreignKey: 'id_competition',
  	otherKey: 'id_user', 
	as: 'users'
});
User.hasMany(UserCompetition, { foreignKey: 'id_user' });
UserCompetition.belongsTo(User, { foreignKey: 'id_user' });
Competition.hasMany(UserCompetition, { foreignKey: 'id_competition' });
UserCompetition.belongsTo(Competition, { foreignKey: 'id_competition' });

// Division <---< User
Division.hasMany(User, { foreignKey: 'id_division' });
User.belongsTo(Division, { foreignKey: 'id_division' });

// User.belongsToMany(Competition, { 
// 	through: Winner, 
// 	foreignKey: 'id_user'
// });
// Competition.belongsToMany(User, { 
// 	through: Winner,
// 	foreignKey: 'id_competition',
// });
// Competition.hasMany(Winner, { foreignKey: 'id_competition', as: 'competition' });
// Winner.belongsTo(Competition, { foreignKey: 'id_competition', as: 'competition' });
// User.hasMany(Winner, { foreignKey: 'id_user', as: 'user' });
// Winner.belongsTo(User, { foreignKey: 'id_user', as: 'user' });

// We export the sequelize connection instance to be used around our app.
module.exports = sequelize;