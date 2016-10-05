// setting the enviro variable NODE_ENV to production turns off various devtools (eg logging) and turns on various optimizations
var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');


// path.resolve concats its string arguments together to form an absolute path,
// if left most string is not absolute, it uses the cwd of where the script was run
var SCRIPTS_ROOT = path.resolve(__dirname, "./scripts");
var STYLES_ROOT = path.resolve(__dirname, "./styles");

module.exports = {
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
				test: /\.json$/,
				loader: "json"
			},
            {
				test: /\.txt$/,
				loader: "raw"
			}
        ]
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
};
