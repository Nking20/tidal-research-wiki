---
title: 配置
---

# 辑录与揭秘配置

配置文件位置：

```text
config/reveal.json
```

服务器环境下以服务端配置为准。整合包发布前，建议在实际客户端和服务端中测试揭秘集、辑录册、JEI 显示和 `/reveal doctor`。

## 常用字段

| 字段 | 说明 |
| --- | --- |
| `config_version` | 配置版本 |
| `categories` | 来源类配置 |
| `recipes` | 揭秘集配方 |
| `creative_consumes` | 创造模式是否消耗揭秘材料 |
| `give_index_book_on_first_join` | 首次进服是否给予辑录册 |
| `give_reveal_codex_on_first_join` | 首次进服是否给予揭秘集 |
| `give_story_page_on_unlock` | 揭秘后是否额外掉落辑录页 |
| `index_text_scale` | 辑录册字号倍率 |
| `story_text_scale` | 辑录详情页字号倍率 |
| `ui_style` | 默认 UI 风格，支持 `book_clean` 和 `book_old` |

## 来源配置

`categories` 用来配置每个来源的显示名、图标和解锁策略。

```json
{
  "categories": {
    "survival_notes": {
      "display_name": "Survival Notes",
      "icon": "minecraft:iron_pickaxe",
      "unlock_strategy": "pool"
    }
  }
}
```

| 字段 | 说明 |
| --- | --- |
| `display_name` | 辑录册中显示的来源名称 |
| `icon` | 来源图标，使用物品 ID |
| `unlock_strategy` | `pool`、`random` 或 `ordered` |

重要规则：数据包中存在的来源不会自动写入 config。整合包作者可以删除默认来源，只保留自己的来源；被删除的默认来源即使数据包仍存在，也不会显示、不会被揭秘配方解锁。

## 揭秘配方

`recipes` 决定揭秘集接收哪些物品，并解锁哪个来源。

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

`target` 必须对应 `categories` 中的来源 ID，也要对应数据包目录名。当前配方支持 1 到 2 个输入，输入可以是物品，也可以是物品标签。

## 默认配方

| 配方 | 目标来源 |
| --- | --- |
| Paper | `vanilla_tips` |
| Crying Obsidian + Ink Sac | `omitted_note` |
| Book + Glow Ink Sac | `unknown_language` |
| Amethyst Shard + Ink Sac | `whisper` |
| Any creeper-dropped music disc | `creeper_secret` |
| Iron Pickaxe + Bread | `survival_notes` |
| Filled Map + Echo Shard | `world_rumors` |

## UI 与字号

```json
{
  "index_text_scale": 1.18,
  "story_text_scale": 1.32,
  "ui_style": "book_clean"
}
```

`book_clean` 是新版书籍界面，`book_old` 是旧版线稿界面。玩家也可以在辑录册内通过样式按钮临时切换；切换结果会写回 config。

字号不建议调得过大。过大的字号会增加自动分页数量，也会让长句更频繁换行。

## 整合包替换默认内容

如果整合包只想显示自己的来源，可以直接在 `config/reveal.json` 中删除默认 `categories` 和默认 `recipes`，然后写入自己的来源和配方。

推荐流程：

1. 在 `categories` 中只保留整合包自己的来源。
2. 在 `recipes` 中只保留目标为这些来源的配方。
3. 在数据包中创建同名 `data/<namespace>/re/<category>/` 目录并放入辑录 JSON。
4. 进入游戏执行原版 `/reload`。
5. 执行 `/reveal doctor`，确认没有隐藏来源、空来源或缺失配方。
