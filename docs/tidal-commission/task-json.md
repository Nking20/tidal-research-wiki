---
title: 任务 JSON
---

# 任务 JSON 教程

潮汐委托任务通过数据包加载，适合整合包作者和服务器进行扩展。

## 路径

任务 JSON 放在：

```text
data/tidalcommission/tasks/<任意子目录>/<任务文件>.json
```

KubeJS 示例路径：

```text
kubejs/data/tidalcommission/tasks/my_source/my_task.json
```

## 完整示例

```json
{
  "id": "tidalcommission:my_task",
  "tier": 1,
  "source": "official",
  "stars": 1,
  "brief_description": "Deliver 12 Dried Kelp.",
  "full_description": "The Tide Office needs 12 Dried Kelp for coastal supplies.",
  "weight": 9,
  "duration": 0.28,
  "requirements": {
    "type": "item",
    "target": "minecraft:dried_kelp",
    "count": 12
  },
  "accept_cost": {
    "primary": {
      "item": "minecraft:gold_ingot",
      "count": 1
    }
  },
  "rewards": {
    "primary": {
      "item": "minecraft:emerald",
      "count": [10, 12]
    },
    "extras": [
      {
        "item": "minecraft:glass_pane",
        "count": [8, 12]
      }
    ]
  }
}
```

## 字段说明

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `id` | 建议填 | 任务 ID。数据包加载时实际 ID 会以资源路径为准 |
| `tier` | 是 | 档位，1 到 3 |
| `source` | 是 | 来源 ID，必须在配置 `sources` 中存在并启用才会正常抽取 |
| `stars` | 是 | 显示星级/爱心数量，通常与档位一致 |
| `brief_description` | 是 | 卡面简述 |
| `full_description` | 是 | 详情页完整描述 |
| `weight` | 否 | 同来源同档位内的任务权重 |
| `duration` | 否 | 当前保留字段，实际限时主要由配置控制 |
| `requirements` | 是 | 交付需求 |
| `accept_cost` | 是 | 接取成本 |
| `rewards` | 是 | 完成奖励 |

## requirements

指定单个物品：

```json
"requirements": {
  "type": "item",
  "target": "minecraft:iron_ingot",
  "count": 16
}
```

指定物品标签：

```json
"requirements": {
  "type": "tag",
  "target": "minecraft:creeper_drop_music_discs",
  "count": 6,
  "display": "Any creeper-drop music disc x6"
}
```

注意：

- `type=item` 时，`target` 必须是有效物品 ID。
- `type=tag` 时，`target` 必须是有效物品标签 ID。
- 提交时会从玩家背包中扣除满足条件的物品。

## accept_cost

```json
"accept_cost": {
  "primary": {
    "item": "minecraft:gold_ingot",
    "count": 1
  },
  "extra": {
    "item": "minecraft:emerald",
    "count": 1
  }
}
```

说明：

- `primary` 必填。
- `extra` 可选。
- 如果玩家有担保凭证，接取普通委托时会优先消耗担保凭证，不扣这里的接取成本。

## rewards

固定数量：

```json
"primary": {
  "item": "minecraft:emerald",
  "count": 12
}
```

随机数量：

```json
"primary": {
  "item": "minecraft:emerald",
  "count": [10, 14]
}
```

额外奖励：

```json
"extras": [
  {
    "item": "minecraft:bread",
    "count": [8, 12]
  }
]
```

## 替换内置任务

推荐使用相同资源路径覆盖内置任务：

```text
kubejs/data/tidalcommission/tasks/official/official_t1_lighthouse_wicks_01.json
```

注意：

- 任务实际 ID 会以资源路径为准。
- 如果 JSON 内部 `id` 与资源路径不一致，会使用资源路径覆盖声明 ID。
- 如果多个任务最终 ID 重复，重复项会被跳过。

