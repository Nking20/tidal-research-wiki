---
title: 数据包任务
---

# 潮汐委托数据包

潮汐委托任务通过数据包加载。整合包作者和服务器可以用数据包或 KubeJS 添加、替换任务。

## 路径

任务 JSON 放在：

```text
data/tidalcommission/tasks/<来源或分类>/<任务文件>.json
```

KubeJS 示例路径：

```text
kubejs/data/tidalcommission/tasks/my_factory/my_factory_t1_parts_01.json
```

不同文件夹下可以使用相同文件名，但最终任务 ID 不应重复。为了方便维护，建议文件名本身带上来源、档位和编号。

## 最小示例

```json
{
  "tier": 1,
  "source": "official",
  "stars": 1,
  "brief_description": "Deliver 12 Dried Kelp.",
  "full_description": "The Tide Office needs 12 Dried Kelp for coastal supplies.",
  "weight": 9,
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
    }
  }
}
```

## 字段说明

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `tier` | 是 | 档位，通常为 `1` 到 `3` |
| `source` | 是 | 来源 ID，必须在配置的 `sources` 中存在并启用 |
| `stars` | 是 | 卡面显示的星级/爱心数量 |
| `brief_description` | 是 | 卡面简述 |
| `full_description` | 是 | 详情页完整说明 |
| `weight` | 否 | 同来源、同档位内的任务权重 |
| `requirements` | 是 | 提交需求 |
| `accept_cost` | 是 | 接取成本 |
| `rewards` | 是 | 完成奖励 |

## 需求写法

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

说明：

- `type: "item"` 时，`target` 必须是有效物品 ID。
- `type: "tag"` 时，`target` 必须是有效物品标签 ID。
- `display` 用于控制界面显示文本，适合标签任务。

## 奖励写法

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

使用相同资源路径可以覆盖内置任务。

示例：

```text
kubejs/data/tidalcommission/tasks/official/official_t1_lighthouse_wicks_01.json
```

替换后执行 `/reload`，或重启服务器。

## 发布前检查

- 来源 ID 是否存在并启用。
- 来源权重是否大于 0。
- 任务档位是否正确。
- 物品 ID 或标签 ID 是否有效。
- 奖励物品是否存在。
- KubeJS 或数据包路径是否放在服务端。
