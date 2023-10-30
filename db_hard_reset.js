let { sequelize, UserModel, ProjectModel, ProjectNode } = require('./modules/models');

// ЭТА ХЕРНЯ ПОЧИНИТ БАЗЫ, ПЕРЕСОЗДАСТ ИХ, ВЫЛЕЧИТ ПРОСТАТИТ, 
// ПОДАРИТ ТЕБЕ ПЛОЙКУ И СЕКС, ВСЕГО ДВЕ ЛОЖКИ db_hard_reset.js И ГЛИСТЫ КОМОМ ВЫЙДУТ 

const THE_FUCKING_CURE = async () => 
{

    await sequelize.drop();
    console.log('tables dropped, creating new ones...');

    await sequelize.sync({
        force: true
    });
    console.log('tables synchronized.');

}

THE_FUCKING_CURE()
