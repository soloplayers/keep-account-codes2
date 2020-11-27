const path=require('path');

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/keep-account-website2/'
    : '/',
  lintOnSave: false,
  chainWebpack: (config)=>{
    const dir=path.resolve(__dirname,'src/assets/icons')

    config.module
      .rule('svg-sprite')
      .test(/\.svg$/)
      .include.add(dir).end() //只包含icons
      .use('svg-sprite-loader').loader('svg-sprite-loader').options({extract:false}).end()
      .use('svgo-loader').loader('svgo-loader') // 删除svg中自带的颜色(即删除svg的fill属性)
      .tap(options => ({...options,plugins:[{removeAttrs:{attrs:'fill'}}]})).end()
    config.plugin('svg-sprite').use(require('svg-sprite-loader/plugin'),[{plainSprite:true}])
    config.module.rule('svg').exclude.add(dir)  //其他svg loader排除icons目录
  }
}