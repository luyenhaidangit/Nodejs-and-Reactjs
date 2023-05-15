const {DataTypes, Model} = require('sequelize');

const db = require('../config/connect_database');
const sequelize = db.getPool();

class Question extends Model{}

Question.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    examId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Post',
            key: 'id'
        }
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    score: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    questionCategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'questionCategories',
            key: 'id'
        }
    },
    status: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 1
    }
}, {
    sequelize,
    modelName: 'Question',
    tableName: 'Questions',
    timestamps: true,
    createdAt: 'create_at',
    updatedAt: 'update_at'
});

module.exports = Question;