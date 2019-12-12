module.exports = {
    parser: 'postcss-scss',
    plugins: [
        require('autoprefixer')({
            "overrideBrowserslist" : [
                "> 1%",
                "last 7 versions",
                "not ie <= 8",
                "ios >= 8",
                "android >= 4.0"
              ]
        })
    ]
}