---
title: 版本与兼容说明
---

# 版本与兼容说明

本教程适用于潮汐委托 1.6.0、Minecraft 1.21.1 和 NeoForge。

## 1.6.0 功能入口

| 功能 | 使用说明 |
| --- | --- |
| 自动补充、等待接取期限 | 在 `/tc config` 调整，字段见[配置](./config.md) |
| 接取后不限时 | 将任务 `duration` 设为 `0`，见[任务 JSON](./datapack.md) |
| 委托追踪栏、任务日志 | 见[基础玩法](./gameplay.md) |
| 玩家发布委托 | 见[玩家委托](./player-commission.md) |

## Curios

1.6.0 不提供 Curios 联动，不通过饰品槽检测委托板。需要限制委托界面入口时，使用主配置的 `access` 设置，见[委托访问方式](./config.md#委托访问方式)。

## KubeJS

普通任务不需要安装 KubeJS。需要通过脚本控制玩家进度时，可调用 `/tc stage` 命令，见[阶段、命令与诊断](./stages.md)。
