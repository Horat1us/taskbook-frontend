/**
 * Author: Alexander <Horat1us> Letnikow
 * Support: reclamme@gmail.com
 *
 * This file is Dark and full of Terrors
 */

const
    path = require('path'),
    fs = require('fs'),
    webpack = require('webpack');

// npm dependencies
const
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    FaviconsWebpackPlugin = require('favicons-webpack-plugin'),
    CriticalPlugin = require('webpack-plugin-critical').CriticalPlugin,
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin');

const debug = process.env.NODE_ENV !== 'production';
const env = debug ? 'local' : 'production';
const favicon = path.resolve('./images/favicon.png');

const isApache = (process.env.APACHE || 0) === '1';
console.log("Running in " + env + " environment. Debug: " + debug.toString());
if (isApache) {
    console.log("Build for Apache2");
}

const config = {
        entry: ['babel-polyfill', "./src/index.tsx"],

        devServer: {
            publicPath: "/",
            contentBase: './web',
            noInfo: false,
            hot: true,
            inline: true,
            open: true,
            historyApiFallback: true,
            port: 8089,
        },

        output: {
            filename: '[name].[hash:6].js',
            path: path.resolve('./web'),
            publicPath: "/",
        },

        devtool: debug ? "source-map" : false,

        resolve: {
            extensions: [".ts", ".tsx", ".js", ".json", ".jsx",],
            modules: [
                path.resolve('node_modules'),
                path.resolve('src'),
            ],
        },

        module: {
            loaders: [
                {
                    test: /\.(css|scss)$/,
                    loader: ExtractTextPlugin.extract({
                            fallback: {
                                loader: 'style-loader',
                                options: {
                                    sourceMap: debug,
                                }
                            },
                            use: [
                                {
                                    loader: 'css-loader',
                                    options: {
                                        sourceMap: debug,
                                    },
                                },
                                {
                                    loader: 'postcss-loader',
                                    options: {
                                        plugins: function (loader) {
                                            const plugins = [
                                                require('autoprefixer')(),
                                            ];
                                            if (!debug) {
                                                plugins.push(require('cssnano')());
                                            }
                                            return plugins;
                                        },
                                        sourceMap: debug,
                                    },
                                },
                                {
                                    loader: 'sass-loader',
                                    options: {
                                        includePaths: [
                                            path.resolve(__dirname + './styles'),
                                            path.resolve(__dirname, "./node_modules/compass-mixins/lib"),
                                        ],
                                        sourceMap: debug,
                                    },
                                },
                            ],
                        }
                    ),
                },
                {
                    test: /\.woff2?$|\.ttf$|\.eot$|\.otf$/,
                    loaders: [
                        {
                            loader: 'file-loader',
                            query: {
                                name: '[name].[hash:6].[ext]',
                            },
                        },
                    ],
                },
                {
                    test: /\.tsx?$/,
                    loaders: [
                        {
                            loader: "babel-loader",
                            query: {
                                presets: ['es2015', 'react', 'stage-2'],
                            },
                        },
                        "awesome-typescript-loader",
                    ],
                }
                ,
                {
                    test: /\.jsx?$/,
                    exclude:
                        [/node_modules/],
                    loader:
                        "babel-loader",
                    query: {
                        presets: ['es2015', 'react', 'stage-0', 'stage-1']
                    },
                },
                {
                    enforce: "pre",
                    test: /\.js$/,
                    loader: "source-map-loader",
                },
            ],
        },

        plugins: [
            new ExtractTextPlugin({
                filename: 'styles.[hash:6].css',
                publicPath: '/',
            }),
            new webpack.NamedModulesPlugin(),
            new CleanWebpackPlugin([path.resolve('./web')]),
            new HtmlWebpackPlugin({
                title: "TaskBook",
                template: path.resolve('./templates/index.ejs'),
                minify: {
                    minifyCSS: !debug,
                    minifyJS: !debug,
                    removeComments: !debug,
                    trimCustomFragments: !debug,
                    collapseWhitespace: !debug,
                }
            }),
            new webpack.optimize.ModuleConcatenationPlugin(),
            new webpack.NodeEnvironmentPlugin(),
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify(env),
                },
            }),
        ]
    }
;

if (fs.existsSync(favicon)) {
    config.plugins.push(
        new FaviconsWebpackPlugin({
            prefix: 'icons-[hash:6]/',
            logo: favicon,
            icons: {
                android: true,
                appleIcon: true,
                appleStartup: false,
                coast: false,
                favicons: true,
                firefox: true,
                opengraph: false,
                twitter: false,
                yandex: true,
                windows: true,
            }
        })
    )
}


const imagesLoaders = [
    {
        loader: 'file-loader',
        query: {
            name: '[name].[hash:6].[ext]',
        },
    },
];

if (debug) {
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin()
    );
} else {
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            },
            minimize: true,
            comments: false,
        }),
        new CriticalPlugin({
            src: 'index.html',
            inline: true,
            minify: true,
            dest: 'index.html'
        })
    );
    imagesLoaders.push(
        {
            loader: 'image-webpack-loader',
            query: {
                mozjpeg: {
                    progressive: true,
                },
                gifsicle: {
                    interlaced: false,
                },
                optipng: {
                    optimizationLevel: 4,
                },
                pngquant: {
                    quality: '75-90',
                    speed: 3,
                },
            },
        }
    );
}

config.module.loaders.push(
    {
        test: /\.(gif|png|jpe?g|svg)$/i,
        loaders: imagesLoaders,
    }
);

if (isApache) {
    config.plugins.push(
        new CopyWebpackPlugin([
            {
                from: path.resolve('./templates/.htaccess'),
                to: path.resolve('./web'),
            },
        ])
    );
}


module.exports = config;