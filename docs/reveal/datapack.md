---
title: 数据包
---

# 辑录与揭秘数据包

辑录内容通过数据包提供。整合包作者可以新增来源、新增章节、替换默认内容，或调整图标、权重和顺序。

## 文件位置

辑录 JSON 放在：

```text
data/<namespace>/re/<来源类>/<辑录>.json
```

示例：

```text
data/reveal/re/survival_notes/nether_kit.json
```

其中：

- `survival_notes` 是来源类 ID。
- `nether_kit` 是具体章节 ID。
- 完整记录 ID 是 `survival_notes/nether_kit`。

## 基础格式

```json
{
  "title": "Nether Travel Kit",
  "icon": "minecraft:flint_and_steel",
  "weight": 10,
  "order": 30,
  "pages": [
    {
      "text": [
        "Before entering the Nether, prepare flint and steel, food, blocks, and gold armor.",
        "Protect the portal first so a ghast cannot break your only easy return route."
      ]
    },
    {
      "text": [
        "If you plan a long trip, write down portal coordinates.",
        "A safe return route is more important than a fast outbound route."
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
| `weight` | 抽取权重，必须大于 0 |
| `order` | 顺序或阶段值 |
| `pages` | 正文页数组 |
| `pages[].text` | 当前页的文字数组 |
| `pages[].image` | 可选图片资源路径 |

`weight` 不是百分比。随机时会按同一候选池内所有权重总和计算概率。

## 自动换行与自动分页

`pages[].text` 中的每个字符串会按当前正文区域宽度自动换行。如果文字超过一页可显示数量，模组会自动生成后续视觉页。

你不需要手动把每一句切成固定长度。建议按自然段写，每个数组元素放一段或一句。

## 图片页

当前支持在页面中加入一张图片：

```json
{
  "image": "reveal:textures/gui/example_note.png",
  "text": [
    "This page starts with an image, then continues with text."
  ]
}
```

图片资源应放在资源包路径中，例如：

```text
assets/reveal/textures/gui/example_note.png
```

如果只写 `image` 不写 `text`，这一页就可以作为纯图片页使用。当前图片大小由界面自动计算；多图、图注、对齐和自定义尺寸暂未作为正式字段提供。

## `pool`、`random` 与 `ordered`

解锁策略在 `config/reveal.json` 的 `categories.<id>.unlock_strategy` 中配置。

- `pool`：优先解锁 `order` 最小的一批未解锁章节；同一个 `order` 下再按 `weight` 抽取。
- `random`：从该来源所有未解锁章节中按 `weight` 抽取。
- `ordered`：按 `order` 和章节 ID 顺序解锁，适合教程链。

建议：

- 新手教程、工具提示类内容使用 `ordered` 或 `pool`。
- 传闻、碎片、彩蛋类内容使用 `random`。

## 自定义来源

新增来源时需要同时做三件事：

1. 在 `config/reveal.json` 的 `categories` 中添加来源。
2. 在数据包中创建同名目录并放入辑录 JSON。
3. 在 `recipes` 中添加目标为该来源的揭秘配方。

示例来源：

```json
{
  "display_name": "Cave Notes",
  "icon": "minecraft:iron_ore",
  "unlock_strategy": "pool"
}
```

对应目录：

```text
data/reveal/re/cave_notes/
```

如果数据包中有 `cave_notes`，但 config 里没有 `cave_notes`，这个来源不会显示，也不会被揭秘集解锁。这是为了让整合包作者能删除默认来源并完全替换内容。

## 标签配方

揭秘配方支持物品标签。标签可以由数据包或 KubeJS 提供。

原版唱片标签示例：

```text
data/minecraft/tags/item/creeper_drop_music_discs.json
```

自定义标签示例：

```text
data/reveal/tags/item/cave_clues.json
```

配置中引用：

```json
{
  "inputs": [
    {"tag": "reveal:cave_clues"}
  ],
  "target": "cave_notes"
}
```

写完后建议执行：

```text
/reload
/reveal doctor
```

`doctor` 可以帮助检查标签为空、来源缺失、配方目标缺失等问题。
