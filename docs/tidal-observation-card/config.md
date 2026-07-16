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
| `tidal_spin.json5` | 潮汐值获取、三档轮转模式、点数、微调成本和月相修正 |
| `river_god.json5` | 漂流瓶与河神概率、满意度、正负结果、效果和独立奖励池 |

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

`tidal_spin.json5` 控制潮汐值与三档潮汐轮转。

常用字段：

| 字段 | 说明 |
| --- | --- |
| `enabled` | 是否启用潮汐轮转 |
| `progress.stage1_max` | 第一段潮汐值上限；I～II 级操作最多积累到这里 |
| `progress.stage2_max` | 第二段潮汐值上限；III～IV 级操作最多积累到这里 |
| `progress.stage3_max` | 潮汐值总上限；V 级操作可以积累到这里 |
| `progress.observe_gain_by_level` | I～V 级观测获得的潮汐值 |
| `progress.redeem_gain_by_level` | I～V 级兑换获得的潮汐值 |
| `progress.abandon_gain_by_level` | I～V 级放弃获得的潮汐值 |
| `modes.shallow_cost` | 浅潮消耗 |
| `modes.returning_cost` | 回潮消耗 |
| `modes.deep_cost` | 深潮消耗 |
| `modes.symbol_count_by_mode` | 浅潮、回潮、深潮各自使用的符号数量 |
| `modes.starting_points_by_mode` | 三种模式的初始操作点 |
| `modes.reward_levels_by_mode` | 三种模式按牌型对应的奖励等级 |
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

默认潮汐值示例：

```json
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
}
```

回潮除了需要支付 `returning_cost`，玩家当前潮汐值还必须超过第一段上限；深潮同理，必须超过第二段上限。因此修改模式消耗时，也要同时考虑三段上限。

`entry` 段属于旧版轮转入口兼容配置。当前三档轮转主要使用 `modes` 中的潮汐值消耗。

## river_god.json5

`river_god.json5` 控制漂流瓶与河神钓鱼奇遇。

常用字段：

| 字段 | 说明 |
| --- | --- |
| `enabled` | 是否启用漂流瓶与河神玩法 |
| `encounter_chance_percent` | 每次真正钓到物品时自然遇见河神的概率 |
| `bottle_chance_percent` | 未遇见河神时，本次渔获被替换为漂流瓶的概率 |
| `cautious_satisfaction_percent` | 较稳回答的基础满意概率 |
| `greedy_satisfaction_percent` | 高风险回答的基础满意概率 |
| `variety_attempts` | 额外渔获尝试避开重复物品的次数 |
| `blessing_weight` | 满意结果中幸运效果的权重 |
| `bounty_weight` | 满意结果中额外原版渔获的权重 |
| `gift_weight` | 满意结果中河神赠礼池的权重 |
| `misfortune_weight` | 不满意结果中霉运效果的权重 |
| `confiscated_weight` | 不满意结果中没收原物的权重 |
| `failure_pool` | 没收原物时的独立失败返还池 |
| `gift_pool` | 河神满意时使用的专属赠礼池 |

幸运与霉运分别提供较稳和高风险两套等级、持续时间配置，例如：

```json
cautious_luck_level: 1,
cautious_luck_seconds: 300,
greedy_unluck_level: 2,
greedy_unluck_seconds: 300,
```

权重不必合计为100，系统会按同组有效权重的比例抽取一种结果。

## 游戏内奖励池编辑器

拥有权限等级2的玩家可以执行：

```text
/trs config
```

编辑器目前用于维护 `tidal_pools.json5` 中五个等级的正常奖励池，支持：

- 修改物品ID或物品标签。
- 修改权重、数量上下限和兑换价格上下限。
- 新增空条目、复制或删除条目。
- 将主手物品或背包物品映射为奖励。
- 保留附魔、药水等高级物品组件与自定义数据。
- 保存后自动重载，并显示输入校验错误。

复杂配置修改前仍建议备份 `tidal_pools.json5`。编辑器不用于修改放弃池、潮汐轮转或河神奖励池。

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

河神指令：

```text
/trs rivergod stats
/trs rivergod force
```

`stats` 查看自己的河神遭遇与结果统计；`force` 需要权限等级2，使执行者下一次真正钓到物品时必定遇见河神。

统计文件位于：

```text
config/trs/analytics/player_stats.csv
config/trs/analytics/observations.csv
```

如果 `/trs reload` 失败，模组会保留旧配置。修正错误后再次执行 `/trs reload` 即可。
