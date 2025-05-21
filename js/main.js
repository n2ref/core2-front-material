/*
 * jQuery hashchange event - v1.3 - 7/21/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
 *
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function($,e,b){var c="hashchange",h=document,f,g=$.event.special,i=h.documentMode,d="on"+c in e&&(i===b||i>7);function a(j){j=j||location.href;return"#"+j.replace(/^[^#]*#?(.*)$/,"$1")}$.fn[c]=function(j){return j?this.bind(c,j):this.trigger(c)};$.fn[c].delay=50;g[c]=$.extend(g[c],{setup:function(){if(d){return false}$(f.start)},teardown:function(){if(d){return false}$(f.stop)}});f=(function(){var j={},p,m=a(),k=function(q){return q},l=k,o=k;j.start=function(){p||n()};j.stop=function(){p&&clearTimeout(p);p=b};function n(){var r=a(),q=o(m);if(r!==m){l(m=r,q);$(e).trigger(c)}else{if(q!==m){location.href=location.href.replace(/#.*/,"")+q}}p=setTimeout(n,$.fn[c].delay)}$.browser.msie&&!d&&(function(){var q,r;j.start=function(){if(!q){r=$.fn[c].src;r=r&&r+a();q=$('<iframe tabindex="-1" title="empty"/>').hide().one("load",function(){r||l(a());n()}).attr("src",r||"javascript:0").insertAfter("body")[0].contentWindow;h.onpropertychange=function(){try{if(event.propertyName==="title"){q.document.title=h.title}}catch(s){}}}};j.stop=k;o=function(){return a(q.location.href)};l=function(v,s){var u=q.document,t=$.fn[c].domain;if(v!==s){u.title=h.title;u.open();t&&u.write('<script>document.domain="'+t+'"<\/script>');u.close();q.location.hash=v}}})();return j})()})(jQuery,this);

