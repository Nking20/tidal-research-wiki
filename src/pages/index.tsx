import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

const entries = [
  {
    title: '模组总览',
    description: '查看潮汐研究社系列模组目前已经整理的公开文档。',
    to: '/docs/intro',
  },
  {
    title: '潮汐委托',
    description: '委托板、任务卡、调度令、担保凭证和玩家自定义委托。',
    to: '/docs/tidal-commission/overview',
  },
  {
    title: '配置与数据包',
    description: '查看潮汐委托的配置文件、来源权重和任务 JSON 写法。',
    to: '/docs/tidal-commission/config',
  },
  {
    title: '整合包魔改',
    description: '整理服务器和整合包作者使用的数据包、KubeJS 与样例。',
    to: '/docs/modpack/overview',
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
            <p>面向玩家、服务器管理员和整合包作者的 Minecraft 模组文档。</p>
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
