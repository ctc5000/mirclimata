const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define(
        'Images',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
            orginalimage: {
                type: DataTypes.STRING,
            },
            qrimage:
                {
                    type: DataTypes.STRING,
                },

        },

        {
            freezeTableName: true,
            tableName: 'Images',
        }
    )
}