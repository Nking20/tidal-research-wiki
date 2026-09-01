---
title: 配置
---

# 潮汐委托配置

配置目录：

```text
config/tidalcommission/
```

联机环境下，规则以服务端配置为准。客户端本地配置只应作为显示兜底，不应决定任务抽取结果。

## commission_rules.json

`commission_rules.json` 是主配置文件，控制时限、成本、自动补充、访问入口、来源、指定来源栏位、辅助物品和首次进入世界物品。

常用字段：

| 字段 | 说明 |
| --- | --- |
| `timing.task_duration_days` | 接取委托后的限时。 |
| `timing.abandon_penalty_days` | 放弃委托后的罚时。 |
| `timing.expired_penalty_days` | 委托超时后的罚时。 |
| `timing.completion_cooldown_days` | 完成委托后的冷却。 |
| `offer_rotation.enabled` | 是否启用定期自动补充委托。 |
| `offer_rotation.auto_reveal_interval_days` | 自动补充间隔，单位为游戏日。 |
| `offer_rotation.auto_reveal_count` | 每次最多补充的委托数量，范围 1～5。 |
| `offer_rotation.accept_deadline_days` | 委托出现后等待玩家接取的期限，单位为游戏日，不能无限。 |
| `offer_rotation.expired_offer_cooldown_days` | 未接取委托过期后的空栏冷却，单位为游戏日。 |
| `open_costs` | 翻开不同档位卡牌的成本。 |
| `directed_slots` | 指定来源栏位。 |
| `items.dispatch_token.use_cooldown_seconds` | 调度令使用冷却。 |
| `items.starter_items.give_commission_board_on_first_join` | 首次进入世界是否自动给予委托板。 |
| `access.mode` | 委托界面的访问模式；默认 `always_available`。 |
| `access.inventory_button` | 是否显示物品栏底部页签。 |
| `access.hotkey` | 是否允许快捷键打开。 |
| `access.player_command` | 是否允许玩家使用 `/tc open`。 |
| `sources` | 委托来源列表。 |

## 游戏内配置中心

在客户端输入：

```text
/tc config
```

配置中心包含界面、刷新、时限、费用、入口和玩家委托六个分页。本地界面设置会立即保存；服务器设置只有权限等级 2 及以上的管理员可以保存，普通玩家打开时为只读。

复杂任务内容和来源分类仍由“委托与来源分类管理器”维护。

## 自动补充配置

默认示例：

```json
"offer_rotation": {
  "enabled": true,
  "auto_reveal_interval_days": 0.5,
  "auto_reveal_count": 1,
  "accept_deadline_days": 0.5,
  "expired_offer_cooldown_days": 0.1
}
```

说明：

- 自动补充会直接把任务放入普通空闲栏位，不会占用指定来源栏位。
- 自动补充免去的是栏位翻开费用，不会免除任务 JSON 中的 `accept_cost`。
- `accept_deadline_days` 必须大于 `0`；无期限只适用于接受后的完成阶段。
- 自动补充计划和等待接取期限会随玩家委托板状态保存。

## 客户端界面配置

本地界面设置保存在：

```text
config/tidalcommission/client_ui.json
```

可通过 `/tc config` 调整：

- 是否显示委托追踪栏。
- HUD 位于左上、右上、左下或右下。
- HUD 缩放、背景透明度、水平边距和垂直边距。
- 同时追踪 1～3 份委托，以及展开显示的目标行数。
- 是否显示委托达成提示和新委托送达提示。

这些设置只影响当前客户端，不会改变服务器任务状态。

## 委托访问方式

示例：

```json
"access": {
  "mode": "always_available",
  "inventory_button": true,
  "hotkey": true,
  "player_command": true
}
```

`mode` 可用值：

| 值 | 说明 |
| --- | --- |
| `always_available` | 默认模式，不要求携带委托板。 |
| `board_required` | 必须在背包中持有委托板。 |
| `unlock_once` | 持有过委托板后永久解锁便携入口。 |
| `external_only` | 关闭背包页签和快捷键等便携入口；委托板物品、允许的命令和外部接口仍可打开。 |

`external_only` 仍允许服务端调用打开接口，但玩家快捷键不会直接打开；是否允许 `/tc open` 仍由 `player_command` 决定。

## 来源配置

来源用于决定任务分类，例如官方、民间、灰色组织，或整合包作者新增的来源。

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
| `id` | 来源 ID。任务 JSON 中的 `source` 要与它一致。 |
| `displayName` | 界面显示名。 |
| `weight` | 来源权重。 |
| `enabled` | 是否启用。 |
| `color` | 界面显示颜色。 |
| `icon` | 界面显示图标物品。 |

权重不是百分比，实际抽取概率按下面的方式计算：

```text
单个来源权重 / 所有可用来源权重总和
```

如果想让默认来源不再出现，可以把对应来源的 `weight` 设为 `0`，或将 `enabled` 设为 `false`。

也可以在游戏内的来源分类编辑器中新增、修改或删除来源。仍被任务 JSON 引用的来源不能直接删除，需先修改或删除对应任务，避免任务失去分类。

## 指定来源栏位

指定来源栏位用于让某些栏位变成可选择来源的栏位。这个功能可以关闭，也可以配置多个栏位。

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

- `slot` 使用玩家看到的栏位编号，`slot: 5` 表示第五个栏位。
- `cost_multiplier` 用于提高指定来源栏位的翻开成本。
- 只会显示配置中启用、权重大于 0，并且有可用任务的来源。

## gray_reward_pools.json

`gray_reward_pools.json` 用于配置灰色组织任务完成后的随机奖励池。灰色组织任务可以在卡面中隐藏具体奖励，完成后再从奖励池中结算。

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

`player_commissions.json` 控制玩家自定义委托。默认可以关闭该功能，让服务器只使用数据包任务。

示例：

```json
{
  "enabled": false,
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

字段说明：

| 字段 | 说明 |
| --- | --- |
| `enabled` | 是否启用玩家自定义委托。 |
| `max_open_per_player` | 每名玩家最多同时发布多少个委托。 |
| `expire_days` | 玩家委托过期时间。 |
| `reward_slots` | 发布界面可放入的奖励槽数量。 |
| `max_requirement_count` | 单个需求物品最大数量。 |
| `default_max_accepts` | 默认可接取人数。 |
| `max_accepts_limit` | 可接取人数上限。 |
| `player_commission_pick_weight` | 玩家委托被抽到的权重。 |
| `broadcast_completion` | 完成玩家委托时是否全服广播。 |
