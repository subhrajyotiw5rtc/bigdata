var mongoJs=require('mongojs');
var dateTime = require('node-datetime');
var crypto = require("crypto");
var config=require('../config/config.js');
var database='TASK';
var collections=['f_users','f_task'];
var db=mongoJs(config.url+database, collections);
db.on('connect', function () {
    console.log('database connected')
});
exports.userSignup=function(req,res){
	var username=req.body.username;
	var password=req.body.password;
	var phone=req.body.phone;
	db.f_users.insert({'username':username,'password':password,'phone':phone},function(err,docs){
		if (!err) {
			if (docs) {
				res.json({'message':'User has registered successfully'});
			}
		}
	})
}
exports.userLogin=function(req,res){
	var username=req.body.username;
	var password=req.body.password;
	db.f_users.findOne({'username':username,'password':password},function(err,docs){
		if (!err) {
			if (docs) {
				res.send(docs);
			}
		}
	})
}
exports.createTask=function(req,res){
	var taskname=req.body.taskname;
	var description=req.body.description;
	var dt = dateTime.create();
	var timestamp=dt.format('Y-m-d H:M:S');
	var today = new Date();           
    var formattedtoday = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    var created_by=req.body.created_by;
    var taskid=crypto.randomBytes(16).toString('hex');
    var data={
    	taskname:taskname,
    	description:description,
    	timestamp:timestamp,
    	created_by:created_by,
    	taskid:taskid,
    	created_date:formattedtoday
    }
    db.f_task.insert(data,function(err,docs){
    	if (!err) {
    		if (docs) {
    			res.json({'message':'Your task has been submitted successfully'});
    		}
    	}
    })
}
exports.getAllTask=function(req,res){
	db.f_task.find({},function(err,docs){
		if (!err) {
			if (docs) {
				res.json(docs);
			}
		}
	})
}
exports.updateTask=function(req,res){
	var taskname=req.body.taskname;
	var description=req.body.description;
	var dt = dateTime.create();
	var timestamp=dt.format('Y-m-d H:M:S');
	var today = new Date();           
    var formattedtoday = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    var created_by=req.body.created_by;
    var taskid=req.body.taskid;
	var data={
    	taskname:taskname,
    	description:description,
    	timestamp:timestamp,
    	created_by:created_by,
    	created_date:formattedtoday
    }
	db.f_task.update({'taskid':taskid},{$set:data},function(err,docs){
		if (!err) {
			if (docs) {
				res.json({'message':'Your task has updateed successfully'});
			}
		}
	})
}
exports.deleteTask=function(req,res){
	var taskid=req.body.taskid;
	db.f_task.remove({'taskid':taskid},function(err,docs){
		if (!err) {
			if (docs) {
				res.json({'message':'Your task has deleted successfully'});
			}
		}
	})
}
exports.afterDate=function(req,res){
	var adate=req.body.date;
	db.f_task.find({'created_date':{'$gte':adate}},function(err,docs){
		if (!err) {
			if (docs) {
				res.send(docs);
			}
		}
	})
}
exports.beforeDate=function(req,res){
	var adate=req.body.date;
	db.f_task.find({'created_date':{'$lte':adate}},function(err,docs){
		if (!err) {
			if (docs) {
				res.send(docs);
			}
		}
	})
}
exports.fillterAsPerUser=function(req,res){
	var user=req.body.user;
	db.f_task.find({'created_by':user},function(err,docs){
		if (!err) {
			if (docs) {
				res.send(docs);
			}
		}
	})
}
exports.fullTextSearch=function(req,res){
	var tesearch=req.body.searchtext;
	db.f_task.createIndex({"taskname":"text","description":"text"});
	db.f_task.find({$text: {$search: tesearch}},function(err,docs){
		if (!err) {
			if (docs) {
				res.send(docs);
			}
		}
	})
}