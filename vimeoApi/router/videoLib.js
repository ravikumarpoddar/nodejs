let express = require('express');
let Vimeo = require('vimeo').Vimeo;
let multer  =   require('multer');
var crypto = require('crypto');
var fs = require('fs');
var conn = require('../dbpool/db');

let r = express.Router();

function RandNum(minimum, maximum){
  var distance = maximum-minimum;
	
	if(minimum>=maximum){
		console.log('Minimum number should be less than maximum');
		return false;
	} else if(distance>281474976710655){
		console.log('You can not get all possible random numbers if range is greater than 256^6-1');
		return false;
	} else if(maximum>Number.MAX_SAFE_INTEGER){
		console.log('Maximum number should be safe integer limit');
		return false;
	} else {
		var maxBytes = 6;
		var maxDec = 281474976710656;
		
		var randbytes = parseInt(crypto.randomBytes(maxBytes).toString('hex'), 16);
		var result = Math.floor(randbytes/maxDec*(maximum-minimum+1)+minimum);
		
		if(result>maximum){
			result = maximum;
		}
		return result;
	}
}
var val = RandNum(9, 999999);
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-'+ val +'.mp4')
  }
});
var upload = multer({storage: storage});

let client = new Vimeo("user88972061", "ymKSw6Iv+/uv+kCYMUTOK+2HyblpA5PY+Iz5iqGcwlpCfUj1A7JUX57tkBsZ7ou4TL8p5o/U4+9jpmLLJKQfZWx+68iPYzqCht3juHXAgtNky9w/ttoiEIWoz3xB7T/0", "1e686a258b2fdc5f4c1ba9a4798778ec");



r.post('/addvideomodule/:mid/:vid',upload.single('file'), (req, res) =>{


var uid = req.params.mid;  
var vid = req.params.vid


let file_name='/home/vrook/adminApi/vimeoApi/public/file-'+val+'.mp4'

client.request({
  method: 'GET',
  path: '/tutorial'
}, function (error, body, status_code, headers) {
  
  client.upload(
    file_name,
    {
      'name': 'vrook',
      'description': 'The description goes here.'
    },
    function (uri) {

      fs.unlink(file_name, (err) => {
        if (err) throw err;
        console.log( file_name + 'deleted');
      });

      var sql = "UPDATE video_mode_repo SET url=? WHERE id=? and mod_id=?"

     var arr = uri.split("/");
     
      
      conn.query(sql,[parseInt(arr[2]), parseInt(vid), parseInt(uid)],(err, result)=>{
        conn.end();
          if(err){
            console.log(err);
              res.status(403).json({
                "Status":"Try Again"
              });
          }else{
              res.status(200).json({
                "Status":"Ok"
              })
          }
          
      });

     
    },
    function (bytes_uploaded, bytes_total) {
      var percentage = (bytes_uploaded / bytes_total * 100).toFixed(2)
      
      console.log(bytes_uploaded, bytes_total, percentage + '%')

     
  
    },
    function (error) {
      
      console.log('Failed because: ' + error)
    }
  )
})

});

module.exports = r;