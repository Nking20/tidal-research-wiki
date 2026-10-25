---
title: 海底遗失设施
---

# 海底遗失设施

合适海洋的水下地形中会生成三类小型遗失设施，探索补给箱可取得基础材料和少量培育耗材

| 设施 | 结构 ID | 资源倾向 |
| --- | --- | --- |
| 破损采样站 | `tidalnursery:broken_sampling_station` | 采样工具、普通采样材料与基础前体 |
| 废弃培育点 | `tidalnursery:abandoned_cultivation_site` | 生物碳基、护理材料与基因耗材 |
| 沉没的物资存放点 | `tidalnursery:sunken_supply_cache` | 普通补给，偶尔包含较高价值的模组材料 |

前体需要放入[培育皿](./culture-dish.md)继续显形和培养，基因载体与档案的使用见[基因系统](./genetics.md)

## 寻找方式

在新探索的海洋海床寻找低矮石质遗迹、海晶石构件、补给箱和被砂砾、水草覆盖的建筑部分

海葡萄和海莴苣也分布在合适海洋中，种植与采收见[海洋园艺](./gardening.md)

## 定位命令

有权限时，在主世界执行对应命令

```mcfunction
/locate structure tidalnursery:broken_sampling_station
/locate structure tidalnursery:abandoned_cultivation_site
/locate structure tidalnursery:sunken_supply_cache
```

按照返回坐标前往，并留意海床高度，结构通常位于水面下方

## 服务器配置

`config/tidalnursery-common.toml` 的 `lostFacilities` 分组可配置总开关、各设施开关、生成概率和地形限制

默认候选网格间距为 24 区块、分离参数为 12，候选还需要通过生成概率和水下地形检查，因此并非每个候选位置都有设施

结构分布和战利品可通过数据包覆盖，相关路径见[数据包扩展](./datapack.md)
