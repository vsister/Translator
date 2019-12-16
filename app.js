const mongoose = require("mongoose");
const translate = require('translate')
const Schema = mongoose.Schema;
mongoose.connect('mongodb://user:perfectpassword1998@ds042898.mlab.com:42898/gridncloud', { useNewUrlParser: true });
translate.engine = 'yandex';
translate.key = 'trnsl.1.1.20191210T115214Z.4531ec268421712a.ff53d329c913eb07df8eec7c438028871bcbff83';

const userSchema = mongoose.Schema({
    githubId: String,
    original: String,
    translated: String
})

const User = mongoose.model('User', userSchema)

translate(process.env.TEXT, { from:process.env.LANG1, to: process.env.LANG2 }).then(async text =>  {
    await User.findOneAndUpdate({ githubId:process.env.ID},{translated: text}, function(err, doc){
        mongoose.disconnect();
    
        if(err) return console.log(err);
        })
    console.log(text)
})