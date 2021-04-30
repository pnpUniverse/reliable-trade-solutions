const express = require('express');
const { errorHandler } = require('../middleware');
const { login, register, change_duration, get_call_duration } = require('../controllers/users/login');
const { create_call_set, create_sunday_call_set } = require('../controllers/call_set/call_sets');
const { Node } = require('../models/node/node');
const { Home } = require('../models/home/home');
const { Call_Set } = require('../models/call_set/call_set');
const { Sunday_Call_Set } = require('../models/sunday_call_set/sunday_call_set');

const router = express();
const formidable = require('formidable');
const fs = require('fs');
var Promise = require("bluebird");
// register api points
router.use('/c', require('./common'));
router.post('/login', login);
router.post('/register', register);
router.get('/change_call_duration/:duration', change_duration);
router.get('/get_call_duration/', get_call_duration);
router.post('/create_call_set', create_call_set);
router.post('/create_sunday_call_set', create_sunday_call_set);

router.post('/landing_page', function(req, res, next) {
    const form = new formidable.IncomingForm();
    files = [],
    fields = {};
    form.on('field', function(field, value) {
        fields[field] = value;
    })
    form.on('file', function(field, file) {
        var oldPath = file.path;
        const file_new_name = Date.now()+'_'+ file.name;
        var newPath = global.upload_dir_path + '/'+ file_new_name;
        var rawData = fs.readFileSync(oldPath)
        fs.writeFile(newPath, rawData, function(err){
            if(err) console.log(err)
        })
        file.path = newPath;
        if(existsAsync(newPath)){
            files.push(file_new_name);
        } 
    })
    form.on('end', function() {
        fields['banner_image_path'] = files;
        if(!fields._id){
            var myData = new Home(fields);
            myData['slug'] = 'home';
            myData.save().then(item => {
                res.send({status: true, _id: item._id});
            }).catch(err => {
                res.send({status: true, message : err});
            });
        } else {
            JSON.parse(fields.existing_images).forEach(file_name => {
                fields.banner_image_path.push(file_name.imageName);
            });
            const update_obj = {
                _id: fields._id,
                name: fields.name,
                our_vision: fields.our_vision,
                banner_message: fields.banner_message,
                banner_image_path: fields.banner_image_path
            }
            if(fields.deletable_images){
                JSON.parse(fields.deletable_images).forEach(file_name => {
                    fs.exists(`${global.upload_dir_path}/${file_name}`, (exists) => {
                        fs.unlink(`${global.upload_dir_path}/${file_name}`, ()=>{});
                    })
                })
            }
            Home.findOneAndUpdate({_id: fields._id}, update_obj, {new: true, upsert: true, setDefaultsOnInsert: true}, function(error, result) {
                if(error){
                    res.send({status: true, message : error});
                } else {
                    res.send({status: true, _id: result._id});
                }
            });
        }
    });
    form.parse(req);
});

function existsAsync(path) {
  return new Promise(function(resolve, reject){
    fs.exists(path, function(exists){
      resolve(exists);
    })
  })
}

// catch api all errors
router.use(errorHandler);

module.exports = router;