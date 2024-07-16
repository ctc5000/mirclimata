const {Sequelize} = require('sequelize');
const {applyExtraSetup} = require('./extra-setup');
require('dotenv').config()

const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.BASELOGIN,
    process.env.BASEPASSWORD,
    {
        host: process.env.BASEPHOST,
        dialect: 'postgres',
        // logging: false
    }
)

const modelDefiners = [
   /* require('../Models/Users/User.model'),
    require('../Models/Money/Money.model'),
    require('../Models/Fruits/Fruits.model'),
    require('../Models/Fruits/usersfruits.model'),
    require('../Models/Friends/Friends.model'),
    require('../Models/Users/UserLvl.model'),
    require('../Models/LvlBoard/LvlBoard.model'),
    require('../Models/DailyTasks/DailyTask.model'),
    require('../Models/DailyTasks/userTasks.model'),
    require('../Models/Stamina/Stamina.model'),
    require('../Models/Drakariki/Drakariks.model'),
    require('../Models/Items/Items.model'),
    require('../Models/Items/usersItems.model.js'),
    require('../Models/Cards/Card.model'),
    require('../Models/Cards/UsersCard.model'),
    require('../Models/QrCodes/QrCode.model'),*/


];
// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize);
}

// We execute any extra setup after the models are defined, such as adding associations.
applyExtraSetup(sequelize);

// We export the sequelize connection instance to be used around our app.
module.exports = sequelize;
