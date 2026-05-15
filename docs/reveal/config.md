---
title: 配置
---

# 辑录与揭秘配置

配置文件位置：

```text
config/reveal.json
```

服务器环境下，建议以服务端配置为准。整合包发布前，应在实际客户端和服务端中测试揭秘集、辑录册和 JEI 显示。

## 常用字段

| 字段 | 说明 |
| --- | --- |
| `config_version` | 配置版本，用于默认配置迁移 |
| `categories` | 来源类配置 |
| `recipes` | 揭秘集配方 |
| `creative_consumes` | 创造模式是否消耗揭秘材料 |
| `give_index_book_on_first_join` | 首次进服是否给予辑录册 |
| `give_reveal_codex_on_first_join` | 首次进服是否给予揭秘集 |
| `index_text_scale` | 辑录册字号倍率 |
| `story_text_scale` | 辑录详情页字号倍率 |
| `ui_style` | 默认 UI 风格，支持 `book_clean` 和 `book_old` |

## 来源配置

`categories` 用来配置每个来源的显示名、图标和解锁策略。

示例：

```json
{
  "categories": {
    "survival_notes": {
      "display_name": "生存经验",
      "icon": "minecraft:iron_pickaxe",
      "unlock_strategy": "pool"
    }
  }
}
```

字段说明：

| 字段 | 说明 |
| --- | --- |
| `display_name` | 辑录册中显示的来源名称 |
| `icon` | 来源图标，使用物品 ID |
| `unlock_strategy` | `pool` 或 `random` |

如果来源没有写图标，建议使用纸、书、地图、唱片等容易理解的原版物品作为默认图标。

## 揭秘配方

`recipes` 用来决定揭秘集接收哪些物品，并解锁哪个来源。

普通物品示例：

```json
{
  "inputs": [
    {"item": "minecraft:iron_pickaxe"},
    {"item": "minecraft:bread"}
  ],
  "target": "survival_notes"
}
```

标签输入示例：

```json
{
  "inputs": [
    {"tag": "minecraft:creeper_drop_music_discs"}
  ],
  "target": "creeper_secret"
}
```

`target` 必须对应 `categories` 中的来源 ID，也要对应数据包目录名。

## 默认配方

| 配方 | 目标来源 |
| --- | --- |
| 纸 | 原版小提示 |
| 哭泣黑曜石 + 墨囊 | 遗漏笔记 |
| 书 + 荧光墨囊 | 未知语言 |
| 紫水晶碎片 + 墨囊 | 悄悄话 |
| 任意苦力怕掉落唱片 | 苦力怕的秘密 |
| 铁镐 + 面包 | 生存经验 |
| 地图 + 回响碎片 | 世界传闻 |

## UI 与字号

如果玩家反馈文字过小或不同 GUI 缩放下阅读不舒服，可以优先调整：

```json
{
  "index_text_scale": 1.18,
  "story_text_scale": 1.32,
  "ui_style": "book_clean"
}
```

建议不要把字号调得过大。过大的字号会增加自动分页数量，并可能让长句更频繁换行。
