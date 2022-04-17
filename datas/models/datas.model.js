const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const dataSchema = new Schema({
    text:String,
    label:String
},
{ timestamps: true });

dataSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
dataSchema.set('toJSON', {
    virtuals: true
});

dataSchema.findById = function (cb) {
    return this.model('Datas').find({id: this.id}, cb);
};

const data = mongoose.model('Datas', dataSchema);


exports.findByLabel = (email) => {
    return data.find({label: email});
};
exports.findById = (id) => {
    return data.findById(id)
        .then((result) => {
            result = result.toJSON();
            delete result._id;
            delete result.__v;
            return result;
        });
};

exports.createdata = (dataData) => {
    const datas = new data(dataData);
    return datas.save();
};

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        data.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, datas) {
                if (err) {
                    reject(err);
                } else {
                    resolve(datas);
                }
            })
    });
};

exports.patchdata = async (id, dataData) => {
   let doc= await data.findOneAndUpdate({
        _id: id
    }, dataData,{new:true,returnOriginal:false,returnNewDocument:'after'},function (err, datas) {
        if (err) {
            console.log(err);
        }
        console.log(datas)
    });
    console.log(doc)
    return doc
};

exports.removeById = (dataId) => {
    return new Promise((resolve, reject) => {
        data.deleteMany({_id: dataId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};

data.createIndexes();