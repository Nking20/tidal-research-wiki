---
title: 魔改样例
---

# 整合包魔改样例

这里放跨模组通用的整理方式。当前样例以潮汐委托为主。

## KubeJS 数据包目录

```text
kubejs/data/tidalcommission/tasks/<source>/<task>.json
```

## 普通数据包目录

```text
datapacks/<pack_name>/data/tidalcommission/tasks/<source>/<task>.json
```

## 建议命名

```text
<source>_t<tier>_<short_name>_<number>.json
```

示例：

```text
my_factory_t1_parts_01.json
my_factory_t2_parts_01.json
my_factory_t3_parts_01.json
```

## 调试顺序

1. 确认配置中的来源已经启用。
2. 确认来源权重大于 0。
3. 确认任务 JSON 的 `source` 与来源 ID 一致。
4. 确认任务路径在服务端生效。
5. 执行 `/reload` 或重启服务器。
6. 如果任务仍不出现，检查日志中的数据包加载报错。
