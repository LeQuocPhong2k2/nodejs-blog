module.exports = {
    mutipleMongooseToObject: function(mongooseArray) {
        return mongooseArray.map(mongooseArray => mongooseArray.toObject());
    },
    mongooseToObjec: function(mongoose) {
        return mongoose ? mongoose.toObject() : mongoose;
    }
};