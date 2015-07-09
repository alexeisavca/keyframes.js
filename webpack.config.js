module.exports = {
    entry: {
        install: "./script.es6",
    },
    output: {
        path: './',
        filename: "script.js"
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