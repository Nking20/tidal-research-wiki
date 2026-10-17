---
title: 数据包配方与扩展边界
---

# 数据包配方与扩展边界

本页面向整合包作者，使用 Minecraft 1.21.1 的单数路径 `data/<namespace>/recipe/`

## 固定机器配方

使用 `tidalnursery:machine_processing`，支持 `attunement`、`restoration` 和 `coral_nursery`

```json
{
  "type": "tidalnursery:machine_processing",
  "machine": "attunement",
  "input": {"ingredient": {"item": "tidalnursery:shade_cover"}},
  "material_a": {"ingredient": {"item": "tidalnursery:ink_fragment"}, "count": 4},
  "material_b": {"ingredient": {"tag": "tidalnursery:materials/active_gels"}},
  "result": {"id": "tidalnursery:deep_shade_cover", "count": 1},
  "duration": 240
}
```

| 字段 | 含义 |
| --- | --- |
| `machine` | 调律砧、复原台或珊瑚苗床 |
| `input` | 待升级、复原或转化的物品 |
| `material_a` / `material_b` | 两个材料槽，按对应机器布局使用 |
| `amplifier` | 仅调律砧可选，省略时要求增幅槽为空 |
| `count` | 材料数量，默认 1，普通机器原料允许 1～64 |
| `duration` | 刻数，20 刻约 1 秒，允许 1～72000 |

原料可以使用物品 ID 或标签，输出槽占用、数量不足或多放了不匹配的增幅物会阻止加工，水桶等原料的容器会返还

同 namespace 和路径覆盖现有配方，新路径增加配方，JEI 读取已加载的同一份配方

## 珊瑚苗床示例

```json
{
  "type": "tidalnursery:machine_processing",
  "machine": "coral_nursery",
  "input": {"ingredient": {"item": "minecraft:cobblestone"}},
  "result": {"id": "minecraft:calcite"},
  "duration": 9600
}
```

苗床只用 `input`，不使用其他材料槽和增幅槽，单次原料与产物数量限制为 1～8，批次不能超过 8 个产物及物品堆叠上限

推进间隔为 20 刻，时间建议写 20 的整数倍，环境要求为活珊瑚、浸水和亮度至少 8

## 共用材料标签

- `tidalnursery:materials/active_gels`：默认活性胶质，安装炼狱后可包含高纯熔胶
- `tidalnursery:materials/glowing_ink`：默认荧光墨囊
- `tidalnursery:basic_feed_plants`：基础饲料植物位

在 `data/<namespace>/tags/item/` 中增补对应标签

## 哪些内容不能用这类配方替代

样本成长、特殊事件、装备数据调律、返祖以及基因组合校验由代码处理

新增物种或基因拓展需要代码注册，炼狱复用核心的样本、档案和三组规则，并注册自己的两个温控位点

第三方拓展不要改写其他物种的拓展标识，也不要把未知扩展字段直接删除，移除拓展模组前应保留完整世界备份
