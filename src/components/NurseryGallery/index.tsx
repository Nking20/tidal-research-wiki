import type {ReactNode} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

type GalleryItem = {image: string; name: string};

export const tidalSpecimens: readonly GalleryItem[] = [
  {
    "image": "tidal/common_jellyfish_sample.png",
    "name": "瓶装普通水母"
  },
  {
    "image": "tidal/small_squid_sample.png",
    "name": "瓶装小鱿鱼"
  },
  {
    "image": "tidal/pearl_clam_sample.png",
    "name": "瓶装珍珠贝"
  },
  {
    "image": "tidal/sea_anemone_sample.png",
    "name": "瓶装海葵"
  },
  {
    "image": "tidal/nautilus_sample.png",
    "name": "瓶装鹦鹉螺"
  },
  {
    "image": "tidal/glow_squid_sample.png",
    "name": "瓶装发光鱿鱼"
  },
  {
    "image": "tidal/crystal_cluster_crab_sample.png",
    "name": "瓶装晶簇蟹"
  },
  {
    "image": "tidal/axolotl_sample.png",
    "name": "瓶装美西螈"
  },
  {
    "image": "tidal/turtle_sample.png",
    "name": "瓶装海龟"
  },
  {
    "image": "tidal/frog_sample.png",
    "name": "瓶装青蛙"
  }
];

export const infernalSpecimens: readonly GalleryItem[] = [
  {
    "image": "infernal/strider_sample.png",
    "name": "瓶装炽足兽"
  },
  {
    "image": "infernal/magma_cube_sample.png",
    "name": "瓶装岩浆怪"
  },
  {
    "image": "infernal/frostember_newt_sample.png",
    "name": "瓶装霜烬螈"
  },
  {
    "image": "infernal/crimson_beetle_sample.png",
    "name": "瓶装绯壳甲虫"
  }
];

export const tidalStarter: readonly GalleryItem[] = [
  {
    "image": "tidal/simple_sampling_net.png",
    "name": "简易采样网"
  },
  {
    "image": "tidal/plankton_feed.png",
    "name": "浮游饲料"
  },
  {
    "image": "tidal/harvest_glove.png",
    "name": "收获手套"
  }
];

export const infernalStarter: readonly GalleryItem[] = [
  {
    "image": "infernal/tissue_sampler.png",
    "name": "组织采样器"
  },
  {
    "image": "infernal/active_heater.png",
    "name": "主动加热组件"
  },
  {
    "image": "infernal/active_cooling_module.png",
    "name": "主动冷却组件"
  }
];

export default function NurseryGallery({items, label}: {items: readonly GalleryItem[]; label: string}): ReactNode {
  const imageBase = useBaseUrl('/img/nursery/');
  return (
    <div className={styles.gallery} role="group" aria-label={label}>
      {items.map(({image, name}) => (
        <figure className={styles.card} key={image}>
          <img src={imageBase + image} alt={name} width="64" height="64" loading="lazy" />
          <figcaption>{name}</figcaption>
        </figure>
      ))}
    </div>
  );
}
