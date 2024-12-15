import React from 'react';
import Link from 'next/link';

// Sample article data
const articleData = [
  {
    title: "AIによる医療革命",
    description: "人工知能（AI）は、医療分野で劇的な変革を引き起こしています。特に、病気の早期発見、診断の精度向上、個別化医療の提供において、AIが重要な役割を果たしています。AIは医師の支援ツールとしてだけでなく、患者の健康状態を予測するための強力なツールとしても活用されています。AIを使った画像診断や、病歴データから病気の兆候を予測するシステムは、医療業界の未来に大きな影響を与えるでしょう。",
    image: "https://picsum.photos/id/237/536/354",
    id: "a1b9728a40-f522-4758-bde5-a6ed769176d6",
    user_id: "af64c163-5ff8-4889-81a1-62f22d0b4155",
  },
  {
    title: "持続可能なエネルギーの未来",
    description: "地球温暖化への対応として、再生可能エネルギーの利用が急速に進んでいます。太陽光発電、風力発電、そしてバイオエネルギーの活用がその中心にあります。これらのエネルギー源は、従来の化石燃料に頼らない、クリーンで持続可能なエネルギーを提供し、環境への影響を減少させることが期待されています。さらに、次世代のエネルギー技術として、蓄電池やスマートグリッドなど、エネルギーの効率的な利用と管理を可能にする革新が求められています。",
    image: "https://picsum.photos/id/237/536/354",
    id: "b2b9728a40-f522-4758-bde5-a6ed769176d7",
    user_id: "af64c163-5ff8-4889-81a1-62f22d0b4156",
  },
  {
    title: "スマートシティの構築: 未来の都市生活",
    description: "スマートシティは、テクノロジーとデータを駆使して、都市の生活をより効率的で持続可能にする未来の都市構想です。高度なセンサー技術、IoT（モノのインターネット）、人工知能（AI）を活用することで、交通の流れを最適化したり、エネルギー消費を減らしたり、公共サービスを改善することが可能です。これにより、都市の住民はより快適で、環境に優しい生活を享受できるようになるでしょう。",
    image: "https://picsum.photos/id/237/536/354",
    id: "c3b9728a40-f522-4758-bde5-a6ed769176d8",
    user_id: "af64c163-5ff8-4889-81a1-62f22d0b4157",
  },
  {
    title: "5Gが変える世界",
    description: "5G通信技術の登場は、通信業界に革命をもたらすだけでなく、あらゆる産業において新たな可能性を切り開いています。5Gの高速かつ低遅延な通信性能は、遠隔医療、自動運転車、スマートシティ、そして大容量データのリアルタイム処理において重要な役割を果たします。これにより、世界中で新たなビジネスモデルやサービスが生まれ、生活の質が向上することが期待されています。",
    image: "https://picsum.photos/id/237/536/354",
    id: "d4b9728a40-f522-4758-bde5-a6ed769176d9",
    user_id: "af64c163-5ff8-4889-81a1-62f22d0b4158",
  },
  {
    title: "自動運転車の革新",
    description: "自動運転技術は、交通の安全性と効率性を大きく向上させる可能性があります。自動運転車は、運転手のミスや注意力の欠如による事故を減らし、交通渋滞の緩和にも貢献することができます。また、これにより都市部の駐車問題や交通費の削減も期待されています。自動運転技術は、人工知能（AI）、機械学習、センサー技術などの最先端技術を組み合わせることで進化しており、近い将来、私たちの生活に大きな変化をもたらすでしょう。",
    image: "https://picsum.photos/id/237/536/354",
    id: "e5b9728a40-f522-4758-bde5-a6ed769176da",
    user_id: "af64c163-5ff8-4889-81a1-62f22d0b4159",
  },
  {
    title: "フィンテック革命: デジタル銀行とブロックチェーン",
    description: "フィンテック（金融技術）の革新により、伝統的な銀行業務が大きく変化しています。デジタル銀行やブロックチェーン技術の導入により、個人や企業は、より迅速で安全な金融取引を行えるようになり、従来の銀行サービスよりも低コストで利用できるようになります。また、暗号通貨の普及により、グローバルな取引の利便性も向上しており、フィンテックが金融業界における未来を形作っていくでしょう。",
    image: "https://picsum.photos/id/237/536/354",
    id: "f6b9728a40-f522-4758-bde5-a6ed769176db",
    user_id: "af64c163-5ff8-4889-81a1-62f22d0b4160",
  },
  {
    title: "量子コンピュータの未来",
    description: "量子コンピュータは、従来のコンピュータの性能をはるかに超える可能性を秘めています。この技術は、従来では計算に膨大な時間がかかる問題を瞬時に解決できる力を持っています。量子コンピュータは、化学、製薬、材料工学、金融分野などで革命的な進展をもたらすと期待されています。現在、量子コンピュータの研究は進行中で、数年内に商業利用が始まると予測されています。",
    image: "https://picsum.photos/id/237/536/354",
    id: "g7b9728a40-f522-4758-bde5-a6ed769176dc",
    user_id: "af64c163-5ff8-4889-81a1-62f22d0b4161",
  },
  {
    title: "宇宙探索と民間企業の挑戦",
    description: "民間企業が宇宙探索に積極的に参入しており、商業宇宙旅行や火星探査など、従来の政府主導の宇宙事業とは異なるアプローチが展開されています。企業による宇宙技術の開発が進むことで、宇宙へのアクセスが手軽になり、宇宙産業が新たな経済圏を形成する可能性があります。民間企業による挑戦が、宇宙探索の未来を変えていくでしょう。",
    image: "https://picsum.photos/id/237/536/354",
    id: "h8b9728a40-f522-4758-bde5-a6ed769176dd",
    user_id: "af64c163-5ff8-4889-81a1-62f22d0b4162",
  },
  ];

const ArticleList = () => {
  return (
    <div style={styles.listContainer}>
      <h1>記事一覧</h1>
      <div style={styles.list}>
        {articleData.map((article) => (
          <Link key={article.id} href={`press_release/detail/a1b9728a40-f522-4758-bde5-a6ed769176d6`} passHref>
            <div style={styles.articleCard}>
              <h2 style={styles.articleTitle}>{article.title}</h2>
              <p style={styles.articleDescription}>{article.description}</p>
              <p style={styles.articleMeta}><strong>記事ID:</strong> {article.id}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const styles = {
  listContainer: {
    padding: '20px',
    fontFamily: "'Arial', sans-serif",
    lineHeight: '1.6',
    color: '#333',
    maxWidth: '1000px',
    margin: '0 auto',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  articleCard: {
    border: '1px solid #ccc',
    padding: '15px',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
  },
  articleCardHover: {
    transform: 'scale(1.05)',
  },
  articleTitle: {
    fontSize: '22px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  articleDescription: {
    fontSize: '16px',
    marginBottom: '15px',
    textAlign: 'justify',
  },
  imageWrapper: {
    marginBottom: '15px',
  },
  articleImage: {
    width: '100%',
    height: 'auto',
    borderRadius: '5px',
  },
  articleMeta: {
    fontSize: '14px',
    color: '#777',
  },
};

export default ArticleList;
