
function FileListing(id)
{
	this._id = id;
	this._jElement = $(this._id);
	this._jElement.scroll(this._layoutChanged.bind(this));
	$(window).resize(this._layoutChanged.bind(this));
	this._element = this._jElement[0];
}

FileListing.prototype.load = function(files)
{
	log('load');

	function buildTree(root, i, file)
	{
		var li = $('<li><span>{0}</span></li>'.format(file.name));
		li.addClass(file.kind);
		file.node = li;
		if (file.kind != 'FILE')
		{
			var ul = $('<ul class="file-listing">');
			$(file.children).each(buildTree.bind(this, ul));
			li.append(ul);
		}
		else if (file.persist)
		{
			li.addClass('persist');
		}
		root.append(li);
	}

	var top = $('<ul class="file-listing top">');
	this._top = $('<ul class="file-listing">');
	top.append(this._top);
	this._main = $('<ul class="file-listing main">');
	var bottom = $('<ul class="file-listing bottom">');
	this._bottom = $('<ul class="file-listing">');
	bottom.append(this._bottom);

	$(files).each(buildTree.bind(this, this._main));

	this._jElement.append(top, this._main, bottom);
	this._layoutChanged();
}

FileListing.prototype._layoutChanged = function(event)
{
	log('_scroll');
	//dir(event);
	//log(this._element.offsetHeight, event.scrollTop);

	persistent = this._main.find('.persist');
//	log(persistent);
	$(persistent).each(function(i, node) {
		var inView = isScrolledIntoView(node, this._element);
		node = $(node);
//		log(i + ': ' + inView);
		if (inView != INVIEW)
		{
			var placeholder = node.clone().removeClass('persist').addClass('placeholder');
			placeholder[0].originalNode = node;
			node.replaceWith(placeholder);
			this._top.append(node);
		}
	}.bind(this));

	var placeholders = this._main.find('.placeholder');
//	log(placeholders);
	$(placeholders).each(function(i, placeholder) {
		var inView = isScrolledIntoView(placeholder, this._element);
		node = $(placeholder);
//		log(i + ': ' + inView);
		if (inView == INVIEW)
		{
			node.replaceWith(placeholder.originalNode);
		}
	}.bind(this));
}

var INVIEW = 'visible', ABOVE = 'above', BELOW = 'below';

function isScrolledIntoView(elem, parent)
{
	parent = parent || window;
	var parentTop = $(parent).offset().top;
	var parentBottom = parentTop + $(parent).height();

	var elemTop = $(elem).offset().top;
	var elemBottom = elemTop + $(elem).height();

	if ( (elemBottom >= parentTop) && (elemTop <= parentBottom)
	  && (elemBottom <= parentBottom) && (elemTop >= parentTop) )
	{
		return INVIEW;
	}
	else if (elemBottom < parentBottom)
	{
		return ABOVE;
	}
	else
	{
		return BELOW;
	}
}
