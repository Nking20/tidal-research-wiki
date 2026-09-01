---
title: 任务 JSON 与数据包
---

# 潮汐委托任务 JSON

## 实际任务目录

服务器运行时读取：

```text
config/tidalcommission/tasks/<来源>/<文件>.json
```

数据包或 KubeJS 可提供初始任务：

```text
data/<命名空间>/tidal_commission_tasks/<来源>/<文件>.json
```

内置和数据包任务只会在配置任务目录为空时写入。此后应直接维护 `config/tidalcommission/tasks/`，再执行 `/tc reload`。旧目录 `data/<命名空间>/tasks/` 不会被读取。

## 基础结构

```json
{
  "id": "my_pack:harbor_supplies",
  "tier": 1,
  "source": "official",
  "stars": 1,
  "brief_description": "为港口补齐装瓶物资。",
  "full_description": "玻璃瓶可以分批存入；指南针只检查，不会被消耗。",
  "weight": 10,
  "duration": 1.0,
  "requirements": [
    {
      "type": "item",
      "target": "minecraft:glass_bottle",
      "count": 12,
      "delivery_mode": "deposit"
    },
    {
      "type": "item",
      "target": "minecraft:compass",
      "count": 1,
      "delivery_mode": "check_only"
    }
  ],
  "objective_logic": {
    "mode": "all"
  },
  "accept_cost": {
    "primary": { "item": "minecraft:gold_ingot", "count": 1 }
  },
  "rewards": {
    "primary": { "item": "minecraft:emerald", "count": [8, 10] },
    "extras": [
      { "type": "experience", "count": 40 }
    ]
  }
}
```

## 根字段

| 字段 | 说明 |
| --- | --- |
| `id` | 推荐使用 `<命名空间>:<路径>`，同一任务 ID 不能重复。 |
| `tier` | 任务档位，范围 1～3。 |
| `source` | `commission_rules.json` 中存在且启用的来源 ID。 |
| `stars` | 界面星级，通常与档位一致。 |
| `brief_description` / `full_description` | 接取前简介与详情说明。 |
| `weight` | 同来源、同档位任务的基础抽取权重。 |
| `duration` | 完成期限模式。大于 `0` 时使用主配置中对应档位的完成时限；设为 `0` 时，接取后无完成期限。 |
| `requirements` | 一个目标对象或目标数组。 |
| `objective_logic` | 多目标完成规则，省略时为 `all`。 |
| `accept_cost` | 接取成本，`primary` 必填，`extra` 可选。 |
| `rewards` | 固定奖励、可选方案，或两者同时存在。 |
| `repeat` | 可选的重复完成规则。 |
| `prerequisites` | 可选的前置任务 ID 数组。 |
| `stage_rules` | 可选的阶段条件与权重修正，见[阶段与诊断](./stages.md)。 |

## 目标类型

### 物品与标签

```json
{ "type": "item", "target": "minecraft:iron_ingot", "count": 16 }
```

```json
{ "type": "tag", "target": "minecraft:logs", "count": 12 }
```

标签名不含 `#`。物品和标签目标的 `delivery_mode` 支持：

- `consume`：提交并消耗，默认值。
- `check_only`：只检查持有，不消耗。
- `deposit`：允许多次分批存入。

### 物品组件匹配

```json
{
  "type": "item",
  "target": "minecraft:potion",
  "count": 3,
  "match_mode": "contains_components",
  "components": {
    "minecraft:potion_contents": {
      "potion": "minecraft:water"
    }
  },
  "delivery_mode": "consume"
}
```

`match_mode` 支持：

- `item_only`：只检查物品 ID。
- `contains_components`：物品必须包含配置的组件和值，允许还有其他组件。
- `exact_components`：组件数据必须完全一致。

1.21.1 中这里使用的是物品组件系统。它可用于兼容仍习惯称为 NBT 的酒类、药水等数据物品；建议在游戏内编辑器中用“使用当前手持物品”读取组件，减少手写错误。

### 击杀与群系

```json
{ "type": "kill_entity", "target": "minecraft:zombie", "count": 8 }
```

```json
{ "type": "visit_biome", "target": "#minecraft:is_ocean", "count": 1 }
```

击杀目标使用实体 ID。群系目标可使用群系 ID，也可在前面加 `#` 使用群系标签。它们由事件自动推进，不消耗物品。

## 多目标组合

```json
"objective_logic": {
  "mode": "at_least",
  "required": 2
}
```

| `mode` | 说明 |
| --- | --- |
| `all` | 全部目标完成。 |
| `any` | 任意一个目标完成。 |
| `at_least` | 至少完成 `required` 项。 |

## 固定与可选奖励

固定奖励使用 `primary` 和 `extras`。只有可选奖励时可以省略它们：

```json
"rewards": {
  "options": [
    {
      "id": "emeralds",
      "display": "绿宝石报酬",
      "rewards": [
        { "item": "minecraft:emerald", "count": [12, 16] }
      ]
    },
    {
      "id": "provisions",
      "display": "远行补给",
      "rewards": [
        { "item": "minecraft:cooked_cod", "count": [12, 16] },
        { "item": "minecraft:bread", "count": [6, 9] }
      ]
    }
  ],
  "choose": 1
}
```

若同时写入固定奖励和 `options`，玩家会先取得固定部分，再选择方案。`choose` 表示需要选择多少个不同方案。

## 前置与重复规则

```json
"repeat": {
  "mode": "daily",
  "max_completions": 0
},
"prerequisites": [
  "my_pack:harbor_supplies"
]
```

`repeat.mode` 支持 `unlimited`、`once`、`cooldown`、`daily`、`weekly`。使用 `cooldown` 时通过 `cooldown_seconds` 设置间隔；`max_completions` 大于 0 时还会限制总完成次数。

## 接取后无期限任务

```json
{
  "id": "my_pack:unlimited_archive_supplies",
  "tier": 1,
  "source": "official",
  "stars": 1,
  "brief_description": "长期补齐档案纸张。",
  "full_description": "这份委托仍需按时接取，但接取后没有完成期限。",
  "weight": 5,
  "duration": 0,
  "requirements": {
    "type": "item",
    "target": "minecraft:paper",
    "count": 24
  },
  "accept_cost": {
    "primary": { "item": "minecraft:gold_nugget", "count": 4 }
  },
  "rewards": {
    "primary": { "item": "minecraft:emerald", "count": [8, 12] }
  }
}
```

`duration: 0` 只取消接受后的完成期限，不会取消委托出现后的等待接取时限。

## 扩展目标与奖励

潮汐委托提供目标类型与奖励类型注册接口。兼容模组可以加入自己的类型；没有安装对应兼容模组时，引用未知类型的任务会在校验中报告错误，而不会悄悄作为普通物品任务运行。

## 发布前检查

1. 确认 JSON、物品/实体/群系/标签 ID 和来源 ID 有效。
2. 修改任务后执行 `/tc reload`。
3. 执行 `/tc doctor`；使用阶段规则时再执行 `/tc doctor <玩家>`。
4. 在测试存档中实际完成一次多目标、组件匹配和可选奖励流程。
