import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: '潮汐研究社 Wiki',
  tagline: 'Minecraft 模组资料与整合包魔改文档',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://nking20.github.io',
  baseUrl: '/tidal-research-wiki/',
  organizationName: 'Nking20',
  projectName: 'tidal-research-wiki',

  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: 'docs',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: '潮汐研究社 Wiki',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'wikiSidebar',
          position: 'left',
          label: '文档',
        },
        {
          to: '/docs/tidal-nursery/overview',
          label: '潮汐培育',
          position: 'left',
        },
        {
          to: '/docs/tidal-commission/overview',
          label: '潮汐委托',
          position: 'left',
        },
        {
          to: '/docs/reveal/overview',
          label: '辑录与揭秘',
          position: 'left',
        },
        {
          href: 'https://github.com/Nking20/tidal-research-wiki',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '文档',
          items: [
            {label: '总览', to: '/docs/intro'},
            {label: '潮汐培育', to: '/docs/tidal-nursery/overview'},
            {label: '潮汐委托', to: '/docs/tidal-commission/overview'},
            {label: '辑录与揭秘', to: '/docs/reveal/overview'},
          ],
        },
        {
          title: '模组',
          items: [
            {label: '潮汐培育', to: '/docs/tidal-nursery/overview'},
            {label: '潮汐委托', to: '/docs/tidal-commission/overview'},
            {label: '潮汐观测卡', to: '/docs/tidal-observation-card/overview'},
            {label: '辑录与揭秘', to: '/docs/reveal/overview'},
            {label: '潮汐市场', to: '/docs/tidal-market/overview'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} 潮汐研究社 Wiki.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['json', 'bash'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
