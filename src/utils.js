
String.prototype.format = function() {
	var args = arguments;
	return this.replace(/{(\d+)}/g, function(match, number) {
		return typeof args[number] != 'undefined'
			? args[number]
			: match;
	});
};

String.prototype.startsWith = function(prefix) {
	return this.slice(0, str.length) == str;
};

String.prototype.endsWith = function(suffix) {
	return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

function log(args)
{
	if ( typeof console != 'undefined' )
	{
		$(arguments).each(function(i, msg) {
			console.log(msg);
		});
	}
}
log('message');

function dir(args)
{
	if ( typeof console != 'undefined' )
	{
		$(arguments).each(function(i, msg) {
			console.dir(msg);
		});
	}
}
dir({spam: 'jam'});
