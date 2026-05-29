---
title: 配置
---

# 潮汐观测卡配置

配置目录：

```text
config/trs/
```

服务器环境下，实际玩法以服务端配置为准。客户端进入服务器后会同步服务端的等级、奖励池、界面规则和轮转配置。

## 配置文件

| 文件 | 用途 |
| --- | --- |
| `trsset.json5` | 界面、页数、观测模式、刷新模式、出生赠卡、动画等基础规则 |
| `tidal_levels.json5` | 五个观测等级的观测货币、观测成本和兑换货币 |
| `tidal_pools.json5` | 观测奖励池、放弃补偿池、奖励数量和兑换价格 |
| `tidal_spin.json5` | 潮汐轮转入口、点数、微调成本、月相修正 |

## trsset.json5

`trsset.json5` 是刷新规则的主配置文件。新版本不再推荐在 `tidal_levels.json5` 中配置刷新时间。

常用字段：

| 字段 | 说明 |
| --- | --- |
| `ui.visible_level_slots` | 灰卡可显示的等级档位 |
| `ui.enable_flip_animation` | 是否启用翻牌动画 |
| `cards.page_count` | 观测卡页数，每页 12 张 |
| `cards.observe_mode` | `manual`、`random_single` 或 `blind_level` |
| `cards.random_single.weights` | 随机单等级模式下 I 到 V 的权重 |
| `cards.blind_level.cost_level` | 隐藏等级模式下用于计算观测成本的等级，默认 3 |
| `cards.blind_level.weights` | 隐藏等级模式下 I 到 V 的实际等级权重 |
| `refresh.mode` | 刷新模式 |
| `refresh.hour` / `refresh.minute` | `world_daily`、`fixed_daily`、`real_daily` 使用的刷新时间 |
| `refresh.interval_minutes` | `interval` 模式下的真实时间间隔 |
| `observe_draw.enabled` | 是否启用观测开奖动画 |
| `misc.grant_starter_card_on_first_join` | 首次进入世界是否给予观测卡 |

刷新模式：

| 模式 | 说明 |
| --- | --- |
| `world_daily` | 按 Minecraft 世界时间刷新。`hour` / `minute` 表示游戏内时间；世界关闭时不会继续计时。 |
| `fixed_daily` | 旧名称，兼容 `world_daily`。 |
| `real_daily` | 按服务器本地现实时间每天固定时间刷新。`hour` / `minute` 表示服务器本地时间。 |
| `interval` | 按现实时间间隔刷新，使用 `interval_minutes`。 |
| `manual_only` | 不自动刷新，只通过管理员操作刷新。 |

示例：

```json
"refresh": {
  "mode": "world_daily",
  "hour": 7,
  "minute": 0,
  "interval_minutes": 2880
}
```

48 小时刷新一次：

```json
"refresh": {
  "mode": "interval",
  "interval_minutes": 2880
}
```

每天服务器本地时间 6:00 刷新：

```json
"refresh": {
  "mode": "real_daily",
  "hour": 6,
  "minute": 0
}
```

## tidal_levels.json5

`tidal_levels.json5` 只负责五个观测等级的成本和货币。

常用字段：

| 字段 | 说明 |
| --- | --- |
| `levels.<等级>.observe_currency` | 对应等级的观测货币 |
| `levels.<等级>.observe_cost` | 对应等级的观测成本 |
| `levels.<等级>.redeem_currency` | 对应等级的兑换货币 |

示例：

```json
{
  "levels": {
    "1": {
      "observe_currency": "minecraft:gold_ingot",
      "observe_cost": 2,
      "redeem_currency": "minecraft:gold_ingot"
    }
  }
}
```

兼容说明：旧版本 `tidal_levels.json5` 中的 `refresh_hour` 和 `refresh_minute` 仍可被读取，不会导致崩溃，但新版本不会再把它们作为主刷新配置。

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

权重不是百分比。实际概率为：

```text
单个条目权重 / 同池所有有效条目权重总和
```

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

## 管理员指令

配置修改后可使用：

```text
/trs reload
```

配置检查：

```text
/trs doctor
```

观测模式切换：

```text
/trs mode get
/trs mode set manual
/trs mode set random_single
/trs mode set blind_level
```

手动刷新玩家观测卡：

```text
/trs refresh self
/trs refresh player <玩家>
```

玩家统计和观测记录导出：

```text
/trs stats player <玩家>
/trs stats export
```

统计文件位于：

```text
config/trs/analytics/player_stats.csv
config/trs/analytics/observations.csv
```

如果 `/trs reload` 失败，模组会保留旧配置。修正错误后再次执行 `/trs reload` 即可。
