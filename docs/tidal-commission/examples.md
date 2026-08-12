---
title: 潮汐委托样例
---

# 潮汐委托样例

1.5.0 的内置任务已经包含下列可直接测试的示例。首次生成配置后，可在 `config/tidalcommission/tasks/` 中找到对应 JSON。

| 示例 | 文件 ID | 展示内容 |
| --- | --- | --- |
| 港务装瓶物资 | `official_t1_multi_supply_demo_10` | 多目标、分批存入、只检查不消耗。 |
| 指定水药水 | `official_t1_component_potion_demo_13` | 组件匹配，区分同一物品 ID 的不同内容。 |
| 沿岸巡查 | `official_t2_at_least_patrol_demo_12` | 三种击杀目标中至少完成两项。 |
| 每日后续 | `official_t2_daily_followup_demo_11` | 前置委托与每日限制。 |
| 渔村报酬 | `folk_t2_reward_choice_demo_12` | 没有固定奖励，从三种方案中选择一项。 |
| 沼泽调查 | `official_t2_swamp_survey_09` | 到达群系目标。 |
| 海洋路线 | `folk_t1_ocean_tag_route_demo_13` | 群系标签目标。 |
| 原木补给 | `folk_t1_log_tag_demo_13` | 物品标签目标。 |

## 新增来源与任务

先在游戏内来源分类编辑器中新增来源，或在 `commission_rules.json` 的 `sources` 中加入：

```json
{
  "id": "my_factory",
  "displayName": "我的工坊",
  "weight": 10,
  "enabled": true,
  "color": "#6FA8DC",
  "icon": "minecraft:iron_ingot"
}
```

然后创建：

```text
config/tidalcommission/tasks/my_factory/my_factory_t1_parts_01.json
```

```json
{
  "id": "my_pack:my_factory_t1_parts_01",
  "tier": 1,
  "source": "my_factory",
  "stars": 1,
  "brief_description": "从两种维护路线中完成一种。",
  "full_description": "可以补交铁锭，也可以清理生产区附近的僵尸。",
  "weight": 10,
  "duration": 1.0,
  "requirements": [
    {
      "type": "item",
      "target": "minecraft:iron_ingot",
      "count": 16,
      "delivery_mode": "deposit"
    },
    {
      "type": "kill_entity",
      "target": "minecraft:zombie",
      "count": 8
    }
  ],
  "objective_logic": { "mode": "any" },
  "accept_cost": {
    "primary": { "item": "minecraft:gold_ingot", "count": 1 }
  },
  "rewards": {
    "options": [
      {
        "id": "materials",
        "display": "生产材料",
        "rewards": [
          { "item": "minecraft:copper_ingot", "count": [16, 24] },
          { "item": "minecraft:redstone", "count": [8, 12] }
        ]
      },
      {
        "id": "payment",
        "display": "现金报酬",
        "rewards": [
          { "item": "minecraft:emerald", "count": [8, 12] }
        ]
      }
    ],
    "choose": 1
  }
}
```

完成后执行：

```text
/tc reload
/tc doctor
```

## 钢铁时代阶段任务

以下规则要求玩家拥有 `steel_age` 阶段；拥有 `factory` 时权重翻倍：

```json
"stage_rules": {
  "requires_all": ["steel_age"],
  "excludes": ["endgame"],
  "weight_modifiers": [
    {
      "requires_all": ["factory"],
      "multiply": 2.0
    }
  ]
}
```

测试命令：

```text
/tc stage add <玩家> steel_age
/tc stage add <玩家> factory
/tc doctor <玩家>
```

## KubeJS：进度驱动阶段

```js
PlayerEvents.advancement(event => {
  if (event.advancement.id === 'minecraft:story/mine_diamond') {
    event.server.runCommandSilent(`tc stage add ${event.player.username} steel_age`)
  }
})
```

任务条件仍由潮汐委托服务端保存；KubeJS 只负责在合适的事件发生时调用命令。
