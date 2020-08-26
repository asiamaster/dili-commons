(function(global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(jQuery, hotkeys) :
		typeof define === 'function' && define.amd ? define(['jquery', 'hotkeys'], factory) :
			(global = global || window, global.hk = factory(jQuery, hotkeys));
}(this, function($, hotkeys) {

	/**
	 * 扩展jquery 对象方法（快捷键注册）
	 * @param hotkey
	 */
	$.fn.hotkeys = function (hotkey) {
		let args = arguments;
		this.each(function () {
			let key = hotkey ? hotkey : $(this).attr('hotkey');
			hotkeys(key, (e, handler) => {
				if ($(this).is(":hidden"))
					return;
				e.preventDefault();
				$(this).trigger(args[1] ? args[1] : 'click');
			});
		})
	}

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
		hotkeys.filter = function (e) {
			let el = e.target;
			let tagName = el.tagName;
			let type = el.type;
			return !(el.isContentEditable || (type == 'text' || type == 'number' || type == 'password' || type == 'email' || type == 'url' || type == 'date' || type == 'search') //可编辑标签快捷键失效
				|| (tagName === 'TEXTAREA' || tagName === 'SELECT'))  //多行文本框、下拉
				||	el.readOnly || el.disabled || e.ctrlKey || e.altKey || e.shiftKey //只读、禁用、(ctrl、alt、shift组合快捷键)
				|| (e.keyCode >= 112 && e.keyCode <= 135) //F1-F24
				|| e.key == 'Enter' || e.key == 'ArrowLeft' || e.key == 'ArrowRight' //回车、方向左、方向右
				;
		}

		//扫描监听相关自定义快捷键
		$('[hotkey]').hotkeys();

		//扫描监听enter right快捷键
		hotkeys('enter', (e, handler) => {
			console.log('you press ' + handler.key);
			let el = e.target;
			e.preventDefault();
			let nextEl = nextCtl(el, 1);
			nextEl.focus();
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
