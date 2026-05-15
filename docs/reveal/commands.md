---
title: 指令与管理
---

# 辑录与揭秘指令与管理

辑录与揭秘提供少量管理指令，用于服务器测试、活动补偿、进度修复和整合包调试。

## 权限

除查看自己进度外，修改进度的指令需要 2 级权限。

服务器中建议只给管理员或命令方块使用，不建议开放给普通玩家。

## 指令列表

```text
/reveal progress [player]
/reveal add all [player]
/reveal remove all [player]
/reveal add <category> [entry] [player]
/reveal remove <category> [entry] [player]
```

## 查看进度

查看自己进度：

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

| 来源 ID | 显示名 |
| --- | --- |
| `vanilla_tips` | 原版小提示 |
| `omitted_note` | 遗漏笔记 |
| `unknown_language` | 未知语言 |
| `whisper` | 悄悄话 |
| `creeper_secret` | 苦力怕的秘密 |
| `survival_notes` | 生存经验 |
| `world_rumors` | 世界传闻 |

## 按具体章节调整

解锁单条辑录：

```text
/reveal add survival_notes nether_kit
```

移除单条辑录：

```text
/reveal remove survival_notes nether_kit
```

这里的完整记录 ID 是：

```text
survival_notes/nether_kit
```

指令中把来源和章节拆成两个参数填写。

## 进度修复

执行 `progress`、`add` 或 `remove` 时，模组会清理旧版本残留的无效记录 ID，并同步玩家背包中的辑录册数据。

如果更新整合包后出现显示进度大于总数的情况，可以让管理员执行：

```text
/reveal progress <player>
```

通常即可把无效 ID 清理掉。
