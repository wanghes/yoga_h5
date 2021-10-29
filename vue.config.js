const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const myTheme = path.resolve(__dirname, "./src/assets/less/vantChange.less");
const productionEnv = process.env.NODE_ENV === 'production'
const Timestamp = Date.now()

console.log(myTheme);

module.exports = {
    publicPath: '/',
    productionSourceMap: false,
    filenameHashing: true,
 
    css: {
        extract: productionEnv ? {
            filename: `css/[name].${Timestamp}.css`,
            chunkFilename: `css/[name].${Timestamp}.css`,
        } : false,
        loaderOptions: {
            less: {
                // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
                // lessOptions: { 
                    modifyVars: {
                        // 直接覆盖变量
                        // "green": "#FF5926",
                        // 'text-color': '#111',
                        // 'border-color': '#eee',
                        // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
                        hack: `true; @import "${myTheme}";`
                    }
                // }
            },
        },
    },
    chainWebpack: config => {
        config.plugins.delete('prefetch');
    },
    /*
    configureWebpack: {
        optimization: {
            splitChunks: {
                cacheGroups: {
                    styles: {
                        name: 'styles',
                        test: /\.css$/,
                        chunks: 'all',
                        enforce: true,
                    },
                },
            }
        },
        module: {
            rules: [
              {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                  MiniCssExtractPlugin.loader,
                  'css-loader'
                ]
              },
              {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "less-loader"
                    }
                ]
              }
            ]
          },
        plugins: [
            new MiniCssExtractPlugin({
                filename: `css/[name].${Timestamp}.css`,
            }),
            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: {
                    safe: true
                }
            })
        ]
    },
    */
    devServer: {
        disableHostCheck: true,
        historyApiFallback: true
    },
    lintOnSave: false
}