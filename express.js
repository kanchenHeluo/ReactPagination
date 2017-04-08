var express = require('express'),
	fs = require('fs');

var app = express();
app.use(express.static('public'));
app.use(function(req, res, next){
	res.header("Access-Control-Allow-Origin","*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.get('/', function(req, res){
	res.send('Hello World');
})

app.get('/filelist', function(req, res){
	fs.readFile('public/filelist.json', function(err, data){
		if(err){
			res.send('error in reading filelist.json');
		}
		res.json(data.toString());
	})
})

var server = app.listen(8081, function(){
	var host = server.address().address;
	host = (host == '::') ? 'localhost' : host;
	var port = server.address().port;

	console.log('the instance is active at: http://%s:%s', host, port);

})