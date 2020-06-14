(function(global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(jQuery, hotkeys) :
		typeof define === 'function' && define.amd ? define(['jquery', 'hotkeys'], factory) :
			(global = global || window, global.hk = factory(jQuery, hotkeys));
}(this, function($, hotkeys) {
	/**
	 * 获取下一个焦点元素
	 * @param $ctl
	 * @param type 1：前进一位 2：后退一位
	 * @returns {*}
	 */
	function nextCtl($ctl, type) {
		let root = $($ctl).hasClass('modal') ? $($ctl) : $('body');
		let $el = root.find(hk.focusElSelector).filter(hk.focusElFilter);
		let nextEl;
		if (!$ctl) {
			return $el.get(0);
		}
		$el.each(function(index) {
			if (index == $el.index($ctl)) {
				let nextIndex;
				if (type == 1) {
					nextIndex = index < $el.length - 1 ? index + 1 : $el.length - 1;
				} else {
					nextIndex = index == 0 ? 0 : index - 1;
				}
				nextEl = $el.get(nextIndex);
				return false;
			}
		});
		return nextEl ? nextEl : $el.get(0);
	}

	const start = function() {
		// 如何增加过滤可编辑标签 <div contentEditable="true"></div>
		// contentEditable老浏览器不支持滴
		hotkeys.filter = function(e) {
			let el = e.target || e.srcElement;
			let tagName = el.tagName;
			let type = el.type;
			if (!(el.isContentEditable || (type == 'text' || type == 'number' || type == 'password' || type == 'email' || type == 'url' || type == 'date' || type == 'search') || (tagName === 'TEXTAREA' || tagName === 'SELECT')) ||
				el.readOnly || el.disabled || e.ctrlKey || e.altKey || e.shiftKey || (e.keyCode >= 112 && e.keyCode <= 135)) { //事件元素非输入域或不可编辑状态
				hotkeys.setScope('non-input-field');
			} else { //事件元素输入域
				hotkeys.setScope();
			}
			return true;
		}

		//扫描监听相关自定义快捷键
		$('[hotkey]').each(function(index) {
			let key = $(this).attr('hotkey');
			hotkeys(key, {
				scope: 'non-input-field'
			}, (e, handler) => {
				if($(this).is(":hidden"))
					return;
				console.log('you press ' + handler.key);
				e.preventDefault();
				$(this).on('click',function(e){
					console.log(e.target);
					if($(this).attr('preventDefault') !== undefined)
						e.preventDefault();
				});
				$(this).trigger('click');
			});
		});

		//扫描监听enter right快捷键
		hotkeys('enter', (e, handler) => {
			console.log('you press ' + handler.key);
			let el = e.target;
			if ($(el).is(hk.focusElSelector) && $(el).is(hk.focusElFilter)) {
				e.preventDefault();
				let nextEl = nextCtl(el, 1);
				nextEl.focus();
			}
		});

		//扫描监听enter right快捷键
		hotkeys('right', (e, handler) => {
			console.log('you press ' + handler.key);
			e.preventDefault();
			let el = e.target;
			let nextEl = nextCtl(el, 1);
			nextEl.focus();
		});

		//扫描监听left快捷键
		hotkeys('left', (e, handler) => {
			console.log('you press ' + handler.key);
			e.preventDefault();
			let el = e.target;
			nextCtl(el, 2).focus();
		});
	}

	return {
		start,
		focusElSelector : 'input,textarea,select,[contenteditable]',
		focusElFilter : ':not(:hidden,[type="button"],[type="reset"],[type="submit"],[readonly],[disabled])'
	};
}));
