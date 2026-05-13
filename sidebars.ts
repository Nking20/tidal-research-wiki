import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  wikiSidebar: [
    'intro',
    'install',
    {
      type: 'category',
      label: '潮汐观测卡',
      collapsed: false,
      items: [
        'tidal-observation-card/overview',
        'tidal-observation-card/config',
      ],
    },
    {
      type: 'category',
      label: '潮汐委托',
      collapsed: false,
      items: [
        'tidal-commission/overview',
        'tidal-commission/task-json',
      ],
    },
    {
      type: 'category',
      label: '潮汐市场',
      collapsed: false,
      items: [
        'tidal-market/overview',
        'tidal-market/shipping-box',
        'tidal-market/dynamic-pricing',
      ],
    },
    {
      type: 'category',
      label: '数据包与魔改',
      collapsed: false,
      items: ['datapack/rules'],
    },
    'faq',
    'changelog',
  ],
};

export default sidebars;
