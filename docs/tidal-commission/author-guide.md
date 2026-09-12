---
title: 整合包作者上手指南
sidebar_label: 作者上手指南
---

# 整合包作者上手指南

这一页面向第一次把潮汐委托加入整合包的作者。推荐先用一个小任务跑通流程，再逐步加入来源、前置链、阶段和 KubeJS 联动。

## 先理解四种东西

| 内容 | 作用 | 主要配置位置 |
| --- | --- | --- |
| 任务 | 玩家要完成的目标、时限和奖励 | `config/tidalcommission/tasks/<来源>/*.json` |
| 来源 | 给任务分类，并参与抽取权重 | `config/tidalcommission/commission_rules.json` 的 `sources` |
| 玩家状态 | 完成记录、重复冷却和阶段 | 服务端存档数据 |
| 委托板 | 给玩家展示和接取任务的栏位 | 由模组自动保存 |

任务 JSON 决定“这是什么委托”；主配置决定“哪些来源能出现、多久刷新、要付什么费用”；玩家状态决定“这个玩家现在能不能看到或再次完成”。

## 最小可运行流程

### 1. 确认服务端配置

第一次启动服务器后，检查：

```text
config/tidalcommission/commission_rules.json
config/tidalcommission/player_commissions.json
```

默认启用官方、民间和灰色组织来源。自定义来源必须同时满足 `enabled: true` 且 `weight > 0`，否则任务会被加载但不会被抽取。

### 2. 创建任务文件

把任务放到来源目录，例如：

```text
config/tidalcommission/tasks/my_factory/my_factory_t1_iron_01.json
```

最小任务示例：

```json
{
  "id": "my_pack:my_factory_t1_iron_01",
  "tier": 1,
  "source": "my_factory",
  "stars": 1,
  "brief_description": "为工坊补充铁锭。",
  "full_description": "把铁锭送到工坊仓库。",
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
    "primary": { "item": "minecraft:emerald", "count": [8, 12] },
    "extras": []
  }
}
```

### 3. 重载并诊断

```text
/tc reload
/tc doctor
```

看到任务被跳过、来源没有可用任务、物品 ID 无效或阶段规则不可能时，先修复诊断输出，再测试玩家流程。

### 4. 实际测试

```text
/tc open
```

打开委托板，翻开对应档位，确认任务能出现；再检查接取成本、目标进度、提交和奖励。任务内容修改后重复执行 `/tc reload`。

## 任务字段怎么组合

- `tier` 是档位，不是剧情顺序。前置关系由 `prerequisites` 决定。
- `weight` 是同来源、同档位内的任务权重，不是百分比。
- `duration` 是接取后的完成时限，`0` 表示接取后无完成期限；出现后仍必须在 `accept_deadline_days` 内接取。
- `requirements` 可以是一个目标，也可以是目标数组；用 `objective_logic` 控制全部、任意或至少几个。
- `accept_cost` 是接取成本；自动补充只免翻开栏位的费用，不免任务接取成本。
- `rewards` 可以只有固定奖励、只有可选方案，或两者同时使用。
- `repeat` 控制完成后能否再次出现；`max_completions` 大于 0 时还会限制总次数。

目标、奖励、重复规则的完整字段表见 [任务 JSON 与数据包](./datapack.md)。

## 写连续小故事

用稳定的命名空间 ID 创建多个任务：

```text
my_pack:harbor_story_01  募集材料
my_pack:harbor_story_02  修复灯塔
my_pack:harbor_story_03  护送商船
```

第二章写：

```json
"repeat": { "mode": "once" },
"prerequisites": ["my_pack:harbor_story_01"]
```

第三章写：

```json
"repeat": { "mode": "once" },
"prerequisites": ["my_pack:harbor_story_02"]
```

多个前置 ID 表示“全部完成”才解锁。解锁的含义是进入抽取池，不是立即弹出；它仍要等待委托刷新，并通过来源、档位、权重和其他规则筛选。不要修改已经发布任务的 ID，否则玩家旧完成记录无法匹配。

编辑器的「条件 → 选择前置委托」可以按名称或 ID 选择任务；它会提示缺失 ID、自身依赖和循环依赖。复杂分支可以让两条线共同指向同一个后续任务。

## 用阶段控制章节

阶段适合表示整合包进度，例如 `steel_age`、`factory` 或 `endgame`。任务中的：

```json
"stage_rules": {
  "requires_all": ["steel_age"],
  "requires_any": ["factory", "shipyard"],
  "excludes": ["endgame"]
}
```

表示玩家必须拥有 `steel_age`，并拥有 `factory` 或 `shipyard` 之一，同时不能拥有 `endgame`。阶段不会替代前置委托：前置记录代表“完成了某个任务”，阶段代表“玩家处于某种进度”。

通过命令或 KubeJS 发放阶段：

```text
/tc stage add <玩家> steel_age
/tc stage list <玩家>
/tc doctor <玩家>
```

KubeJS 示例和阶段诊断见 [阶段、命令与诊断](./stages.md)。

## 数据包、配置和发布建议

开发时可以把初始任务放在：

```text
data/<命名空间>/tidal_commission_tasks/<来源>/<文件>.json
```

服务器运行后，实际维护目录是 `config/tidalcommission/tasks/`。内置或数据包任务只会在配置任务目录为空时写入；之后直接修改配置目录并执行 `/tc reload`。旧的 `data/<命名空间>/tasks/` 路径不会读取。

发布整合包前建议：

1. 给每个任务使用稳定且唯一的命名空间 ID。
2. 确认任务的 `source` 已在 `sources` 中启用。
3. 用一名从未完成过任务的测试玩家验证前置链。
4. 测试接取期限、完成时限、放弃和超时惩罚。
5. 执行 `/tc reload` 和 `/tc doctor`，确认没有跳过文件。
6. 备份 `config/tidalcommission/`，尤其是任务目录和玩家状态所在存档。

## 常见误区

| 现象 | 原因 |
| --- | --- |
| 任务文件存在但抽不到 | 来源未启用、权重为 0、档位不匹配，或玩家不满足前置/阶段 |
| 完成前置后没马上看到下一章 | 前置只改变抽取资格，下一章要等刷新并参与随机抽取 |
| 第二次无法完成任务 | 使用了 `once`，或仍在 cooldown/daily/weekly 限制内 |
| `/tc reload` 后内容没变 | 修改了数据包旧路径，而服务器当前维护的是 `config/tidalcommission/tasks/` |
| 编辑器保存后任务报错 | ID、来源、目标物品、奖励物品或前置链中存在无效值 |
