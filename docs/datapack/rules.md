---
title: 数据包与魔改规则
---

# 数据包与魔改规则

本页整理潮汐委托的数据包、KubeJS 和服务器魔改注意点。

## 新增来源

第一步，在 `commission_rules.json` 的 `sources` 中添加来源：

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

第二步，在数据包中添加任务：

```text
data/tidalcommission/tasks/my_factory/my_factory_t1_parts_01.json
```

第三步，任务 JSON 中写：

```json
"source": "my_factory"
```

第四步，重启服务器或执行：

```text
/reload
```

## 权重规则

权重按以下方式计算：

```text
单个来源权重 / 所有可用来源权重总和
```

权重总和不需要等于 100。

示例：

| 来源 | 权重 | 实际概率 |
| --- | ---: | ---: |
| `official` | 5 | 25% |
| `folk` | 5 | 25% |
| `gray` | 0 | 0% |
| `my_pack` | 10 | 50% |

## 数据包替换

可以通过数据包或 KubeJS 使用相同资源路径替换内置任务：

```text
kubejs/data/tidalcommission/tasks/official/official_t1_lighthouse_wicks_01.json
```

注意：

- 数据包优先级需要高于模组内置资源。
- `/reload` 后新任务池会重新加载。
- 已经翻开或已经接取的卡槽可能保留旧任务状态。

## 标签任务

任务需求支持标签：

```json
"requirements": {
  "type": "tag",
  "target": "minecraft:creeper_drop_music_discs",
  "count": 6
}
```

注意：

- Minecraft 1.21.1 中不要假设旧版本的 `#minecraft:music_discs` 一定天然存在。
- 如果希望兼容更多模组唱片，建议整合包作者自行维护 `c:music_discs` 或其他通用标签。
- 如果某个任务使用的标签没有匹配物品，玩家可能无法提交。

## 服务端同步

当前逻辑以服务端为准：

- 服务端保存玩家委托板状态。
- 服务端处理翻卡、接受、放弃、提交、冷却、惩罚。
- 服务端发送当前配置到客户端。
- 客户端 UI 使用服务端同步过来的来源、时间、成本等配置显示。
- 数据包任务以服务端数据包为准。

## 发布前检查

建议服务器上线前检查：

- 是否要开启首次进服自动给委托板。
- 是否要给调度令和担保凭证配方。
- 是否允许玩家自定义委托。
- 玩家自定义委托最多发布数量是否合理。
- 灰色奖励池是否符合服务器经济。
- 指定来源栏位成本倍率是否合理。
- 数据包任务是否引用了不存在的模组物品。

