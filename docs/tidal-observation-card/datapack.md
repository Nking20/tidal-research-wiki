---
title: 数据包与 KubeJS
---

# 潮汐观测卡数据包与 KubeJS

潮汐观测卡的主要魔改入口是配置文件和物品标签。奖励池可以直接引用物品 ID，也可以引用数据包或 KubeJS 提供的物品标签。

## 标签奖励池

奖励项可以使用标签：

```json
{
  "item": {
    "tag": "trs:basic_ores"
  },
  "weight": 10,
  "count_min": 8,
  "count_max": 16,
  "price_min": 1,
  "price_max": 1
}
```

对应标签可以放在数据包：

```text
data/trs/tags/item/basic_ores.json
```

或 KubeJS：

```text
kubejs/data/trs/tags/item/basic_ores.json
```

示例：

```json
{
  "replace": false,
  "values": [
    "minecraft:iron_ingot",
    "minecraft:copper_ingot",
    "minecraft:coal"
  ]
}
```

## 物品组件

奖励池支持物品组件，用于写入附魔、药水效果或其他组件数据。

示例：

```json
{
  "item": {
    "id": "minecraft:stick",
    "components": {
      "minecraft:enchantments": {
        "levels": {
          "minecraft:knockback": 2
        }
      },
      "minecraft:custom_name": "{\"text\":\"击退棒\",\"italic\":false}"
    }
  },
  "weight": 1,
  "count_min": 1,
  "count_max": 1,
  "price_min": 4,
  "price_max": 6
}
```

不同 Minecraft 版本的组件格式可能不同。发布整合包前应在实际服务端中测试 `/trs doctor` 和奖励抽取。

## KubeJS 用途

KubeJS 常用于：

- 添加奖励池使用的物品标签。
- 给代券、货币或奖励物品设计获取途径。
- 按整合包经济体系调整观测货币和兑换货币。
- 替换或扩展奖励池引用的标签内容。

不建议用 KubeJS 强行绕过服务端配置逻辑。观测成本、兑换成本、刷新周期和轮转规则应优先写在 `config/trs/`。

## 服务端同步

观测卡配置由服务端同步到客户端。数据包和 KubeJS 也应放在服务端或整合包公共环境中，确保客户端能正确显示对应物品。