var main_menu = {

    /**
     *
     */
    setAngles : function() {

        $('.menu-module, .menu-module-selected').each(function(){
            var module = $(this).attr('id').substr(7);
            if ($('li[id^=submodule-' + module + '-]')[0]) {

            	if ($(this).hasClass('menu-module-selected')) {
                    $(this).find('>a').append('<span class="nav-second-level-toggle fa"></span>');
				} else {
                    $(this).find('>a').append('<span class="nav-second-level-toggle fa fa-angle-right"></span>');
				}
            }
        });
    },

    /**
	 *
	 */
    setIconLetter : function() {

        $('.menu-module, .menu-module-selected').each(function(){
            var $i = $(this).find('i');
            if ( ! $i[0]) {
				var letter = $(this).text().trim().substr(0, 1);
                $('a', this).append('<span class="module-icon-letter">' + letter + '</span>');
            }
        });
    },


	/**
	 * Получение данных о браузере
	 */
	getBrowserInfo: function () {

		// screen
		var screenSize = '';
		if (screen.width) {
			width = (screen.width) ? screen.width : '';
			height = (screen.height) ? screen.height : '';
			screenSize += '' + width + "x" + height;
		}

		// browser
		var nVer       = navigator.appVersion;
		var user_agent = navigator.userAgent;
		var browser    = navigator.appName;
		var version    = '' + parseFloat(nVer);
		var nameOffset, verOffset, ix;

		if ((verOffset = user_agent.indexOf('YaBrowser')) !== -1) {
			browser = 'Yandex';
			version = user_agent.substring(verOffset + 10);

		} else if ((verOffset = user_agent.indexOf('SamsungBrowser')) !== -1) {
			browser = 'Samsung';
			version = user_agent.substring(verOffset + 15);

		} else if ((verOffset = user_agent.indexOf('UCBrowser')) !== -1) {
			browser = 'UC Browser';
			version = user_agent.substring(verOffset + 10);

		} else if ((verOffset = user_agent.indexOf('OPR')) !== -1) {
			browser = 'Opera';
			version = user_agent.substring(verOffset + 4);

		} else if ((verOffset = user_agent.indexOf('Opera')) !== -1) {
			browser = 'Opera';
			version = user_agent.substring(verOffset + 6);
			if ((verOffset = user_agent.indexOf('Version')) !== -1) {
				version = user_agent.substring(verOffset + 8);
			}

		} else if ((verOffset = user_agent.indexOf('Edge')) !== -1) {
			browser = 'Microsoft Legacy Edge';
			version = user_agent.substring(verOffset + 5);

		} else if ((verOffset = user_agent.indexOf('Edg')) !== -1) {
			browser = 'Microsoft Edge';
			version = user_agent.substring(verOffset + 4);

		} else if ((verOffset = user_agent.indexOf('MSIE')) !== -1) {
			browser = 'Microsoft Internet Explorer';
			version = user_agent.substring(verOffset + 5);

		} else if ((verOffset = user_agent.indexOf('Chrome')) !== -1) {
			browser = 'Chrome';
			version = user_agent.substring(verOffset + 7);

		} else if ((verOffset = user_agent.indexOf('Safari')) !== -1) {
			browser = 'Safari';
			version = user_agent.substring(verOffset + 7);
			if ((verOffset = user_agent.indexOf('Version')) !== -1) {
				version = user_agent.substring(verOffset + 8);
			}

		} else if ((verOffset = user_agent.indexOf('Firefox')) !== -1) {
			browser = 'Firefox';
			version = user_agent.substring(verOffset + 8);

		} else if (user_agent.indexOf('Trident/') !== -1) {
			browser = 'Microsoft Internet Explorer';
			version = user_agent.substring(user_agent.indexOf('rv:') + 3);

		} else if ((nameOffset = user_agent.lastIndexOf(' ') + 1) < (verOffset = user_agent.lastIndexOf('/'))) {
			browser = user_agent.substring(nameOffset, verOffset);
			version = user_agent.substring(verOffset + 1);
			if (browser.toLowerCase() === browser.toUpperCase()) {
				browser = navigator.appName;
			}
		}

		// trim the version string
		if ((ix = version.indexOf(';')) !== -1) version = version.substring(0, ix);
		if ((ix = version.indexOf(' ')) !== -1) version = version.substring(0, ix);
		if ((ix = version.indexOf(')')) !== -1) version = version.substring(0, ix);

		// mobile version
		var mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(nVer);


		// system
		var os = '';
		var clientStrings = [
			{s:'Windows 10', r:/(Windows 10.0|Windows NT 10.0)/},
			{s:'Windows 8.1', r:/(Windows 8.1|Windows NT 6.3)/},
			{s:'Windows 8', r:/(Windows 8|Windows NT 6.2)/},
			{s:'Windows 7', r:/(Windows 7|Windows NT 6.1)/},
			{s:'Windows Vista', r:/Windows NT 6.0/},
			{s:'Windows Server 2003', r:/Windows NT 5.2/},
			{s:'Windows XP', r:/(Windows NT 5.1|Windows XP)/},
			{s:'Windows 2000', r:/(Windows NT 5.0|Windows 2000)/},
			{s:'Windows ME', r:/(Win 9x 4.90|Windows ME)/},
			{s:'Windows 98', r:/(Windows 98|Win98)/},
			{s:'Windows 95', r:/(Windows 95|Win95|Windows_95)/},
			{s:'Windows NT 4.0', r:/(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/},
			{s:'Windows CE', r:/Windows CE/},
			{s:'Windows 3.11', r:/Win16/},
			{s:'Android', r:/Android/},
			{s:'Open BSD', r:/OpenBSD/},
			{s:'Sun OS', r:/SunOS/},
			{s:'Chrome OS', r:/CrOS/},
			{s:'Linux', r:/(Linux|X11(?!.*CrOS))/},
			{s:'iOS', r:/(iPhone|iPad|iPod)/},
			{s:'Mac OS X', r:/Mac OS X/},
			{s:'Mac OS', r:/(Mac OS|MacPPC|MacIntel|Mac_PowerPC|Macintosh)/},
			{s:'QNX', r:/QNX/},
			{s:'UNIX', r:/UNIX/},
			{s:'BeOS', r:/BeOS/},
			{s:'OS/2', r:/OS\/2/},
			{s:'Search Bot', r:/(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/}
		];
		for (var id in clientStrings) {
			var cs = clientStrings[id];
			if (cs.r.test(user_agent)) {
				os = cs.s;
				break;
			}
		}

		var osVersion = '';

		if (/Windows/.test(os)) {
			osVersion = /Windows (.*)/.exec(os)[1];
			os = 'Windows';
		}

		switch (os) {
			case 'Mac OS':
			case 'Mac OS X':
			case 'Android':
				osVersion = /(?:Android|Mac OS|Mac OS X|MacPPC|MacIntel|Mac_PowerPC|Macintosh) ([\.\_\d]+)/.exec(user_agent)[1];
				break;

			case 'iOS':
				osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
				osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
				break;
		}

		return {
			userAgent: user_agent,
			screen: screenSize,
			browser: browser,
			browserVersion: version,
			mobile: mobile,
			os: os,
			osVersion: osVersion,
			language: navigator.language
		};
	},

	errors: {
		_errors: [],
		_errorSend: false,
		_url: 'index.php?module=admin&action=welcome&error_front=1',

		/**
		 * Событие обработки js ошибок на странице
		 * @param {ErrorEvent} event
		 * @private
		 */
		_onErrorEvent: function (event) {

			if (typeof event.error === 'undefined' || ! event.error) {
				return;
			}

			main_menu.errors.addError('js error', 'error', {
				message: event.message,
				file: event.filename,
				line: event.lineno,
				col: event.colno,
				stack : event.error.stack.split('\n').map(string => string.trim())
			})
		},


		/**
		 * Отправка полученных ошибок
		 */
		_sendError: function() {

			let sendErrors = main_menu.errors._errors.splice(0, 100);

			main_menu.errors._errorSend = true;

			$.ajax({
				url: main_menu.errors._url,
				method: "POST",
				contentType: "application/json; charset=utf-8",
				data: JSON.stringify(sendErrors),
				error: function (response) {
					console.warn(response)
				}
			})
				.always(function() {
					main_menu.errors._errorSend = false;

					if (main_menu.errors._errors.length > 0) {
						setTimeout(main_menu.errors._sendError, 3000);
					}
				});
		},


		/**
		 * Добавление ошибки в список
		 * @param {string} type
		 * @param {string} level
		 * @param {Object} error
		 */
		addError: function (type, level, error) {

			// чтобы не плодить одинаковые ошибки
			if (main_menu.errors._errors.length > 0) {
				let lastError = main_menu.errors._errors.hasOwnProperty(main_menu.errors._errors.length)
					? main_menu.errors._errors[main_menu.errors._errors.length]
					: null;

				if (lastError &&
					lastError.error &&
					lastError.error.hasOwnProperty('message') &&
					lastError.error.message === error.message
				) {
					lastError.error.count++;
					return;
				}
			}

			error.count = 1;

			let client = main_menu.getBrowserInfo();
			main_menu.errors._errors.push({
				type: type,
				level: level,
				url: location.href,
				client: client,
				error: error
			});

			if (main_menu.errors._errorSend === false) {
				setTimeout(main_menu.errors._sendError, 500);
			}
		}
	}
};


/**
 * @param obj
 * @param path
 */
function changeSub(obj, path) {
	if (!obj) return;

	var parent = obj.parentNode;
	for (var i = 0; i < parent.childNodes.length; i++) {
		if (parent.childNodes[i].nodeName === 'LI') {
			parent.childNodes[i].className = 'menu-submodule';
			if (parent.childNodes[i] === obj) {
				parent.childNodes[i].className = 'menu-submodule-selected';


                var module_name = parent.childNodes[i].id.split('-')[1];
                var href        = $(parent.childNodes[i]).find('>a').attr('href');

                if (module_name && href) {
                	$('#module-' + module_name).find('.module-submodules > a[href="' + href + '"]').addClass('module-submodules-selected');
				}

				if (path) load(path);
			}
		}
	}
}


/**
 * Переключение модуля
 * @param obj
 * @param to
 * @param actionSelect
 */
function changeRoot(obj, to, actionSelect) {

    $('#menu-wrapper .module-submodules').empty();
    $('#menu-submodules').hide();

	var parent = $('#menu-modules')[0];
	for (var i = 0; i < parent.childNodes.length; i++) {
		if (parent.childNodes[i].nodeName === 'LI') {
            parent.childNodes[i].className = 'menu-module';

            $(parent.childNodes[i]).find('.nav-second-level-toggle').addClass('fa-angle-right');

			if (parent.childNodes[i] === obj) {
                parent.childNodes[i].className = 'menu-module-selected';

                var module_id = parent.childNodes[i].id;
				if (module_id !== 'module-admin' || (module_id === 'module-admin' && actionSelect !== 'welcome')) {
					if ( ! actionSelect || actionSelect === 'index') {
						$(parent.childNodes[i]).find('>a').addClass('index-select');
					} else {
						$(parent.childNodes[i]).find('>a').removeClass('index-select');
					}
                    $('#home-button > a').removeClass('home-select');

                } else {
                    $('#home-button > a').addClass('home-select');
				}

                var issetSubmodules = false;
				var sub 			= document.getElementById('menu-submodules');

				for (var x = 0; x < sub.childNodes.length; x++) {
					if (sub.childNodes[x].nodeName === 'LI') {
						sub.childNodes[x].className = 'menu-submodule';
						sub.childNodes[x].style.display = 'none';
						if (sub.childNodes[x].id.indexOf(parent.childNodes[i].id + '-') !== -1) {
                            if (module_id !== 'module-admin' || (module_id === 'module-admin' && actionSelect !== 'welcome')) {
                                issetSubmodules = true;
                                $(parent.childNodes[i]).find('.module-submodules').append(
                                    $(sub.childNodes[x]).find('>a').clone()
                                );
                            }

							sub.childNodes[x].style.display = '';
						}
					}
				}

				if (issetSubmodules) {
                    $(parent.childNodes[i]).addClass('module-isset-submodules');
                    $(parent.childNodes[i]).find('.nav-second-level-toggle').removeClass('fa-angle-right');
                    if ($(window).width() < 768 || ! $('.s-toggle')[0]) {
                        $(parent.childNodes[i]).find('.module-submodules').show()
                    }
				} else {
					$(parent.childNodes[i]).removeClass('module-isset-submodules');
					$(parent.childNodes[i]).find('.module-submodules').hide();
				}
			}
		}
	}
	if (to) load(to);
}


/**
 * @returns {{width: *, height: *}}
 */
function viewport() {
    var e = window,
		a = 'inner';
    if ( ! ('innerWidth' in window)) {
        a = 'client';
        e = document.documentElement || document.body;
    }
    return { width : e[ a+'Width' ] , height : e[ a+'Height' ] }
}


/**
 * @param evt
 * @returns {boolean}
 */
function checkInt(evt) {
	var keycode;
	if (evt.keyCode) keycode = evt.keyCode;
	else if(evt.which) keycode = evt.which;
	var av = [8, 9, 35, 36, 37, 38, 39, 40, 45, 46, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57];
	for (var i = 0; i < av.length; i++) {
		if (av[i] === keycode) return true;
	}
	return false;
}

/**
 * @param event
 */
function commaReplace(event) {
	// Получаем вставляемые данные из буфера обмена
	let pasteData = event.clipboardData.getData('text');

	pasteData = pasteData.replace(/[^0-9.,]/g, '');
	// Заменяем все запятые на точки
	pasteData = pasteData.replace(/,/g, '.');

	// Если в строке больше одной точки, удаляем все, кроме первой
	const parts = pasteData.split('.');
	if (parts.length > 1) {
		// Собираем строку обратно, оставляя только первую точку
		pasteData = parts.shift() + '.' + parts.join('');
	}
	// Удаляем точку, если она первый или последний символ
	pasteData = pasteData.replace(/^\./, '').replace(/\.$/, '');

	// Прекращаем стандартную вставку
	event.preventDefault();

	// Получаем текущее значение поля ввода и текущую позицию курсора
	let input = event.target;
	let start = input.selectionStart;
	let end = input.selectionEnd;

	// Формируем новое значение с учетом вставленных данных
	input.value = input.value.substring(0, start) + pasteData + input.value.substring(end);
	// Восстанавливаем позицию курсора после вставки
	input.setSelectionRange(start + pasteData.length, start + pasteData.length);
}


/**
 *
 */
function goHome() {
	$('.menu-module-selected').addClass('menu-module');
	$('.menu-module_selected').removeClass('menu-module-selected');
	load('index.php?module=admin&action=welcome');
}


/**
 *
 */
function logout() {
    swal({
        title: 'Вы уверены, что хотите выйти?',
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#f0ad4e',
        confirmButtonText: "Да",
        cancelButtonText: "Нет"
    }).then(
        function(result) {
        	preloader.show();

            $.ajax({url:'index.php?module=admin', data:{"exit":1}, method:'PUT'})
				.done(function (n) {
                    preloader.hide();
					window.location = 'index.php';

				}).fail(function (a,b,t){
                	preloader.hide();
					alert("Произошла ошибка: " + a.statusText);
				});
        }, function(dismiss) {}
    );
}


/**
 * @param src
 */
function jsToHead(src) {
	var s = $('head').children();
	var h = '';
	for (var i = 0; i < s.length; i++) {
		if (s[i].src) {
			if (!h) {
				var temp = s[i].src.split('core2');
				if (temp[1]) {
					h = temp[0];
				}
			}
			if (s[i].src === src || s[i].src === h + src.replace(/^\//, '')) {
                return;
            }
		}
	}
	s = document.createElement("script");
	s.src = src;
	$('head').append(s);
}


/**
 * Анимация для указанного элемента
 * @param {string} elementId
 * @param {string} effect
 */
function animatedElement(elementId, effect) {

	var element = $('#' + elementId);
	if ( ! element[0]) {
		return;
	}


	element.removeClass('animated ' + effect);

	setTimeout(function() {
		element.addClass('animated ' + effect);
	}, 0);
}


/**
 * @param {string} id
 */
function toAnchor(id) {
    setTimeout(function() {
		// Если открыт мадал, то не двигать
		if ($('body > .modal-backdrop')[0]) {
			return;
		}

		if (typeof id == 'string' && id.indexOf('#') < 0) {
			id = "#" + id;
		}

		var element = $(id);

        if (element && element[0]) {
            $('html,body').animate({
                scrollTop : element.offset().top - $("#navbar-top").height() - 115
            }, 'fast');
        }
    }, 0);
}

var locData = {};
var loc = ''; //DEPRECATED
var xhrs = {};

var preloader = {
	extraLoad : {},
	oldHash : {},
	show : function() {
        $("#preloader .spinner-text").text('Загрузка...');
        $("#preloader").show();
	},
	hide : function() {


		$("#preloader").hide();
	},
	callback : function (response, status, xhr) {
		if (status === "error") {

		} else {
			if (preloader.extraLoad) {
				for (var el in preloader.extraLoad) {
					var aUrl = preloader.extraLoad[el];
					if (aUrl) {
						aUrl = JSON.parse(aUrl);
						var bUrl = [];
						for (var k in aUrl) {
							if (typeof aUrl.hasOwnProperty === 'function' && aUrl.hasOwnProperty(k)) {
								bUrl.push(encodeURIComponent(k) + '=' + encodeURIComponent(aUrl[k]));
							}
						}
						$('#' + el).load("index.php?" + bUrl.join('&'));
					}
				}
				preloader.extraLoad = {};
			}

			if (locData['loc'] &&
				locData['id'] &&
				locData['loc'].indexOf('&__') >= 0
			) {
				toAnchor(locData['id']);

			} else {
				$('html').animate({
					scrollTop: 0
				});
			}
		}
		preloader.hide();
		//resize();
	},
	qs : function(url) {
		//PARSE query string
		const qs = new URLSearchParams(url);

		url = {};
		//PREPARE location and hash
		for (const key of qs.keys()) {
			url[key] = qs.get(key);
		}
		return url;
	},
	prepare : function(url) {
		url = this.qs(url);
		//CREATE the new location
		var pairs = [];
		for (var key in url)
			if (typeof url.hasOwnProperty === 'function' && url.hasOwnProperty(key)) {
				var pu = encodeURIComponent(key) + '=' + encodeURIComponent(url[key]);
				pairs.push(pu);
			}
		url = pairs.join('&');
		return url;
	},
	toJson: function (url) {
		url = this.qs(url);
		//CREATE the new location
		var pairs = [];
		for (var key in url)
			if (typeof url.hasOwnProperty === 'function' && url.hasOwnProperty(key)) {
				var pu = '"' + encodeURIComponent(key) + '":"' + encodeURIComponent(url[key]) + '"';
				pairs.push(pu);
			}
		return '{' + pairs.join(',') + '}';
	},
    setText: function(text) {
        this.show();
        $("#preloader .spinner-text").text(text);
    },
	normUrl: function () {

	}
};

$(document).ajaxError(function (event, jqxhr, settings, exception) {
    preloader.hide();
    if (jqxhr.status === '0') {
        //alert("Соединение прервано.");
    } else if (jqxhr.responseText.indexOf('Доступ закрыт! Если вы уверены, что вам сюда можно, обратитесь к администратору.') === 0){
		swal('Доступ закрыт! Если вы уверены, что вам сюда можно, обратитесь к администратору.', '', 'error').catch(swal.noop);
	} else if (jqxhr.statusText === 'error') {
        swal("Отсутствует соединение с Интернет.", '', 'error').catch(swal.noop);
    } else if (jqxhr.status === 403) {
        swal("Время жизни вашей сессии истекло", 'Чтобы войти в систему заново, обновите страницу (F5)', 'error').catch(swal.noop);
    } else {
		//swal("Ой, извините!", "Во время обработки вашего запроса произошла ошибка.", 'error').catch(swal.noop);
	}
});
$(document).ajaxSuccess(function (event, xhr, settings) {
	if (xhr.status === 203) {
		top.document.location = settings.url;
	}
});


/**
 * Загрузка контента на страницу
 * @param url
 * @param data
 * @param id
 * @param callback
 */
var load = function (url, data, id, callback) {

	if ( ! id) {
		if (edit.changeForm.issetChanged()) {
			edit.changeForm.showConfirm(arguments);
			return;
		} else {
			edit.changeForm.removeListen();
		}

		id = '#main_body';
		preloader.show();

	} else if (typeof id === 'string') {
		id = '#' + id;
	}

	if (url.indexOf("index.php") === 0) {
		url = url.substr(10);
	}

	var h = preloader.prepare(location.hash.substr(1));
	url = preloader.prepare(url);

    $("body").removeClass("pdf-open")
		.removeClass("ext-open");

    if ($(window).width() < 768) {
        $('#main').removeClass('s-toggle');
        $('#menu-wrapper .module-submodules').hide();
    }

	if ( ! data && h !== url && url.indexOf('&__') < 0) {
        if (typeof callback === 'function') {
            locData.callback = callback;
        }
		document.location.hash = url;
	}
	else {
		if (url) {
			url = '?' + url;
			var qs = preloader.qs(url);
			var r = [];
			var ax = {};
			for (var key in qs) {
				if (key.indexOf('--') !== 0) {
					r.push(key + '=' + qs[key]);
				} else {
					ax[key] = qs[key];
				}
			}
			r = r.join('&');
			if (r === preloader.oldHash['--root']) {
				var gotIt = false;
				for (var key in ax) {
					if (preloader.oldHash[key] !== ax[key]) {
						gotIt = true;
						preloader.oldHash[key] = ax[key];
						var aUrl = JSON.parse(ax[key]);
						var bUrl = [];
						for (var k in aUrl) {
							if (typeof aUrl.hasOwnProperty === 'function' && aUrl.hasOwnProperty(k)) {
								bUrl.push(encodeURIComponent(k) + '=' + encodeURIComponent(aUrl[k]));
							}
						}
						$('#' + key.substr(2)).load("index.php?" + bUrl.join('&'));
					}
				}
				if (gotIt) {
					preloader.hide();
					return;
				}
			} else {
				preloader.oldHash['--root'] = r;
			}
			//Activate root menu
			if (qs['module'] && url.indexOf('&__') < 0) {
				changeRoot($('#module-' + qs['module'])[0], false, qs['action']);
				if (qs['action']) {
					changeSub($('#submodule-' + qs['module'] + '-' + qs['action'])[0])
				}
			}
		}
		else {
			url = '?module=admin&action=welcome';
		}
		if (url === '?module=admin&action=welcome') {
            $('#home-button > a').addClass('home-select');
			$('#menu-modules li').removeClass("menu-module-selected").addClass('menu-module');
			$('#menu-submodules .menu-submodule-selected, #menu-submodules .menu-submodule').hide();
		}

		if (!callback) {
			if (ax) {
				for (var key in ax) {
					preloader.extraLoad[key.substr(2)] = ax[key];
				}
			}
			callback = preloader.callback;
		}

        var match_module   = typeof locData['loc'] === 'string' ? locData['loc'].match(/module=([a-zA-Z0-9_]+)/) : '';
        var current_module = match_module !== null && typeof match_module === 'object' && typeof match_module[1] === 'string'
            ? match_module[1] : 'admin';

        var match_action   = typeof locData['loc'] === 'string' ? locData['loc'].match(/action=([a-zA-Z0-9_]+)/) : '';
        var current_action = match_action !== null && typeof match_action === 'object' && typeof match_action[1] === 'string'
            ? match_action[1] : 'index';

            match_module   = document.location.hash.match(/module=([a-zA-Z0-9_]+)/);
        var load_module    = match_module !== null && typeof match_module === 'object' && typeof match_module[1] === 'string'
            ? match_module[1] : 'admin';

            match_action = document.location.hash.match(/action=([a-zA-Z0-9_]+)/);
        var load_action  = match_action !== null && typeof match_action === 'object' && typeof match_action[1] === 'string'
            ? match_action[1] : 'index';

		locData['id']   = id;
		locData['data'] = data;
        locData['loc']  = 'index.php' + url;
		loc = 'index.php' + url; //DEPRECATED

		var mod_title    = $('#module-' + load_module + ' > a .module-title').text();
		var action_title = $('#submodule-' + load_module + '-' + load_action + ' > a').text();

        if (load_module === 'admin' && load_action === 'welcome') {
            mod_title = '';
        }

        var css_mod_title = action_title === ''
            ? {'fontSize': '18px', 'paddingTop': '15px','lineHeight': '20px'}
            : {'fontSize': '',     'paddingTop': '',    'lineHeight': ''};

        $('#navbar-top .module-title').css(css_mod_title).text(mod_title);
        $('#navbar-top .module-action').text(action_title);

		var siteName = $.trim($('.site-name').text());
		var title    = (action_title ? (action_title + ' - ') : '') + (mod_title ? mod_title + ' - ' : '') + siteName;

		$('html > head > title').text(title);

        if (xhrs[id]) {
        	xhrs[id].abort();
        }

        if (locData.data) {
            $(id).load('index.php' + url, locData.data, callback);

        } else {
			xhrs[id] = $.ajax({
				url: 'index.php' + url,
				data: data,
				global: false,
				async: true,
				method: 'GET'
			}).done(function (result) {
				$(id).html(result);

				if (current_module !== load_module || current_action !== load_action ||
					document.location.hash.match(/^#module=([a-zA-Z0-9_]+)$/) ||
					document.location.hash.match(/^#module=([a-zA-Z0-9_]+)&action=([a-zA-Z0-9_]+)$/)
				) {
					$(locData.id).hide();
					$(locData.id).fadeIn('fast');
				} else {
					$(locData.id).hide();
					$(locData.id).fadeIn(50);
				}
				if (typeof locData.callback === 'function') {
					locData.callback();
					locData.callback = null;
				}
				callback();

			}).fail(function (jqXHR, textStatus, errorThrown) {
				preloader.hide();
				if (jqXHR.statusText !== 'abort') {

					if ( ! jqXHR.status) swal("Превышено время ожидания ответа. Проверьте соединение с Интернет.", '', 'error').catch(swal.noop);
					else if (jqXHR.status === 404) swal("Запрашиваемый ресурс не найден.", '', 'error').catch(swal.noop);
					else if (jqXHR.status === 403) {
                        if (current_module !== load_module || current_action !== load_action) {
							location.reload();
						} else {
                            swal("Время жизни вашей сессии истекло", 'Чтобы войти в систему заново, обновите страницу (F5)', 'error').catch(swal.noop);
						}
                    }
					else {
						swal("Во время обработки вашего запроса произошла ошибка", 'Обновите страницу и попробуйте снова', 'error').catch(swal.noop);
					}
				}
			});
        }
	}
};


/**
 * @param url
 */
var loadPDF = function (url) {
	preloader.show();
	$("#main_body").prepend(
	    '<div class="pdf-panel hidden">' +
		'<div class="pdf-tool-panel"><button class="btn btn-sm btn-default" onclick="removePDF();">Закрыть</button></div>' +
		'<div class="pdf-main-panel"><iframe id="core-iframe" frameborder="0" width="100%" height="100%" src="' + url + '"></iframe></div>' +
        '</div>'

	);

	$("#core-iframe").load( function() {
        $("body").addClass("pdf-open");

        $("#main_body .pdf-main-panel").css({
            'height': ($("body").height() - ($("#navbar-top").height()) - 40)
        });

		preloader.hide();
		$('.pdf-panel').removeClass('hidden');
        $(window).hashchange( function() {
            $("body").removeClass("pdf-open");
        });
	});
};


/**
 *
 */
function removePDF() {
	$('.pdf-panel').remove();
	$('body').removeClass('pdf-open');
}


/**
 * @param url
 */
var loadScreen = function (url) {
	preloader.show();

	$("#main_body").prepend(
		'<div class="screen-panel hidden">' +
			'<div class="screen-tool">' +
				'<button class="btn btn-sm btn-default" onclick="removeScreen();">Закрыть</button>' +
			'</div>' +
			'<div class="screen-content"></div>' +
		'</div>'

	);

	$(".screen-panel .screen-content").load(url, function() {
		$("body").addClass("screen-open");

		$("#main_body .screen-content").css({
			'height': ($("body").height() - ($("#navbar-top").height()) - 40)
		});

		preloader.hide();
		$('.screen-panel').removeClass('hidden');
		$(window).hashchange( function() {
			$("body").removeClass("screen-open");
		});
	});
};


/**
 *
 */
function removeScreen() {
	$('#main_body > .screen-panel').remove();
	$('body').removeClass('screen-open');
}



/**
 * @param url
 */
var loadExt = function (url) {
	preloader.show();
	$("#main_body").prepend(
	    '<div class="ext-panel hidden">' +
			'<div class="ext-main-panel"><iframe id="core-iframe" frameborder="0" width="100%" height="100%" src="' + url + '"></iframe></div>' +
        '</div>'

	);

	$("#core-iframe").load( function() {
        $("body").addClass("ext-open");

        $("#main_body .ext-main-panel").css({
            'height': $("body").height() - $("#navbar-top").height()
        });

		preloader.hide();
		$('.ext-panel').removeClass('hidden');
        $(window).hashchange( function() {
            $("body").removeClass("ext-open");
        });
	});
};


/**
 *
 */
function resize() {
    $("#main_body .pdf-main-panel").css({
        'height': ($("body").height() - ($("#navbar-top").height()) - 40)
    });
    $("#main_body .ext-main-panel").css({
        'height': $("body").height() - $("#navbar-top").height()
    });
}

$(function(){
	$(window).hashchange( function() {
		var hash = location.hash;
		var url = preloader.prepare(hash.substr(1));
		load(url);

		$('body > .modal-backdrop').fadeOut(function () {
			$('body').removeClass('modal-open');
			$(this).remove();
		});
	});
	// Since the event is only triggered when the hash changes, we need to trigger
	// the event now, to handle the hash the page may have loaded with.
	$(window).hashchange();
});

$(window).resize(resize);

document.addEventListener("DOMContentLoaded", function (e) {

	if ( ! jQuery.support.leadingWhitespace || (document.all && ! document.querySelector)) {
		$("#mainContainer").prepend(
			"<h2>" +
				"<span style=\"color:red\">Внимание!</span> " +
				"Вы пользуетесь устаревшей версией браузера. " +
				"Во избежание проблем с работой, рекомендуется обновить текущий или установить другой, более современный браузер." +
			"</h2>"
		);
	}

    main_menu.setAngles();
	main_menu.setIconLetter();


	window.addEventListener('error', main_menu.errors._onErrorEvent, true);

    $("#menu-modules > .menu-module, #menu-modules > .menu-module-selected").mouseenter(function() {
        if ($(window).width() >= 768 && ($(this).hasClass('menu-module') || $('.s-toggle')[0])) {
			$('.menu-submodule, .menu-submodule-selected').hide();

			var submodulesContainer = $('#menu-submodules').hide();
            var module              = $(this).attr('id').substr(7);
            var submodules          = $('li[id^=submodule-' + module + '-]').show();

			if ($('.s-toggle')[0] || submodules[0]) {
                $('#menu-submodules').find('.submenu-module-title').remove();

				if ($('.s-toggle')[0]) {
                    var issetSelectSubmodule = $('li[id^=submodule-' + module + '-].menu-submodule-selected')[0];
					var selectedClass        = ! issetSelectSubmodule && $(this).hasClass('menu-module-selected') ? 'selected' : '';
                    var $moduleElement       = $(this).find('>a');
                    var moduleHref 	         = $moduleElement.attr('href');
                    var moduleOnClick        = $moduleElement.attr('onclick');
                    var moduleTitle          = $moduleElement.find('>.module-title').text().trim();

                    $('#menu-submodules').prepend(
                        '<li class="submenu-module-title ' + selectedClass + '">' +
                        	'<a href="' + moduleHref + '" onclick="' + moduleOnClick + '">' + moduleTitle + '</a>' +
                        '</li>'
                    );
                }

                submodulesContainer.show();

                var offsets = this.getBoundingClientRect();

                if (($(window).height() - $(this)[0].offsetTop) < submodulesContainer.height()) {
                    submodulesContainer.css('top', (offsets.top - submodulesContainer.height() + 27) + 'px');
                } else {
                    submodulesContainer.css('top', (offsets.top + 1) + 'px');
                }
			}
        }
    });
    $("#menu-modules > .menu-module, #menu-modules > .menu-module-selected").mouseleave(function(e) {
        if ($(window).width() >= 768 && ($(this).hasClass('menu-module') || $('.s-toggle')[0])) {
			var target = e.toElement || e.relatedTarget || e.target;

			if (target) {
				if ($(target).parent().parent().attr('id') === 'menu-submodules') {
					$(this).addClass('module-hover');
				} else {
					$('#menu-submodules').hide();
				}

			} else {
				$('#menu-submodules').hide();
			}
        }
    });
    $("#menu-submodules").mouseleave(function() {
        $(this).hide();
        $("#menu-modules > .menu-module, #menu-modules > .menu-module-selected").removeClass('module-hover');
    });

    if (localStorage.getItem('sidebar_collapse')) {
        $('#main-content, #menu-container, #menu-wrapper, #navbar-top').css('transition', "none");
        if ($(window).width() >= 768) {
            $('#main').toggleClass('s-toggle');
        	$('#menu-wrapper .module-submodules').hide();
		}
    }

    $("#sidebar-toggle").click(function() {
        $('#main-content, #menu-container, #menu-wrapper, #navbar-top').css('transition', "");
        $('#main').toggleClass('s-toggle');


        if ($(window).width() >= 768) {
			if ($('#main').hasClass('s-toggle')) {
				$('#menu-wrapper .module-submodules').hide();
			} else {
				$('#menu-wrapper .module-submodules').show();
			}
		}

		if (localStorage.getItem('sidebar_collapse')) {
			localStorage.setItem('sidebar_collapse', '');
		} else {
			localStorage.setItem('sidebar_collapse', 1);
		}
    });

    $(".swipe-area").swipe({
        swipeStatus: function(event, phase, direction, distance, duration, fingers) {
            var width = $(window).width();
            if (phase === "move" && ((width < 768 && direction === "right") || (width >= 768 && direction === "left"))) {
                $("#main").addClass("s-toggle");
                if (width >= 768) {
                    $('#menu-wrapper .module-submodules').hide();
                }
				localStorage.setItem('sidebar_collapse', 1);
                return false;
            }
            if (phase === "move" && ((width < 768 && direction === "left") || (width >= 768 && direction === "right"))) {
                $("#main").removeClass("s-toggle");
                if (width >= 768) {
                    $('#menu-wrapper .module-submodules').show();
                }
				localStorage.setItem('sidebar_collapse', '');
                return false;
            }
        }
    });

	xajax.callback.global.onRequest = function (a) {

		if (a.hasOwnProperty('parameters') &&
			a.parameters.hasOwnProperty('2') &&
			a.parameters[2].hasOwnProperty('class_id')
		) {
			let form_class_id = a.parameters[2].class_id;
			if (form_class_id.length > 0) {
				$('#main_' + form_class_id + '_mainform > div.buttons-container > div.buttons-area > input[type="submit"]')
					.attr('disabled', true);
			}
		}
		preloader.show();
	};
	xajax.callback.global.onFailure = function (a) {

		if (a.hasOwnProperty('parameters') &&
			a.parameters.hasOwnProperty('2') &&
			a.parameters[2].hasOwnProperty('class_id')
		) {
			let form_class_id = a.parameters[2].class_id;
			if (form_class_id.length > 0) {
				$('#main_' + form_class_id + '_mainform > div.buttons-container > div.buttons-area > input[type="submit"]')
					.attr('disabled', false);
			}
		}
        preloader.hide();
        if (a.request.status === '0') {
            swal("Превышено время ожидания ответа", 'Проверьте соединение с Интернет', 'error').catch(swal.noop);
        } else if (a.request.status === 403) {
            swal("Время жизни вашей сессии истекло", 'Чтобы войти в систему заново, обновите страницу (F5)', 'error').catch(swal.noop);
        } else {
			swal("Ой, извините!", 'Во время обработки вашего запроса произошла ошибка.', 'error').catch(swal.noop);
        }
	};
	xajax.callback.global.onResponseDelay = function () {
		//alert("Отсутствует соединение с Интернет.");
	};
	xajax.callback.global.onExpiration = function () {
		//alert("Отсутствует соединение с Интернет.");
	};
	xajax.callback.global.onComplete = function (a) {
		if (a.hasOwnProperty('parameters') &&
			a.parameters.hasOwnProperty('2') &&
			a.parameters[2].hasOwnProperty('class_id')
		) {
			let form_class_id = a.parameters[2].class_id;
			if (form_class_id.length > 0) {
				$('#main_' + form_class_id + '_mainform > div.buttons-container > div.buttons-area > input[type="submit"]')
					.attr('disabled', false);
			}
		}
		preloader.hide();
	};
	resize();

    $.datepicker.setDefaults($.datepicker.regional[ "ru" ]);
	$.timepicker.regional['ru'] = {
		timeOnlyTitle: 'Выберите время',
		timeText: 'Время',
		hourText: 'Часы',
		minuteText: 'Минуты',
		secondText: 'Секунды',
		millisecText: 'Миллисекунды',
		timezoneText: 'Часовой пояс',
		currentText: 'Сейчас',
		closeText: 'Закрыть',
		timeFormat: 'HH:mm',
		amNames: ['AM', 'A'],
		pmNames: ['PM', 'P'],
		isRTL: false
	};
	$.timepicker.setDefaults($.timepicker.regional['ru']);

    try {
        alert = function(title, message) {
            swal(title, message).catch(swal.noop);
        };
        // !!!!!!!!! DEPRECATED !!!!!!!!!
        alertify = {
            alert: function(title) {
                swal(title).catch(swal.noop);
            },
            confirm: function(question, callback) {
                swal({
                    title: question,
                    type: "question",
                    showCancelButton: true,
                    confirmButtonColor: '#5bc0de',
                    confirmButtonText: "Да",
                    cancelButtonText: "Нет"
                }).then(
                    function(result) {
                        if (callback) {
                            callback(true);
                        }
                    }, function(dismiss) {
                        if (callback) {
                            callback(false);
                        }
                    }
                );
            },
            prompt: function(message, callback) {
                swal({
                    title: message,
                    input: 'text',
                    confirmButtonText: "Далее",
                    cancelButtonText: "Отмена",
                    showCancelButton: true
                }).then(
                    function(result) {
                        if (callback) {
                            callback(true, result);
                        }
                    }, function(dismiss) {
                        if (callback) {
                            callback(false, '');
                        }
                    }
                );
            },
            log: function(message) {
                var d = new Date();
                Snarl.addNotification({
					title: d.getHours()  + ':' + d.getMinutes() + ':' + d.getSeconds(),
					icon: '<i class="fa fa-exclamation-circle"></i>',
					text: message
                });
            },
            error: function(message) {
                Snarl.addNotification({title: "Ошибка", icon: '<i class="fa fa-times"></i>', text: message });
            },
            info: function(message) {
                Snarl.addNotification({title: "Уведомление", icon: '<i class="fa fa-info"></i>', text: message });
            },
            warning: function(message) {
                Snarl.addNotification({title: "Внимание", icon: '<i class="fa fa-warning"></i>',  text: message });
            },
            success: function(message) {
                Snarl.addNotification({title: "Успех", icon: '<i class="fa fa-check"></i>',  text: message });
            },
            message: function(message) {
                Snarl.addNotification({title: "Сообщение", icon: '<i class="fa fa-comment-o"></i>', text: message });
            }
        }
    } catch (e) {
        console.error(e.message)
    }


	const targetNode = document.getElementById("mainContainer");
	const config = {childList: true, subtree: true};
	// Callback function to execute when mutations are observed
	const callback = (mutationList, observer) => {
		for (const mutation of mutationList) {
			if (mutation.type === "childList" && mutation.addedNodes.length) {
				$('a, button').each(function (){
					if ($(this).data('hotkey')) {
						if ($(this)[0].getAttribute('listener') !== 'true') {
							const hotkey = $(this).data('hotkey')
							keymaps[hotkey] = $(this)[0];
							$(this)[0].setAttribute('listener', 'true');
						}
					}
				});
			} else if (mutation.type === "attributes") {
				//console.log(`The ${mutation.attributeName} attribute was modified.`);
			}
		}
	};
	let keymaps= {};

	addEventListener("keydown", (event) => {});
	onkeydown = (e) => {
		// console.log(e)
		let key = "";
		if (e.ctrlKey) key += "Ctrl+";
		if (e.altKey) key += "Alt+";
		key += e.code;
		if (keymaps[key]) {
			if (document.body.contains(keymaps[key])) {
				if ($(keymaps[key])[0].nodeName == 'A') document.location = $(keymaps[key]).attr('href');
				if ($(keymaps[key])[0].nodeName == 'BUTTON') $(keymaps[key]).click();
			}
		}
	};

	// Create an observer instance linked to the callback function
	const observer = new MutationObserver(callback);

	// Start observing the target node for configured mutations
	observer.observe(targetNode, config);

	// Later, you can stop observing
	//observer.disconnect();
});

var currentCategory = "";
$.ui.autocomplete.prototype._renderItem = function( ul, item) {
	var term = this.term.split(' ').join('|');
	var t 	 = item.label;

	if (term) {
		term = term.replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\' + '' + '-]', 'g'), '\\$&');

		var re = new RegExp("(" + term + ")", "gi");
		t = t.replace(re, "<b>$1</b>");
	}

	if (currentCategory && ! item.category) {
		item.category = '--';
	}

	if (item.category && item.category !== currentCategory) {
		ul.append("<li class='ui-autocomplete-category'>" + item.category + "</li>");
		currentCategory = item.category;
	}

	return $("<li></li>")
		.data("item.autocomplete", item)
		.append("<a>" + t + "</a>")
		.appendTo(ul);
};


//------------Core2 worker-------------
if (window.hasOwnProperty('SharedWorker') && typeof window.SharedWorker === 'function') {
	var worker = new SharedWorker("core2/js/worker.js");
	worker.port.addEventListener(
		"message",
		function(e) {
			const evt = e.data.event;
			switch (e.data.type) {
				case 'modules':
					for (i in evt) {
						document.dispatchEvent(new CustomEvent(i, {'detail': evt[i]}));
					}
					break;
				case 'Core2':
					for (i in evt) {
						document.dispatchEvent(new CustomEvent("Core2", {'detail': evt[i]}));
					}
					//console.log(evt)
					break;

				default:
					// console.log(e.data);
					break;
			}

		},
		false,
	);
	worker.onerror = function(event) {
		console.error("There is an error with your worker!");
	};
	worker.port.start();
	worker.port.postMessage("start");
	worker.port.postMessage("sse-open");
	// worker.port.postMessage("sse-close");

	document.addEventListener(
		"Core2-Fact",
		(e) => {
			e.detail.forEach(function (data){
				const e = JSON.parse(data);
				// console.log(e)
				if (e.element) {
					$(e.element.selector).html(e.element.text);
				}
			})
		},
		false,
	);
    
}

