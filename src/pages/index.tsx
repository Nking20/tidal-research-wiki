import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

const entries = [
  {
    title: '模组总览',
    description: '查看潮汐研究社系列模组目前已经整理的公开资料。',
    to: '/docs/intro',
  },
  {
    title: '潮汐培育',
    description: '十种样本、基因 2.0、培养护理、自动化与生态复原',
    to: '/docs/tidal-nursery/overview',
  },
  {
    title: '炼狱培育',
    description: '四种下界样本、组织采样、熔育槽温控与特殊事件',
    to: '/docs/infernal-nursery/overview',
  },
  {
    title: '潮汐委托',
    description: '委托板、任务来源、任务 JSON、配置和玩家委托规则。',
    to: '/docs/tidal-commission/overview',
  },
  {
    title: '潮汐观测卡',
    description: '观测等级、奖励池、轮转配置和服务器同步说明。',
    to: '/docs/tidal-observation-card/overview',
  },
  {
    title: '辑录与揭秘',
    description: '辑录内容、来源、解锁配置和数据包章节写法。',
    to: '/docs/reveal/overview',
  },
];

function EntryCard({title, description, to}: (typeof entries)[number]) {
  return (
    <Link className={styles.card} to={to}>
      <Heading as="h2">{title}</Heading>
      <p>{description}</p>
    </Link>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout title="首页" description="潮汐研究社 Minecraft 模组 Wiki">
      <main>
        <section className={styles.hero}>
          <div className="container">
            <Heading as="h1">潮汐研究社 Wiki</Heading>
            <p>面向玩家、服务器管理者和整合包作者的 Minecraft 模组文档。</p>
          </div>
        </section>
        <section className={styles.entries}>
          <div className="container">
            <div className={styles.grid}>
              {entries.map((entry) => (
                <EntryCard key={entry.to} {...entry} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
