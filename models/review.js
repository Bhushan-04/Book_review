'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      Review.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      Review.belongsTo(models.Book, { foreignKey: 'bookId', as: 'book' });
    }
  }

  Review.init(
    {
      rating: { type: DataTypes.INTEGER, allowNull: false },
      comment: { type: DataTypes.TEXT },
      userId: { type: DataTypes.INTEGER, allowNull: false },
      bookId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: 'Review',
      tableName: 'Reviews',
    }
  );

  return Review;
};
