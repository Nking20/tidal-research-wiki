---
title: 数据包
---

# 辑录与揭秘数据包

辑录内容通过数据包提供。整合包作者可以新增来源、新增章节、替换默认内容或调整图标、权重和顺序。

## 文件位置

辑录 JSON 放在：

```text
data/reveal/re/<来源类>/<辑录>.json
```

示例：

```text
data/reveal/re/survival_notes/nether_kit.json
```

其中：

- `survival_notes` 是来源类 ID。
- `nether_kit` 是具体章节 ID。
- 完整记录 ID 为 `survival_notes/nether_kit`。

## 基础格式

```json
{
  "title": "下界前检查",
  "icon": "minecraft:flint_and_steel",
  "weight": 10,
  "order": 30,
  "pages": [
    {
      "text": [
        "进下界前准备打火石、圆石、食物和一组方块。",
        "第一次进门后先保护传送门，避免恶魂直接破坏入口。"
      ]
    },
    {
      "text": [
        "如果你准备长期探索，建议记录传送门坐标。",
        "回程路线比临时挖路更重要。"
      ]
    }
  ]
}
```

## 字段说明

| 字段 | 说明 |
| --- | --- |
| `title` | 章节标题 |
| `icon` | 解锁后在辑录册中显示的物品图标 |
| `weight` | 抽取权重 |
| `order` | 顺序或阶段值 |
| `pages` | 正文页数组 |
| `pages[].text` | 当前页的文字行 |
| `pages[].image` | 可选图片资源路径 |

`weight` 不是百分比。随机时会按同一候选池内所有权重总和计算概率。

## `pool` 与 `random`

如果来源使用 `pool` 策略，模组会优先解锁 `order` 最小的一批未解锁章节。同一个 `order` 下有多个章节时，再按 `weight` 抽取。

如果来源使用 `random` 策略，模组会在该来源所有未解锁章节中按 `weight` 抽取。

建议：

- 新手教程类内容使用 `pool`，保证先出现基础内容。
- 传闻、碎片、彩蛋类内容使用 `random`，让解锁顺序更自然。

## 自定义来源

新增来源时需要同时做两件事：

1. 在 `config/reveal.json` 的 `categories` 中添加来源。
2. 在数据包中创建同名目录并放入辑录 JSON。

示例：

```json
{
  "display_name": "矿洞记录",
  "icon": "minecraft:iron_ore",
  "unlock_strategy": "pool"
}
```

对应目录：

```text
data/reveal/re/cave_notes/
```

如果要让揭秘集能解锁这个来源，还需要在 `recipes` 中添加目标为 `cave_notes` 的配方。

## 标签配方

揭秘配方支持物品标签。标签可以由数据包或 KubeJS 提供。

示例标签：

```text
data/minecraft/tags/item/creeper_drop_music_discs.json
```

在自定义来源中，也可以创建自己的标签：

```text
data/reveal/tags/item/cave_clues.json
```

然后在配置中引用：

```json
{
  "inputs": [
    {"tag": "reveal:cave_clues"}
  ],
  "target": "cave_notes"
}
```
