---
title: 配置
---

# 潮汐观测卡配置

配置目录：

```text
config/trs/
```

服务器环境下，配置以服务端为准。客户端进入服务器后会同步服务端配置。

## tidal_levels.json5

`tidal_levels.json5` 用于配置五个观测等级的成本和货币。

常用字段：

| 字段 | 说明 |
| --- | --- |
| `refresh_hour` | 固定每日刷新模式下的刷新小时 |
| `refresh_minute` | 固定每日刷新模式下的刷新分钟 |
| `levels.<等级>.observe_currency` | 对应等级的观测货币 |
| `levels.<等级>.observe_cost` | 对应等级的观测成本 |
| `levels.<等级>.redeem_currency` | 对应等级的兑换货币 |

示例：

```json
{
  "refresh_hour": 7,
  "refresh_minute": 0,
  "levels": {
    "1": {
      "observe_currency": "minecraft:gold_ingot",
      "observe_cost": 2,
      "redeem_currency": "minecraft:gold_ingot"
    }
  }
}
```

## tidal_pools.json5

`tidal_pools.json5` 用于配置观测奖励池和放弃补偿池。

奖励池通常按等级分为：

```text
pool1
pool2
pool3
pool4
pool5
```

放弃补偿池通常按等级分为：

```text
abandon1
abandon2
abandon3
abandon4
abandon5
```

常用字段：

| 字段 | 说明 |
| --- | --- |
| `item.id` | 指定单个物品 |
| `item.tag` | 指定物品标签 |
| `weight` | 奖励项权重 |
| `count_min` / `count_max` | 奖励数量范围 |
| `price_min` / `price_max` | 兑换价格范围 |
| `components` | 物品组件，用于附魔、药水等复杂物品 |
| `custom_data` | 自定义数据 |

权重不是百分比。实际概率按：

```text
单个条目权重 / 同池所有有效条目权重总和
```

## trsset.json5

`trsset.json5` 控制界面、卡牌页数、观测模式、刷新模式和基础规则。

常用字段：

| 字段 | 说明 |
| --- | --- |
| `ui.visible_level_slots` | 灰卡可显示的等级档位 |
| `ui.enable_flip_animation` | 是否启用翻牌动画 |
| `cards.page_count` | 观测卡页数，每页 12 张 |
| `cards.observe_mode` | `manual` 或 `random_single` |
| `cards.random_single.weights` | 随机单等级模式下 I 到 V 的权重 |
| `refresh.mode` | `fixed_daily`、`interval` 或 `manual_only` |
| `refresh.interval_minutes` | `interval` 模式下的真实时间间隔 |
| `observe_draw.enabled` | 是否启用观测开奖动画 |
| `misc.grant_starter_card_on_first_join` | 首次进入世界是否给予观测卡 |

`visible_level_slots` 示例：

```json
"visible_level_slots": [1, 3, 5]
```

这表示界面显示三个按钮 `I`、`II`、`III`，但它们实际对应原始等级 1、3、5。

## tidal_spin.json5

`tidal_spin.json5` 控制潮汐轮转。

常用字段：

| 字段 | 说明 |
| --- | --- |
| `enabled` | 是否启用潮汐轮转 |
| `entry.enabled` | 进入轮转是否需要入场成本 |
| `entry.cost_multiplier` | 入场成本倍率 |
| `points.base` | 初始潮汐点 |
| `points.full_moon_bonus` | 满月额外潮汐点 |
| `costs.lock` | 连续锁定位置的成本序列 |
| `costs.full_refresh` | 全刷新成本 |
| `costs.double` | 双刷基础成本 |
| `costs.triple` | 三刷基础成本 |
| `costs.drift` | 偏流基础成本 |
| `orb_range_hint.chance_percent` | 微调范围提示概率 |
| `moon_modifiers.enabled` | 是否启用月相修正 |

成本序列示例：

```json
"lock": [1, 2, 4, 8]
```

如果序列用完，后续会继续使用最后一个值。

## 热重载与检查

配置修改后可使用：

```text
/trs reload
```

配置检查可使用：

```text
/trs doctor
```

如果重载失败，模组会保留旧配置。建议先看错误提示和 `latest.log`，修正后再重载。
