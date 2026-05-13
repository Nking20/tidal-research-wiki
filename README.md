# 潮汐研究社 Wiki

这是使用 Docusaurus classic 模板建立的静态 Minecraft 模组 Wiki。

## 本地启动

安装依赖：

```bash
npm install
```

启动开发服务器：

```bash
npm run start
```

默认会在本地启动 Docusaurus 开发站点。

## 构建

```bash
npm run build
```

构建结果输出到：

```text
build/
```

## 本地预览构建结果

```bash
npm run serve
```

## GitHub Pages 部署

项目已包含 GitHub Actions workflow：

```text
.github/workflows/deploy.yml
```

部署步骤：

1. 将项目推送到 GitHub 仓库。
2. 在 GitHub 仓库 Settings 中启用 Pages。
3. Pages Source 选择 GitHub Actions。
4. 推送到 `main` 分支后自动构建并部署。

如果仓库名不是 `tidal-research-wiki`，需要修改 `docusaurus.config.ts`：

```ts
baseUrl: '/你的仓库名/',
projectName: '你的仓库名',
```

当前配置按以下仓库生成 GitHub Pages 路径：

```text
https://github.com/Nking20/tidal-research-wiki
https://nking20.github.io/tidal-research-wiki/
```

## 文档结构

```text
docs/
├─ intro.md
├─ install.md
├─ tidal-observation-card/
│  ├─ overview.md
│  └─ config.md
├─ tidal-commission/
│  ├─ overview.md
│  └─ task-json.md
├─ tidal-market/
│  ├─ overview.md
│  ├─ shipping-box.md
│  └─ dynamic-pricing.md
├─ datapack/
│  └─ rules.md
├─ faq.md
└─ changelog.md
```
