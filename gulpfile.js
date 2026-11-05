'use strict';

const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const { Transform } = require('stream');

const gulp = require('gulp');
const concat = require('gulp-concat');
const cleanCss = require('gulp-clean-css');
const terser = require('gulp-terser');
const sourcemaps = require('gulp-sourcemaps');

const THEME_DIR = __dirname;
const ROOT_DIR = path.resolve(__dirname, '..', '..', '..');
const posix = path.posix;

const CSS_BUNDLE = 'theme.min.css';
const JS_BUNDLE = 'theme.min.js';

// Файлы этой темы (относительно THEME_DIR), в которые подставляется хэш сборки.
const TPL_FILES = ['index2.tpl', 'indexMobile2.tpl'];

// Длина короткого хэша содержимого в ссылках ?_=...
const HASH_LENGTH = 12;

// Порядок файлов соответствует core2/html/material/index2.tpl.
// Файлы внутри условных комментариев IE в сборку не входят.
const cssFiles = [
	'core2/html/material/css/bootstrap.min.css',
	'core2/html/material/css/font-awesome.min.css',
	'core2/html/material/css/material-design-iconic-font.min.css',
	'core2/html/material/css/jquery/ui-base/jquery-ui.min.css',
	'core2/html/material/css/jquery.ui.theme.css',
	'core2/html/material/css/jquery.ui.theme.font-awesome.css',
	'core2/html/material/css/sweetalert2.min.css',
	'core2/html/material/css/coreui.notice.css',
	'core2/html/material/css/animate.min.css',
	'core2/html/material/css/snarl.min.css',
	'core2/html/material/css/menu.css',
	'core2/html/material/css/styles.css',
	'core2/html/material/css/select2.bootstrap.css',
	'core2/html/material/css/select2.min.css',
	'core2/html/material/css/dark.css',
	'core2/html/material/css/bootstrap5-compat.css',
];

const jsFiles = [
	'core2/js/md5.js',
	'core2/js/ua-parser.min.js',
	'core2/html/material/js/jquery-3.7.1.min.js',
	'core2/html/material/js/jquery-migrate-3.4.1.min.js',
	'core2/js/jquery/lib/jquery.cookie.js',
	'core2/js/jquery/jquery-ui.min.js',
	'core2/js/jquery/i18n/jquery.ui.datepicker-ru.js',
	'core2/js/jquery/jquery-ui-timepicker-addon.js',
	'core2/js/jquery/plugins/jquery.maskedinput.min.js',
	'core2/js/jquery/plugins/jquery.maskMoney.js',
	'core2/html/material/js/cleave.min.js',
	'core2/html/material/js/es6-promise.auto.min.js',
	'core2/html/material/js/sweetalert2.min.js',
	'core2/html/material/js/coreui.notice.js',
	'core2/html/material/js/coreui.table.js',
	'core2/html/material/js/coreui.panel.js',
	'core2/html/material/js/coreui.tabs.js',
	'core2/html/material/js/select2.min.js',
	'core2/html/material/js/select2.ru.min.js',
	'core2/html/material/js/snarl.min.js',
	'core2/html/material/js/bootstrap.min.js',
	'core2/html/material/js/jquery.touchSwipe.min.js',
	'core2/html/material/js/control_datepicker_range.js',
	'core2/html/material/js/class.list.js',
	'core2/html/material/js/class.edit.js',
	'core2/js/eTip.js',
	'core2/html/material/js/main.js',
];

const resolveFiles = (files) => files.map((file) => path.resolve(ROOT_DIR, file));

const CSS_URL_RE = /url\(\s*(?:'([^']*)'|"([^"]*)"|([^)]*?))\s*\)/gi;
const ABSOLUTE_URL_RE = /^(data:|https?:|blob:|\/\/|#|\/)/i;

// При склейке в material/theme.min.css относительные url(...) из папки css/
// перестают работать, поэтому пересчитываем их относительно material/.
function rebaseCssUrls() {
	return new Transform({
		objectMode: true,
		transform(file, encoding, callback) {
			if (file.isNull() || !file.contents) {
				return callback(null, file);
			}
			if (file.isStream()) {
				return callback(new Error('Streaming is not supported'));
			}

			const fileDir = path.relative(THEME_DIR, path.dirname(file.path)).split(path.sep).join('/');
			const css = String(file.contents).replace(CSS_URL_RE, (match, single, double, bare) => {
				const raw = single !== undefined ? single : double !== undefined ? double : bare;
				if (raw == null) {
					return match;
				}

				const value = raw.trim();
				if (!value || ABSOLUTE_URL_RE.test(value)) {
					return match;
				}

				const tailIndex = value.search(/[?#]/);
				const pathPart = tailIndex === -1 ? value : value.slice(0, tailIndex);
				const tail = tailIndex === -1 ? '' : value.slice(tailIndex);
				const rebased = posix.normalize(posix.join(fileDir, pathPart));
				const quote = single !== undefined ? "'" : double !== undefined ? '"' : '';

				return `url(${quote}${rebased}${tail}${quote})`;
			});

			file.contents = Buffer.from(css);
			callback(null, file);
		},
	});
}

function buildCss() {
	return gulp
		.src(resolveFiles(cssFiles))
		.pipe(sourcemaps.init())
		.pipe(rebaseCssUrls())
		.pipe(concat(CSS_BUNDLE))
		.pipe(cleanCss({ rebaseTo: false }))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(THEME_DIR));
}

function buildJs() {
	return gulp
		.src(resolveFiles(jsFiles))
		.pipe(sourcemaps.init())
		.pipe(concat(JS_BUNDLE))
		.pipe(terser())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(THEME_DIR));
}

// Короткий уникальный хэш содержимого файла (base36).
function contentHash(buffer) {
	const digest = crypto.createHash('sha256').update(buffer).digest('hex');

	return BigInt(`0x${digest}`).toString(36).slice(0, HASH_LENGTH);
}

function writeTpl(selector, replacement) {
	for (const tplFile of TPL_FILES) {
		const tplPath = path.join(THEME_DIR, tplFile);
		const tpl = fs.readFileSync(tplPath, 'utf8').replace(selector, replacement);

		fs.writeFileSync(tplPath, tpl);
	}
}

// После сборки бандлов прописываем в tpl ссылки с актуальным хэшем содержимого,
// чтобы браузеры перезагружали theme.min.css и theme.min.js при изменениях.
function injectCssHash(done) {
	const hash = contentHash(fs.readFileSync(path.join(THEME_DIR, CSS_BUNDLE)));

	writeTpl(/(theme\.min\.css)(\?[^"']*)?/g, `$1?_=${hash}`);
	done();
}

function injectJsHash(done) {
	const hash = contentHash(fs.readFileSync(path.join(THEME_DIR, JS_BUNDLE)));

	writeTpl(/(theme\.min\.js)(\?[^"']*)?/g, `$1?_=${hash}`);
	done();
}

const injectHashes = gulp.series(injectCssHash, injectJsHash);
const build = gulp.series(gulp.parallel(buildCss, buildJs), injectHashes);
const rebuildCss = gulp.series(buildCss, injectCssHash);
const rebuildJs = gulp.series(buildJs, injectJsHash);

function watch() {
	gulp.watch(resolveFiles(cssFiles), rebuildCss);
	gulp.watch(resolveFiles(jsFiles), rebuildJs);
}

exports.buildCss = buildCss;
exports.buildJs = buildJs;
exports.injectCssHash = injectCssHash;
exports.injectJsHash = injectJsHash;
exports.injectHashes = injectHashes;
exports.build = build;
exports.watch = watch;
exports.default = build;
