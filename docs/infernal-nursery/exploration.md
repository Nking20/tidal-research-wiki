---
title: 灰烬遗迹与猪灵交易
---

# 灰烬遗迹与猪灵交易

## 灰烬遗迹

灰烬遗迹是玄武岩三角洲与下界荒地中的小型建筑，使用火山角砾岩、灰烬菌木等材料，具有不同建筑布局

遗迹补给箱使用专门战利品表，可以取得灰烬木板、菌饼、菌食饲料、灰烬菌、木炭、铁粒和灰烬菌岩

具备命令权限时，在下界执行

```mcfunction
/locate structure infernalnursery:ashen_ruin
```

结构集默认候选网格间距为 22 区块、分离参数为 8，生成仍受合法地形与空间检查限制

## 猪灵以物易物

按原版方式使用金锭与成年猪灵交易，可在原版回报之外取得少量炼狱材料

| 额外回报 | 数量 | 默认单次概率 |
| --- | ---: | ---: |
| 灰烬菌 | 1 | 2% |
| 灰烬菌岩 | 1 | 1% |
| 菌饼 | 1～2 | 2% |
| 粉碎下界岩 | 2～4 | 1% |

其余 94% 的额外抽取为空，原版以物易物结果照常结算

菌岩与灰烬菌可以带回栽培，操作见[菌丛、灰烬菌与巨型菌](./fungi.md)

## 管理员与整合包作者

- 结构入口：`data/infernalnursery/worldgen/structure/ashen_ruin.json`
- 分布：`data/infernalnursery/worldgen/structure_set/ashen_ruins.json`
- 遗迹战利品：`data/infernalnursery/loot_table/chests/ashen_ruin.json`
- 猪灵额外回报：`data/infernalnursery/loot_table/gameplay/piglin_bartering_bonus.json`

可通过数据包覆盖对应内容，修改生成分布后前往尚未生成的区域查看自然分布
