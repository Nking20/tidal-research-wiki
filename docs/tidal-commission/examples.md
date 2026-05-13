---
title: 样例
---

# 潮汐委托样例

这里放适合整合包作者直接参考的最小样例。

## 新增来源

在 `commission_rules.json` 的 `sources` 中加入：

```json
{
  "id": "my_factory",
  "displayName": "My Factory",
  "weight": 10,
  "enabled": true,
  "color": "#6FA8DC",
  "icon": "minecraft:iron_ingot"
}
```

然后在数据包中创建任务：

```text
data/tidalcommission/tasks/my_factory/my_factory_t1_parts_01.json
```

任务 JSON 中写：

```json
{
  "tier": 1,
  "source": "my_factory",
  "stars": 1,
  "brief_description": "Deliver 16 Iron Ingots for workshop stock.",
  "full_description": "The workshop is preparing a new batch of machines and needs 16 Iron Ingots.",
  "weight": 10,
  "requirements": {
    "type": "item",
    "target": "minecraft:iron_ingot",
    "count": 16
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
      "count": [8, 12]
    }
  }
}
```

## 禁用默认来源

如果想只保留自定义来源，可以把默认来源权重设为 0：

```json
{
  "id": "official",
  "weight": 0,
  "enabled": true
}
```

也可以直接关闭：

```json
{
  "id": "official",
  "enabled": false
}
```

## 提高指定来源栏位成本

```json
"directed_slots": [
  {
    "enabled": true,
    "slot": 5,
    "cost_multiplier": 1.5
  }
]
```

这个设置适合让第五栏作为自选来源栏位，同时提高翻开成本，避免自选任务过于廉价。
