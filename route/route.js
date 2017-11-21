var task=require('../controller/controller.js');
module.exports = function(app) {
	app.post('/signup',task.userSignup);
	app.post('/login',task.userLogin);
	app.post('/create',task.createTask);
	app.get('/get',task.getAllTask);
	app.post('/update',task.updateTask);
	app.post('/delete',task.deleteTask);
	app.post('/afterDate',task.afterDate);
	app.post('/beforeDate',task.beforeDate);
	app.post('/user',task.fillterAsPerUser);
	app.post('/search',task.fullTextSearch);
}