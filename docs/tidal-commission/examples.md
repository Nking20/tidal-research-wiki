---
title: 潮汐委托样例
---

# 潮汐委托样例

## 新增来源与任务

先在 `config/tidalcommission/commission_rules.json` 的 `sources` 中加入来源：

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
  "brief_description": "为工坊补充铁锭。",
  "full_description": "生产线需要一批铁锭维持运转。",
  "weight": 10,
  "duration": 1.0,
  "requirements": {
    "type": "item",
    "target": "minecraft:iron_ingot",
    "count": 16
  },
  "accept_cost": {
    "primary": { "item": "minecraft:gold_ingot", "count": 1 }
  },
  "rewards": {
    "primary": { "item": "minecraft:emerald", "count": [6, 10] },
    "extras": []
  }
}
```

完成后执行：

```text
/tc reload
/tc doctor
```

## 钢铁时代阶段任务

以下任务必须拥有 `steel_age` 阶段才会出现；拥有 `factory` 时权重翻倍。

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

把它加入任务根对象后，使用下面的命令测试：

```text
/tc stage add <玩家> steel_age
/tc stage add <玩家> factory
/tc doctor <玩家>
```

## KubeJS：进度驱动阶段

将玩家获得钻石时标记为钢铁时代：

```js
PlayerEvents.advancement(event => {
  if (event.advancement.id === 'minecraft:story/mine_diamond') {
    event.server.runCommandSilent(`tc stage add ${event.player.username} steel_age`)
  }
})
```

任务条件仍由潮汐委托服务器保存；KubeJS 只负责在合适的事件发生时调用命令。
