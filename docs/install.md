---
title: 安装教程
sidebar_position: 2
---

# 安装教程

## 基础环境

潮汐委托当前版本适用于：

| 项目 | 要求 |
| --- | --- |
| Minecraft | `1.21.1` |
| NeoForge | `21.1.219+` |
| Java | `21` |
| Mod ID | `tidalcommission` |

## 客户端安装

1. 安装 Minecraft 1.21.1。
2. 安装 NeoForge 21.1.219 或更高版本。
3. 将模组 jar 放入 `mods` 文件夹。
4. 启动游戏。

## 服务端安装

1. 安装 NeoForge 服务端。
2. 将模组 jar 放入服务端 `mods` 文件夹。
3. 启动服务端生成配置。
4. 按需要修改 `config/tidalcommission/` 下的配置文件。
5. 重启服务端。

## 可选依赖

### Curios API

Curios 是可选依赖。

安装后：

- 潮汐委托板可以放入 Curios 的 `curio` 饰品栏。
- 玩家按快捷键时，背包或饰品栏中有潮汐委托板都能打开界面。

未安装时：

- 模组仍可正常运行。
- 只是没有饰品栏放置功能。

### Farmer's Delight

当前内置任务中存在部分 `farmersdelight:*` 物品任务。

未安装 Farmer's Delight 时：

- 引用这些物品的任务会在加载时跳过。
- 不会因为缺少物品而崩溃。

## 首次进入世界

默认配置下，玩家首次进入世界会自动获得一个潮汐委托板。

可在 `commission_rules.json` 中关闭：

```json
{
  "items": {
    "starter_items": {
      "give_commission_board_on_first_join": false
    }
  }
}
```

