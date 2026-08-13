---
sidebar_position: 3
title: 配置
---

# 配置

主配置文件：

```text
config/reveal/reveal.json
```

修改后执行 `/reveal reload`。该命令会同时重载主配置和 `config/reveal/entries/` 下的辑录条目。

## 根字段

| 字段 | 说明 |
| --- | --- |
| `config_version` | 配置格式版本；1.2.0 当前为 `7`，由模组自动维护。 |
| `categories` | 篇章定义，键名为篇章 ID。 |
| `recipes` | 解锁方式列表；字段名为兼容旧配置继续保留。 |
| `creative_consumes` | 创造模式进行材料揭秘时是否消耗材料。 |
| `give_index_book_on_first_join` | 玩家第一次进入世界时是否获得辑录册。 |
| `give_story_page_on_unlock` | 解锁辑录时是否额外给予普通辑录页。 |
| `reveal_experience_reward` | 默认解锁经验，默认 `5`。 |
| `index_text_scale` | 目录文字缩放，默认 `1.18`，范围 `0.85`～`1.7`。 |
| `story_text_scale` | 阅读页文字缩放，默认 `1.32`，范围 `0.85`～`1.7`。 |
| `ui_style` | `book_clean` 或 `book_old`。 |

旧字段 `give_reveal_codex_on_first_join` 已移除。旧配置加载后会自动迁移到当前格式。

## 篇章

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
| `display_name` | 辑录册中显示的篇章名。 |
| `icon` | 篇章图标的物品 ID。 |
| `unlock_strategy` | 未指定单条辑录时的选取策略。 |
| `hidden` | 尚未获得任何内容时是否隐藏该篇章。 |
| `initial_unlocked` | 玩家首次同步时自动获得的辑录数量。 |
| `experience_reward` | 篇章经验；`-1` 表示继承根配置。 |

### 篇章策略

| 值 | 行为 |
| --- | --- |
| `ordered` | 按 `order` 和辑录 ID 依次解锁。 |
| `pool` | 在当前最小 `order` 的一组辑录中按 `weight` 抽取。 |
| `random` | 在该篇章全部未解锁辑录中按 `weight` 抽取。 |

## 解锁方式通用字段

虽然配置数组仍叫 `recipes`，其中每一项现在表示一种“解锁方式”。

| 字段 | 说明 |
| --- | --- |
| `type` | `materials`、`kill_entity`、`enter_biome` 或 `advancement`。省略时按 `materials` 处理。 |
| `target` | 目标篇章 ID，必填。 |
| `target_entry` | 可选；填写后只解锁该篇章中的指定辑录。 |
| `hint_visibility` | 解锁提示显示位置：`auto`、`category`、`entry`、`hidden`。 |
| `inputs` | 仅材料解锁使用，包含 1～2 个物品或标签。 |
| `consume_inputs` | 仅材料解锁使用；成功后是否消耗材料，默认 `true`。 |
| `trigger` | 击杀、群系和进度解锁使用的目标资源 ID。 |

### 目标范围

- 只写 `target`：从整个篇章中按 `unlock_strategy` 选择一条未解锁辑录。
- 同时写 `target_entry`：直接解锁指定辑录，不进行抽取。

### 提示位置

| 值 | 行为 |
| --- | --- |
| `auto` | 整篇目标显示在篇章；单条目标显示在对应辑录。 |
| `category` | 显示在篇章提示中。 |
| `entry` | 显示在目标辑录提示中；通常与 `target_entry` 一起使用。 |
| `hidden` | 不在辑录册中显示该解锁条件。 |

## 材料解锁

```json
{
  "type": "materials",
  "inputs": [
    { "tag": "minecraft:planks" },
    { "item": "minecraft:compass" }
  ],
  "target": "harbor_notes",
  "consume_inputs": true,
  "hint_visibility": "auto"
}
```

`inputs` 必须包含 1～2 项，每项只能写 `item` 或 `tag`。JSON 中标签直接写 ID，不加 `#`。双材料不区分 A、B 顺序。

不消耗材料、直接解锁单条辑录的写法：

```json
{
  "type": "materials",
  "inputs": [
    { "item": "minecraft:compass" }
  ],
  "target": "misc",
  "target_entry": "compass",
  "consume_inputs": false,
  "hint_visibility": "auto"
}
```

## 击杀生物

```json
{
  "type": "kill_entity",
  "trigger": "minecraft:creeper",
  "target": "harbor_notes",
  "target_entry": "creeper_report",
  "hint_visibility": "entry"
}
```

只有玩家造成的击杀会触发。

## 进入群系

```json
{
  "type": "enter_biome",
  "trigger": "minecraft:mangrove_swamp",
  "target": "harbor_notes",
  "target_entry": "mangrove_route",
  "hint_visibility": "entry"
}
```

玩家进入目标群系后自动检测。同一群系中持续停留不会反复触发。

## 完成进度

```json
{
  "type": "advancement",
  "trigger": "minecraft:adventure/root",
  "target": "harbor_notes",
  "hint_visibility": "category"
}
```

`trigger` 可以使用原版或数据包提供的进度 ID。

## 经验奖励

经验按以下顺序决定：

1. 辑录 JSON 的 `experience_reward`；
2. 篇章的 `experience_reward`；
3. 根字段 `reveal_experience_reward`。

`-1` 表示继续继承，`0` 表示明确不奖励经验，正整数表示实际经验值。

## 修改与检查

```mcfunction
/reveal reload
/reveal doctor
/reveal editor
```

可视化编辑器可以选择物品、生物、群系和进度，设置目标篇章或单条辑录、材料消耗和提示位置。保存后配置立即重载。
