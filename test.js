var request = require('request');
var test = require('tape');
var child = require('child_process');
var server;

test('Start the test server', function(t){
	server = child.spawn('node', ['twitter.js']);
	server.stdout.once('data', (data) => {
	  console.log(`stdout: ${data}`);
	  t.ok(data.toString().indexOf('running'), 'server is running');
	  t.end();
	});
})


test('Get tweets for user', function(t){
  request('http://localhost:9999/user/emplums', function(error, response, data){
  	if (error) {
  		t.error(error);
  		return t.end();
  	}

  	t.ok(data.toString().indexOf('you have tweeted about cats'), 'tweet count retrieved');
  	t.end();
  })
})

test('Kill the test server', function(t){
	server.on('close', function(code){
		t.false(code, 'Exit code is null');
		t.end();
	});
	server.kill();
});
