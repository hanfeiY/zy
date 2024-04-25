const path = require('path');

const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,


  devServer:{
    proxy:{
      "/adminapi":{
        target:"http://localhost:3000",
        changeOrigin:true
      }
    }
  },


  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.join(__dirname, './src/assets/styles/variables.less'),
        path.join(__dirname, './src/assets/styles/mixins.less')
      ]
    }
  },

})