---
title: 阶段、命令与诊断
---

# 阶段、命令与诊断

阶段用于把静态委托接入整合包进度。阶段名会按小写保存，可使用字母、数字、`_`、`-`、`.`、`:` 与 `/`。

## 阶段命令

```text
/tc stage add <玩家> <阶段>
/tc stage remove <玩家> <阶段>
/tc stage list <玩家>
/tc stage clear <玩家>
```

这些命令需要管理员权限。阶段数据保存于服务器世界数据中，不依赖客户端 NBT。

## `stage_rules` 规则

```json
"stage_rules": {
  "requires_all": ["steel_age"],
  "requires_any": ["factory", "shipyard"],
  "excludes": ["endgame"],
  "weight_modifiers": [
    {
      "requires_all": ["factory"],
      "multiply": 2.0
    },
    {
      "requires_any": ["late_game"],
      "add": -5
    }
  ]
}
```

| 字段 | 效果 |
| --- | --- |
| `requires_all` | 必须同时拥有列出的全部阶段。 |
| `requires_any` | 至少拥有列出的一个阶段。 |
| `excludes` | 拥有其中任一阶段时，任务不会出现。 |
| `weight_modifiers` | 条件满足时，对基础 `weight` 先乘法、后加法修正。权重不大于 0 时不会被抽取。 |

`stage_rules` 完全可选。没有该字段的旧任务不会受到影响。阶段规则只筛选静态配置任务；玩家发布的自定义委托不走这一筛选路径。

## 诊断命令

```text
/tc reload
/tc doctor
/tc doctor <玩家>
```

- `/tc reload`：重新读取来源配置和任务配置，并报告跳过文件、无法满足的规则或无可用来源。
- `/tc doctor`：检查全局任务数、每档任务数、来源权重和阶段规则健康度。
- `/tc doctor <玩家>`：按该玩家当前阶段，显示每档、每来源真正可抽到的静态任务数。

## 推荐工作流

1. 在 `config/tidalcommission/tasks/` 编辑任务 JSON。
2. 用 `/tc reload` 重新读取。
3. 用 `/tc doctor` 检查全局配置。
4. 用 `/tc stage add` 赋予测试阶段。
5. 用 `/tc doctor <玩家>` 验证该玩家的实际可见任务。
