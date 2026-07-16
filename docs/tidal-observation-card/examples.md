---
title: 样例
---

# 潮汐观测卡样例

本页提供可以直接参考的配置片段。实际整合包中应根据自己的货币和奖励价值调整。

## 随机单等级，两页卡牌

```json
{
  "cards": {
    "page_count": 2,
    "observe_mode": "random_single",
    "random_single": {
      "weights": [45, 28, 16, 8, 3]
    }
  }
}
```

说明：

- 每页 12 张卡，共 24 张。
- 每张卡只显示一个随机等级。
- 高等级权重较低，避免玩家每张卡都手动选择最高等级。

## 只开放三个等级入口

```json
{
  "ui": {
    "visible_level_slots": [1, 3, 5]
  }
}
```

界面会显示 `I`、`II`、`III` 三个按钮，实际分别对应原始等级 1、3、5。

## 48 小时刷新一次

```json
{
  "refresh": {
    "mode": "interval",
    "interval_minutes": 2880
  }
}
```

`interval` 使用真实时间间隔，不依赖玩家是否睡觉。

## 奖励池条目

```json
{
  "item": {
    "id": "minecraft:diamond"
  },
  "weight": 2,
  "count_min": 2,
  "count_max": 5,
  "price_min": 4,
  "price_max": 7
}
```

说明：

- `weight` 越高，越容易被抽中。
- `count_min` 和 `count_max` 控制奖励数量。
- `price_min` 和 `price_max` 控制兑换价格范围。

## 轮转成本片段

```json
{
  "progress": {
    "stage1_max": 300,
    "stage2_max": 1200,
    "stage3_max": 3600,
    "observe_gain_by_level": [20, 28, 55, 85, 140],
    "redeem_gain_by_level": [35, 50, 95, 150, 250],
    "abandon_gain_by_level": [12, 18, 35, 55, 90]
  },
  "modes": {
    "shallow_cost": 100,
    "returning_cost": 400,
    "deep_cost": 1000,
    "symbol_count_by_mode": [5, 6, 7],
    "starting_points_by_mode": [36, 42, 50]
  },
  "points": {
    "base": 17,
    "full_moon_bonus": 3
  },
  "costs": {
    "lock": [1, 2, 4, 8],
    "full_refresh": [5],
    "double": [3],
    "triple": [4],
    "drift": [3]
  }
}
```

说明：

- I～II 级操作最多把潮汐值积累到 `stage1_max`，III～IV 级最多到 `stage2_max`。
- 浅潮、回潮、深潮分别消耗100、400、1000潮汐值。
- 锁定成本会按序列递增。
- 双刷、三刷和偏流会根据使用次数继续增加成本。
- 创造模式是否无视成本由 `tidal_spin.json5` 中的 `creative_free` 控制。

## 河神概率与结果权重

```json
{
  "enabled": true,
  "encounter_chance_percent": 3,
  "bottle_chance_percent": 6,
  "cautious_satisfaction_percent": 55,
  "greedy_satisfaction_percent": 30,
  "blessing_weight": 40,
  "bounty_weight": 40,
  "gift_weight": 20,
  "misfortune_weight": 50,
  "confiscated_weight": 50
}
```

说明：

- 先判断自然河神；未触发时才判断漂流瓶。
- 满意后只在幸运、额外渔获和赠礼中抽取一种结果。
- 不满意后只在霉运和没收中抽取一种结果。
- 这些数值是权重或百分比，不需要相加为100。

## 检查配置

修改配置后建议执行：

```text
/trs reload
/trs doctor
```

如果提示某个奖励池条目无效，优先检查物品 ID、标签路径、数量范围和价格范围。
