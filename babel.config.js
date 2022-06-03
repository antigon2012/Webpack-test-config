module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-typescript', ['@babel/preset-react', {'runtime': 'automatic'}]], // для нормальной работы TypeScript, React
  plugins: [
    [
      "@babel/plugin-transform-runtime",
      {
        "regenerator": true,
      }
    ]
  ]
}