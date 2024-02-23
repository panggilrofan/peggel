var json = require('./package.json');
var version = json.gostVersion;

var os = require('os');

var platform = {
	'darwin': 'darwin',
	'linux': 'linux',
	'win32': 'windows'
}[os.platform()];

var arch = {
	'arm': 'arm',
	'x86': '386',
	'ia32': '386',
	'x64': 'amd64'
}[os.arch()];

var format = {
	'darwin': 'zip',
	'linux': 'tar.gz',
	'win32': 'zip'
}[os.platform()];

var path =
	'gost_' +
	version + '_' +
	platform + '_' +
	arch;

var url =
	'https://github.com/ginuerzh/gost/releases/download/v' +
	version + '/' +
	path + '.' +
	format;

console.log('downloading gost from', url);

require('download')(url, '.', {extract: true}).then(() =>{

	var cp = require('child_process');

	if (platform === 'windows')
		cp.exec('move ' + path + '\\gost.exe gost.exe');
	else
		cp.exec('mv '+ path + '/gost gost.exe');

});
