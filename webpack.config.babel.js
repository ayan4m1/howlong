import { resolve } from 'path';
import autoprefixer from 'autoprefixer';
// eslint-disable-next-line import-x/default
import CopyPlugin from 'copy-webpack-plugin';
import HtmlPlugin from 'html-webpack-plugin';
import CnamePlugin from 'cname-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import StylelintPlugin from 'stylelint-webpack-plugin';
import postcssFlexbugsFixes from 'postcss-flexbugs-fixes';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import { CleanWebpackPlugin as CleanPlugin } from 'clean-webpack-plugin';

const dev = process.env.NODE_ENV === 'development';

const plugins = [
  new CopyPlugin({
    patterns: ['public/']
  }),
  new CnamePlugin({
    domain: 'howlonguntilwerefucked.com'
  }),
  new CleanPlugin(),
  new StylelintPlugin({
    configFile: '.stylelintrc',
    context: 'src',
    files: '**/*.scss',
    failOnError: true,
    quiet: false,
    customSyntax: 'postcss-scss'
  }),
  new HtmlPlugin({
    template: './src/index.html'
  }),
  new ESLintPlugin({
    configType: 'flat',
    eslintPath: 'eslint/use-at-your-own-risk'
  }),
  new MiniCssExtractPlugin()
];

export default {
  mode: dev ? 'development' : 'production',
  devtool: dev ? 'eval-cheap-module-source-map' : 'cheap-module-source-map',
  entry: './src/index.js',
  devServer: {
    compress: dev,
    open: true,
    historyApiFallback: true,
    hot: dev,
    port: 9000
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                ident: 'postcss',
                plugins: [autoprefixer, postcssFlexbugsFixes]
              },
              sourceMap: dev
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.glsl$/,
        type: 'asset/source'
      }
    ]
  },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'main.js',
    chunkFilename: '[name].js'
  },
  plugins,
  resolve: {
    extensions: ['.js', '.json'],
    modules: ['node_modules', 'src'],
    alias: {
      components: resolve(__dirname, 'src/components'),
      utils: resolve(__dirname, 'src/utils')
    }
  },
  optimization: {
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()]
  }
};
