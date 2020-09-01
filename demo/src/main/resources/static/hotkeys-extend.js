(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(jQuery, hotkeys) :
        typeof define === 'function' && define.amd ? define(['jquery', 'hotkeys'], factory) :
            (global = global || window, global.hotkey = factory(jQuery, hotkeys));
}(this, function ($, hotkeys) {

    /**
     * 扩展jquery 对象方法（快捷键注册）
     * @param options {hotkey,scope,triggerEvent}
     */
    $.fn.hotkey = function (options) {
        let opts = $.extend({}, $.fn.hotkey.defaults, options);
        this.each(function () {
            $.extend(opts, eval($(this).data('hotkey')) || {});
            hotkeys(opts.key, opts.scope, (e, handler) => {
                if ($(this).is(":hidden"))
                    return;
                e.preventDefault();
                $(this).trigger(opts.triggerEvent);
            });
        })
    }

    $.fn.hotkey.defaults = {
        scope: 'root', //作用域
        triggerEvent: 'click' //触发事件
    }

    /**
     * 获取下一个焦点元素
     * @param $ctl
     * @param type 1：前进一位 2：后退一位
     * @returns {*}
     */
    function nextCtl($ctl, type) {
        let root = $($ctl).hasClass('modal') ? $($ctl) : $('body');
        let $el = root.find(hotkey.focusElSelector).filter(hotkey.focusElFilter);
        let nextEl;
        if (!$ctl) {
            return $el.get(0);
        }
        $el.each(function (index) {
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

    const start = function () {
        hotkeys.filter = function (e) {
            let el = e.target;
            let tagName = el.tagName;
            let type = el.type;
            return !(el.isContentEditable || (type == 'text' || type == 'number' || type == 'password' || type == 'email' || type == 'url' || type == 'date' || type == 'search') || (tagName === 'TEXTAREA' || tagName === 'SELECT'))  //可编辑标签快捷键失效多行文本框、下拉
                || el.readOnly || el.disabled || e.ctrlKey || e.altKey || e.shiftKey //只读、禁用、(ctrl、alt、shift组合快捷键) 生效
                || (e.keyCode >= 112 && e.keyCode <= 135) //F1-F24 生效
                || e.key == 'Enter' || e.key == 'ArrowLeft' || e.key == 'ArrowRight' || e.key == 'Escape' //回车、方向左、方向右 生效
                ;
        }

        //扫描监听相关自定义快捷键
        $('[data-hotkey]').hotkey();
        hotkeys.setScope('root');//初始化 作用域范围默认root

        //弹框打开事件
        $(document).on('show.bs.modal', '.modal', function (e) {
            //扫描监听相关自定义快捷键
            $(e.target).find('[data-hotkey]').hotkey({scope: 'modal'});
            hotkeys.setScope('modal');
        });

        //弹框关闭事件
        $(document).on('hidden.bs.modal', '.modal', function (e) {
            hotkeys.deleteScope('modal');
            hotkeys.setScope('root');
        });

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

        //扫描监听ESC快捷键
        hotkeys('esc', (e, handler) => {
            console.log('you press ' + handler.key);
            e.preventDefault();
            let el = e.target;
            el.blur();
        });
    }

    return {
        start,
        focusElSelector: 'input,textarea,select,[contenteditable]',
        focusElFilter: ':not(:hidden,[type="button"],[type="reset"],[type="submit"],[readonly],[disabled])'
    };
}));
