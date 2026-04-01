# 部署指南

## 手动部署到Vercel

由于CLI认证限制，请按照以下步骤手动部署：

### 步骤1：准备代码
```bash
# 确保项目构建成功
npm run build

# 提交所有更改
git add .
git commit -m "Ready for deployment"
```

### 步骤2：访问Vercel Dashboard
1. 访问 [https://vercel.com](https://vercel.com)
2. 登录您的账户
3. 点击 "New Project"
4. 选择 "Import Git Repository"

### 步骤3：配置项目
1. 选择您的项目文件夹
2. 配置构建设置：
   - **Framework**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

3. 设置环境变量：
   ```
   DATABASE_URL=file:./dev.db
   NODE_ENV=production
   ```

### 步骤4：部署设置
1. 选择部署区域：Hong Kong (hkg1)
2. 点击 "Deploy" 开始部署
3. 等待构建完成

### 步骤5：验证部署
部署完成后，您将获得一个Vercel域名，例如：
`https://machinery-portal-xyz123.vercel.app`

## 项目特性
- ✅ 多语言支持（/en, /es）
- ✅ 产品展示页面
- ✅ WhatsApp集成
- ✅ 在线留言系统
- ✅ 响应式设计
- ✅ SEO优化

## 访问地址
- 主页: `/`（自动重定向到 `/en`）
- 英语版本: `/en`
- 西班牙语版本: `/es`
- 产品列表: `/products`
- 联系我们: `/contact`

## 技术支持
项目使用：
- Next.js 16.2.1
- TypeScript
- Tailwind CSS
- 简化多语言路由
- SQLite数据库（开发环境）