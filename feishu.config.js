const path = require('path');

module.exports = {
  // 1. 凭证部分：严格从 Vercel 环境变量读取（安全，不写死）
  appId: process.env.FEISHU_APP_ID,
  appSecret: process.env.FEISHU_APP_SECRET,
  spaceId: process.env.FEISHU_SPACE_ID,
  
  // 2. 路径部分：核心修正！
  // 为了防止工具犯蠢，我们同时设置 baseUrl 和 endpoint
  // 逻辑是：优先读环境变量，读不到直接用 Lark 国际版地址，绝不让它回退到 feishu.cn
  baseUrl: process.env.FEISHU_BASE_URL || 'https://open.larksuite.com', 
  endpoint: process.env.FEISHU_BASE_URL || 'https://open.larksuite.com',
  
  docs: 'docs',
  output: path.join(__dirname, 'docs'),
}
