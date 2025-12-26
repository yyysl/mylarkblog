const fs = require('fs');
const path = require('path');

// 目标路径：Vercel 安装依赖后的库文件位置
const targetPath = path.join(__dirname, 'node_modules', 'feishu-pages', 'dist', 'index.js');

try {
  console.log('🔍 开始执行 Lark 强制补丁...');
  
  if (fs.existsSync(targetPath)) {
    // 1. 读取源码
    let content = fs.readFileSync(targetPath, 'utf8');
    
    // 2. 暴力替换：把所有国内域名换成国际域名
    // 我们同时替换 https://open.feishu.cn 和 open.feishu.cn 以防万一
    const patchedContent = content
      .replace(/open\.feishu\.cn/g, 'open.larksuite.com');
      
    // 3. 写回文件
    fs.writeFileSync(targetPath, patchedContent, 'utf8');
    console.log('✅ 成功！源码中的 feishu.cn 已被强制替换为 larksuite.com');
  } else {
    console.warn('⚠️ 警告：未找到目标文件，可能是 feishu-pages 版本变更。路径:', targetPath);
    // 尝试递归搜索所有 .js 文件作为备选方案
    const dir = path.join(__dirname, 'node_modules', 'feishu-pages');
    patchDir(dir);
  }
} catch (e) {
  console.error('❌ 补丁执行失败:', e);
  process.exit(1); // 报错直接让构建失败，不要继续
}

function patchDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) {
      patchDir(full);
    } else if (full.endsWith('.js')) {
      let c = fs.readFileSync(full, 'utf8');
      if (c.includes('open.feishu.cn')) {
        console.log(`正在修复文件: ${file}`);
        fs.writeFileSync(full, c.replace(/open\.feishu\.cn/g, 'open.larksuite.com'));
      }
    }
  }
}
