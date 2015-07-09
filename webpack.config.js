module.exports = {
    entry: {
        install: "./index.es6",
    },
    output: {
        path: './',
        filename: "index.js",
        libraryTarget: 'commonjs2'
    },
    module: {
        loaders: [
            {
                test: /\.es6$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.es6']
    }
};