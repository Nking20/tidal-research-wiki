# 潮汐研究社 Wiki

这是使用 Docusaurus classic 模板建立的静态 Minecraft 模组 Wiki。

公开地址：

```text
https://nking20.github.io/tidal-research-wiki/
```

## 本地启动

安装依赖：

```bash
npm install
```

启动开发服务器：

```bash
npm run start
```

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

项目包含 GitHub Actions workflow：

```text
.github/workflows/deploy.yml
```

部署流程：

1. 推送到 GitHub 仓库。
2. 仓库 Settings -> Pages。
3. Source 选择 GitHub Actions。
4. 推送到 `main` 分支后自动构建并部署。

当前仓库配置：

```text
https://github.com/Nking20/tidal-research-wiki
https://nking20.github.io/tidal-research-wiki/
```

## 文档结构

```text
docs/
├─ intro.md
├─ tidal-commission/
│  ├─ overview.md
│  ├─ gameplay.md
│  ├─ config.md
│  ├─ datapack.md
│  ├─ player-commission.md
│  └─ examples.md
├─ tidal-observation-card/
│  └─ overview.md
├─ tidal-market/
│  └─ overview.md
├─ modpack/
│  ├─ overview.md
│  └─ examples.md
└─ changelog.md
```

## 修改文档

普通文档都在 `docs/` 目录。

首页在：

```text
src/pages/index.tsx
src/pages/index.module.css
```

侧边栏在：

```text
sidebars.ts
```


## 培育系列文档

2026-10-17 按本地潮汐培育 1.0.4-alpha、炼狱培育 0.4.4-alpha 整理

- `docs/tidal-nursery/`：开局、九种样本、护理、饲料、基因 2.0、自动化、材料、调律、复原与数据包
- `docs/infernal-nursery/`：四种下界样本、组织采样、温控、特殊事件与兼容
- 基因、饲料和通用设备操作统一链接到共用说明，保留原潮汐页面地址
- 数值以默认代码为依据，整合包配置与数据包覆盖时以游戏内规则为准
- 本地构建不等于已部署，推送 main 后由现有 GitHub Pages 工作流发布
