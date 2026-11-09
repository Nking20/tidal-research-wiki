---
title: 版本与存档兼容
sidebar_position: 11
---

# 版本与存档兼容

本文对应 Relict 0.2.0 的当前开发源码，目标为 Minecraft Java 1.21.1、NeoForge 21.1.219、Java 21。同为 0.2.0 的早期打包文件可能缺少经典狼或居民背包等后续内容。整合包与联机排查时，先核对客户端、服务器安装的实际 JAR。

## 常见命名差异

| 旧存档或脚本里的 ID | 当前对应项 |
| --- | --- |
| `relict:faded_spirit_dust` | `relict:temporal_dust` |
| `relict:monster` | `relict:old_zombie` |
| `relict:black_steve`、`relict:rana` | `relict:human_npc` |
| `relict:flowing_water_item` | `relict:stationary_water_item` |
| `relict:flowing_lava_item` | `relict:stationary_lava_item` |
| `relict:redstone_wire_item` | `minecraft:redstone` |
| `relict:tripwire_item` | `minecraft:string` |
| `relict:classic_jukebox` | `minecraft:jukebox` |

上表为模组提供的部分注册别名。编写新脚本和数据包时可直接使用当前项。曾以 `relict:human` 保存的过渡版居民会按存档数据识别。带有整数 `HumanProfile` 且没有 `ClassicHeading` 的实体会转为 `relict:human_npc`。当前的 `relict:human` 对应四肢乱晃史蒂夫，黑面史蒂夫的 ID 是 `relict:low_head_steve`。

## 自定义旧世界地形

旧世界的维度定义位于数据包路径 `data/relict/dimension/old_world.json`。自定义数据包可以复制原定义，修改 `generator` 内的字段。生成器类型为 `relict:old_terrain`，群系源为 `relict:old_biomes`。

| 字段 | 默认值 | 含义 |
| --- | ---: | --- |
| `coordinate_wall_radius` | 512 | 从原点向两端生成坐标墙的范围，单位为格。设为 0 可关闭。 |
| `far_lands_start` | 8192 | 以 X 或 Z 的绝对坐标计，控制边境之地开始出现的位置。设为 0 可关闭。 |

改动地形生成规则后，新生成区块可能与既有区块在边界处形成接缝。验证世界生成时，可在测试存档中分别检查近原点和目标距离的区块。

## 整合包常用资源

| 用途 | 路径或 ID |
| --- | --- |
| 指定旧世界 | `relict:old_world` |
| 查看旧界进度定义 | `data/relict/advancement/old_world/` |
| 查找遗迹及其候选位置 | `data/relict/worldgen/structure/`、`data/relict/worldgen/structure_set/` |
| 查找遗迹物资 | `data/relict/loot_table/chests/` |
| 引用旧界木板 | `#relict:wood_planks` |
| 查找配方或核对物品 ID | [配方索引](./recipes.md)、[方块转换白名单](./conversion.md) |
