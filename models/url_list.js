'use strict';
module.exports = function(sequelize, DataTypes) {
  var url_list = sequelize.define('url_list', {
    url: DataTypes.STRING,
    short_url: {
      type:DataTypes.STRING,
      unique: true
    },
    count: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    hooks: {
      beforeCreate: (callback) => {
        let random = "11234567890abcdefghijklmnopqrstuvwxyz01234567899"
        let kocok = []
        for (let i = 0; i<5; i++) {
          kocok.push(random[Math.floor(Math.random()*random.length)])
        }
        callback.short_url = kocok.join('')
      }
    }
  });
  return url_list;
};