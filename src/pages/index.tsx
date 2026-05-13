import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

const entries = [
  {
    title: '模组入口',
    description: '查看潮汐研究社系列模组文档，目前已整理潮汐委托。',
    to: '/docs/intro',
  },
  {
    title: '安装教程',
    description: '查看 Minecraft、NeoForge、可选依赖与服务端安装说明。',
    to: '/docs/install',
  },
  {
    title: '数据包教程',
    description: '学习如何通过数据包或 KubeJS 添加、替换和调试委托任务。',
    to: '/docs/datapack/rules',
  },
  {
    title: '常见问题',
    description: '整理玩家、服主和整合包作者最容易遇到的问题。',
    to: '/docs/faq',
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
            <p>面向玩家、服主和整合包作者的 Minecraft 模组文档。</p>
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
