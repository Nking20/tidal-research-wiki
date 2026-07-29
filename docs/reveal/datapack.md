---
sidebar_position: 4
title: 条目数据与数据包
---

# 条目数据与数据包

Reveal 的条目是 JSON。当前默认的 120 条中文内容内置在模组 JAR 的 `data/reveal/re/` 下，并在首次创建 `config/reveal/` 时导出为可编辑文件：

```text
config/reveal/entries/<类别 ID>/<条目 ID>.json
```

游戏内编辑器保存的条目也写入这个目录。修改后用 `/reveal reload` 生效。

运行中的条目数据库读取 `config/reveal/entries/`，不会在每次 `/reload` 时直接使用数据包 JSON。数据包的 `data/<命名空间>/re/` 是可分发的“导出源”：首次初始化会自动导出，后续可用 `/reveal export-defaults` 补充尚不存在的条目。

## 最小条目示例

先在 `config/reveal/reveal.json` 的 `categories` 中创建 `harbor_notes`，再建立：

```text
config/reveal/entries/harbor_notes/first_shipment.json
```

内容如下：

```json
{
  "title": "第一批货物",
  "icon": "minecraft:chest",
  "weight": 1,
  "order": 0,
  "experience_reward": -1,
  "pages": [
    {
      "text": [
        "潮水退去后，码头木板上留下了盐霜。",
        "清单上写着十二箱货物，仓库里却只有十一箱。"
      ]
    },
    {
      "text": [
        "最后一箱没有编号。",
        "箱盖内侧刻着：不要在涨潮时打开。"
      ]
    }
  ]
}
```

| 字段 | 说明 |
| --- | --- |
| `title` | 条目标题。 |
| `icon` | 物品 ID 图标。 |
| `weight` | 随机解锁权重；数值越高越容易从同一类别中被抽到。 |
| `order` | 目录排序值。 |
| `experience_reward` | 可选；`-1` 或省略表示继承类别与根配置，`0` 表示无经验奖励。 |
| `pages` | 阅读页列表。 |
| `pages[].text` | 每行正文文本。 |
| `pages[].image` | 可选纹理资源位置，例如 `harbor_pack:textures/gui/story/first_shipment.png`；可与 `text` 同时使用。 |

页面至少要有 `text` 或 `image` 之一。

未填写时，`weight` 默认为 `10`，`order` 默认为 `1000`，`experience_reward` 默认为 `-1`。`weight` 小于等于 `0` 的条目不会进入正常揭秘候选。

## 用数据包分发内容

数据包的路径为：

```text
<数据包根目录>/data/<命名空间>/re/<类别 ID>/<条目 ID>.json
```

例如数据包 `harbor_pack` 中的同一条目：

```text
data/harbor_pack/re/harbor_notes/first_shipment.json
```

类别 ID 仍必须在 `config/reveal/reveal.json` 的 `categories` 中存在。数据包适合把内容与整合包资源一起发布；`config/reveal/entries/` 则是实际运行和本地快速迭代的位置。

需要特别注意：

- 首次创建 `config/reveal/` 时，当前启用的数据包条目会自动导出。
- 已经初始化过的世界/实例，需要执行 `/reveal export-defaults` 才会把新增资源导出。
- 导出命令不会覆盖已有文件。要用数据包新版替换同名条目，应先备份并删除对应的 `config/reveal/entries/...json`，再执行导出；或直接手动合并内容。
- `/reveal reload` 只重读主配置与 `config/reveal/entries/`，不会覆盖本地条目。

## 导出、编辑与校验

```mcfunction
# 把内置默认条目导出到 config/reveal/entries/（不覆盖已有文件）
/reveal export-defaults

# 重新读取配置与条目
/reveal reload

# 检查空类别、无效物品、标签和不匹配的条目类别
/reveal doctor
```

:::tip
先执行导出命令，再复制一个现有条目改名修改，是编写大量内容时最稳妥的起点。条目 ID 使用小写字母、数字、下划线和连字符，避免空格与中文文件名。
:::

:::warning
游戏内编辑器保存条目时会写成单个纯文本页面。多页条目或使用 `pages[].image` 的条目应直接维护 JSON。
:::
