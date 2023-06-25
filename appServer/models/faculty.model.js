const {DataTypes, Model} = require('sequelize');

const db = require('../config/connect_database.config');
const Department = require('./department.model');
const sequelize = db.getPool();
//Khoa
class Faculty extends Model{}

Faculty.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    faculty_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    status: {
        type: DataTypes.SMALLINT,
        defaultValue: 1,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Faculty',
    tableName: 'faculties',
    timestamps: true,
    createdAt: 'create_at',
    updatedAt: 'update_at'
});

Faculty.hasMany(Department, { foreignKey: 'faculty_id'});

module.exports = Faculty;