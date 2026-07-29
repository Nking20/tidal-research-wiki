---
title: 任务 JSON 与数据包
---

# 潮汐委托任务 JSON

## 实际任务目录

服务器运行时读取的任务目录是：

```text
config/tidalcommission/tasks/<来源>/<文件>.json
```

内置任务会在该目录为空时自动写入。数据包也可以提供初始任务，但当前版本仅在配置任务目录为空时将其作为初始内容写入配置目录；后续调整任务应直接修改 `config/tidalcommission/tasks/`，再执行 `/tc reload`。

数据包/KubeJS 的任务目录为：

```text
data/<命名空间>/tidal_commission_tasks/<来源>/<文件>.json
```

旧的 `data/<命名空间>/tasks/` 目录不再被潮汐委托读取。

## 完整示例

```json
{
  "id": "my_pack:steel_age_parts",
  "tier": 2,
  "source": "official",
  "stars": 2,
  "brief_description": "为码头工坊补充钢铁零件。",
  "full_description": "工坊需要一批铁锭完成维护，保证港口设备继续运转。",
  "weight": 8,
  "duration": 1.5,
  "requirements": {
    "type": "item",
    "target": "minecraft:iron_ingot",
    "count": 16
  },
  "accept_cost": {
    "primary": {
      "item": "minecraft:gold_ingot",
      "count": 2
    }
  },
  "rewards": {
    "primary": {
      "item": "minecraft:emerald",
      "count": [4, 8]
    },
    "extras": []
  }
}
```

## 常用字段

| 字段 | 说明 |
| --- | --- |
| `id` | 推荐使用 `<命名空间>:<路径>`，同一任务 ID 不能重复。 |
| `tier` | 任务档位，范围为 1～3。 |
| `source` | 来源 ID，必须在 `commission_rules.json` 中存在并启用。 |
| `stars` | 界面显示的星级，通常与 `tier` 一致。 |
| `brief_description` / `full_description` | 卡面简介与详情说明。 |
| `weight` | 同来源、同档位任务的基础抽取权重。 |
| `duration` | 作者描述字段；当前实际限时由服务器 `commission_rules.json` 的时间规则决定。 |
| `requirements` | 提交需求；支持 `item` 或 `tag`。 |
| `accept_cost` | 接取成本，`primary` 必填，`extra` 可选。 |
| `rewards` | `primary` 必填，`extras` 为额外奖励数组。 |
| `stage_rules` | 可选的阶段条件与权重修正，见[阶段与诊断](./stages.md)。 |

## 标签需求

```json
{
  "type": "tag",
  "target": "c:music_discs",
  "count": 6
}
```

标签名不含 `#`。请确保标签在服务端实际存在；例如 `c:music_discs` 可用作通用唱片需求。

## 发布前检查

1. JSON 必须合法，物品 ID、标签 ID 和来源 ID 必须存在。
2. 来源必须启用，且权重大于 0。
3. 修改配置目录中的任务后执行 `/tc reload`。
4. 执行 `/tc doctor`；若使用阶段规则，再执行 `/tc doctor <玩家>`。
