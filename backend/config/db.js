import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('moodmosiac-db', 'admin', 'Ccl#project1234', {
  host: 'moodmosiac-db.c32eqwwo2fuz.ap-south-1.rds.amazonaws.com',
  dialect: 'mysql', 
  port: 3306,
});

export default sequelize;
