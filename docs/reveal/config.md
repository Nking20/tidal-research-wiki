---
sidebar_position: 3
title: 配置
---

# 配置

主配置文件位于：

```text
config/reveal/reveal.json
```

首次启动时会生成默认配置；旧版 `config/reveal.json` 会在需要时迁移到新位置。修改后执行：

```mcfunction
/reveal reload
```

该命令会同时重载主配置和 `config/reveal/entries/` 下的条目。

## 根字段

| 字段 | 说明 |
| --- | --- |
| `config_version` | 配置格式版本；由模组维护，当前为 3。 |
| `categories` | 类别定义，键名就是类别 ID。 |
| `recipes` | 线索组合到类别的映射。 |
| `creative_consumes` | 创造模式揭秘时是否消耗线索。 |
| `give_index_book_on_first_join` | 玩家首次进入时是否给辑录册。 |
| `give_reveal_codex_on_first_join` | 旧配置兼容字段；当前 1.1.1 代码不读取该值，也不会自动发放揭秘集。 |
| `give_story_page_on_unlock` | 解锁条目时是否给辑录页。 |
| `reveal_experience_reward` | 默认的单次揭秘经验奖励，默认 `5`。 |
| `index_text_scale` | 目录文字缩放，默认 `1.18`，有效范围 `0.85`～`1.7`。 |
| `story_text_scale` | 阅读页文字缩放，默认 `1.32`，有效范围 `0.85`～`1.7`。 |
| `ui_style` | `book_clean` 或 `book_old`，默认 `book_clean`。 |

## 类别示例

类别 ID 必须与条目文件夹名、配方目标 `target` 完全一致。下面新增一个“港口记录”类别：

```json
{
  "categories": {
    "harbor_notes": {
      "display_name": "港口记录",
      "icon": "minecraft:compass",
      "unlock_strategy": "pool",
      "hidden": false,
      "initial_unlocked": 0,
      "experience_reward": 3
    }
  }
}
```

| 字段 | 说明 |
| --- | --- |
| `display_name` | 目录中显示的标题。 |
| `icon` | 物品 ID 图标，例如 `minecraft:compass`。 |
| `unlock_strategy` | 解锁策略；默认内容使用 `pool`。 |
| `hidden` | 是否在目录中隐藏类别。 |
| `initial_unlocked` | 新玩家初始获得的该类别条目数。 |
| `experience_reward` | 单次命中该类别时的经验；填 `-1` 时继承根字段 `reveal_experience_reward`。 |

### 解锁策略

| 值 | 行为 |
| --- | --- |
| `ordered` | 按 `order`、条目 ID 的顺序逐条解锁。 |
| `pool` | 只在当前最小 `order` 的一组条目中按 `weight` 抽取；这一组完成后才进入下一组。 |
| `random` | 在该类别全部未解锁条目中按 `weight` 抽取，不受 `order` 分组限制。 |

## 线索组合示例

每条 `recipes` 使用 `target` 指向一个类别。`inputs` 必须是 1～2 个对象，每个对象只能包含 `item` 或 `tag`。JSON 中的标签直接写资源 ID，不加 `#`；`#标签` 只用于游戏内编辑器的输入框。双物品组合不区分槽位顺序。

```json
{
  "recipes": [
    {
      "inputs": [
        {
          "item": "minecraft:paper"
        }
      ],
      "target": "harbor_notes"
    },
    {
      "inputs": [
        {
          "tag": "minecraft:planks"
        },
        {
          "item": "minecraft:compass"
        }
      ],
      "target": "harbor_notes"
    }
  ]
}
```

第一条只需要纸，可放在任一线索槽；第二条需要任意原版木板和指南针，摆放顺序不限。

## 经验奖励继承

经验奖励按以下优先级确定：

1. 条目 JSON 的 `experience_reward`；
2. 类别的 `experience_reward`；
3. 根字段 `reveal_experience_reward`。

条目和类别默认值为 `-1`，表示继续继承；`0` 表示明确不奖励经验；正整数表示本层使用的经验值。

## 推荐编辑流程

1. 先用 `/reveal export-defaults` 导出一套可编辑的默认条目（已有文件不会被该命令覆盖）。
2. 在 `reveal.json` 中添加类别与配方。
3. 在 `config/reveal/entries/<类别 ID>/` 中添加条目 JSON。
4. 执行 `/reveal reload`。
5. 执行 `/reveal doctor`，确认没有缺失物品、空标签或未配置类别。

不想手写 JSON 时，也可以在游戏内执行 `/reveal editor`，在类别、条目和配方三个页签中创建并保存内容。
