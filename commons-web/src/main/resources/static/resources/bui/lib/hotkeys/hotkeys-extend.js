/**
 * hotkeys-extend.js 前端WEB快捷键组件模块
 * @Date 2020-09-01 17:30:00
 * @author jiangchengyong
 *
 ***/

;(function(global, factory) {
	typeof module !== 'undefined' && typeof exports === 'object' ? module.exports = factory() :
		typeof define === 'function' && (define.cmd || define.amd) ? define(factory) :
			(global.hotkey = factory());
}(this, function() {

	/**
	 * 焦点转移
	 */
	let _focusShift = {
		//焦点转移默认配置项
		defaults: {
			scanProp: '[focus-shift]',
			enableHotkeys: ['ENTER', 'RIGHT', 'LEFT', 'ESC'],
			focusElFilter: ':not(:hidden,[readonly],[disabled])'
		},
		options: {},
		init: function(options) {
			let opts = this.options = $.extend({}, this.defaults, options);
			//扫描监听enter right快捷键
			opts.enableHotkeys.forEach(function(item, index, arr) {
				arr[index] = arr[index].toUpperCase();
			})

			//扫描监听enter right快捷键
			opts.enableHotkeys.includes('ENTER') && hotkeys('ENTER', (e, handler) => {
				e.stopPropagation();
				console.log('you press ' + handler.key);
				let el = e.target;
				let tagName = el.tagName;
				console.log(el)
				let type = el.type;
				if (type != 'button' && type != 'submit' && type != 'reset' && tagName != 'BUTTON') {
					e.preventDefault();

					if ($(el).hasClass('select2-selection--single') || $(el).hasClass('select2-search__field')) {
						let $select2Container = $(el).parents('.select2-container');
						el = $select2Container.siblings('select');
						if ($(el).length > 0) {
							if ($(el).attr('multiple') && $select2Container.siblings('.select2-container').length == 1
								&& $select2Container.siblings('.select2-container').find('.select2-results__option.select2-results__message').length == 0)
								return;
							$(el).select2('close');
							this.nextCtl(el, 1).focus();
						}
						return;
					}
					this.nextCtl(el, 1).focus();
				}
			});

			//扫描监听enter right快捷键
			opts.enableHotkeys.includes('RIGHT') && hotkeys('RIGHT', (e, handler) => {
				console.log('you press ' + handler.key);
				e.preventDefault();
				let el = e.target;
				if ($(el).hasClass('select2-selection--single') || $(el).hasClass('select2-search__field')) {
					let $select2Container = $(el).parents('.select2-container');
					el = $select2Container.siblings('select');
					if ($(el).length > 0) {
						$(el).select2('close');
						this.nextCtl(el, 1).focus();
					}
					return;
				}
				this.nextCtl(el, 1).focus();

			});

			//扫描监听left快捷键
			opts.enableHotkeys.includes('LEFT') && hotkeys('LEFT', (e, handler) => {
				console.log('you press ' + handler.key);
				e.preventDefault();
				let el = e.target;
				if ($(el).hasClass('select2-selection--single') || $(el).hasClass('select2-search__field')) {
					let $select2Container = $(el).parents('.select2-container');
					el = $select2Container.siblings('select');
					if ($(el).length > 0) {
						$(el).select2('close');
						this.nextCtl(el, 2).focus();
					}
					return;
				}
				this.nextCtl(el, 2).focus();

			});

			//扫描监听ESC快捷键
			opts.enableHotkeys.includes('ESC') && hotkeys('ESC', (e, handler) => {
				console.log('you press ' + handler.key);
				e.preventDefault();
				let el = e.target;
				el.blur();
			});
		},
		/**
		 * @param {Object} $ctl
		 * @param {Object} type
		 * 获取焦点转移元素
		 */
		nextCtl: function($ctl, type) {
			let opts = this.options;
			let root = $($ctl).hasClass('modal') ? $($ctl) : $('body');
			let $el = root.find(opts.scanProp).filter(opts.focusElFilter);
			let nextEl;
			if (!$ctl) {
				return $el.get(0);
			}
			$el.each(function(index) {
				if (index == $el.index($ctl)) {
					let nextIndex;
					if (type == 1) {
						nextIndex = index < $el.length - 1 ? index + 1 : 0;
					} else {
						nextIndex = index == 0 ? $el.length - 1 : index - 1;
					}
					nextEl = $el.get(nextIndex);
					return false;
				}
			});
			return nextEl ? nextEl : $el.get(0);
		}
	}


	/**
	 * 扩展jquery 对象方法（快捷键注册）
	 * @param options {hotkey,scope,triggerEvent}
	 */
	$.fn.hotkey = function(options) {
		this.each(function() {
			let hotkeyOpts = $(this).data('hotkey');
			hotkeyOpts = typeof hotkeyOpts !== 'object' ? (hotkeyOpts ? eval('(' + hotkeyOpts + ')') : undefined) :
				hotkeyOpts;
			let opts = $.extend({}, $.fn.hotkey.defaults, options, hotkeyOpts || {});
			hotkeys(opts.key, opts.scope, (e, handler) => {
				console.log('you press ' + handler.key);
				if ($(this).is(":hidden"))
					return;
				let el = e.target;
				let tagName = el.tagName;
				let type = el.type;
				if (type != 'button' && type != 'submit' && type != 'reset' && tagName != 'BUTTON') {
					e.preventDefault();
				}
				$(this).trigger(opts.triggerEvent);
			});
		})
	}

	$.fn.hotkey.defaults = {
		scope: 'root', //作用域
		triggerEvent: 'click' //触发事件
	}

	let hotkey = {
		defaults: {
			//是否支持快捷键焦点转移
			focusShift: true,
			//焦点转移配置项
			focusShiftOptions: _focusShift.defaults
		},
		start() {
			let opts = $.extend({}, this.defaults, this.config);
			hotkeys.filter = function(e) {
				let el = e.target;
				let tagName = el.tagName;
				let type = el.type;
				return !(el.isContentEditable || (type == 'text' || type == 'number' || type == 'password' || type == 'email' ||
						type == 'url' || type == 'date' || type == 'search') || (tagName === 'TEXTAREA' || tagName === 'SELECT')) //可编辑标签快捷键失效多行文本框、下拉
					||
					el.readOnly || el.disabled || e.ctrlKey || e.altKey || e.shiftKey //只读、禁用、(ctrl、alt、shift组合快捷键) 生效
					||
					(e.keyCode >= 112 && e.keyCode <= 135) //F1-F24 生效
					||
					e.key == 'Enter' || e.key == 'ArrowLeft' || e.key == 'ArrowRight' || e.key == 'Escape' //回车、方向左、方向右 生效
				;
			}

			//扫描监听相关自定义快捷键
			$('[data-hotkey]').hotkey();
			hotkeys.setScope('root'); //初始化 作用域范围默认root

			//弹框打开事件
			$(document).on('shown.bs.modal', '.modal', function(e) {
				//扫描监听相关自定义快捷键
				$(e.target).find('[data-hotkey]').hotkey({
					scope: 'modal'
				});
				hotkeys.setScope('modal');
			});

			//弹框关闭事件
			$(document).on('hidden.bs.modal', '.modal', function(e) {
				hotkeys.deleteScope('modal');
				hotkeys.setScope('root');
			});

			opts.focusShift && _focusShift.init(opts.focusShiftOptions);
		}
	}

	return hotkey;
}));
