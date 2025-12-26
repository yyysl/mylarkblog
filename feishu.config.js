const path = require('path');

module.exports = {
  docs: 'docs',
  appId: process.env.FEISHU_APP_ID,
  appSecret: process.env.FEISHU_APP_SECRET,
  spaceId: process.env.FEISHU_SPACE_ID,
  
  // 👇 关键修正：强制指定这里是国际版 Lark，不再去连国内飞书了
  baseUrl: process.env.FEISHU_BASE_URL || 'https://open.larksuite.com', 
  
  // 忽略不需要的属性，防止报错
  output: path.join(__dirname, 'docs'),
}
