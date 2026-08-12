import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  wikiSidebar: [
    'intro',
    {
      type: 'category',
      label: '潮汐培育',
      collapsed: false,
      items: [
        'tidal-nursery/overview',
        'tidal-nursery/sampling',
        'tidal-nursery/culture-dish',
        'tidal-nursery/specimens',
        'tidal-nursery/tools',
        'tidal-nursery/genetics',
        'tidal-nursery/automation',
        'tidal-nursery/progression',
        'tidal-nursery/river-god',
        'tidal-nursery/compatibility',
      ],
    },
    {
      type: 'category',
      label: '潮汐委托',
      collapsed: false,
      items: [
        'tidal-commission/overview',
        'tidal-commission/status',
        'tidal-commission/gameplay',
        'tidal-commission/config',
        'tidal-commission/datapack',
        'tidal-commission/stages',
        'tidal-commission/player-commission',
        'tidal-commission/examples',
      ],
    },
    {
      type: 'category',
      label: '潮汐观测卡',
      collapsed: false,
      items: [
        'tidal-observation-card/overview',
        'tidal-observation-card/gameplay',
        'tidal-observation-card/config',
        'tidal-observation-card/datapack',
        'tidal-observation-card/examples',
        'tidal-observation-card/notes',
      ],
    },
    {
      type: 'category',
      label: '辑录与揭秘',
      collapsed: false,
      items: [
        'reveal/overview',
        'reveal/gameplay',
        'reveal/config',
        'reveal/datapack',
        'reveal/commands',
      ],
    },
    {
      type: 'category',
      label: '潮汐市场',
      collapsed: false,
      items: ['tidal-market/overview'],
    },
    {
      type: 'category',
      label: '数据包与魔改',
      collapsed: false,
      items: ['modpack/overview', 'modpack/examples'],
    },
    'changelog',
  ],
};

export default sidebars;
