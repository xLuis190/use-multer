var express = require('express'),
multer = require('multer'),
bodyParser = require('body-parser'),
path = require('path'),
crypto = require('crypto'),
app = express();

var storage = multer.diskStorage({
	destination: './uploads/',
	filename: function (req, file, cb) {
		crypto.pseudoRandomBytes(16, function (err, raw) {
			if (err) return cb(err)

				cb(null, file.originalname)
		})
	}
})


app.use(bodyParser.json());

app.get('/', function(req, res){
	res.sendFile(__dirname+'/index.html');
});

app.post('/', multer({ storage: storage}).single('upl'), function(req,res){
	console.log(req.body);
	console.log(req.file.filename);
	res.status(204).end();
});

app.listen(80);