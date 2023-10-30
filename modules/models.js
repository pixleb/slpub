const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize(
    //'a0864360_db',
    //'a0864360_db',
    //'password1',
    // { dialect: 'mysql', host: 'localhost' }
    { dialect: 'sqlite', storage: 'db.sqlite', logging: false }
);

/*
    Main database entities is:
    - UserModels
    - ProjectModels (related to UserModels)
    - ProjectsNodes (related to ProjectModels)
*/

// user class. independent
class UserModel extends Model { }
UserModel.init(
    {
        googleID:    { type: DataTypes.STRING, allowNull: false, },
        lastPayment: { type: DataTypes.DATE,   allowNull: true,  },
    }, 
    { sequelize, modelName: 'UserModel' }
);


// project class. related to user
class ProjectModel extends Model { }
ProjectModel.init(
    {
        name: { type: DataTypes.STRING, allowNull: false, }
    }, 
    { sequelize, modelName: 'ProjectModel' }
);

// user model relation
UserModel.hasMany(ProjectModel, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    as:       'ProjectModel',
});
ProjectModel.belongsTo(UserModel, {
  foreignKey: 'UserModelId',
  as:         'UserModel',
});

// project nodes. contains slides in an HTML and JSON code from Unlayer
class ProjectNode extends Model { }
ProjectNode.init(
    {
        html: { type: DataTypes.STRING, allowNull: false, },
        json: { type: DataTypes.STRING, allowNull: false, },
    },
    { sequelize, modelName: 'ProjectNode' }
);

// project model relation
ProjectModel.hasMany(ProjectNode, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    as:       'ProjectNode',
});
ProjectNode.belongsTo(ProjectModel, {
  foreignKey: 'ProjectModelId',
  as:         'ProjectModel',
});


module.exports = { sequelize, UserModel, ProjectModel, ProjectNode }
