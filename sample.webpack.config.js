var DEBUG = process.env.DEBUG;
var LOGS = process.env.LOGS;

var _ = require("lodash");
var autoprefixer = require("autoprefixer");
// var BrowserSyncPlugin = require("browser-sync-webpack-plugin");
var csswring = require("csswring");
var path = require("path");
var webpack = require("webpack");

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var WebpackErrorNotificationPlugin = require("webpack-error-notification");
var webpackFailPlugin = function () {
	this.plugin("done", function (stats) {
		if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf("--watch") === -1) {
			process.on("beforeExit", function () {
				process.exit(1);
			});
		}
	});
};

var AssetsPlugin = require("assets-webpack-plugin");
var assetsPluginInstance = new AssetsPlugin({
	filename: "./public/assets.json"
});

var devFlagPlugin = new webpack.DefinePlugin({
	__DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || "false"))
});

var SCRIPTS_ROOT = path.resolve(__dirname, "./scripts");
var STYLES_ROOT = path.resolve(__dirname, "./styles");
var TEST_ROOT = path.resolve(__dirname, "./test");

var VENDOR_MODULES = [
	"babel-runtime/regenerator",
	"bluebird",
	"jquery",
	"bootstrap",
	"bootstrap-select",
	"debug",
	"highcharts-release",
	"history",
	"moment",
	"react",
	"react-datetime",
	"react-dom",
	"react-dropzone",
	"react-google-maps",
	"react-router",
	"react-redux",
	"react-select",
	"react-simple-pie-chart",
	"redux",
	"redux-actions",
	"react-geosuggest",
	"react-router",
	"redux-router",
	"react-s-alert",
	"react-select",
	"redux-thunk",
	"whatwg-fetch",
	"classnames",
	"superagent",
	"slideout",
	"validator",
	"redux-form",
	"redux-form-schema",
	"react-maskedinput"
];

var MODULES = {
	site: "rw-scripts/site"
};

function cssLoaders(extra) {
	return ExtractTextPlugin.extract("style", [
		"css?sourceMap&-minimize",
		"postcss" + (DEBUG ? "?pack=DEBUG" : "")
	]
	.concat(extra || [])
	.join("!"));
}

module.exports = {
	entry: _.merge(MODULES, {
		vendor: VENDOR_MODULES
	}),
	output: {
		path: path.resolve(__dirname, "./public"),
		filename: LOGS === "true" ? "[name].bundle.js" : "[name]-[hash].bundle.js",
		pathinfo: DEBUG
	},
	module: {
		noParse: [
			/[\/]jquery[\/]/,
			/[\/]moment[\/]/,
			/[\/]slideout[\/]/
		],
		preLoaders: [{
			test: /\.(es6|js|jsx)$/,
			loader: "eslint-loader", // to avoid confusion with `eslint` module
			include: _.merge([SCRIPTS_ROOT, STYLES_ROOT])
		}],
		eslint: {
			emitError: true,
			failOnError: true
		},
		loaders: [
			{
				test: /[\/]bootstrap.*\.js$/,
				loader: "imports?jquery"
			}, {
				test: /[\/]highcharts(\.src)?\.js$/,
				loader: "imports?jquery"
			}, {
				test: /[\/]fetch\.js$/,
				loader: "exports?global.fetch"
			}, {
				test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: "url?name=[name].[ext]&limit=10000&mimetype=application/font-woff"
			}, {
				test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: "file?name=[name].[ext]"
			}, {
				test: /\.png$/,
				loader: "file?name=[name].[ext]"
			}, {
				test: /\.(es6|js|jsx)$/,
				loader: "babel",
				include: _.merge([SCRIPTS_ROOT, STYLES_ROOT, TEST_ROOT]),
				query: {
					stage: 0,
					optional: DEBUG ? ["runtime"] : [
						"optimisation.react.inlineElements",
						"optimisation.react.constantElements",
						"runtime"
					]
				}
			}, {
				test: /\.css$/,
				loader: cssLoaders()
			}, {
				test: /\.scss$/,
				loader: cssLoaders("sass?outputStyle=expanded&sourceMap&sourceMapContents")
			}, {
				test: /\.json$/,
				loader: "json"
			}, {
				test: /\.txt$/,
				loader: "raw"
			}
		]
	},
	resolve: {
		extensions: ["", ".js", ".es6", ".jsx", ".txt"],
		modulesDirectories: ["thirdparty", "node_modules"],
		alias: {
			"rw-scripts": SCRIPTS_ROOT,
			"rw-styles": STYLES_ROOT,
			"rw-test": TEST_ROOT,
			// Third Party Mapping
			"bootstrap$": "bootstrap/dist/js/bootstrap.min",
			"highcharts$": "highcharts-release/highcharts",
			"highcharts/modules/funnel$": "highcharts-release/modules/funnel",
			"bluebird$": "bluebird/js/browser/bluebird",
			"debug$": "debug/browser",
			"jreject$": "jreject/jreject.min",
			"moment$": "moment/min/moment.min",
			"slideout$": "slideout/dist/slideout.min"
		}
	},
	postcss: {
		defaults: [
			autoprefixer({
				browsers: ["last 2 versions"],
				cascade: false
			}),
			csswring()
		],
		DEBUG: [
			autoprefixer({
				browsers: ["last 2 versions"]
			})
		]
	},
	resolveLoader: {
		root: path.resolve(__dirname, "./node_modules")
	},
	plugins: [
		new webpack.ProvidePlugin({
			fetch: "whatwg-fetch",
			"window.jQuery": "jquery",
			jQuery: "jquery",
			Promise: "bluebird",
			React: "react"
		}),
		new webpack.DefinePlugin({
			DEBUG: LOGS === "true"
		}),
		new webpack.optimize.OccurenceOrderPlugin(true),
		new webpack.optimize.CommonsChunkPlugin({
			name: "vendor",
			filename: "vendor.bundle.js",
			// bundle all the modules!
			minChunks: Infinity
		}),
		assetsPluginInstance,
		devFlagPlugin
	].concat(LOGS === "true" ? [
		new WebpackErrorNotificationPlugin()
	] : [
		new webpack.optimize.UglifyJsPlugin({
			mangle: false,
			compress: false
		}),
		webpackFailPlugin
	]).concat([
		new ExtractTextPlugin(LOGS === "true" ? "[name].css" : "[name]-[hash].css"),
		new webpack.NoErrorsPlugin()
	]),
	debug: DEBUG,
	devtool: DEBUG ? "cheap-module-source-map" : "hidden-cheap-module-source-map"
};
