/**
 *  Parses the given URL into its different components.
 *
 *  TODO: Implement this function.
 *  NOTE: You may implement additional functions as you need, as long as this
 *    function behaves as specified in the instructions. Have fun! :)
 **/

var _scheme;
var _username;
var _password;
var _host;
var _port;
var _path;
var _query;
var _fragment
var parser = document.createElement('a');

function parse(url) {

	_scheme = getScheme(url);
	_username = getUsername(url);
	_password = getPassword(url);
	_host  = getHost(url);
	_port = getPort(url);
	_path = getPath(url);
	_query = getQuery(url);
	_fragment = getFragment(url);
	
	var obj = {
	    scheme: _scheme,

	    authority: {
	      username: _username,
	      password: _password,
	      host: _host,

	      port: _port
	    },

	    path: _path,

	   	query: _query,
	    fragment: _fragment	  
	};

	return obj;
}

function getScheme(url) {
	parser.href = url;

	var scheme = parser.protocol
	scheme =  scheme.split(":")
	scheme =  scheme[0]
	
	return scheme;
}

function getUsername(url) {
	parser.href = url;

	var username = parser.username
	if (username == '') {
		return null;
	}
	username = username.split(":")
	username = username[0]

	if (username.match(/%[0-9a-f]{2}/i)) {
    	username = decodeURIComponent(username)
	}
	
	return username
}

function getPassword(url) {
	parser.href = url;

	var password = parser.password
	if (password == '') {
		return null;
	}
	if (password.match(/%[0-9a-f]{2}/i)) {
    	password = decodeURIComponent(password)
	}
	
	return password
}

function getHost(url) {
	parser.href = url;

	var host = parser.hostname
	if (host == '') {
		return null;
	}
	
	return host
}

function getPort(url) {
	parser.href = url;

	const HTTPS_SCHEME = 'https';
 	const SSH_SCHEME = 'ssh';
 	const FTP_SCHEME = 'ftp';
 	const HTTP_HOST = 'http';
 
 	const HTTPS_PORT = '443';
 	const SSH_PORT = '22';
 	const FTP_PORT = '21';
 	const HTTP_PORT = '80';
 
 	const EMPTY = ''; 

	var port = parser.port
	
	if (_scheme === HTTPS_SCHEME && port === EMPTY) {
 		port = HTTPS_PORT;
 	} else if (_scheme === SSH_SCHEME && port === EMPTY) {
 		port = SSH_PORT;
 	} else if (_scheme === FTP_SCHEME && port === EMPTY) {
 		port = FTP_PORT;
 	} else if (_host === null && port === EMPTY) {
 		port = null;
 	} else if (_host !== HTTP_HOST && port === EMPTY) {
 		port = HTTP_PORT;
  	} 
	return port
}

function getPath(url) {
	parser.href = url;

	var path = parser.pathname

	if ((path === '/') && (url.charAt(url.length-1) === '/')) {
		return '/'
	} else if ((path === '/') && isNotAfterSlash('?', url)) {
  		return ''
	} else if ((path === '/') && isNotAfterSlash('#', url)) {
  		return ''
  	} else if (path.match(/%[0-9a-f]{2}/i)) {
    	path = decodeURIComponent(path)
	}

	return path
}

function getQuery(url) {
	parser.href = url;

	var queryString = parser.search
	if (queryString == '') {
		return null;
	}
	var query = {};
    var a = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
	
	for (i = 0; i < a.length; i++) {
    	b = a[i].split('=');
    	query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '');
   	}

    return query;
}

function getFragment(url) {
	parser.href = url;

	var fragment = parser.hash;
	if (fragment == '') {
		return null;
	}
	fragment = fragment.split("#")
	fragment = fragment[1]

	if (fragment.match(/%[0-9a-f]{2}/i)) {
    	fragment = decodeURIComponent(fragment)
	}
	
	return fragment
}

function isNotAfterSlash(char, url) {
	return url.charAt(url.indexOf(char)-1) !== '/';
}