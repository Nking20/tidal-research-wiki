---
title: 指令与管理
---

# 辑录与揭秘指令与管理

辑录与揭秘提供少量管理指令，用于服务器测试、活动补偿、进度修复和整合包调试。

## 权限

查看自己的进度不需要管理员权限。修改进度、重载配置和运行诊断需要 2 级权限。

服务器中建议只给管理员或命令方块使用管理指令，不建议开放给普通玩家。

## 指令列表

```text
/reveal progress [player]
/reveal add all [player]
/reveal remove all [player]
/reveal add <category> [entry] [player]
/reveal remove <category> [entry] [player]
/reveal reload
/reveal doctor
```

## 查看进度

查看自己的进度：

```text
/reveal progress
```

查看指定玩家进度：

```text
/reveal progress Steve
```

输出会包含总进度，以及每个来源的已解锁数量和总数量。

## 全部解析与全部还原

解锁全部辑录：

```text
/reveal add all
```

清空全部辑录：

```text
/reveal remove all
```

对指定玩家执行：

```text
/reveal add all Steve
/reveal remove all Steve
```

## 按来源调整

解锁整个来源：

```text
/reveal add vanilla_tips
```

清空整个来源：

```text
/reveal remove vanilla_tips
```

常用来源 ID：

| 来源 ID | 默认显示名 |
| --- | --- |
| `vanilla_tips` | Vanilla Tips |
| `omitted_note` | Omitted Notes |
| `unknown_language` | Unknown Language |
| `whisper` | Whispers |
| `creeper_secret` | Creeper Secrets |
| `survival_notes` | Survival Notes |
| `world_rumors` | World Rumors |

## 按具体章节调整

解锁单条辑录：

```text
/reveal add survival_notes nether_kit
```

移除单条辑录：

```text
/reveal remove survival_notes nether_kit
```

完整记录 ID 是 `survival_notes/nether_kit`。指令中需要把来源和章节拆成两个参数填写。

## 重载配置

```text
/reveal reload
```

这个指令只重新读取 `config/reveal.json`，适合调整来源、配方、字号和 UI 风格后快速测试。

注意：辑录 JSON 属于数据包内容，仍然使用原版 `/reload` 重载。推荐顺序是先执行原版 `/reload`，再执行 `/reveal doctor` 检查结果；如果只改了 `config/reveal.json`，执行 `/reveal reload` 即可。

如果配置重载失败，模组会保留旧的运行时配置，避免把服务器切到半损坏状态。

## 诊断配置

```text
/reveal doctor
```

`doctor` 会检查常见整合包问题：

- config 中的来源没有对应数据包辑录。
- 数据包中加载了来源，但 config 没有配置，因此不会显示。
- 配方目标不存在或没有辑录。
- 配方物品 ID 不存在。
- 配方物品标签为空或不存在。
- 来源图标物品 ID 不存在。
- config 没有来源、没有配方，或没有加载到任何辑录。

如果问题超过 12 条，聊天栏只显示前 12 条，其余写入日志，避免刷屏。

## 进度修复

执行 `progress`、`add` 或 `remove` 时，模组会清理旧版本残留的无效记录 ID，并同步玩家背包中的辑录册数据。

如果更新整合包后出现显示进度大于总数，可以让管理员执行：

```text
/reveal progress <player>
```

通常即可把无效 ID 清理掉。
