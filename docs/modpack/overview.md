---
title: 数据包与魔改规则
---

# 数据包与魔改规则

## 潮汐委托 1.4.0 路径

潮汐委托的数据包资源目录为：

```text
kubejs/data/<命名空间>/tidal_commission_tasks/<来源>/<文件>.json
```

或普通数据包：

```text
datapacks/<数据包>/data/<命名空间>/tidal_commission_tasks/<来源>/<文件>.json
```

运行时任务目录则是：

```text
config/tidalcommission/tasks/
```

数据包任务适合在首次生成服务端任务配置时提供初始内容；已运行的服务器应直接维护 `config/tidalcommission/tasks/`，改完后运行 `/tc reload`。

## 推荐调试顺序

1. 确认来源在 `commission_rules.json` 中启用且权重大于 0。
2. 确认任务 JSON 使用正确的 `tidal_commission_tasks` 路径和当前字段名。
3. 执行 `/tc reload`。
4. 执行 `/tc doctor`。
5. 使用阶段规则时，再执行 `/tc doctor <玩家>`。
