const {DataTypes, Model}= require('sequelize');

const db = require('../config/connect_database');
const sequelize = db.getPool();

class TeacherList extends Model{}

TeacherList.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    classRoomId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'classRooms',
            key: 'id'
        }
    },
    teacherId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'teachers',
            key: 'id'
        }
    },
    status: {
        type: DataTypes.SMALLINT,
        defaultValue: 1,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'TeacherList',
    tableName: 'teacherLists',
    timestamps: true,
    createdAt: 'create_at',
    updatedAt: 'update_at'
});

module.exports = TeacherList;