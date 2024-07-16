const {models} = require('../../sequelize');
async function SynchBd()
{
    await models.Images.sync({force: false, alter: true });

}
async function RebuildBd()
{
    await models.Images.sync({force: true, alter: true });

}
module.exports = {
    SynchBd,
    RebuildBd,
}