var Assert = {
	areEqual: function (expected, actual, message) {
		if (expected == actual) return;
		throw "{0}\nExpected: {1}\n  Actual: {2}".format(
			message,
			JSON.stringify(expected),
			JSON.stringify(actual)
		);
	}
	, areNotEqual: function (expected, actual, message) {
		if (expected != actual) return;
		throw "{0}\nExpected: Not equal to &lt;{1}&gt;\n  Actual: {2}".format(
			message,
			JSON.stringify(expected),
			JSON.stringify(actual)
		);
	}
};

function runTests(cases, action)
{
	var resultBox = $('#result');
	var resultTable = $('<table>');
	resultBox.append(resultTable);
	$(cases).each(function (index, data) {
		var result = false;
		var reason = 'pass';
		try { action(data); result = true; }
		catch (err)
		{
			result = false;
			reason = err;
		}

		var row = $('<tr><th>{0}</th><td>{1}</td></tr>'.format(JSON.stringify(data), reason));
		resultTable.append(row);
		row.addClass(result ? 'pass' : 'fail');
	});
}
