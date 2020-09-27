/**
 * bs4pop bootstrap4 模态框组件封装
 * 支持 alert confirm prompt notice dialog
 * @Date 2020-01-01 17:30:00
 * @author jiangchengyong
 *
 ***/

;(function (global, factory) {
    typeof module !== 'undefined' && typeof exports === 'object' ? module.exports = factory() :
        typeof define === 'function' && (define.cmd || define.amd) ? define(factory) :
            (global.bs4pop = factory());
}(this, function () {
    let bs4pop = {};

    (function (pop) {

        pop.dialog = function (opts) {

            opts = $.extend(true, {
                id: '', //'#xxx'，对话框ID，
                title: '', //对话框title
                content: '', //对话框内容，可以是 string、element，$object
                className: '', //自定义样式
                width: 500, //宽度
                height: '', //高度
                target: 'body', //在什么dom内创建dialog
                isIframe: false, //默认是页面层，非iframe
                mode: 'local', //local 本地片段 remote远程片段（配合content使用，content为对应远程片段URL）
                isCenter: true, //默认剧中

                closeBtn: true, //是否有关闭按钮
                hideRemove: true, //关闭时移除dom
                escape: true, //Esc 退出
                autoFocus: true, //初始化时自动获得焦点
                btnAutoFocus: false, //按钮自动获取焦点
                show: true, //是否在一开始时就显示对话框
                backdrop: true, //模态背景 true: 显示模态，false: 没有模态，'static': 显示模态，单击模态不关闭对话框
                btns: [], //footer按钮 [{label: 'Button',	className: 'btn-primary',onClick(e){}}]
                drag: true, //是否启用拖拽

                onShowStart() {
                }, //dialog开始打开时回调
                onShowEnd() {
                }, //dialog打开完毕时回调
                onHideStart() {
                }, //dialog开始关闭时回调
                onHideEnd() {
                }, //dialog关闭完成时回调
                onClose() {
                }, //关闭按钮点击时回调
                onDragStart() {
                }, //拖动开始时回调
                onDragEnd() {
                }, //拖动结束时回调
                onDrag() {
                } //拖动中回调
            }, opts);

            //得到 $el
            let $el = opts.id !== '' ? $('#' + opts.id) : undefined;
            if (!$el || !$el.length) {
                $el = $(
                    `
				<div id="${opts.id}" class="modal fade" tabindex="-1" role="dialog" data-backdrop="${opts.backdrop}">
					<div class="modal-dialog ">
						<div class="modal-content">
							<div class="modal-body"></div>
						</div>
					</div>
				</div>
			`
                );
            }

            //得到 $body
            let $body = $el.find('.modal-body');

            //创建 header
            if (opts.closeBtn || opts.title) {

                let $header = $('<div class="modal-header" style="cursor: all-scroll;"></div>');

                if (opts.title) {
                    $header.append(`<h5 class="modal-title"> ${opts.title} </h5>`);
                }

                if (opts.closeBtn) {
                    $header.append(
                        `
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				`
                    );
                }

                $body.before($header);

            }

            let $iframe;
            //创建 footer
            if (opts.btns.length) {

                let $footer = $('<div class="modal-footer"></div>');
                opts.btns.forEach(btn => {

                    btn = $.extend(true, {
                        label: 'Button',
                        className: 'btn-primary',
                        onClick(cb) {
                        },
                    }, btn);

                    let $btn = $('<button type="button" id="' + (btn.id ? btn.id : '') + '" class="btn ' + btn.className +
                        ' pl-5 pr-5">' + btn.label + '</button>');
                    if (btn.hotkey) {
                        $btn.attr('data-hotkey', '');
                        $btn.data('hotkey', btn.hotkey);
                        btn.hotkey.focusShift && $btn.attr('focus-shift', '');
                    }
                    $btn.on('click', evt => {

                        //提供手动关闭对话框的方法，以便于对话框延迟关闭
                        evt.hide = () => {
                            $el.modal('hide');
                        };

                        //如果返回不是false就自动隐藏dialog
                        if (btn.onClick(evt, $iframe) !== false) {
                            $el.modal('hide');
                        }

                    });

                    $footer.append($btn);

                });

                $body.after($footer);

            }

            if (!opts.isIframe) {
                if (opts.mode == 'local') {
                    //创建内容
                    if (typeof opts.content === 'string') {
                        $body.html(opts.content);
                    } else if (typeof opts.content === 'object') {
                        $body.empty();
                        $(opts.content).contents().appendTo($body); //移动dom到 modal-body下
                    }
                } else if (opts.mode == 'remote') {
                    $body.load(opts.content);
                }


            } else {
                $iframe = $(`<iframe class="d-block w-100 h-100 border-0" src="${opts.content}" autofocus></iframe>`);
                $iframe.appendTo($body);
            }


            //设置属性
            opts.id && $el.attr('id', opts.id);
            opts.className && $el.addClass(opts.className);
            opts.width && $el.find('.modal-dialog').width(opts.width).css('max-width', opts.width);
            opts.height && $el.find('.modal-dialog').css({
                height: opts.height,
                border: 0,
                padding: 0,
                'max-height': opts.height
            });
            opts.height && $el.find('.modal-content').css({
                height: opts.height,
                'max-height': opts.height
            });
            opts.isCenter && $el.find('.modal-dialog').addClass('modal-dialog-centered'); //对话框屏幕居中

            //绑定事件
            opts.hideRemove && $el.on('hidden.bs.modal', function () {
                $el.modal('dispose').remove(); //移除dom
            });
            $el.on('show.bs.modal', evt => {
                opts.onShowStart(evt, $iframe);
            });
            $el.on('shown.bs.modal', evt => {
                //按钮是否自动获取焦点
                if (opts.btnAutoFocus) {
                    $('.modal-footer button').length > 0 && $('.modal-footer button').get(0).focus();
                }
                //元素焦点自动获取
                $('.modal-body [autofocus]').length > 0 && $('.modal-body [autofocus]').get(0).focus();
                opts.onShowEnd(evt, $iframe);
            });
            $el.on('hide.bs.modal', evt => {
                opts.onHideStart(evt, $iframe);
            });
            $el.on('hidden.bs.modal', evt => {
                opts.onHideEnd(evt, $iframe);
            });
            opts.closeBtn && $el.find('.close').on('click', function (evt) {
                return opts.onClose(evt, $iframe);
            });

            //拖拽
            if (opts.drag) {
                $el.attr('data-drag', 'drag');
                drag({
                    el: $el.find('.modal-content'),
                    handle: $el.find('.modal-header'),
                    onDragStart() {
                        $el.attr('data-drag', 'draged');
                        opts.onDragStart();
                    },
                    onDragEnd() {
                        opts.onDragEnd();
                    },
                    onDraging() {
                        opts.onDrag();
                    }
                });
            }

            $(opts.target).append($el);

            $el.modal({
                backdrop: opts.backdrop, //boolean or the string 'static'.Includes a modal-backdrop element. Alternatively, specify static for a backdrop which doesn't close the modal on click.
                keyboard: opts.escape, //Closes the modal when escape key is pressed
                focus: opts.autoFocus, //Puts the focus on the modal when initialized.
                show: opts.show //Shows the modal when initialized.
            });

            let result = {
                $el: $el,
                show() {
                    $el.modal('show');
                },
                hide() {
                    $el.modal('hide');
                },
                toggle() {
                    $el.modal('toggle');
                },
                destory() {
                    $el.modal('dispose');
                }
            };

            return result;

        };

        pop.removeAll = function () {
            $('[role="dialog"],.modal-backdrop').remove();
        };

        //拖拽
        function drag(opts) {

            opts = $.extend(true, {
                el: '',
                handle: '',
                onDragStart() {
                },
                onDraging() {
                },
                onDragEnd() {
                }

            }, opts);

            opts.el = $(opts.el);
            opts.handle = $(opts.handle);
            let $root = $(document);
            let isFirstDrag = true;

            $(opts.handle).on('touchstart mousedown', startEvt => {

                startEvt.preventDefault();

                let pointEvt = startEvt;
                if (startEvt.type === 'touchstart') {
                    pointEvt = startEvt.touches[0];
                }

                let startData = {
                    pageX: pointEvt.pageX,
                    pageY: pointEvt.pageY,
                    targetPageX: opts.el.offset().left, //当前dom的位置信息
                    targetPageY: opts.el.offset().top,
                };

                let move = moveEvt => {

                    let pointEvt = moveEvt;
                    if (moveEvt.type === 'touchmove') {
                        pointEvt = moveEvt.touches[0];
                    }

                    let moveData = {
                        pageX: pointEvt.pageX, //对于整个页面来说，包括了被卷去的body部分的长度
                        pageY: pointEvt.pageY,
                        moveX: pointEvt.pageX - startData.pageX,
                        moveY: pointEvt.pageY - startData.pageY,
                    };

                    if (isFirstDrag) {
                        opts.onDragStart(startData);
                        isFirstDrag = false;
                    } else {
                        opts.onDraging();
                    }

                    opts.el.offset({
                        left: startData.targetPageX + moveData.moveX,
                        top: startData.targetPageY + moveData.moveY,
                    });

                };

                let up = () => {
                    $root.off('touchmove mousemove', move);
                    $root.off('touchend mouseup', up);
                    opts.onDragEnd();
                };

                $root.on('touchmove mousemove', move).on('touchend mouseup', up);

            });

        }

    })(bs4pop);


    (function (pop) {

        //对话框
        pop.alert = function (content, opts, cb) {
            let type = 'info';
            let typeGroup = {
                'success': {
                    classes: 'alert-success',
                    icon: 'fa-check'
                },
                'info': {
                    classes: 'alert-info',
                    icon: 'fa-info-circle'
                },
                'warning': {
                    classes: 'alert-warning',
                    icon: 'fa-exclamation-triangle'
                },
                'error': {
                    classes: 'alert-danger',
                    icon: 'fa-times-circle'
                },
            };
            if (opts && opts.type) {
                type = opts.type;
            }
            let alertClasses = typeGroup[type].classes;
            let alertIcon = typeGroup[type].icon;
            content = `<div class="alert ${alertClasses}" role="alert"><i class="fa ${alertIcon}"></i> ${content}</div>`;

            let dialogOpts = $.extend(true, {
                title: '提示',
                content: content,
                hideRemove: true,
                btnAutoFocus: true,
                width: 360,
                btns: [{
                    label: '确定',
                    onClick() {
                        if (cb) {
                            return cb();
                        }
                    },
                    hotkey: {
                        focusShift: true
                    }
                }]
            }, opts);

            return pop.dialog(dialogOpts);

        };

        //确认框
        pop.confirm = function (content, opts, cb) {

            let dialogOpts = $.extend(true, {
                title: '确认框',
                content: content,
                width: 360,
                hideRemove: true,
                btnAutoFocus: true,
                btns: [{
                    label: '取消',
                    className: 'btn-secondary',
                    onClick() {
                        if (cb) {
                            return cb(false);
                        }
                    },
                    hotkey: {
                        focusShift: true
                    }
                },
                    {
                        label: '确定',
                        onClick() {
                            if (cb) {
                                return cb(true);
                            }
                        },
                        hotkey: {
                            focusShift: true
                        }
                    }
                ]
            }, opts);

            return this.dialog(dialogOpts);

        };

        //输入框
        pop.prompt = function (content, value, opts, cb) {

            let $content = $(
                `
			<div>
				<p>${content}</p>
				<input type="text" class="form-control" value="${value}"/>
			</div>
		`);

            let $input = $content.find('input');

            let dialogOpts = $.extend(true, {
                title: '输入框',
                content: $content,
                hideRemove: true,
                width: 360,
                btns: [

                    {
                        label: '取消',
                        className: 'btn-secondary',
                        onClick() {
                            if (cb) {
                                return cb(false, $input.val());
                            }
                        },
                        hotkey: {
                            focusShift: true
                        }
                    },
                    {
                        label: '确定',
                        onClick() {
                            if (cb) {
                                return cb(true, $input.val());
                            }
                        },
                        hotkey: {
                            focusShift: true
                        }
                    }
                ]
            }, opts);

            return pop.dialog(dialogOpts);

        };

        // 消息框
        pop.notice = function (content, opts) {

            opts = $.extend(true, {

                type: 'primary', //primary, secondary, success, danger, warning, info, light, dark
                position: 'topcenter', //topleft, topcenter, topright, bottomleft, bottomcenter, bottonright, center, leftcenter, rightcenter
                appendType: 'append', //append, prepend
                closeBtn: true,
                autoClose: 2000,
                className: '',

            }, opts);

            // 得到容器 $container
            let $container = $('#alert-container-' + opts.position);
            if (!$container.length) {
                $container = $('<div id="alert-container-' + opts.position + '" class="alert-container"></div>');
                $('body').append($container);
            }

            // alert $el
            let $el = $(`
			<div class="alert fade alert-${opts.type}" role="alert">${content}</div>
		`);

            // 关闭按钮
            if (opts.closeBtn) {
                $el
                    .append(
                        `
					<button type="button" class="close" data-dismiss="alert" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				`
                    )
                    .addClass('alert-dismissible');
            }

            //定时关闭
            if (opts.autoClose) {

                let t = setTimeout(() => {
                    $el.alert('close');
                }, opts.autoClose);

            }

            opts.appendType === 'append' ? $container.append($el) : $container.prepend($el);

            setTimeout(() => {
                $el.addClass('show');
            }, 50);

            return;

        };

    })(bs4pop);

    return bs4pop;
}));
