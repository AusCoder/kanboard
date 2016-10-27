var path = require('path');
var webpack = require('webpack');

var SCRIPTS_ROOT = path.resolve(__dirname, "./scripts");
var STYLES_ROOT = path.resolve(__dirname, "./styles");
var TEST_ROOT = path.resolve(__dirname, "./tests");

var debug = true;

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai'],
    files: [
      'tests/**/*.js'
    ],
    preprocessors: {
      // add webpack as preprocessor
      'tests/**/*.js': ['webpack']
    },
    exclude: [
    ],
    reporters: ['dots'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false,
    plugins: [
      'karma-webpack',
      'karma-mocha',
      'karma-chai',
      'karma-sourcemap-loader',
      'karma-phantomjs-launcher'
    ],

    webpack: {
        context: __dirname,
        devtool: debug
            ? "inline-sourcemap"
            : null,
        entry: path.resolve(SCRIPTS_ROOT, "client.js"),
        module: {
            // loaders tell webpack how to process different file types
            loaders: [
                {
                    test: /\.(jsx?|es6)$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: 'babel-loader',
                    query: {
                        presets: [
                            'react', 'es2015', 'stage-0'
                        ],
                        plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']
                    }
                },
                {
                    test: /\.css$/,
                    // these are style-loader, css-loader and sass-loader
                    // you might have to use
                    // require(!style!css!sass!./path/to/stylesheet)
                    // when importing (the !s are like pipes)
                    loaders: [ 'style', 'css?sourceMap', 'sass?sourceMap' ]
                },
                {
                    // these are loaders for fonts, graphics and other such things (including font-awesome)
                    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: "url?name=[name].[ext]&limit=10000&mimetype=application/font-woff"
                },
                {
                    test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: "file?name=[name].[ext]"
                },
                {
                  test: /\.json$/,
                  loader: "json"
                },
                {
                  test: /\.txt$/,
                  loader: "raw"
                }
            ]
        },
        externals: {
          "react/lib/ExecutionEnvironment": true,
          "react/lib/ReactContext": true,
          "cheerio": "window",
          "react/addons": true
        },
        // this is the output directory for the webpack file
        output: {
            path: __dirname + "/public/",
            filename: "client.min.js"
        },
        // tell webpack how to resolve import statements
        resolve: {
            extensions: ["", ".js", ".jsx", ".es6", ".txt"],
            alias: {
                "kb-scripts": SCRIPTS_ROOT,
                "kb-styles": STYLES_ROOT
                // here we can include specific mappings which tell webpack where to look if a module doesn't default export something we want. We do this with
                // "bootstrap$": "bootstrap/dist/js/bootstrap.min",
            }
        },
        plugins: [
            // ProvidePlugin automatically imports a module when it is referenced in a file
            new webpack.ProvidePlugin({
                React: "react",
                $: "jquery",
                jQuery: "jquery"
            }),
            // DefinePlugin allows for global constants that can be changed at compile time. This allows for useful logging in DEV mode, for example
            new webpack.DefinePlugin({
                DEBUG: debug ? "true" : "false"
            })
        ].concat(debug
            ? []
            : [
                new webpack.optimize.DedupePlugin(),
                new webpack.optimize.OccurenceOrderPlugin(),
                new webpack.optimize.UglifyJsPlugin({mangle: false, sourcemap: false})
            ]
        )
    },
  });
};
