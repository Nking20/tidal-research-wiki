---
title: 更新日志
---

# 更新日志

## 潮汐观测卡 1.0.22 之后

- 调整刷新配置结构：`trsset.json5` 的 `refresh` 段作为刷新规则主配置来源。
- 新增 `world_daily`、`real_daily`、`interval`、`manual_only` 刷新模式说明；`fixed_daily` 保留为旧名称兼容。
- 兼容旧版 `tidal_levels.json5` 中的 `refresh_hour` / `refresh_minute` 字段，旧配置升级不会因保留旧字段直接崩溃。
- 新增正式手动刷新指令：`/trs refresh self` 与 `/trs refresh player <玩家>`。
- 补全文档中的刷新模式、管理员指令、旧配置升级和服务端同步说明。

## 潮汐观测卡 1.0.21 之后

- 新增隐藏等级观测模式：灰卡不提前显示真实等级，观测成本按配置的默认档位计算，翻开后再随机决定实际等级与奖励。
- 新增隐藏等级配置：`cards.blind_level.cost_level` 可设置成本档位，`cards.blind_level.weights` 可设置 I-V 实际等级权重。
- 新增观测模式切换指令：`/trs mode get` 查看当前模式，`/trs mode set manual|random_single|blind_level` 切换模式并自动重载同步。
- 新增玩家统计指令：`/trs stats player <玩家>` 可查看玩家累计观测、兑换、放弃和轮转次数。
- 新增观测记录导出：`/trs stats export` 可查看导出路径，记录文件保存每次观测、兑换、放弃、轮转的时间、玩家、模式、卡位、等级、物品、数量和价格。
- 调整 JEI 和模组列表显示名：模组显示名改为英文 `Tidal Observation Card`。

## 1.2.0

- 新增辑录与揭秘文档。
- 整理揭秘集、辑录册、辑录页和 JEI 联动说明。
- 加入默认来源、默认配方、配置文件、数据包格式和管理指令说明。

## 1.1.1

- 整理潮汐委托基础玩法。
- 加入调度令与担保凭证。
- 加入玩家自定义委托。
- 支持服务端配置同步。
- 支持数据包和 KubeJS 扩展任务。
- Curios 为可选联动。
- 加入灰色组织奖励池配置。

## 1.0.3

- 优化委托板界面缩放表现。
- 接受任务后提供详情与放弃操作。
- 加入快捷键打开和关闭委托界面。
- 加入创造模式物品栏入口。
