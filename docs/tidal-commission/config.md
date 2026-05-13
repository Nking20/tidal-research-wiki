---
title: 配置
---

# 潮汐委托配置

配置目录：

```text
config/tidalcommission/
```

服务器环境下，配置应以服务端为准。客户端本地配置不应该决定任务抽取、来源权重、冷却或玩家委托规则。

## commission_rules.json

`commission_rules.json` 是潮汐委托的主配置文件。

常用字段：

| 字段 | 说明 |
| --- | --- |
| `timing.task_duration_days` | 接受委托后的限时 |
| `timing.abandon_penalty_days` | 放弃委托后的惩罚时间 |
| `timing.expired_penalty_days` | 委托超时后的惩罚时间 |
| `timing.completion_cooldown_days` | 完成委托后的冷却时间 |
| `open_costs` | 翻开不同档位卡牌的成本 |
| `directed_slots` | 指定来源栏位 |
| `items.dispatch_token.use_cooldown_seconds` | 调度令使用冷却 |
| `items.starter_items.give_commission_board_on_first_join` | 首次进入世界是否自动给予委托板 |
| `sources` | 委托来源列表 |

## 来源配置

来源用于决定任务属于哪一类，例如官方、民间、灰色组织，或整合包作者新增的来源。

示例：

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

字段说明：

| 字段 | 说明 |
| --- | --- |
| `id` | 来源 ID，任务 JSON 中的 `source` 要与它一致 |
| `displayName` | 界面显示名 |
| `weight` | 来源权重 |
| `enabled` | 是否启用 |
| `color` | 界面显示颜色 |
| `icon` | 界面显示图标物品 |

权重不是百分比。实际抽取概率按：

```text
单个来源权重 / 所有可用来源权重总和
```

如果想让默认来源不再出现，可以把对应来源的 `weight` 设为 `0`，或将 `enabled` 设为 `false`。

## 指定来源栏位

示例：

```json
"directed_slots": [
  {
    "enabled": true,
    "slot": 5,
    "cost_multiplier": 1.5
  }
]
```

说明：

- `slot` 使用玩家看到的栏位编号。
- `slot: 5` 表示第五个栏位。
- `cost_multiplier` 用于提高指定来源栏位的翻开成本。

指定来源栏位适合做成更高成本、更可控的自选任务入口。

## gray_reward_pools.json

`gray_reward_pools.json` 用于配置灰色组织任务完成后的随机奖励池。

灰色组织任务在卡面中可以隐藏具体奖励，完成后再从奖励池中结算。

示例：

```json
{
  "config_version": 2,
  "gray_rewards": {
    "tier_1": [
      {
        "weight": 10,
        "primary": {
          "item": "minecraft:gold_ingot",
          "count": [8, 10]
        },
        "extras": []
      }
    ]
  }
}
```

## player_commissions.json

`player_commissions.json` 用于控制玩家自定义委托。

示例：

```json
{
  "enabled": true,
  "max_open_per_player": 5,
  "expire_days": 7.0,
  "reward_slots": 6,
  "max_requirement_count": 999,
  "default_max_accepts": 1,
  "max_accepts_limit": 8,
  "player_commission_pick_weight": 2,
  "broadcast_completion": true
}
```

常用字段：

| 字段 | 说明 |
| --- | --- |
| `enabled` | 是否启用玩家自定义委托 |
| `max_open_per_player` | 每名玩家最多同时发布多少个委托 |
| `expire_days` | 玩家委托过期时间 |
| `reward_slots` | 发布界面可放入的奖励槽数量 |
| `max_requirement_count` | 单个需求物品最大数量 |
| `default_max_accepts` | 默认可接取人数 |
| `max_accepts_limit` | 可接取人数上限 |
| `player_commission_pick_weight` | 玩家委托被抽到的权重 |
| `broadcast_completion` | 完成玩家委托时是否全服广播 |
