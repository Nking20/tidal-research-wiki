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
| `config_version` | 配置格式版本；1.3.0 当前为 `8`，由模组自动维护。 |
| `categories` | 篇章定义，键名为篇章 ID。 |
| `recipes` | 解锁方式列表；字段名为兼容旧配置继续保留。 |
| `creative_consumes` | 创造模式进行材料揭秘时是否消耗材料。 |
| `inventory_reveal_enabled` | 是否允许随身打开材料揭秘界面，默认 `true`；不影响研究站和背包持物自动解锁。 |
| `give_index_book_on_first_join` | 玩家第一次进入世界时是否获得辑录册。 |
| `give_story_page_on_unlock` | 解锁辑录时是否额外给予普通辑录页。 |
| `reveal_experience_reward` | 默认解锁经验，默认 `5`。 |
| `index_text_scale` | 目录文字缩放，默认 `1.18`，范围 `0.85`～`1.7`。 |
| `story_text_scale` | 阅读页文字缩放，默认 `1.32`，范围 `0.85`～`1.7`。 |
| `ui_style` | `book_clean` 或 `book_old`。 |

旧字段 `give_reveal_codex_on_first_join` 已移除。旧配置加载后会自动迁移到当前格式。

### 仅允许研究站揭秘

在主配置根对象中设置：

```json
{
  "inventory_reveal_enabled": false
}
```

这是字段示例，不要用它覆盖整个配置。关闭后，辑录册潜行使用、物品栏页签的 Shift 点击、辑录册内“揭秘”按钮和旧揭秘集都不能随身打开材料揭秘界面；右键研究站仍可使用。该开关与 `inventory_items` 自动解锁是两回事，不会关闭自动检测。

### 从 1.2.0 升级

1.3.0 会将配置版本更新为 `8`。旧版仍保持默认写法的指南针、时钟和命名牌三条杂项规则，会改为背包持物自动解锁；已经删除或自定义过的规则不会被强行恢复为默认值。其他自定义篇章、解锁条件和随身揭秘开关会保留。

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
| `type` | `materials`、`inventory_items`、`kill_entity`、`enter_biome` 或 `advancement`。省略时按 `materials` 处理。 |
| `target` | 目标篇章 ID，必填。 |
| `target_entry` | 可选；填写后只解锁该篇章中的指定辑录。 |
| `hint_visibility` | 辑录册中解锁条件的悬停提示位置：`auto`、`category`、`entry`、`hidden`；不控制右上角解锁通知。 |
| `inputs` | 材料揭秘和背包持物条件使用，包含 1～2 个物品或标签。 |
| `consume_inputs` | 材料揭秘成功后是否消耗材料，默认 `true`；`inventory_items` 始终为 `false`。 |
| `trigger` | 击杀、群系和进度解锁使用的目标资源 ID。 |

### 目标范围

- 只写 `target`：材料、击杀、群系和进度条件按 `unlock_strategy` 选择一条；`inventory_items` 一次解锁该篇章全部未拥有且 `weight > 0` 的辑录。
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

## 背包持物自动解锁

持有指南针后解锁指定的一条辑录：

```json
{
  "type": "inventory_items",
  "inputs": [
    { "item": "minecraft:compass" }
  ],
  "target": "misc",
  "target_entry": "compass",
  "consume_inputs": false,
  "hint_visibility": "entry"
}
```

同时持有任意木板和指南针，一次解锁自定义篇章：

```json
{
  "type": "inventory_items",
  "inputs": [
    { "tag": "minecraft:planks" },
    { "item": "minecraft:compass" }
  ],
  "target": "harbor_notes",
  "hint_visibility": "category"
}
```

`inputs` 的 1～2 项必须同时满足，每项需要 1 个匹配物品；两项也可由数量充足的同一物品堆满足，但同一个物品不能被重复计数。标签 ID 不加 `#`。

服务器每 20 游戏刻检查主背包、快捷栏和副手，不检查装备栏或容器内部。该类型始终保留物品，不受 `creative_consumes` 和 `inventory_reveal_enabled` 影响。已经拥有的辑录不会重复奖励经验、发页或记日志。

与不消耗材料的 `materials` 不同，`inventory_items` 不需要打开界面或点击按钮；未填写 `target_entry` 时也不是每秒抽取一条，而是一次解锁整个篇章的正常候选内容。

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

可视化编辑器可以切换五种解锁类型，选择物品、生物、群系和进度，设置目标篇章或单条辑录、材料消耗和提示位置。背包持物条件固定不消耗材料。保存后配置立即重载。
