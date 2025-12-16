# 有语 Youyu

一个基于现代化技术栈的全栈个人网站项目，采用Monorepo架构管理多个应用。

## 项目介绍

**有语** 是一个功能完善的个人网站平台，包含用户端、管理端和移动端三个应用。项目采用前后端分离架构，后端使用Spring Cloud微服务架构。

- 前端仓库：[youyu-monorepo](https://github.com/LinChaoqunRick/react-test)
- 后端仓库：[youyu-parent-cloud](https://github.com/LinChaoqunRick/youyu-parent-cloud)
- 在线演示：https://v2.youyul.com/

## 技术栈

### 前端技术

- **用户端 (Web)**: Vite + Vue3 + TypeScript + Ant Design Vue
- **管理端 (Manage)**: Vite + React19 + TypeScript + Ant Design + TailwindCSS + Zustand + ECharts
- **移动端 (Mobile)**: React Native + Expo + React Navigation
- **共享工具**: Axios、Lodash、Moment.js、QS

### 后端技术

- Spring Cloud Alibaba + Mybatis Plus + Nacos
- OAuth2 + JWT 认证
- 支持QQ、GitHub第三方登录
- Docker Compose 容器编排
- 阿里云OSS图床 + CDN加速

## 项目结构

```
youyu-monorepo/
├── apps/                      # 应用目录
│   ├── web/                   # Vue3用户端应用
│   ├── manage/                # React管理后台
│   └── mobile/                # React Native移动端
├── packages/                  # 共享包
│   ├── shared/                # 共享工具和组件
│   └── spec/                  # 代码规范配置
├── .husky/                    # Git hooks配置
├── package.json               # 根配置文件
└── pnpm-workspace.yaml        # pnpm工作区配置
```

## 快速开始

### 环境要求

- Node.js >= 16
- pnpm >= 8
- Git

### 安装依赖

```bash
pnpm install
```

### 开发模式

启动所有应用：
```bash
pnpm dev
```

启动指定应用：
```bash
# 启动用户端
pnpm dev:web

# 启动管理端
pnpm dev:manage
```

### 构建打包

构建所有应用：
```bash
pnpm build
```

### 代码规范

```bash
# 执行所有应用的Lint检查
pnpm lint

# 修复Apps代码规范问题
pnpm lint:apps

# 修复Packages代码规范问题
pnpm lint:pkgs

# 修复样式规范问题
pnpm stylelint:apps
pnpm stylelint:pkgs
```

### Git提交规范

项目使用Commitlint规范提交信息，通过Husky和Lint-staged在提交前自动检查代码规范。

提交格式：
```
<type>: <description>

# 示例
feat: 新增用户登录功能
fix: 修复图片上传bug
docs: 更新README文档
style: 优化页面样式
refactor: 重构用户模块代码
```

## 主要功能

### 用户端 (Web)

- **首页**: 展示最新动态和推荐内容
- **文章**: 技术文章发布与浏览
- **时刻**: 类似微博的动态分享
- **笔记**: 知识笔记管理
- **相册**: 图片管理，支持瀑布流布局
- **期刊**: 开发中
- **待办**: 开发中
- **实验室**: 各种有趣的功能尝试

### 管理端 (Manage)

- **登录页**: 优化的认证界面
- **分析页**: 数据统计图表展示
- **监控页**: 服务器和业务数据监控
- **内容管理**: 文章、时刻、相册等内容的后台管理
- **用户管理**: 用户信息和权限管理

### 移动端 (Mobile)

- 基于Expo的跨平台移动应用
- 支持iOS和Android平台
- 响应式UI设计

## 功能截图

#### 首页
![首页](https://youyu-source.youyul.com/post/images/2024/0808/20240808221942_image.png?x-oss-process=style/highThumb)

#### 文章
![文章](https://youyu-source.youyul.com/post/images/2024/0808/20240808222149_image.png?x-oss-process=style/highThumb)

#### 时刻
![时刻](https://youyu-source.youyul.com/post/images/2024/0808/20240808222219_image.png?x-oss-process=style/highThumb)

#### 笔记
![笔记](https://youyu-source.youyul.com/post/images/2024/0808/20240808222355_image.png?x-oss-process=style/highThumb)

#### 相册
![相册](https://youyu-source.youyul.com/post/images/2024/0808/20240808222629_image.png?x-oss-process=style/highThumb)

#### 实验室
![实验室](https://youyu-source.youyul.com/post/images/2024/0808/20240808222712_image.png?x-oss-process=style/highThumb)

## Monorepo管理

项目使用pnpm workspace管理多个应用和包，具有以下优势：

- **依赖共享**: 减少重复安装，节省磁盘空间
- **统一管理**: 统一的代码规范、构建流程
- **便捷开发**: 包之间可以直接引用，无需发布
- **原子提交**: 跨包修改可以在一个提交中完成

## 开发规范

- 使用ESLint进行代码质量检查
- 使用Prettier进行代码格式化
- 使用Stylelint规范样式代码
- 提交前自动执行Lint检查
- 遵循Conventional Commits规范

## 浏览器支持

- Chrome >= 90
- Firefox >= 88
- Safari >= 14
- Edge >= 90

## 许可证

MIT License

## 关于开发者

这是一个由作者独立全栈开发的项目，涵盖了从前端到后端、从开发到部署的完整流程。

联系方式：harunayouyu@163.com

## 更新日志

- **2024-12**: 管理系统登录页样式调整，分析页新增图表
- **2024-12**: 监控页新增服务器、业务数据等统计信息，部分界面样式优化
- **2024-12**: 相册图片支持瀑布流布局
- **2024-12**: 相册样式优化
- **2024-12**: 优化AlbumDetail中的image-info-box设计

## 贡献指南

欢迎提交Issue和Pull Request，让我们一起完善这个项目。

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'feat: Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交Pull Request

## Star History

如果这个项目对你有帮助，欢迎给个Star支持一下！
