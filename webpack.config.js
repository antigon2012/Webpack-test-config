const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin') // плагин для нормальной работы html формата
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // плагин для минимизации стилей при билде проекта

let mode = 'development' // режим разработки приложения
let target = 'web' // в зависимости от режима разработки применяет зависимости (например минимизация изображений)
if (process.env.NODE_ENV === 'production') {
  mode = 'production'
  target = 'browserslist'
}

const plugins = [ // массив благинов (Каждый новый подключается через ключевое слово New
  new HtmlWebpackPlugin({
    template: './index.html', // входная точна в приложение html
  }),
  new MiniCssExtractPlugin({
    filename: '[name].[contenthash].css', // имя файла которое будет на выходе [имя].[егоХэши].[расширение]
  }),
]

module.exports = {
  mode, // указание режима разработки
  plugins, // подключение массива плагинов
  target, // используется в девелопмент и продакшн режимах (меняется в зависимости от них)
  context: path.resolve(__dirname, 'src'), // позволяет не указывать папку src при подключении файлов (Только в конфиг файле)
  entry: {
    main: './index.js', // входная точка в приложение (В него импортируется все остальное, будь то стили, изображения, другие файлы формата js, JSON и содержимое в них)
  },
  output: {
    path: path.resolve(__dirname, 'dist'), // на выходе создаст папку дист
    assetModuleFilename: 'assets/[hash][ext][query]', // названия файлов которые попадут в ассеты
    clean: true, // Раньше это был CleanWebpackPlugin
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'), // немного ускоряем нашу разработку с запущенным сервером
    },
    compress: true,
    open: true, // данная опция разрешает нам автоматически открывать браузер по умолчанию
    hot: false, // отвечает за перезагрузку при внесении изменений
    port: 3001, // в формате числа можно указывать свой порт
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx'], // позволяет не указывать расширения данных файлов
  },
  module: { // Объект для нормальной работы с файлами
    rules: [
      {
        test: /\.(html)$/, // файлы формата html
        use: ['html-loader'], // будут пропускаться через html-loader
      },
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'], // читается справа на лево, т.е. сначала стили прогоняются через sass > css >  MiniCss
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
        type: mode === 'production' ? 'asset' : 'asset/resource', // в зависимости от режима разработки склыдвает подключаемые шрифы, картинки в папку с ассетами
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(js|jsx)?$/, // обработка стандартного js + обработка файлов формата jsx (Реакт)
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // для поддержки старыми версиями браузеров
          options: {
            cacheDirectory: true, // кэширование
          },
        },
      },
      {
        test: /\.(ts|tsx)?$/, // обработка TypeScript + обработка файлов формата jsx (Реакт)
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
    ],
  },
}
