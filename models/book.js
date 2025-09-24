'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    static associate(models) {
      Book.hasMany(models.Review, { foreignKey: 'bookId', as: 'reviews' });
    }
  }

  Book.init(
    {
      title: { type: DataTypes.STRING, allowNull: false },
      author: { type: DataTypes.STRING, allowNull: false },
      genre: { type: DataTypes.STRING },
      description: { type: DataTypes.TEXT },
    },
    {
      sequelize,
      modelName: 'Book',
      tableName: 'Books',
    }
  );

  return Book;
};
