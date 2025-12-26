module.exports = {
  docs: 'docs',
  appId: process.env.FEISHU_APP_ID,
  appSecret: process.env.FEISHU_APP_SECRET,
  spaceId: process.env.FEISHU_SPACE_ID,
  // 👇 这一行非常关键，告诉程序你是 Lark 用户
  baseUrl: process.env.FEISHU_BASE_URL || 'https://open.larksuite.com', 
}
