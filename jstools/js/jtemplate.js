/**
 * 简单模板引擎：模板(template) + 数据(data) = out <br>
 * 使用：<br>
 * {name} --> data.name<br>
 * {person.age} --> data.person.age<br>
 */
~(function() {
	
	function getValue(data, attrsArray) {
		var attr = attrsArray.shift();
		if (!attr) {
			return data == undefined ? '' : data;
		}
		if (!data) {
			throw new Error('The attribute[' + attr + '] not defind!');
		}
		return getValue(data[attr], attrsArray);
	}
	
	function render(templateId, data) {
		var html = document.querySelector('#' + templateId).innerHTML;
		if (!html) {
			throw new Error('The template is not find.');
		}
		data = data ? data : {};
		return html.replace(/({\w.*?})/g, function(match) {
			var attrs = match.substring(1, match.length - 1);
			return getValue(data, attrs.split('.'));
		});
	}
	// export method
	window.render = render;
})();

// test demo
~(function() {
	var template = '<div id="templateId">Name:{name},Age:{person.age}</div>';
	var data = {
		name : 'victor',
		person : {
			age : 18
		}
	};
	document.body.innerHTML = template;
	var out = render('templateId', data);
	console.log('out = '+out);
})();