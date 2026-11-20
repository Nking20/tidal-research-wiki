---
title: 按需求配置任务
---

# 按需求配置任务

先完成[作者上手指南](./author-guide.md)中的 `tutorial:iron`。以下每节只改变一个需求，不使用内置任务作为前提。

除另有说明，JSON 块都是**替换字段**：在那份完整任务中替换同名字段，未列出的保留。不要把片段单独保存为任务，也不要在同一对象里保留两个同名字段。

## 分几次提交物品

把 `requirements` 替换为：

```json
{
  "requirements": {
    "type": "item",
    "target": "minecraft:iron_ingot",
    "count": 4,
    "delivery_mode": "deposit"
  }
}
```

重载后重新装入测试任务。先交两个铁锭，检查进度为 2/4；再交两个，检查目标完成。存入的物品应从背包扣除。

如果只要求持有而不扣物品，改为 `check_only`。如果要求一次性足量提交并扣除，使用默认的 `consume`。

## 两项目标完成任意一项

替换 `requirements`，并添加 `objective_logic`：

```json
{
  "requirements": [
    { "type": "item", "target": "minecraft:iron_ingot", "count": 1 },
    { "type": "item", "target": "minecraft:copper_ingot", "count": 2 }
  ],
  "objective_logic": { "mode": "any" }
}
```

只带两个铜锭、不带铁锭，仍应能完成。要两项都满足，改成 `all`；要三项目标中完成两项，则先提供三项目标，再设 `mode: "at_least"` 和 `required: 2`。

这控制的是**一份任务内部的目标**，不能把前置任务的“全部完成”改成“任意完成”。

## 从两份报酬中选择一份

替换整个 `rewards`：

```json
{
  "rewards": {
    "options": [
      {
        "id": "emerald",
        "display": "一颗绿宝石",
        "rewards": [{ "item": "minecraft:emerald", "count": 1 }]
      },
      {
        "id": "bread",
        "display": "两个面包",
        "rewards": [{ "item": "minecraft:bread", "count": 2 }]
      }
    ],
    "choose": 1
  }
}
```

完成后选择其中一项，确认另一项不会发放。这里没有 `primary`，所以没有额外固定奖励；如需固定加可选，在同一个 `rewards` 对象里加入 `primary`。

## 制作连续剧情

线性后续、同时开放的分支、多前置汇合和优先出现需要同时配置 `prerequisites`、`unlock_mode` 和任务线。请按[任务线教程](./task-lines.md)完成“船坞重启计划”示例，其中包含两条普通分支、一个优先后续和一个双前置汇合委托。

## 完成一小时后才能再接到

添加或替换 `repeat`：

```json
{
  "repeat": {
    "mode": "cooldown",
    "cooldown_seconds": 3600,
    "max_completions": 0
  }
}
```

这是现实时间的一小时，从完成记录时间起计算。`max_completions: 0` 表示不额外限制总次数，不代表零次可做。测试时可临时使用 60 秒，但栏位冷却仍按主配置运行；任务冷却结束不会直接腾出栏位或派发任务。

`once` 表示完成一次后不再抽取。`daily`、`weekly` 使用现实时间固定周期，睡觉或 `/time set day` 不会重置；边界说明见[前置与重复规则](./datapack.md#前置与重复规则)。

## 获得阶段后开放任务

向完整任务添加：

```json
{
  "stage_rules": { "requires_all": ["tutorial_ready"] }
}
```

没有该阶段的新测试玩家不应正常抽到。然后在游戏内执行：

```text
/tc stage add @s tutorial_ready
/tc stage list @s
/tc doctor @s
```

任务应通过阶段筛选，但仍要满足其他抽取条件。`@s` 在这里指输入命令的玩家，从服务器控制台执行时改为玩家名。

阶段名称本身不会自动监听合成、进度或其他模组章节。先用命令验证，再让脚本在相应事件中执行相同命令。事件写法取决于所装 KubeJS 版本；本教程不要求安装脚本模组。规则详见[阶段、命令与诊断](./stages.md)。

## 给任务增加自己的分类

执行 `/tc editor manage`，通过来源编辑界面新增来源；也可以在 `commission_rules.json` 现有的 `sources` **数组中追加一个对象**：

```json
{
  "id": "tutorial",
  "displayName": "教程",
  "weight": 10,
  "enabled": true,
  "color": "#6FA8DC",
  "icon": "minecraft:book"
}
```

保留主配置其他字段。随后把要归入该分类的任务的 `source` 改成 `tutorial`，重载并在管理器确认分类。只创建 `tasks/tutorial/` 文件夹，不会自动注册或启用来源。

需要玩家主动选来源时，可配置[指定来源栏位](./config.md#指定来源栏位)。自定义来源不会自动建立前置关系或阶段。
