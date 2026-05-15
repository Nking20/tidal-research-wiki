import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  wikiSidebar: [
    'intro',
    {
      type: 'category',
      label: '潮汐委托',
      collapsed: false,
      items: [
        'tidal-commission/overview',
        'tidal-commission/gameplay',
        'tidal-commission/config',
        'tidal-commission/datapack',
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
      label: '整合包魔改',
      collapsed: false,
      items: ['modpack/overview', 'modpack/examples'],
    },
    'changelog',
  ],
};

export default sidebars;
