# 项目手动部署指南 (Manual Deployment Guide)

本指南详细介绍了如何将 `machinery-portal` 纯前端项目（基于 Next.js 15+ 和 React 19 构建）手动部署到生产环境服务器（例如 Ubuntu/CentOS 等 Linux 服务器）。

## 1. 技术栈与环境依赖

在目标服务器上部署本项目前，请确保已经安装并满足以下环境要求：

- **操作系统**: 推荐主流 Linux 发行版（如 Ubuntu 20.04+, CentOS 7+ 等）
- **Node.js**: `v18.17.0` 或更高版本（Next.js 14+ 推荐使用 `v20.x` 的 LTS 版本）
- **包管理器**: `npm`（随 Node.js 一起安装）
- **进程管理工具 (推荐)**: `pm2` 或 `systemd`（用于保持服务在后台常驻运行）
- **反向代理软件 (推荐)**: `Nginx`（用于处理 HTTPS 证书、域名绑定和端口转发）

## 2. 部署步骤

### 2.1 获取代码并安装依赖

首先，通过 Git 将您的代码仓库克隆到生产服务器的指定目录（例如 `/var/www/machinery-portal`），然后进入项目目录。

```bash
# 1. 克隆代码（请替换为您真实的仓库地址）
git clone https://github.com/your-repo/machinery-portal.git
cd machinery-portal

# 2. 安装项目依赖（使用生产环境参数可忽略开发阶段依赖以节省空间）
npm install
```

### 2.2 配置环境变量

项目需要正确的环境变量配置才能连接到生产环境的后端 API。

1. 复制环境示例文件并重命名为 `.env.production` 或 `.env.local`：
```bash
cp .env.example .env.production
```

2. 使用文本编辑器（如 `nano` 或 `vim`）修改 `.env.production`，填入正式环境的配置参数：
```env
# 生产环境的数据服务 API 根地址 (例如您的 Java Spring Boot 后台服务地址)
NEXT_PUBLIC_API_BASE_URL=https://api.yourdomain.com/api

# WhatsApp 客服联系号码
NEXT_PUBLIC_WHATSAPP_NUMBER=+8618949813729

# 网站接收询盘的联系邮箱
NEXT_PUBLIC_CONTACT_EMAIL=info@machinery100.com
```

### 2.3 构建生产版本代码

环境变量配置完成后，执行 Next.js 的生产构建命令。这一步会把 React 组件、TypeScript 代码编译并优化为静态文件与 Node.js 渲染程序：

```bash
npm run build
```
*(注：构建过程中 Next.js 会自动读取并打包上一步中配置好的 `.env.production` 里的 `NEXT_PUBLIC_` 变量)*

### 2.4 启动服务

构建成功后，即可启动生产环境的 Node 服务。

**临时启动测试（退出终端后会停止）**:
```bash
npm run start
# 默认服务会运行在 http://localhost:8001
```

**正式后台守护运行 (强烈推荐使用 PM2)**:
为保证服务在服务器重启或意外崩溃后能自动恢复，建议使用 `pm2` 管理进程：

```bash
# 如果没有安装 pm2，请先全局安装
npm install -g pm2

# 使用 pm2 启动 Next.js 项目，并命名为 machinery-portal
pm2 start npm --name "machinery-portal" -- run start

# 保存当前的 pm2 进程列表，并设置开机自启
pm2 save
pm2 startup
```

---

## 3. 配置 Nginx 反向代理 (推荐)

一般情况下，我们在 `package.json` 中配置了项目运行在 `8001` 端口。在生产环境中，我们需要使用 Nginx 将 `80` (HTTP) 或 `443` (HTTPS) 端口的外部请求转发到该内部端口，并配置您的正式域名。

1. 在服务器上创建 Nginx 配置文件，例如 `/etc/nginx/sites-available/machinery-portal`
2. 填入如下基础代理配置：

```nginx
server {
    listen 80;
    # 替换为您自己的真实域名
    server_name www.yourdomain.com yourdomain.com;

    location / {
        proxy_pass http://localhost:8001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        
        # 传递客户端真实 IP 等信息给 Node.js 
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

3. 启用该配置并重启 Nginx：
```bash
ln -s /etc/nginx/sites-available/machinery-portal /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

*(如果需要配置 SSL/HTTPS 证书，推荐使用 [Certbot (Let's Encrypt)](https://certbot.eff.org/) 一键自动配置 HTTPS)*

## 4. 后续维护与版本更新

当项目代码有更新并推送到 Git 仓库后，在服务器上重新部署非常简单：

```bash
# 1. 进入项目目录
cd /var/www/machinery-portal

# 2. 拉取最新代码
git pull origin main

# 3. 如果 package.json 中的依赖有变动，重新安装依赖
npm install

# 4. 重新构建生产代码
npm run build

# 5. 重启 PM2 进程使新代码生效
pm2 restart machinery-portal
```