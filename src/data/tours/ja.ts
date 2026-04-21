export const TOURS = [
  /* =====================================================
     1 DAY TOURS (日帰りツアー)
  ===================================================== */
  {
    id: "galle-one-day-tour",
    title: "ガレ日帰りツアー",
    image: "/tours/galle-one-day-tour.jpg",
    price: 80,
    duration: 1,
    maxPeople: 20,
    minAge: 16,
    tourType: "プライベート日帰りツアー",

    overview:
      "スリランカを訪れ、Sri Lanka Tours Driverとガレ日帰りツアーをご予約ください。個人ドライバーと専用車を利用して、世界遺産のガレ旧市街と美しい南海岸への快適で思い出深い旅をお楽しみいただけます。",

    vehicleInfo: [
      "1 - 3名様 ← プライベートカー",
      "4 - 10名様 ← KDHバン",
      "11 - 20名様 ← ミニバス",
    ],

    included: [
      "エアコン付きプライベート車両",
      "英語を話すプロのドライバー",
      "ドライバーの宿泊と食事",
      "ホテル送迎サービス",
      "燃料と駐車料金",
    ],

    excluded: [
      "お客様の宿泊と食事",
      "入場料とアクティビティ料金",
      "個人的な飲食費",
    ],

    itinerary: [
      {
        days: [1],
        title: "1日目 – コロンボ / ネゴンボからガレへ",
        image: "/tours/galle.jpg",
        description:
          "美しい南海岸の道路をドライブしながら、人気の観光スポットに立ち寄ります。",
        activities: [
          "ベントタビーチでの休憩",
          "マドゥ川ボートサファリ（オプション）",
          "ウミガメ孵化場訪問",
          "ガレ・ダッチ・フォート（オランダ要塞）",
          "ガレ灯台",
          "ショッピング＆カフェタイム",
        ],
        overnight: "コロンボ / ネゴンボへ帰着",
      },
    ],
  },
  {
    id: "kandy-one-day-tour",
    title: "キャンディ日帰りツアー",
    image: "/tours/kandy-one-day-tour.jpg",
    price: 130,
    duration: 1,
    maxPeople: 20,
    minAge: 16,
    tourType: "プライベート日帰りツアー",

    overview:
      "スリランカの文化首都キャンディを訪れる日帰りツアーです。Sri Lanka Tours Driverと共に、快適な専用車で聖地キャンディへの文化的な旅をお楽しみください。",

    vehicleInfo: [
      "1 - 3名様 ← プライベートカー",
      "4 - 10名様 ← KDHバン",
      "11 - 20名様 ← ミニバス",
    ],

    included: [
      "エアコン付きプライベート車両",
      "英語を話すプロのドライバー",
      "ドライバーの宿泊と食事",
      "ホテル送迎サービス",
      "燃料と駐車料金",
    ],

    excluded: [
      "お客様の宿泊と食事",
      "入場料とアクティビティ料金",
      "個人的な飲食費",
    ],

    itinerary: [
      {
        days: [1],
        title: "1日目 – コロンボ / ネゴンボからキャンディへ",
        image: "/tours/kandy.jpg",
        description:
          "キャンディへの美しいドライブを楽しみながら、スリランカの文化と自然を体験します。",
        activities: [
          "ピンナワラ象の孤児院（オプション）",
          "マワネッラのスパイスガーデン訪問",
          "紅茶工場見学と紅茶試飲",
          "キャンディ湖散策",
          "仏歯寺（ダラダー・マーリガーワ寺院）",
          "キャンディ文化舞踊ショー（オプション）",
        ],
        overnight: "コロンボ / ネゴンボへ帰着",
      },
    ],
  },
  {
    id: "sigiriya-one-day-tour",
    title: "シーギリヤ日帰りツアー",
    image: "/tours/sigiriya-one-day-tour.jpg",
    price: 130,
    duration: 1,
    maxPeople: 20,
    minAge: 16,
    tourType: "プライベート日帰りツアー",

    overview:
      "世界遺産シーギリヤ・ロックを訪れる日帰りツアーです。専用車で快適に移動し、古代の岩山要塞と歴史的な寺院を一日で効率よく巡ります。",

    vehicleInfo: [
      "1 - 3名様 ← プライベートカー",
      "4 - 10名様 ← KDHバン",
      "11 - 20名様 ← ミニバス",
    ],

    included: [
      "エアコン付きプライベート車両",
      "英語を話すプロのドライバー",
      "ドライバーの宿泊と食事",
      "ホテル送迎サービス",
      "燃料と駐車料金",
    ],

    excluded: [
      "お客様の宿泊と食事",
      "入場料とアクティビティ料金",
      "個人的な飲食費",
    ],

    itinerary: [
      {
        days: [1],
        title: "1日目 – コロンボ / ネゴンボからシーギリヤへ",
        image: "/tours/sigiriya.jpg",
        description:
          "文化三角地帯の中心へと向かい、スリランカを代表する史跡を探索します。",
        activities: [
          "ピンナワラ象の孤児院（オプション）",
          "ダンブッラ黄金石窟寺院",
          "シーギリヤ・ロック要塞登頂",
          "村のツアーと伝統的なランチ（オプション）",
          "ピドゥランガラ・ロックでの夕日（オプション）",
        ],
        overnight: "コロンボ / ネゴンボへ帰着",
      },
    ],
  },
  {
    id: "Udawalawa-Safari-one-day-tour",
    title: "ウダワラウェ日帰りツアー",
    image: "/tours/udawalawa-safari-one-day-tour.jpg",
    price: 130,
    duration: 1,
    maxPeople: 20,
    minAge: 16,
    tourType: "プライベート日帰りツアー",

    overview:
      "野生の象に出会えるウダワラウェ国立公園へのサファリツアーです。スリランカ屈指の野生動物保護区を、ジープサファリで体験してください。",

    vehicleInfo: [
      "1 - 3名様 ← プライベートカー",
      "4 - 10名様 ← KDHバン",
      "11 - 20名様 ← ミニバス",
    ],

    included: [
      "エアコン付きプライベート車両",
      "英語を話すプロのドライバー",
      "ドライバーの宿泊と食事",
      "ホテル送迎サービス",
      "燃料と駐車料金",
    ],

    excluded: [
      "お客様の宿泊と食事",
      "入場料とアクティビティ料金",
      "個人的な飲食費",
    ],

    itinerary: [
      {
        days: [1],
        title: "1日目 – コロンボ / ネゴンボからウダワラウェへ",
        image: "/tours/udawalawa-safari-one-day-tour.jpg",
        description:
          "南部の自然を満喫し、野生動物の観察に特化した一日を過ごします。",
        activities: [
          "ウダワラウェ象のトランジットホーム（授乳見学）",
          "ウダワラウェ国立公園ジープサファリ",
          "宝石の街ラトゥナプラ通過",
        ],
        overnight: "コロンボ / ネゴンボへ帰着",
      },
    ],
  },

  /* =====================================================
     05 DAYS TOURS (5日間ツアー)
  ===================================================== */
  {
    id: "05-days-down-south",
    region: "south",
    hotelsIncluded: false,
    title: "南部5日間ツアー",
    duration: 5,
    maxPeople: 10,
    minAge: 16,
    price: 283.5,
    image: "/tours/05-days-down-south-tour.jpg",

    overview:
      "この5日間の南部ツアーは、ハバラナ、ポロンナルワ、キャンディ、ヌワラエリヤ、エッラ、ミリッサまたはヒッカドゥワをカバーします。文化、野生生物サファリ、絶景の列車旅、美しい南海岸のビーチを体験してください。",

    vehicleInfo: {
      car: "1 - 3名様 ← プライベートカー",
      van: "4 - 10名様 ← KDHバン",
      minimum: "最低2名様のご予約が必要です",
      vipNote: "2名様合計 567ドル – VIP専用高級車（ドライバーガイド付）",
    },

    bookingOptions: [
      "ウェブサイトの予約フォーム",
      "メール：info@srilankatoursdriver.com",
      "WhatsApp：(+94) 769 300 334",
    ],

    included: [
      "エアコン付きプライベート車両",
      "英語を話すプロのドライバー",
      "ドライバーの宿泊と食事",
      "燃料と高速道路料金",
      "駐車料金",
      "24時間緊急サポート",
      "ローカルSIMカード（無料データ通信）",
      "無料のミネラルウォーター",
    ],

    excluded: [
      "お客様の宿泊（ホテル）と食事",
      "入場料とアクティビティ料金",
      "列車チケット",
    ],

    itinerary: [
      {
        days: [1],
        title: "1日目 – 空港 / コロンボからハバラナへ",
        image: "/tours/habarana.jpg",
        activities: [
          "空港またはホテルでのお迎え",
          "ヒリワドゥンナ村ツアーと伝統的な料理教室・ランチ",
          "エコパークサファリ または ピドゥランガラ・ロックでの夕日",
        ],
        overnight: "ハバラナ泊",
      },
      {
        days: [2],
        title: "2日目 – ハバラナからキャンディへ",
        image: "/tours/sigiriya.jpg",
        activities: [
          "シーギリヤ・ロック要塞登頂",
          "ポロンナルワ古代王国の探索",
          "ダンブッラ石窟寺院",
          "マータレーのヒンドゥー寺院",
          "キャンディ湖散策",
          "キャンディ文化舞踊ショー",
          "仏歯寺",
        ],
        overnight: "キャンディ泊",
      },
      {
        days: [3],
        title: "3日目 – キャンディからエッラへ",
        image: "/tours/ella.jpg",
        activities: [
          "紅茶工場と茶園の見学",
          "ランボーダ滝",
          "ヌワラエリヤ市内観光",
          "ナヌオヤからエッラへの列車旅（ブルートレイン）",
          "リトル・アダムズ・ピーク",
        ],
        overnight: "エッラ泊",
      },
      {
        days: [4],
        title: "4日目 – エッラからミリッサ / ヒッカドゥワへ",
        image: "/tours/yala.jpg",
        activities: [
          "ナインアーチブリッジ",
          "ラーワナ滝",
          "象のトランジットホーム（孤児院）訪問",
          "ウダワラウェ国立公園ジープサファリ",
        ],
        overnight: "ミリッサ または ヒッカドゥワ泊",
      },
      {
        days: [5],
        title: "5日目 – ビーチからコロンボ / 空港へ",
        image: "/tours/colombo.jpg",
        activities: [
          "ホエールウォッチング（季節限定）",
          "ガレ・ダッチ・フォート（オランダ要塞）",
          "ウミガメ保護センター",
          "マドゥ川リバーサファリ",
          "コロンボ市内観光",
        ],
        drop: "コロンボの空港またはご指定のホテルへ送迎",
      },
    ],
  },
  {
    id: "05-days-down-south-hotels",
    region: "south",
    hotelsIncluded: true,
    title: "南部5日間ツアー（ホテル付き）",
    duration: 5,
    maxPeople: 2,
    minAge: 16,
    price: 382.5,
    image: "/tours/05-days-down-south-tour-with-hotels.jpg",

    overview:
      "厳選されたホテルの朝食付き宿泊が含まれる南部5日間ツアーです。ハバラナ、キャンディ、ヌワラエリヤ、エッラ、そして南海岸の美しいビーチを巡る、快適でストレスフリーなパッケージです。",

    vehicleInfo: {
      car: "1 - 3名様 ← プライベートカー",
      van: "4 - 10名様 ← KDHバン",
      minimum: "最低2名様のご予約が必要です",
      vipNote:
        "2名様合計 765ドル – VIP専用高級車および3～4つ星ホテル（朝食付）",
    },

    bookingOptions: [
      "ウェブサイトの予約フォーム",
      "メール：info@srilankatoursdriver.com",
      "WhatsApp：(+94) 769 300 334",
    ],

    included: [
      "エアコン付きプライベート車両",
      "英語を話すプロのドライバー",
      "朝食付きのホテル宿泊",
      "ドライバーの宿泊と食事",
      "健康・安全基準の遵守",
      "燃料と高速道路料金",
      "24時間緊急サポート",
      "ローカルSIMカード（無料データ通信）",
      "無料のミネラルウォーター",
      "駐車料金",
    ],

    excluded: [
      "入場料とアクティビティ料金",
      "列車チケット",
      "昼食と夕食",
      "個人的な出費",
    ],

    itinerary: [
      {
        days: [1],
        title: "1日目 – 空港 / コロンボからハバラナへ",
        image: "/tours/habarana.jpg",
        description: "空港でのお迎え後、文化三角地帯の中心へと向かいます。",
        activities: [
          "ヒリワドゥンナ村ツアー（料理教室と伝統的ランチ付）",
          "エコパークサファリ または ピドゥランガラ・ロックの夕日",
        ],
        overnight: "Go Go Green - ハバラナ泊（プール付）",
      },
      {
        days: [2],
        title: "2日目 – ハバラナからキャンディへ",
        image: "/tours/sigiriya.jpg",
        description: "世界遺産のシーギリヤ・ロックとキャンディの文化に触れる一日。",
        activities: [
          "シーギリヤ・ロック要塞登頂",
          "ポロンナルワ古代王国の探索",
          "ダンブッラ石窟寺院",
          "ダンブッラ野菜市場",
          "マータレーのヒンドゥー寺院",
          "キャンディ湖散策",
          "キャンディ文化舞踊ショー",
          "仏歯寺",
        ],
        overnight: "Jack Tree Lodge - キャンディ泊",
      },
      {
        days: [3],
        title: "3日目 – キャンディからエッラへ",
        image: "/tours/ella.jpg",
        description: "絶景の山岳列車の旅と、緑豊かな茶畑の風景。",
        activities: [
          "グレンロック紅茶工場訪問",
          "ランボーダ滝",
          "ヌワラエリヤ市内観光",
          "ナヌオヤからエッラへの列車旅（ブルートレイン）",
          "リトル・アダムズ・ピーク",
        ],
        overnight: "Sunray Homestay - エッラ泊",
      },
      {
        days: [4],
        title: "4日目 – エッラからミリッサ / ヒッカドゥワへ",
        image: "/tours/mirissa.jpg",
        description: "象徴的な橋や滝を巡り、野生動物の宝庫ウダワラウェを経由して南海岸へ。",
        activities: [
          "ナインアーチブリッジ",
          "エッラロック展望 または ラーワナ洞窟＆ブドゥルワガラ",
          "ラーワナ滝",
          "象のトランジットホーム訪問",
          "ウダワラウェ国立公園サファリ",
        ],
        overnight: "N34 - ミリッサ または Finlanka Hotel - ヒッカドゥワ泊（プール付）",
      },
      {
        days: [5],
        title: "5日目 – コロンボ / 空港へ出発",
        image: "/tours/colombo.jpg",
        options: [
          {
            title: "オプション01 – ミリッサ発",
            activities: [
              "ホエールウォッチング（季節限定）",
              "ココナッツ・ツリー・ヒル",
              "ウミガメ保護センター",
              "コロンボ市内観光",
            ],
          },
          {
            title: "オプション02 – ヒッカドゥワ発",
            activities: [
              "ガレ・ダッチ・フォート",
              "日本山妙法寺平和パゴダ",
              "ヒッカドゥワビーチ",
              "マドゥ川リバーサファリ",
              "コロンボ市内観光",
            ],
          },
        ],
        drop: "国際空港 または コロンボの指定場所へ送迎",
      },
    ],
  },
  {
    id: "05-days-east-coast",
    region: "east",
    hotelsIncluded: false,
    title: "東海岸5日間ツアー",
    duration: 5,
    maxPeople: 10,
    minAge: 16,
    price: 340.0,
    image: "/tours/05-days-east-coast-tour.jpg",

    overview:
      "キャンディ、ハバラナ、ポロンナルワ、パシクダ、トリンコマリー、ネゴンボを巡る5日間の東海岸ツアー。豊かな文化遺産と古代都市、そして東海岸の手つかずのビーチをお楽しみください。",

    vehicleInfo: {
      car: "1 - 3名様 ← プライベートカー",
      van: "4 - 10名様 ← KDHバン",
      minimum: "最低2名様のご予約が必要です",
      vipNote: "2名様合計 680ドル – VIP専用高級車（ドライバーガイド付）",
    },

    bookingOptions: [
      "ウェブサイトの予約フォーム",
      "メール：info@srilankatoursdriver.com",
      "WhatsApp：(+94) 769 300 334",
    ],

    included: [
      "エアコン付きプライベート車両",
      "英語を話すプロのドライバー",
      "ドライバーの宿泊と食事",
      "健康・安全基準の遵守",
      "燃料と高速道路料金",
      "駐車料金",
      "24時間緊急サポート",
      "ローカルSIMカード（無料データ通信）",
      "無料のミネラルウォーター",
    ],

    excluded: [
      "お客様の宿泊（ホテル）と食事",
      "入場料とアクティビティ料金",
      "個人的な出費",
    ],

    itinerary: [
      {
        days: [1],
        title: "1日目 – コロンボ / ネゴンボからキャンディへ",
        image: "/tours/kandy.jpg",
        description: "空港やホテルから出発し、山間部にある文化の都へ。",
        activities: [
          "空港またはホテルでのお迎え",
          "ピンナワラ象の孤児院",
          "キャンディ湖散策",
          "伝統的な文化舞踊ショー",
          "仏歯寺",
        ],
        overnight: "キャンディ泊",
      },
      {
        days: [2],
        title: "2日目 – キャンディからハバラナへ",
        image: "/tours/habarana.jpg",
        description: "スリランカの文化三角地帯の中心へと入っていきます。",
        activities: [
          "マータレーのヒンドゥー寺院",
          "ダンブッラ黄金石窟寺院",
          "ダンブッラ野菜市場",
          "料理教室と伝統的ランチ付の村ツアー",
          "エコパークサファリ または ピドゥランガラ・ロックの夕日",
        ],
        overnight: "ハバラナ泊",
      },
      {
        days: [3],
        title: "3日目 – ハバラナからパシクダへ",
        image: "/tours/pasikuda.jpg",
        description: "世界遺産を巡り、東海岸の美しいビーチへ到着。",
        activities: [
          "シーギリヤ・ロック要塞登頂",
          "ポロンナルワ古代王国の探索",
          "パシクダビーチ（カルクダー）でリラックス",
        ],
        overnight: "パシクダ泊",
      },
      {
        days: [4],
        title: "4日目 – パシクダからトリンコマリーへ",
        image: "/tours/trincomalee.jpg",
        description: "東海岸の美しい自然港と歴史ある寺院の探索。",
        activities: [
          "マーブルビーチ",
          "コネーシュワラム寺院訪問",
          "フレデリック砦",
          "ピジョン島国立公園",
          "ニラヴェリビーチ",
        ],
        overnight: "トリンコマリー泊",
      },
      {
        days: [5],
        title: "5日目 – トリンコマリーからネゴンボ / コロンボへ",
        image: "/tours/negombo.jpg",
        description: "西海岸へ戻り、旅の締めくくり。",
        activities: [
          "ネゴンボラグーンツアー または コロンボ市内観光",
        ],
        drop: "バンダラナイケ国際空港 または ご指定のホテルへ送迎",
      },
    ],
  },
  {
    id: "05-days-east-coast-hotels",
    region: "east",
    hotelsIncluded: true,
    title: "東海岸5日間ツアー（ホテル付き）",
    duration: 5,
    maxPeople: 2,
    minAge: 16,
    price: 400.0,
    image: "/tours/05-days-east-coast-tour-with-hotels.jpg",

    overview:
      "厳選されたホテルの朝食付き宿泊が含まれる東海岸5日間ツアー。キャンディ、ハバラナ、ポロンナルワ、パシクダ、トリンコマリーを巡る、文化とビーチリゾートを満喫できる快適なパッケージです。",

    vehicleInfo: {
      car: "1 - 3名様 ← 高級車",
      van: "4 - 10名様 ← KDHバン",
      minimum: "最低2名様のご予約が必要です",
      vipNote:
        "2名様合計 800ドル – VIP専用高級車および3～4つ星ホテル（朝食付）",
    },

    bookingOptions: [
      "ウェブサイトの予約フォーム",
      "メール：info@srilankatoursdriver.com",
      "WhatsApp：(+94) 769 300 334",
    ],

    included: [
      "エアコン付きプライベート車両",
      "英語を話すプロのドライバー",
      "朝食付きのホテル宿泊",
      "ドライバーの宿泊と食事",
      "健康・安全基準の遵守",
      "燃料と高速道路料金",
      "24時間緊急サポート",
      "ローカルSIMカード（無料データ通信）",
      "無料のミネラルウォーター",
      "駐車料金",
    ],

    excluded: [
      "入場料とアクティビティ料金",
      "昼食と夕食",
      "個人的な出費",
      "チップ",
    ],

    itinerary: [
      {
        days: [1],
        title: "1日目 – コロンボ / ネゴンボからキャンディへ",
        image: "/tours/kandy.jpg",
        description: "空港やホテルから出発し、スリランカの文化の都へ。",
        activities: [
          "空港またはホテルでのお迎え",
          "ピンナワラ象の孤児院",
          "キャンディ湖散策",
          "伝統的な文化舞踊ショー",
          "仏歯寺",
        ],
        overnight: "Jack Tree Lodge - キャンディ泊",
      },
      {
        days: [2],
        title: "2日目 – キャンディからハバラナへ",
        image: "/tours/habarana.jpg",
        description: "スリランカの文化三角地帯と伝統的な生活を体験。",
        activities: [
          "マータレーのヒンドゥー寺院",
          "ダンブッラ黄金石窟寺院",
          "ダンブッラ野菜市場",
          "料理教室と伝統的ランチ付の村ツアー",
          "エコパークサファリ または ピドゥランガラ・ロックの夕日",
        ],
        overnight: "Go Go Green - ハバラナ泊（プール付）",
      },
      {
        days: [3],
        title: "3日目 – ハバラナからパシクダへ",
        image: "/tours/pasikuda.jpg",
        description: "歴史的建造物と東海岸のリラックスできるビーチ。",
        activities: [
          "シーギリヤ・ロック要塞登頂",
          "ポロンナルワ古代王国の探索",
          "パシクダビーチ（カルクダー）でリラックス",
        ],
        overnight: "パシクダの厳選ホテル泊",
      },
      {
        days: [4],
        title: "4日目 – パシクダからトリンコマリーへ",
        image: "/tours/trincomalee.jpg",
        description: "海洋の宝庫と歴史的な寺院があるトリンコマリーの発見。",
        activities: [
          "マーブルビーチ",
          "コネーシュワラム寺院訪問",
          "フレデリック砦",
          "ピジョン島国立公園",
          "ニラヴェリビーチ",
        ],
        overnight: "トリンコマリーの厳選ホテル泊",
      },
      {
        days: [5],
        title: "5日目 – トリンコマリーからネゴンボ / コロンボへ出発",
        image: "/tours/negombo.jpg",
        description: "西海岸へ戻り、旅の締めくくり。",
        activities: [
          "ネゴンボラグーンツアー または コロンボ市内観光",
        ],
        drop: "バンダラナイケ国際空港 または ご指定のホテルへ送迎",
      },
    ],
  },

  /* =====================================================
     08 DAYS TOURS (8日間ツアー)
  ===================================================== */
  {
    id: "08-days-down-south",
    region: "south",
    hotelsIncluded: false,
    title: "南部8日間ツアー",
    duration: 8,
    maxPeople: 10,
    minAge: 16,
    price: 335.0,
    image: "/tours/08-days-down-south-tour.jpg",

    overview:
      "ネゴンボ、ハバラナ、ポロンナルワ、キャンディ、ヌワラエリヤ、エッラ、ヤーラ、ミリッサ、ヒッカドゥワ、コロンボを巡る8日間の素晴らしいツアーパッケージ。文化遺産、山の風景、サファリ、ビーチを完璧に組み合わせた自由度の高いプランです。",

    vehicleInfo: {
      car: "1 - 3名様 ← プライベートカー",
      van: "4 - 10名様 ← KDHバン",
      minimum: "最低2名様のご予約が必要です",
      vipNote: "2名様合計 670ドル – VIP専用高級車（ドライバーガイド付）",
    },

    bookingOptions: [
      "ウェブサイトの予約フォーム",
      "メール：info@srilankatoursdriver.com",
      "WhatsApp：(+94) 769 300 334",
    ],

    included: [
      "エアコン付きプライベート車両",
      "英語を話すプロのドライバー",
      "ドライバーの宿泊と食事",
      "健康・安全基準の遵守",
      "燃料と高速道路料金",
      "駐車料金",
      "24時間緊急サポート",
      "ローカルSIMカード（無料データ通信）",
      "無料のミネラルウォーター",
    ],

    excluded: [
      "お客様の宿泊（ホテル）と食事",
      "入場料とアクティビティ料金",
      "列車チケット",
      "個人的な出費",
    ],

    itinerary: [
      {
        days: [1],
        title: "1日目 – ネゴンボ到着",
        image: "/tours/negombo.jpg",
        description: "空港やコロンボのホテルでお迎えし、運河の街ネゴンボを探索。",
        activities: [
          "ネゴンボ魚市場",
          "ダッチ・フォート（オランダ要塞）",
          "ネゴンボラグーンボートツアー",
        ],
        overnight: "ネゴンボ泊",
      },
      {
        days: [2],
        title: "2日目 – ハバラナへ移動",
        image: "/tours/habarana.jpg",
        activities: [
          "ピンナワラ象の孤児院（オプション）",
          "伝統的なランチ付の村ツアー",
          "エコパークサファリ または ピドゥランガラ・ロックの夕日",
        ],
        overnight: "ハバラナ泊",
      },
      {
        days: [3],
        title: "3日目 – 文化三角地帯の中心：キャンディへ",
        image: "/tours/kandy.jpg",
        activities: [
          "シーギリヤ・ロック要塞登頂",
          "ポロンナルワ古代王国の探索",
          "ダンブッラ石窟寺院",
          "仏歯寺",
          "文化舞踊ショー",
        ],
        overnight: "キャンディ泊",
      },
      {
        days: [4],
        title: "4日目 – キャンディからエッラへ",
        image: "/tours/ella.jpg",
        activities: [
          "紅茶工場と茶園の見学",
          "ランボーダ滝",
          "エッラへの絶景列車旅",
          "リトル・アダムズ・ピーク",
        ],
        overnight: "エッラ泊",
      },
      {
        days: [5],
        title: "5日目 – ルートの選択（ヤーラ または ミリッサ）",
        image: "/tours/yala.jpg",
        options: [
          {
            title: "オプション01 – エッラからヤーラへ",
            activities: [
              "ナインアーチブリッジ",
              "ラーワナ滝",
              "ブドゥルワガラ岩窟寺院",
            ],
            overnight: "ヤーラ泊",
          },
          {
            title: "オプション02 – エッラからミリッサへ",
            activities: [
              "ナインアーチブリッジ",
              "ウダワラウェ国立公園サファリ",
            ],
            overnight: "ミリッサ泊",
          },
        ],
        note: "翌日のアクティビティは本日の選択によって異なります。",
      },
      {
        days: [6],
        title: "6日目 – 選択したルートの続き",
        image: "/tours/mirissa.jpg",
        options: [
          {
            title: "オプション01 – ヤーラからミリッサへ",
            activities: [
              "ヤーラ国立公園での早朝サファリ",
              "ゴヤンボッカビーチでのリラックス",
            ],
            overnight: "ミリッサ泊",
          },
          {
            title: "オプション02 – ミリッサからヒッカドゥワへ",
            activities: [
              "ホエールウォッチング（季節限定）",
              "ガレ・ダッチ・フォートの探索",
            ],
            overnight: "ヒッカドゥワ泊",
          },
        ],
      },
      {
        days: [7],
        title: "7日目 – ヒッカドゥワでリラックス",
        image: "/tours/hikkaduwa.jpg",
        activities: [
          "ビーチでの自由時間",
          "海洋保護区でのシュノーケリング",
          "サーフィン または ダイビング",
        ],
        overnight: "ヒッカドゥワ泊",
      },
      {
        days: [8],
        title: "8日目 – コロンボ市内観光と出発",
        image: "/tours/colombo-airport.jpg",
        activities: [
          "マドゥ川ボートサファリ（ベントタ）",
          "コロンボ市内観光",
        ],
        drop: "国際空港 または ご指定のホテルへ送迎",
      },
    ],
  },
  {
    id: "08-days-down-south-hotels",
    region: "south",
    hotelsIncluded: true,
    title: "南部8日間ツアー（ホテル付き）",
    duration: 8,
    maxPeople: 2,
    minAge: 16,
    price: 475.0,
    image: "/tours/08-days-down-south-tour-with-hotels.jpg",

    overview:
      "ネゴンボ、ハバラナ、キャンディ、エッラ、ヤーラ、ミリッサ、ヒッカドゥワを巡るスリランカ南部のベストハイライト。文化、山、野生動物、ビーチを完璧なバランスで楽しみつつ、朝食付きの厳選されたホテルで最高の快適さを味わえるパッケージです。",

    vehicleInfo: {
      car: "1 - 3名様 ← プライベートカー",
      van: "4 - 10名様 ← KDHバン",
      minimum: "最低2名様のご予約が必要です",
      vipNote:
        "2名様合計 950ドル – VIP専用高級車および星級ホテル（朝食付）",
    },

    bookingOptions: [
      "ウェブサイトの予約フォーム",
      "メール：info@srilankatoursdriver.com",
      "WhatsApp：(+94) 769 300 334",
    ],

    included: [
      "エアコン付きプライベート車両",
      "英語を話すプロのドライバー",
      "朝食付きのホテル宿泊",
      "ドライバーの宿泊と食事",
      "健康・安全基準の遵守",
      "燃料と高速道路料金",
      "24時間緊急サポート",
      "ローカルSIMカード（無料データ通信）",
      "無料のミネラルウォーター",
      "駐車料金",
    ],

    excluded: [
      "入場料とアクティビティ料金",
      "列車チケット",
      "昼食と夕食",
      "個人的な出費",
      "チップ",
    ],

    itinerary: [
      {
        days: [1],
        title: "1日目 – ネゴンボ到着",
        image: "/tours/negombo.jpg",
        description: "空港でのお迎え後、ネゴンボを探索します。",
        activities: ["ネゴンボラグーンでのボートツアー"],
        overnight: "New Queen's Palace - ネゴンボ泊",
      },
      {
        days: [2],
        title: "2日目 – ハバラナへ",
        image: "/tours/habarana.jpg",
        description: "地元の文化に浸り、自然サファリを楽しむ一日。",
        activities: ["伝統的な村ツアー", "野生動物サファリ（写真撮影）"],
        overnight: "Go Go Green - ハバラナ泊",
      },
      {
        days: [3],
        title: "3日目 – 文化の都：キャンディ",
        image: "/tours/kandy.jpg",
        description: "スリランカの精神的な中心地を訪れます。",
        activities: ["仏歯寺", "文化舞踊ショー"],
        overnight: "Jack Tree Lodge - キャンディ泊",
      },
      {
        days: [4],
        title: "4日目 – キャンディからエッラへ",
        image: "/tours/ella.jpg",
        description: "伝説の列車旅と息を呑むようなパノラマ風景。",
        activities: ["絶景の列車旅", "リトル・アダムズ・ピーク", "ナインアーチブリッジ"],
        overnight: "Sunray Homestay - エッラ泊",
      },
      {
        days: [5],
        title: "5日目 – ヤーラサファリ",
        image: "/tours/yala.jpg",
        description: "南部の野生動物、特にヒョウを探す探索。",
        activities: ["ヤーラ国立公園でのジープサファリ"],
        overnight: "Boutique Villa - ヤーラ泊",
      },
      {
        days: [6],
        title: "6日目 – ミリッサでリラックス",
        image: "/tours/mirissa.jpg",
        description: "南部の黄金のビーチでリラックス。",
        activities: ["ビーチでの自由時間", "ココナッツ・ツリー・ヒルでの夕日"],
        overnight: "N34 - ミリッサ泊",
      },
      {
        days: [7],
        title: "7日目 – 南海岸とヒッカドゥワ",
        image: "/tours/hikkaduwa.jpg",
        description: "マリンアクティビティとガレの歴史訪問。",
        activities: ["シュノーケリングとサンゴ礁", "ガレ・ダッチ・フォートの訪問"],
        overnight: "Finlanka Hotel - ヒッカドゥワ泊",
      },
      {
        days: [8],
        title: "8日目 – コロンボと出発",
        image: "/tours/colombo-airport.jpg",
        description: "旅の締めくくりと空港への送迎。",
        activities: ["コロンボ市内観光"],
        drop: "帰りのフライトに向けて空港へ送迎",
      },
    ],
  },
  {
    id: "08-days-east-coast",
    region: "east",
    hotelsIncluded: false,
    title: "東海岸8日間ツアー",
    duration: 8,
    maxPeople: 10,
    minAge: 16,
    price: 510.0,
    image: "/tours/08-days-east-coast-tour.jpg",

    overview:
      "東海岸の手つかずのビーチ、ユネスコ世界遺産、そして中央高地の美しさを8日間で発見するツアー。ネゴンボ、エッラ、キャンディ、ハバラナ、パシクダ、トリンコマリーを巡ります。文化、自然、ビーチでのリラックスを求める方に最適です。",

    vehicleInfo: {
      car: "1 - 3名様 ← プライベートカー",
      van: "4 - 10名様 ← KDHバン",
      minimum: "最低2名様のご予約が必要です",
      vipNote: "2名様合計 1,020ドル – VIP専用高級車（ドライバーガイド付）",
    },

    bookingOptions: [
      "ウェブサイトの予約フォーム",
      "メール：info@srilankatoursdriver.com",
      "WhatsApp：(+94) 769 300 334",
    ],

    included: [
      "エアコン付きプライベート車両",
      "英語を話すプロのドライバー",
      "ドライバーの宿泊と食事",
      "健康・安全基準の遵守",
      "燃料と高速道路料金",
      "駐車料金",
      "24時間緊急サポート",
      "ローカルSIMカード（無料データ通信）",
      "無料のミネラルウォーター",
    ],

    excluded: [
      "お客様の宿泊（ホテル）と食事",
      "入場料とアクティビティ料金",
      "列車チケット",
      "個人的な出費",
    ],

    itinerary: [
      {
        days: [1],
        title: "1日目 – ネゴンボ到着",
        image: "/tours/negombo.jpg",
        description: "空港やホテルでお迎えし、運河の街ネゴンボを探索。",
        activities: [
          "ネゴンボ魚市場",
          "ダッチ・フォート（オランダ要塞）",
          "ネゴンボラグーンボートツアー",
        ],
        overnight: "ネゴンボ泊",
      },
      {
        days: [2],
        title: "2日目 – ネゴンボからエッラへ",
        image: "/tours/ella.jpg",
        description: "途中でアドベンチャーを楽しみながら山々へ。",
        activities: [
          "キトゥルガラでのホワイトウォーターラフティング（オプション）",
          "ラーワナ滝の訪問",
          "リトル・アダムズ・ピーク",
          "ナインアーチブリッジ",
        ],
        overnight: "エッラ泊",
      },
      {
        days: [3],
        title: "3日目 – エッラからキャンディへ",
        image: "/tours/kandy.jpg",
        description: "有名な列車旅と文化の首都への到着。",
        activities: [
          "エッラからナヌオヤへの絶景列車旅（ブルートレイン）",
          "ヌワラエリヤ市内観光",
          "ランボーダ滝",
          "グレンロック紅茶工場と試飲",
          "キャンディ湖散策",
          "文化舞踊ショー",
          "仏歯寺",
        ],
        overnight: "キャンディ泊",
      },
      {
        days: [4],
        title: "4日目 – キャンディからハバラナへ",
        image: "/tours/habarana.jpg",
        description: "文化三角地帯の探索とサファリ。",
        activities: [
          "マータレーのヒンドゥー寺院",
          "ダンブッラ黄金石窟寺院",
          "ダンブッラ野菜市場",
          "料理教室と伝統的ランチ付の村ツアー",
          "エコパークサファリ または ピドゥランガラ・ロックの夕日",
        ],
        overnight: "ハバラナ泊",
      },
      {
        days: [5],
        title: "5日目 – ハバラナからパシクダへ",
        image: "/tours/pasikuda.jpg",
        description: "歴史的遺跡と東海岸の白い砂浜。",
        activities: [
          "シーギリヤ・ロック要塞登頂",
          "ポロンナルワ古代王国の探索",
          "パシクダビーチ（カルクダー）でリラックス",
        ],
        overnight: "パシクダ泊",
      },
      {
        days: [6],
        title: "6日目 – パシクダからトリンコマリーへ",
        image: "/tours/trincomalee.jpg",
        description: "トリンコマリーの素晴らしい海岸への旅。",
        activities: [
          "ウォータースポーツとビーチでのリラックス",
          "イギリス軍戦没者墓地",
          "ウプウェリビーチ",
        ],
        overnight: "トリンコマリー泊",
      },
      {
        days: [7],
        title: "7日目 – トリンコマリー探索",
        image: "/tours/trincomalee.jpg",
        description: "海洋の宝庫と神聖な寺院。",
        activities: [
          "マーブルビーチ",
          "コネーシュワラム寺院",
          "フレデリック砦",
          "ピジョン島国立公園でのシュノーケリング",
          "ニラヴェリビーチ",
        ],
        overnight: "トリンコマリー泊",
      },
      {
        days: [8],
        title: "8日目 – 出発",
        image: "/tours/colombo-airport.jpg",
        description: "コロンボまたは空港へ戻ります。",
        activities: [
          "ネゴンボラグーンツアー または コロンボ市内観光（フライト時間による）",
        ],
        drop: "国際空港 または ご指定のホテルへ送迎",
      },
    ],
  },
  {
    id: "08-days-east-coast-hotels",
    region: "east",
    hotelsIncluded: true,
    title: "東海岸8日間ツアー（ホテル付き）",
    duration: 8,
    maxPeople: 2,
    minAge: 16,
    price: 630.0,
    image: "/tours/08-days-east-coast-tour-with-hotels.jpg",

    overview:
      "忘れられないスリランカ横断の8日間アドベンチャー。ネゴンボの植民地時代の魅力から、エッラとキャンディの霧に包まれた山々、そしてパシクダとトリンコマリーの壮観な白い砂浜へとご案内します。朝食付きの厳選ホテルと専用車で快適にお過ごしいただけます。",

    vehicleInfo: {
      car: "1 - 3名様 ← プライベートカー",
      van: "4 - 10名様 ← KDHバン",
      minimum: "最低2名様のご予約が必要です",
      vipNote:
        "2名様合計 1,260ドル – VIP専用高級車（ドライバーガイド付）および星級ホテル（朝食付）",
    },

    bookingOptions: [
      "ウェブサイトの予約フォーム",
      "メール：info@srilankatoursdriver.com",
      "WhatsApp：(+94) 769 300 334",
    ],

    included: [
      "エアコン付きプライベート車両",
      "英語を話すプロのドライバー",
      "朝食付きのホテル宿泊",
      "ドライバーの宿泊と食事",
      "健康・安全基準の遵守",
      "燃料と高速道路料金",
      "24時間緊急サポート",
      "ローカルSIMカード（無料データ通信）",
      "無料のミネラルウォーター",
      "駐車料金",
      "列車チケットと特定のアクティビティ",
    ],

    excluded: [
      "遺跡やモニュメントの入場料",
      "昼食と夕食",
      "個人的な出費",
      "チップ",
    ],

    itinerary: [
      {
        days: [1],
        title: "1日目 – ネゴンボ到着",
        image: "/tours/negombo.jpg",
        description: "空港でのお迎え後、運河の街を探索します。",
        activities: [
          "ネゴンボ魚市場",
          "ダッチ・フォート（オランダ要塞）",
          "ネゴンボラグーンボートツアー",
        ],
        overnight: "New Queen's Palace - ネゴンボ泊（プール付）",
      },
      {
        days: [2],
        title: "2日目 – ネゴンボからエッラへ",
        image: "/tours/ella.jpg",
        description: "途中でアドベンチャーを楽しみながら中央高地へ。",
        activities: [
          "キトゥルガラでのラフティング",
          "雄大なラーワナ滝の訪問",
          "リトル・アダムズ・ピーク",
          "象徴的なナインアーチブリッジ",
        ],
        overnight: "Sunray Homestay - エッラ泊",
      },
      {
        days: [3],
        title: "3日目 – エッラからヌワラエリヤ経由でキャンディへ",
        image: "/tours/kandy.jpg",
        description: "伝説のブルートレインの旅と文化の首都への到着。",
        activities: [
          "エッラからナヌオヤへの絶景列車旅",
          "ヌワラエリヤ市内観光",
          "ランボーダ滝",
          "紅茶工場見学と試飲",
          "キャンディ湖散策",
          "伝統舞踊ショーと仏歯寺",
        ],
        overnight: "Jack Tree Lodge - キャンディ泊",
      },
      {
        days: [4],
        title: "4日目 – キャンディからハバラナへ",
        image: "/tours/habarana.jpg",
        description: "古代の歴史と野生動物との出会い。",
        activities: [
          "マータレーのヒンドゥー寺院",
          "ダンブッラ黄金石窟寺院",
          "地元の野菜市場",
          "料理教室と伝統的ランチ付の村ツアー",
          "エコパークサファリ または ピドゥランガラ・ロックの夕日",
        ],
        overnight: "Go Go Green - ハバラナ泊（プール付）",
      },
      {
        days: [5],
        title: "5日目 – ハバラナからパシクダへ",
        image: "/tours/pasikuda.jpg",
        description: "シーギリヤ登頂と東海岸への到着。",
        activities: [
          "シーギリヤ・ロック要塞登頂",
          "ポロンナルワ古代王国の探索",
          "パシクダビーチでのリラックス",
        ],
        overnight: "パシクダの厳選ホテル泊",
      },
      {
        days: [6],
        title: "6日目 – パシクダからトリンコマリーへ",
        image: "/tours/trincomalee.jpg",
        description: "東海岸の北部への移動。",
        activities: [
          "ビーチでの自由時間とウォータースポーツ",
          "イギリス軍戦没者墓地",
          "ウプウェリビーチの探索",
        ],
        overnight: "トリンコマリーの厳選ホテル泊",
      },
      {
        days: [7],
        title: "7日目 – トリンコマリー探索",
        image: "/tours/trincomalee.jpg",
        description: "海洋の宝庫と神聖な寺院の発見。",
        activities: [
          "マーブルビーチ",
          "コネーシュワラム寺院",
          "フレデリック砦",
          "ピジョン島でのシュノーケリングとニラヴェリビーチ",
        ],
        overnight: "トリンコマリーの厳選ホテル泊",
      },
      {
        days: [8],
        title: "8日目 – ツアー終了",
        image: "/tours/colombo-airport.jpg",
        description: "旅の締めくくりと最終送迎。",
        activities: [
          "コロンボ市内観光 または ネゴンボラグーン（フライト時間による）",
        ],
        drop: "国際空港 または コロンボ/ネゴンボのご指定のホテルへ送迎",
      },
    ],
  },

  /* =====================================================
     10 DAYS TOURS (10日間ツアー)
  ===================================================== */
  {
    id: "10-days-down-south",
    region: "south",
    hotelsIncluded: false,
    title: "南部10日間ツアー",
    duration: 10,
    maxPeople: 2,
    minAge: 16,
    price: 400.0,
    image: "/tours/10-days-down-south-tour.jpg",

    overview:
      "ネゴンボ、ハバラナ、ポロンナルワ、キャンディ、ヌワラエリヤ、エッラ、ヤーラ、ミリッサ、ヒッカドゥワ、コロンボを巡る10日間の南部ツアー。古代都市の文化遺産、中央高地の涼しさ、エキサイティングなサファリ、スリランカの最も有名なビーチを完璧に融合させた充実の旅です。",

    vehicleInfo: {
      car: "1 - 3名様 ← プライベートカー",
      van: "4 - 10名様 ← KDHバン",
      minimum: "最低2名様のご予約が必要です",
      vipNote: "2名様合計 1,600ドル – VIP専用高級車（ドライバーガイド付）",
    },

    bookingOptions: [
      "ウェブサイトの予約フォーム",
      "メール：info@srilankatoursdriver.com",
      "WhatsApp：(+94) 769 300 334",
    ],

    included: [
      "エアコン付きプライベート車両",
      "英語を話すプロのドライバー",
      "ドライバーの宿泊と食事",
      "健康・安全基準の遵守",
      "燃料と高速道路料金",
      "駐車料金",
      "24時間緊急サポート",
      "ローカルSIMカード（無料データ通信）",
      "無料のミネラルウォーター",
    ],

    excluded: [
      "お客様の宿泊（ホテル）と食事",
      "入場料とアクティビティ料金",
      "列車チケット",
      "個人的な出費",
    ],

    itinerary: [
      {
        days: [1],
        title: "1日目 – 到着とハバラナへの移動",
        image: "/tours/habarana.jpg",
        description: "空港またはホテルでお迎えし、文化三角地帯へ向かいます。",
        activities: [
          "ネゴンボ魚市場",
          "ピドゥランガラ・ロックでの美しい夕日",
        ],
        overnight: "ハバラナ泊",
      },
      {
        days: [2],
        title: "2日目 – シーギリヤとポロンナルワ",
        image: "/tours/sigiriya.jpg",
        activities: [
          "シーギリヤ・ロック要塞登頂（午前7時）",
          "自転車でのポロンナルワ古代王国探索",
          "ヒリワドゥンナ村ツアーと伝統的ランチ付の料理教室",
        ],
        overnight: "ハバラナ泊",
      },
      {
        days: [3],
        title: "3日目 – 文化の都：キャンディ",
        image: "/tours/kandy.jpg",
        activities: [
          "ダンブッラ石窟寺院",
          "ナーランダ・ゲディゲ寺院",
          "マータレーのヒンドゥー寺院",
          "キャンディ文化舞踊ショー",
          "仏歯寺",
        ],
        overnight: "キャンディ泊",
      },
      {
        days: [4],
        title: "4日目 – ヌワラエリヤ",
        image: "/tours/nuwaraeliya.jpg",
        activities: [
          "ランボーダ滝",
          "紅茶工場と茶園の見学",
          "コロニアルな街並みの徒歩観光",
        ],
        overnight: "ヌワラエリヤ泊",
      },
      {
        days: [5],
        title: "5日目 – ホートンプレインズとエッラ",
        image: "/tours/ella.jpg",
        activities: [
          "ホートン・プレインズ国立公園（午前5時出発）",
          "ナヌオヤからエッラへの伝説のブルートレイン旅",
          "ナインアーチブリッジ",
        ],
        overnight: "エッラ泊",
      },
      {
        days: [6],
        title: "6日目 – エッラ探索",
        image: "/tours/ella.jpg",
        activities: [
          "リトル・アダムズ・ピーク",
          "ラーワナ洞窟",
          "エッラロックへのハイキング",
          "シークレット滝の発見",
        ],
        overnight: "エッラ泊",
      },
      {
        days: [7],
        title: "7日目 – ヤーラでのサファリ",
        image: "/tours/yala.jpg",
        activities: [
          "ラーワナ滝",
          "ブドゥルワガラ岩窟寺院",
          "ヤーラ国立公園でのジープサファリ",
        ],
        overnight: "ヤーラ泊",
      },
      {
        days: [8],
        title: "8日目 – ミリッサのビーチ",
        image: "/tours/mirissa.jpg",
        activities: [
          "ミリッサビーチでのリラックス",
          "ウェリガマビーチ",
          "ウナワトゥナビーチ",
        ],
        overnight: "ミリッサ泊",
      },
      {
        days: [9],
        title: "9日目 – ミリッサとクジラ",
        image: "/tours/mirissa.jpg",
        activities: [
          "ホエールウォッチング（季節限定）",
          "海を楽しむ自由時間",
        ],
        overnight: "ミリッサ泊",
      },
      {
        days: [10],
        title: "10日目 – ガレ、コロンボ、そして出発",
        image: "/tours/colombo-airport.jpg",
        activities: [
          "ガレ・ダッチ・フォート（オランダ要塞）",
          "ウミガメ保護プロジェクト",
          "コロンボ市内観光",
          "ガンガラーマ寺院",
          "独立記念広場",
        ],
        drop: "国際空港 または ご指定のホテルへ送迎",
      },
    ],
  },
  {
    id: "10-days-down-south-hotels",
    region: "south",
    hotelsIncluded: true,
    title: "南部10日間ツアー（ホテル付き）",
    duration: 10,
    maxPeople: 2,
    minAge: 16,
    price: 580.0,
    image: "/tours/10-days-down-south-tour-with-hotels.jpg",

    overview:
      "ネゴンボ、ハバラナ、ポロンナルワ、キャンディ、ヌワラエリヤ、エッラ、ヤーラ、ミリッサ、ヒッカドゥワ、コロンボをカバーする素晴らしい10日間のパッケージツアー。朝食付きの厳選されたホテルで最高の快適さを享受しながら、文化、山、野生動物、ビーチの完璧な融合をお楽しみください。",

    vehicleInfo: {
      car: "1 - 3名様 ← プライベートカー",
      van: "4 - 10名様 ← KDHバン",
      minimum: "最低2名様のご予約が必要です",
      vipNote:
        "2名様合計 1,160ドル – VIP専用高級車（ドライバーガイド付）および星級ホテル（朝食付）",
    },

    bookingOptions: [
      "ウェブサイトの予約フォーム",
      "メール：info@srilankatoursdriver.com",
      "WhatsApp：(+94) 769 300 334",
    ],

    included: [
      "エアコン付きプライベート車両",
      "英語を話すプロのドライバー",
      "朝食付きのホテル宿泊",
      "ドライバーの宿泊と食事",
      "健康・安全基準の遵守",
      "燃料と高速道路料金",
      "24時間緊急サポート",
      "ローカルSIMカード（無料データ通信）",
      "無料のミネラルウォーター",
      "駐車料金",
      "リストに記載されたサイトやアクティビティの入場料",
      "列車チケット",
    ],

    excluded: [
      "昼食と夕食",
      "個人的な出費",
      "チップ",
    ],

    itinerary: [
      {
        days: [1],
        title: "1日目 – 到着＆ハバラナへ",
        image: "/tours/habarana.jpg",
        description: "空港またはホテルでお迎えし、ハバラナへ向かいます。",
        activities: [
          "ネゴンボ魚市場",
          "ピドゥランガラ・ロックでの夕日",
        ],
        overnight: "Go Go Green – ハバラナ泊（プール付）",
      },
      {
        days: [2],
        title: "2日目 – シーギリヤ＆ポロンナルワ",
        image: "/tours/sigiriya.jpg",
        description: "文化三角地帯と農村生活の探索。",
        activities: [
          "シーギリヤ・ロック要塞登頂（午前7時）",
          "自転車でのポロンナルワ古代王国探索",
          "ヒリワドゥンナ村ツアーと伝統的ランチ付の料理教室",
        ],
        overnight: "Go Go Green – ハバラナ泊",
      },
      {
        days: [3],
        title: "3日目 – キャンディ",
        image: "/tours/kandy.jpg",
        description: "神聖な場所を訪れながら文化の首都へ。",
        activities: [
          "ダンブッラ黄金石窟寺院",
          "ナーランダ・ゲディゲ寺院",
          "マータレーのヒンドゥー寺院",
          "キャンディ文化舞踊ショー",
          "仏歯寺",
        ],
        overnight: "Jack Tree Lodge – キャンディ泊",
      },
      {
        days: [4],
        title: "4日目 – ヌワラエリヤ",
        image: "/tours/nuwaraeliya.jpg",
        description: "「リトル・イングランド」とその茶園の発見。",
        activities: [
          "ランボーダ滝",
          "紅茶工場と茶園の見学",
          "ヌワラエリヤのコロニアルな街並みの徒歩観光",
        ],
        overnight: "Lu Chalet – ヌワラエリヤ泊",
      },
      {
        days: [5],
        title: "5日目 – ホートンプレインズ＆エッラ",
        image: "/tours/ella.jpg",
        description: "早朝のハイキングと有名なブルートレインの旅。",
        activities: [
          "ホートン・プレインズ国立公園（午前5時出発）",
          "ナヌオヤからエッラへの列車旅（ブルートレイン）",
          "ナインアーチブリッジ",
        ],
        overnight: "Ella River Front – エッラ泊",
      },
      {
        days: [6],
        title: "6日目 – エッラ探索",
        image: "/tours/ella.jpg",
        description: "エッラの自然と壮大なパノラマに捧げる一日。",
        activities: [
          "リトル・アダムズ・ピーク",
          "ラーワナ洞窟",
          "エッラロックへのハイキング",
          "シークレット滝",
        ],
        overnight: "Ella River Front – エッラ泊",
      },
      {
        days: [7],
        title: "7日目 – ヤーラサファリ",
        image: "/tours/yala.jpg",
        description: "自然のサファリを楽しむためジャングルへ向かいます。",
        activities: [
          "ラーワナ滝",
          "ブドゥルワガラ岩窟寺院",
          "ヤーラ国立公園でのサファリ",
        ],
        overnight: "Boutique Villa – ヤーラ泊",
      },
      {
        days: [8],
        title: "8日目 – ミリッサへ",
        image: "/tours/mirissa.jpg",
        description: "南海岸の黄金のビーチを楽しむため移動します。",
        activities: [
          "ミリッサビーチでのリラックス",
          "ウェリガマビーチ",
          "ウナワトゥナビーチ",
        ],
        overnight: "N34 – ミリッサ泊",
      },
      {
        days: [9],
        title: "9日目 – ミリッサとクジラ",
        image: "/tours/mirissa.jpg",
        description: "インド洋でのリラックスやアドベンチャーの日。",
        activities: [
          "ホエールウォッチング（早朝）",
          "ビーチを楽しむ自由時間",
        ],
        overnight: "N34 – ミリッサ泊",
      },
      {
        days: [10],
        title: "10日目 – コロンボ＆出発",
        image: "/tours/colombo.jpg",
        description: "フライト前の歴史的訪問でツアーを締めくくります。",
        activities: [
          "ガレ・ダッチ・フォート（オランダ要塞）",
          "ウミガメ保護プロジェクト",
          "コロンボ市内観光パノラマツアー",
          "ガンガラーマ寺院",
          "独立記念広場",
        ],
        drop: "空港 または コロンボのご指定のホテルへ送迎",
      },
    ],
  },
  {
    id: "10-days-east-coast",
    region: "east",
    hotelsIncluded: false,
    title: "東海岸10日間ツアー",
    duration: 10,
    maxPeople: 10,
    minAge: 16,
    price: 640.0,
    image: "/tours/10-days-east-coast-tour.jpg",

    overview:
      "10日間で東海岸の驚異、豊かな文化遺産、そしてスリランカ中央高地の息を呑むような風景を探索してください。ネゴンボ、エッラ、ヌワラエリヤ、キャンディ、ハバラナ、ポロンナルワ、パシクダ、トリンコマリーを網羅した包括的なツアーです。英語を話す専用ドライバーと共に、完全な自由の旅をお楽しみください。",

    vehicleInfo: {
      car: "1 - 3名様 ← プライベートカー",
      van: "4 - 10名様 ← KDHバン",
      minimum: "最低2名様のご予約が必要です",
      vipNote: "2名様合計 1,280ドル – VIP専用高級車（ドライバーガイド付）",
    },

    bookingOptions: [
      "ウェブサイトの予約フォーム",
      "メール：info@srilankatoursdriver.com",
      "WhatsApp：(+94) 769 300 334",
    ],

    included: [
      "エアコン付きプライベート車両",
      "英語を話すプロのドライバー",
      "ドライバーの宿泊と食事",
      "健康・安全基準の遵守",
      "燃料と高速道路料金",
      "駐車料金",
      "24時間緊急サポート",
      "ローカルSIMカード（無料データ通信）",
      "無料のミネラルウォーター",
    ],

    excluded: [
      "お客様の宿泊（ホテル）と食事",
      "入場料とアクティビティ料金",
      "列車チケット",
      "個人的な出費",
    ],

    itinerary: [
      {
        days: [1],
        title: "1日目 – ネゴンボ到着",
        image: "/tours/negombo.jpg",
        description: "空港またはホテルでお迎えし、海岸沿いの街ネゴンボを探索。",
        activities: [
          "ネゴンボ魚市場",
          "ダッチ・フォート（オランダ要塞）",
          "ネゴンボラグーンボートツアー",
        ],
        overnight: "ネゴンボ泊",
      },
      {
        days: [2],
        title: "2日目 – ネゴンボからエッラへ",
        image: "/tours/ella.jpg",
        description: "パノラマの景色とアドベンチャーが待つ中央高地への旅。",
        activities: [
          "キトゥルガラでのラフティング",
          "ラーワナ滝の訪問",
          "リトル・アダムズ・ピーク",
          "ナインアーチブリッジ",
        ],
        overnight: "エッラ泊",
      },
      {
        days: [3],
        title: "3日目 – エッラからヌワラエリヤへ",
        image: "/tours/nuwaraeliya.jpg",
        description: "茶園の中心地であり「リトル・イングランド」へ。",
        activities: [
          "エッラからナヌオヤへの絶景列車旅（ブルートレイン）",
          "ビクトリアパーク",
          "コロニアルな街並みの徒歩観光",
          "グレゴリー湖での自由時間",
          "ペドロ茶園の訪問",
          "シーター・アンマン寺院",
        ],
        overnight: "ヌワラエリヤ泊",
      },
      {
        days: [4],
        title: "4日目 – ヌワラエリヤからキャンディへ",
        image: "/tours/kandy.jpg",
        description: "午前中は手つかずの自然を、午後は古都の文化を。",
        activities: [
          "ホートン・プレインズ国立公園（早朝のハイキング）",
          "ベーカーズ滝",
          "アンベウェラ農場",
          "ランボーダ滝",
          "グレンロック紅茶工場",
          "キャンディ湖散策",
          "文化舞踊ショー",
          "仏歯寺",
        ],
        overnight: "キャンディ泊",
      },
      {
        days: [5],
        title: "5日目 – キャンディからハバラナへ",
        image: "/tours/habarana.jpg",
        description: "スリランカの文化三角地帯への入り口。",
        activities: [
          "マータレーのヒンドゥー寺院",
          "ダンブッラ黄金石窟寺院",
          "地元の野菜市場",
          "料理教室と伝統的ランチ付の村ツアー",
          "エコパークサファリ または ピドゥランガラ・ロックの夕日",
        ],
        overnight: "ハバラナ泊",
      },
      {
        days: [6],
        title: "6日目 – ハバラナからパシクダへ",
        image: "/tours/pasikuda.jpg",
        description: "世界遺産と東部の手つかずのビーチ。",
        activities: [
          "シーギリヤ・ロック要塞登頂",
          "ポロンナルワ古代王国の探索",
          "パシクダビーチ（カルクダー）でのリラックス",
        ],
        overnight: "パシクダ泊",
      },
      {
        days: [7],
        title: "7日目 – バッティカロア探索",
        image: "/tours/batticaloa.jpg",
        description: "リラックスとバッティカロアの植民地時代の歴史の発見。",
        activities: [
          "ウォータースポーツとビーチでの自由時間",
          "バッティカロアの歴史的な要塞",
          "カラディ橋",
          "バッティカロア灯台",
        ],
        overnight: "パシクダ泊",
      },
      {
        days: [8],
        title: "8日目 – パシクダからトリンコマリーへ",
        image: "/tours/trincomalee.jpg",
        description: "世界で最も美しい天然港の一つへの旅。",
        activities: [
          "マーブルビーチ",
          "イギリス軍戦没者墓地",
          "ウプウェリビーチ",
          "フレデリック砦の探索",
        ],
        overnight: "トリンコマリー泊",
      },
      {
        days: [9],
        title: "9日目 – トリンコマリーとピジョン島",
        image: "/tours/trincomalee.jpg",
        description: "豊かな海洋生物と千年の歴史を持つ寺院の発見。",
        activities: [
          "ピジョン島国立公園でのシュノーケリング",
          "ニラヴェリビーチでのリラックス",
          "壮大なコネーシュワラム寺院への訪問",
        ],
        overnight: "トリンコマリー泊",
      },
      {
        days: [10],
        title: "10日目 – 帰着と出発",
        image: "/tours/colombo-airport.jpg",
        description: "コロンボまたは空港への移動でツアーを締めくくります。",
        activities: [
          "コロンボ市内観光のオプション",
        ],
        drop: "国際空港 または コロンボ/ネゴンボのご指定のホテルへ送迎",
      },
    ],
  },
  {
    id: "10-days-east-coast-hotels",
    region: "east",
    hotelsIncluded: true,
    title: "東海岸10日間ツアー（ホテル付き）",
    duration: 10,
    maxPeople: 2,
    minAge: 16,
    price: 790.0,
    image: "/tours/10-days-east-coast-tour-with-hotels.jpg",

    overview:
      "東海岸を満喫する10日間の特別パッケージ。ネゴンボ、エッラ、ヌワラエリヤ、キャンディ、ハバラナ、ポロンナルワ、パシクダ、トリンコマリーを訪れます。VIP車両、プロのドライバーガイド、そして朝食付きの厳選されたホテルで、最高の快適さをお楽しみください。",

    vehicleInfo: {
      car: "1 - 3名様 ← プライベートカー",
      van: "4 - 10名様 ← KDHバン",
      minimum: "最低2名様のご予約が必要です",
      vipNote:
        "2名様合計 1,580ドル – VIP専用高級車（ドライバーガイド付）および星級ホテル（朝食付）",
    },

    bookingOptions: [
      "ウェブサイトの予約フォーム",
      "メール：info@srilankatoursdriver.com",
      "WhatsApp：(+94) 769 300 334",
    ],

    included: [
      "エアコン付きプライベート車両",
      "英語を話すプロのドライバー",
      "朝食付きのホテル宿泊",
      "ドライバーの宿泊と食事",
      "健康・安全基準の遵守",
      "燃料と高速道路料金",
      "24時間緊急サポート",
      "ローカルSIMカード（無料データ通信）",
      "無料のミネラルウォーター",
      "駐車料金",
      "リストに記載されたすべての入場料とアクティビティ",
      "列車チケット（エッラからナヌオヤ）",
    ],

    excluded: [
      "昼食と夕食",
      "個人的な出費",
      "チップ",
    ],

    itinerary: [
      {
        days: [1],
        title: "1日目 – ネゴンボ到着",
        image: "/tours/negombo.jpg",
        description: "空港でのお迎え後、海岸沿いの街を探索します。",
        activities: [
          "ネゴンボ魚市場",
          "ダッチ・フォート（オランダ要塞）",
          "ネゴンボラグーンボートツアー",
        ],
        overnight: "New Queen's Palace - ネゴンボ泊（プール付）",
      },
      {
        days: [2],
        title: "2日目 – ネゴンボからエッラへ",
        image: "/tours/ella.jpg",
        description: "パノラマの景色とアドベンチャーが待つ中央高地への旅。",
        activities: [
          "キトゥルガラでのラフティング",
          "ラーワナ滝の訪問",
          "リトル・アダムズ・ピーク",
          "ナインアーチブリッジ",
        ],
        overnight: "Sunray Homestay - エッラ泊",
      },
      {
        days: [3],
        title: "3日目 – エッラからヌワラエリヤ（経由）キャンディへ",
        image: "/tours/kandy.jpg",
        description: "伝説のブルートレインの旅と「リトル・イングランド」への到着。",
        activities: [
          "エッラからナヌオヤへの絶景列車旅",
          "ビクトリアパーク",
          "ヌワラエリヤ市内観光",
          "グレゴリー湖での自由時間",
          "ペドロ茶園の訪問",
          "シーター・アンマン寺院",
        ],
        overnight: "Lu Chalet - ヌワラエリヤ泊",
      },
      {
        days: [4],
        title: "4日目 – ヌワラエリヤからキャンディへ",
        image: "/tours/kandy.jpg",
        description: "午前中は手つかずの自然を、午後は古都の文化を。",
        activities: [
          "ホートン・プレインズ国立公園",
          "ベーカーズ滝",
          "アンベウェラ農場",
          "ランボーダ滝",
          "グレンロック紅茶工場",
          "キャンディ湖散策",
          "文化舞踊ショー",
          "仏歯寺",
        ],
        overnight: "Jack Tree Lodge - キャンディ泊",
      },
      {
        days: [5],
        title: "5日目 – キャンディからハバラナへ",
        image: "/tours/habarana.jpg",
        description: "文化三角地帯への入り口とサファリ。",
        activities: [
          "マータレーのヒンドゥー寺院",
          "ダンブッラ黄金石窟寺院",
          "地元の野菜市場",
          "料理教室と伝統的ランチ付の村ツアー",
          "エコパークサファリ または ピドゥランガラ・ロックの夕日",
        ],
        overnight: "Go Go Green - ハバラナ泊（プール付）",
      },
      {
        days: [6],
        title: "6日目 – ハバラナからパシクダへ",
        image: "/tours/pasikuda.jpg",
        description: "息をのむような史跡と東部の白い砂浜。",
        activities: [
          "シーギリヤ・ロック要塞登頂",
          "ポロンナルワ古代王国の探索",
          "パシクダビーチ（カルクダー）でのリラックス",
        ],
        overnight: "パシクダの厳選ホテル泊",
      },
      {
        days: [7],
        title: "7日目 – バッティカロア探索",
        image: "/tours/batticaloa.jpg",
        description: "リラックスとバッティカロアの植民地時代の歴史の発見。",
        activities: [
          "ウォータースポーツとビーチでの自由時間",
          "バッティカロアの歴史的な要塞",
          "カラディ橋",
          "バッティカロア灯台",
        ],
        overnight: "パシクダの厳選ホテル泊",
      },
      {
        days: [8],
        title: "8日目 – パシクダからトリンコマリーへ",
        image: "/tours/trincomalee.jpg",
        description: "世界で最も美しい天然港の一つへの旅。",
        activities: [
          "マーブルビーチ",
          "イギリス軍戦没者墓地",
          "ウプウェリビーチ",
          "フレデリック砦の探索",
        ],
        overnight: "トリンコマリーの厳選ホテル泊",
      },
      {
        days: [9],
        title: "9日目 – トリンコマリーとピジョン島",
        image: "/tours/trincomalee.jpg",
        description: "豊かな海洋生物と千年の歴史を持つ寺院の発見。",
        activities: [
          "ピジョン島国立公園でのシュノーケリング",
          "ニラヴェリビーチでのリラックス",
          "壮大なコネーシュワラム寺院への訪問",
        ],
        overnight: "トリンコマリーの厳選ホテル泊",
      },
      {
        days: [10],
        title: "10日目 – 出発",
        image: "/tours/colombo.jpg",
        description: "コロンボまたは空港への移動で旅の締めくくり。",
        activities: [
          "コロンボ市内観光のオプション",
        ],
        drop: "国際空港 または コロンボ/ネゴンボのご指定のホテルへ送迎",
      },
    ],
  },

  /* =====================================================
     12 DAYS TOURS (12日間ツアー)
  ===================================================== */
  {
    id: "12-days-down-south",
    region: "south",
    hotelsIncluded: false,
    title: "南部12日間グランドツアー",
    duration: 12,
    maxPeople: 2,
    minAge: 16,
    price: 465.0,
    image: "/tours/12-days-down-south-tour.jpg",

    overview:
      "12日間でスリランカ南部を完全に網羅するツアーです。ネゴンボ、アヌラーダプラ、ハバラナ、ポロンナルワ、キャンディ、ヌワラエリヤ、エッラ、ヤーラ、ミリッサ、ヒッカドゥワ、コロンボを巡ります。千年の文化、壮大な丘陵地帯、野生のサファリ、そして南海岸の楽園のようなビーチに浸る旅です。",

    vehicleInfo: {
      car: "1 - 3名様 ← プライベートカー",
      van: "4 - 10名様 ← KDHバン",
      minimum: "最低2名様のご予約が必要です",
      vipNote:
        "2名様合計 1,860ドル – VIP専用高級車（ドライバーガイド付）",
    },

    bookingOptions: [
      "ウェブサイトの予約フォーム",
      "メール：info@srilankatoursdriver.com",
      "WhatsApp：(+94) 769 300 334",
    ],

    included: [
      "エアコン付きプライベート車両",
      "英語を話すプロのドライバー",
      "ドライバーの宿泊と食事",
      "健康・安全基準の遵守",
      "燃料と高速道路料金",
      "駐車料金",
      "24時間緊急サポート",
      "ローカルSIMカード（無料データ通信）",
      "無料のミネラルウォーター",
    ],

    excluded: [
      "お客様の宿泊（ホテル）と食事",
      "入場料とアクティビティ料金",
      "列車チケット",
      "個人的な出費",
    ],

    itinerary: [
      {
        days: [1],
        title: "1日目 – ネゴンボ到着",
        image: "/tours/negombo.jpg",
        description: "空港でのお迎え後、ネゴンボの街を探索します。",
        activities: [
          "空港ピックアップ",
          "ネゴンボ中心街の散策",
          "ネゴンボラグーンボートツアー",
        ],
        overnight: "ネゴンボ泊",
      },
      {
        days: [2],
        title: "2日目 – アヌラーダプラ",
        image: "/tours/anuradhapura.jpg",
        description: "聖なる都市と古代王国への旅。",
        activities: [
          "ネゴンボ魚市場",
          "ムンネシュワラム・コビル（ヒンドゥー寺院）",
          "アヌラーダプラ古代王国ツアー（ユネスコ世界遺産）",
        ],
        overnight: "アヌラーダプラ泊",
      },
      {
        days: [3],
        title: "3日目 – ハバラナ＆ポロンナルワ",
        image: "/tours/habarana.jpg",
        options: [
          {
            title: "オプション01 – 文化",
            activities: [
              "ポロンナルワ古代王国",
              "伝統的な料理教室付きの村ツアー",
              "ピドゥランガラ・ロックでの夕日",
            ],
          },
          {
            title: "オプション02 – 自然",
            activities: ["ミンネリヤ / カウドゥッラ / エコパークでのサファリ"],
          },
        ],
        overnight: "ハバラナ泊",
      },
      {
        days: [4],
        title: "4日目 – ハバラナからキャンディへ",
        image: "/tours/kandy.jpg",
        activities: [
          "シーギリヤ・ロック要塞登頂",
          "ダンブッラ黄金石窟寺院",
          "スパイスガーデン訪問",
          "キャンディ文化舞踊ショー",
          "仏歯寺",
        ],
        overnight: "キャンディ泊",
      },
      {
        days: [5],
        title: "5日目 – ヌワラエリヤ",
        image: "/tours/nuwaraeliya.jpg",
        activities: [
          "ペラデニヤ王立植物園",
          "ランボーダ滝",
          "紅茶工場見学と試飲",
        ],
        overnight: "ヌワラエリヤ泊",
      },
      {
        days: [6],
        title: "6日目 – ヌワラエリヤ探索",
        image: "/tours/nuwaraeliya.jpg",
        activities: [
          "ハクガラ植物園",
          "グレゴリー湖でのリラックス",
          "市内中心部（リトル・イングランド）の散歩",
        ],
        overnight: "ヌワラエリヤ泊",
      },
      {
        days: [7],
        title: "7日目 – エッラへ",
        image: "/tours/ella.jpg",
        activities: [
          "ホートン・プレインズ（ワールズエンド）ハイキング",
          "エッラへの絶景列車旅",
          "エッラの街の夜の探索",
        ],
        overnight: "エッラ泊",
      },
      {
        days: [8],
        title: "8日目 – サファリ（ヤーラ または ウダワラウェ）",
        image: "/tours/yala.jpg",
        options: [
          {
            title: "オプション01 – ヤーラ",
            activities: [
              "ナインアーチブリッジ",
              "ラーワナ滝",
              "ヤーラ国立公園でのサファリ",
            ],
            overnight: "ヤーラ泊",
          },
          {
            title: "オプション02 – ウダワラウェ",
            activities: [
              "リトル・アダムズ・ピーク",
              "ウダワラウェ国立公園でのサファリ",
            ],
            overnight: "ウダワラウェ泊",
          },
        ],
      },
      {
        days: [9],
        title: "9日目 – ミリッサへ",
        image: "/tours/mirissa.jpg",
        activities: [
          "ビーチでの完全なリラクゼーション",
          "ココナッツ・ツリー・ヒルでの夕日",
        ],
        overnight: "ミリッサ泊",
      },
      {
        days: [10],
        title: "10日目 – ガレとヒッカドゥワ",
        image: "/tours/hikkaduwa.jpg",
        activities: [
          "ホエールウォッチング（季節限定）",
          "ガレ・ダッチ・フォート（オランダ要塞）の訪問",
          "ヒッカドゥワビーチでのリラックス",
        ],
        overnight: "ヒッカドゥワ泊",
      },
      {
        days: [11],
        title: "11日目 – コロンボ",
        image: "/tours/colombo.jpg",
        activities: [
          "マドゥ川ボートサファリ",
          "コロンボ市内観光",
          "地元のショッピング",
        ],
        overnight: "コロンボ泊",
      },
      {
        days: [12],
        title: "12日目 – 出発",
        image: "/tours/colombo-airport.jpg",
        activities: [
          "ガンガラーマ寺院",
          "独立記念広場",
        ],
        drop: "国際空港 または ご指定のホテルへ送迎",
      },
    ],
  },
  {
    id: "12-days-down-south-hotels",
    region: "south",
    hotelsIncluded: true,
    title: "南部12日間グランドツアー（ホテル付き）",
    duration: 12,
    maxPeople: 2,
    minAge: 16,
    price: 680.0,
    image: "/tours/12-days-down-south-tour-with-hotels.jpg",

    overview:
      "この12日間の包括的なツアーでスリランカ究極の体験をお楽しみください。旅程はアヌラーダプラ、ハバラナ、キャンディ、ヌワラエリヤ、エッラ、ヤーラ、そして南部の壮大なビーチをカバーしています。朝食付きの厳選されたホテル、専用車、そしてプロのドライバーガイドによる最大限の快適さを味わってください。",

    vehicleInfo: {
      car: "1 - 3名様 ← 高級車",
      van: "4 - 10名様 ← KDHバン",
      minimum: "最低2名様のご予約が必要です",
      vipNote:
        "2名様合計 1,360ドル – VIP専用高級車（ドライバーガイド付）および星級ホテル（朝食付）",
    },

    bookingOptions: [
      "ウェブサイトの予約フォーム",
      "メール：info@srilankatoursdriver.com",
      "WhatsApp：(+94) 769 300 334",
    ],

    included: [
      "エアコン付きプライベート車両",
      "英語を話すプロのドライバー",
      "朝食付きのホテル宿泊",
      "ドライバーの宿泊と食事",
      "健康・安全基準の遵守",
      "燃料と高速道路料金",
      "24時間緊急サポート",
      "ローカルSIMカード（無料データ通信）",
      "無料のミネラルウォーター",
      "駐車料金",
      "列車チケット（ナヌオヤからエッラ）",
    ],

    excluded: [
      "入場料とアクティビティ料金",
      "昼食と夕食",
      "個人的な出費",
      "チップ",
    ],

    itinerary: [
      {
        days: [1],
        title: "1日目 – ネゴンボ到着",
        image: "/tours/negombo.jpg",
        description: "空港でのお迎え後、海岸沿いの街を探索します。",
        activities: [
          "ネゴンボ魚市場",
          "ダッチ・フォート（オランダ要塞）",
          "ネゴンボラグーンボートツアー",
        ],
        overnight: "New Queen's Palace - ネゴンボ泊（プール付）",
      },
      {
        days: [2],
        title: "2日目 – アヌラーダプラへ",
        image: "/tours/anuradhapura.jpg",
        description: "スリランカ最初の古代首都とその神聖な遺跡への訪問。",
        activities: [
          "ムンネシュワラム・コビル（ヒンドゥー寺院）",
          "アヌラーダプラ古代王国ツアー（ユネスコ世界遺産）の全容",
        ],
        overnight: "アヌラーダプラの厳選ホテル泊",
      },
      {
        days: [3],
        title: "3日目 – ハバラナ＆ポロンナルワ",
        image: "/tours/habarana.jpg",
        description: "文化三角地帯の旅とサファリ、または歴史ツアー。",
        activities: [
          "ポロンナルワ古代王国",
          "料理教室と伝統的ランチ付の村ツアー",
          "エコパークサファリ または ピドゥランガラ・ロックの夕日",
        ],
        overnight: "Go Go Green – ハバラナ泊（プール付）",
      },
      {
        days: [4],
        title: "4日目 – キャンディへの移動",
        image: "/tours/kandy.jpg",
        description: "要塞への登頂と島の精神的な中心地への訪問。",
        activities: [
          "シーギリヤ・ロック要塞登頂（早朝）",
          "ダンブッラ黄金石窟寺院",
          "キャンディでの文化舞踊ショー",
          "仏歯寺の訪問",
        ],
        overnight: "Jack Tree Lodge – キャンディ泊",
      },
      {
        days: [5],
        title: "5日目 – ヌワラエリヤ（「リトル・イングランド」）",
        image: "/tours/nuwaraeliya.jpg",
        description: "山の風景、滝、茶畑の中へ。",
        activities: [
          "ペラデニヤ王立植物園",
          "ランボーダ滝",
          "紅茶工場見学と試飲",
        ],
        overnight: "Lu Chalet – ヌワラエリヤ泊",
      },
      {
        days: [6],
        title: "6日目 – ヌワラエリヤ探索",
        image: "/tours/nuwaraeliya.jpg",
        description: "自然と植民地時代の魅力に包まれたリラックスした一日。",
        activities: [
          "ハクガラ植物園",
          "グレゴリー湖での自由時間",
          "歴史ある街の中心部を散歩",
        ],
        overnight: "Lu Chalet – ヌワラエリヤ泊",
      },
      {
        days: [7],
        title: "7日目 – エッラへのブルートレイン",
        image: "/tours/ella.jpg",
        description: "世界で最も景色が良い列車の旅の一つを体験します。",
        activities: [
          "ホートン・プレインズへのハイキング（午前）",
          "ナヌオヤからエッラへの絶景列車旅",
          "活気あるエッラの街の夜の自由時間",
        ],
        overnight: "Ella River Front – エッラ泊",
      },
      {
        days: [8],
        title: "8日目 – サファリとアドベンチャー",
        image: "/tours/yala.jpg",
        description: "エッラのシンボルを巡り、ジャングルへ移動します。",
        activities: [
          "ナインアーチブリッジ",
          "ラーワナ滝",
          "ヤーラ（または ウダワラウェ）国立公園でのサファリ",
        ],
        overnight: "Boutique Villa – ヤーラ または ウダワラウェ泊",
      },
      {
        days: [9],
        title: "9日目 – ミリッサでリラックス",
        image: "/tours/mirissa.jpg",
        description: "海を楽しむために南海岸へ移動します。",
        activities: [
          "ミリッサビーチでのリラックス",
          "ココナッツ・ツリー・ヒル",
          "海辺でのディナー",
        ],
        overnight: "N34 – ミリッサ泊",
      },
      {
        days: [10],
        title: "10日目 – ガレでのクジラと歴史",
        image: "/tours/hikkaduwa.jpg",
        description: "インド洋とガレの植民地時代の魅力。",
        activities: [
          "ホエールとドルフィンウォッチング（午前）",
          "ガレ・ダッチ・フォートの歴史的訪問",
          "ヒッカドゥワビーチへの移動",
        ],
        overnight: "Finlanka Hotel – ヒッカドゥワ泊",
      },
      {
        days: [11],
        title: "11日目 – コロンボへ戻る",
        image: "/tours/colombo.jpg",
        description: "リバーサファリと首都での最後の夜。",
        activities: [
          "マドゥ川ボートサファリ（ベントタ）",
          "コロンボ市内観光とショッピング",
        ],
        overnight: "コロンボの厳選ホテル泊",
      },
      {
        days: [12],
        title: "12日目 – 出発",
        image: "/tours/colombo-airport.jpg",
        description: "最後の訪問と最終送迎。",
        activities: [
          "ガンガラーマ寺院",
          "独立記念広場",
        ],
        drop: "国際空港へ送迎",
      },
    ],
  },
  {
    id: "12-days-east-coast",
    region: "east",
    hotelsIncluded: false,
    title: "東海岸12日間グランドツアー",
    duration: 12,
    maxPeople: 10,
    minAge: 16,
    price: 760.0,
    image: "/tours/12-days-east-coast-tour.jpg",

    overview:
      "スリランカを横断する究極の12日間の冒険を発見してください。この包括的なツアーは、東海岸の黄金のビーチから、霧に包まれた中央の山々、アヌラーダプラの古代王国、そしてカルピティヤの海岸の楽園へとご案内します。英語を話す専用ドライバーとの忘れられない旅です。",

    vehicleInfo: {
      car: "1 - 3名様 ← プライベートカー",
      van: "4 - 10名様 ← KDHバン",
      minimum: "最低2名様のご予約が必要です",
      vipNote: "2名様合計 1,520ドル – VIP専用高級車（ドライバーガイド付）",
    },

    bookingOptions: [
      "ウェブサイトの予約フォーム",
      "メール：info@srilankatoursdriver.com",
      "WhatsApp：(+94) 769 300 334",
    ],

    included: [
      "エアコン付きプライベート車両",
      "英語を話すプロのドライバー",
      "ドライバーの宿泊と食事",
      "健康・安全基準の遵守",
      "燃料と高速道路料金",
      "駐車料金",
      "24時間緊急サポート",
      "ローカルSIMカード（無料データ通信）",
      "無料のミネラルウォーター",
    ],

    excluded: [
      "お客様の宿泊（ホテル）と食事",
      "入場料とアクティビティ料金",
      "列車チケット",
      "個人的な出費",
    ],

    itinerary: [
      {
        days: [1],
        title: "1日目 – ネゴンボ到着",
        image: "/tours/negombo.jpg",
        description: "空港でのお迎え後、活気ある運河の街を探索します。",
        activities: [
          "ネゴンボ魚市場",
          "ダッチ・フォート（オランダ要塞）",
          "ネゴンボラグーンボートツアー",
        ],
        overnight: "ネゴンボ泊",
      },
      {
        days: [2],
        title: "2日目 – ネゴンボからエッラへ",
        image: "/tours/ella.jpg",
        description: "途中でアドベンチャーを楽しみながら山々への旅。",
        activities: [
          "キトゥルガラでのラフティング",
          "ラーワナ滝の訪問",
          "リトル・アダムズ・ピークへのハイキング",
          "ナインアーチブリッジ",
        ],
        overnight: "エッラ泊",
      },
      {
        days: [3],
        title: "3日目 – エッラからヌワラエリヤへ",
        image: "/tours/nuwaraeliya.jpg",
        description: "「リトル・イングランド」へ向かう伝説のブルートレインの旅。",
        activities: [
          "エッラからナヌオヤへの絶景列車旅（ブルートレイン）",
          "ヌワラエリヤのツアー（ビクトリアパークと街の中心部）",
          "グレゴリー湖でのリラックス",
          "ペドロ茶園",
          "シーター・アンマン寺院",
        ],
        overnight: "ヌワラエリヤ泊",
      },
      {
        days: [4],
        title: "4日目 – ヌワラエリヤからキャンディへ",
        image: "/tours/kandy.jpg",
        description: "早朝のハイキングと文化の首都への到着。",
        activities: [
          "ホートン・プレインズ国立公園（ワールズエンド）",
          "ベーカーズ滝",
          "アンベウェラ農場",
          "ランボーダ滝とグレンロック紅茶工場",
          "キャンディ湖と文化ショー",
          "仏歯寺",
        ],
        overnight: "キャンディ泊",
      },
      {
        days: [5],
        title: "5日目 – キャンディからハバラナへ",
        image: "/tours/habarana.jpg",
        description: "神聖な場所とスリランカの農村生活の体験。",
        activities: [
          "マータレーのヒンドゥー寺院",
          "ダンブッラ黄金石窟寺院",
          "地元の野菜市場",
          "料理教室と伝統的ランチ付の村ツアー",
          "エコパークサファリ または ピドゥランガラ・ロックの夕日",
        ],
        overnight: "ハバラナ泊",
      },
      {
        days: [6],
        title: "6日目 – ハバラナからパシクダへ",
        image: "/tours/pasikuda.jpg",
        description: "千年の歴史と東の美しいビーチへの到着。",
        activities: [
          "シーギリヤ・ロック要塞登頂",
          "ポロンナルワ古代王国の探索",
          "パシクダビーチ（カルクダー）でのリラックス",
        ],
        overnight: "パシクダ泊",
      },
      {
        days: [7],
        title: "7日目 – バッティカロア探索",
        image: "/tours/batticaloa.jpg",
        description: "リラックスと地元の歴史発見の一日。",
        activities: [
          "ウォータースポーツとビーチでの自由時間",
          "バッティカロアの歴史的な要塞",
          "カラディ橋",
          "バッティカロア灯台",
        ],
        overnight: "パシクダ泊",
      },
      {
        days: [8],
        title: "8日目 – パシクダからトリンコマリーへ",
        image: "/tours/trincomalee.jpg",
        description: "トリンコマリーの美しい湾への旅。",
        activities: [
          "マーブルビーチ",
          "イギリス軍戦没者墓地",
          "ウプウェリビーチでのリラックス",
          "フレデリック砦の探索",
        ],
        overnight: "トリンコマリー泊",
      },
      {
        days: [9],
        title: "9日目 – トリンコマリーからアヌラーダプラへ",
        image: "/tours/anuradhapura.jpg",
        description: "午前中は海の自然を、午後は聖なる都市を。",
        activities: [
          "ピジョン島国立公園でのシュノーケリング",
          "ニラヴェリビーチ",
          "コネーシュワラム寺院への訪問",
          "ミヒンタレー遺跡",
        ],
        overnight: "アヌラーダプラ泊",
      },
      {
        days: [10],
        title: "10日目 – アヌラーダプラからカルピティヤへ",
        image: "/tours/kalpitiya.jpg",
        description: "古代の王国とジャングルでのサファリ。",
        activities: [
          "アヌラーダプラ古代王国のツアー",
          "ウィルパットゥ国立公園でのサファリ",
        ],
        overnight: "カルピティヤ泊",
      },
      {
        days: [11],
        title: "11日目 – カルピティヤ探索",
        image: "/tours/kalpitiya.jpg",
        description: "カイトサーフィンとラグーンの楽園でのリラックス。",
        activities: [
          "カイトサーフィン または ウォータースポーツ",
          "カルピティヤ・ダッチ・フォート（オランダ要塞）",
          "古いオランダ教会",
          "カルピティヤラグーンボートツアー",
        ],
        overnight: "カルピティヤ泊",
      },
      {
        days: [12],
        title: "12日目 – 帰着と出発",
        image: "/tours/colombo.jpg",
        description: "コロンボへの移動でツアーを締めくくります。",
        activities: [
          "コロンボ市内観光のオプションツアー",
        ],
        drop: "国際空港 または コロンボ/ネゴンボのご指定のホテルへ送迎",
      },
    ],
  },
  {
    id: "12-days-east-coast-hotels",
    region: "east",
    hotelsIncluded: true,
    title: "東海岸12日間グランドツアー（ホテル付き）",
    duration: 12,
    maxPeople: 2,
    minAge: 16,
    price: 970.0,
    image: "/tours/12-days-east-coast-tour-with-hotels.jpg",

    overview:
      "12日間の豪華なツアーでスリランカの究極の体験を生きましょう。この独占的な旅は、ネゴンボ、エッラ、ヌワラエリヤ、キャンディ、ハバラナ、パシクダ、トリンコマリー、アヌラーダプラ、カルピティヤに触れます。厳選された星級ホテル（朝食付き）と専用のドライバーガイドで最大限のリラックスをお楽しみください。",

    vehicleInfo: {
      car: "1 - 3名様 ← 高級車",
      van: "4 - 10名様 ← KDHバン",
      minimum: "最低2名様のご予約が必要です",
      vipNote:
        "2名様合計 1,940ドル – VIP専用高級車（ドライバーガイド付）および上級ホテル（朝食付）が含まれます",
    },

    bookingOptions: [
      "ウェブサイトの予約フォーム",
      "メール：info@srilankatoursdriver.com",
      "WhatsApp：(+94) 769 300 334",
    ],

    included: [
      "エアコン付きプライベート車両",
      "英語を話すプロのドライバー",
      "朝食付きの厳選されたホテル宿泊",
      "ドライバーの宿泊と食事",
      "健康・安全基準の遵守",
      "燃料と高速道路料金",
      "24時間緊急サポート",
      "ローカルSIMカード（無料データ通信）",
      "無料のミネラルウォーター",
      "駐車料金",
      "列車チケット（エッラからナヌオヤ）",
    ],

    excluded: [
      "入場料とアクティビティ料金",
      "昼食と夕食",
      "個人的な出費",
      "チップ",
    ],

    itinerary: [
      {
        days: [1],
        title: "1日目 – ネゴンボ到着",
        image: "/tours/negombo.jpg",
        description: "空港でのお迎え後、運河の街を探索します。",
        activities: [
          "ネゴンボ魚市場",
          "ダッチ・フォート（オランダ要塞）",
          "ネゴンボラグーンボートツアー",
        ],
        overnight: "New Queen's Palace - ネゴンボ泊（プール付）",
      },
      {
        days: [2],
        title: "2日目 – ネゴンボからエッラへ",
        image: "/tours/ella.jpg",
        description: "途中で川でのアドベンチャーを楽しみながら山々へ。",
        activities: [
          "キトゥルガラでのラフティング",
          "雄大なラーワナ滝の訪問",
          "リトル・アダムズ・ピークへのハイキング",
          "ナインアーチブリッジ",
        ],
        overnight: "Sunray Homestay - エッラ泊",
      },
      {
        days: [3],
        title: "3日目 – ブルートレインとヌワラエリヤ",
        image: "/tours/nuwaraeliya.jpg",
        description: "「リトル・イングランド」へ向かう伝説の列車の旅。",
        activities: [
          "エッラからナヌオヤへの絶景列車旅",
          "ヌワラエリヤ市内観光",
          "グレゴリー湖でのリラックス",
          "ペドロ茶園",
          "シーター・アンマン寺院",
        ],
        overnight: "Lu Chalet - ヌワラエリヤ泊",
      },
      {
        days: [4],
        title: "4日目 – ヌワラエリヤからキャンディへ",
        image: "/tours/kandy.jpg",
        description: "午前中は手つかずの自然を、午後は文化を体験。",
        activities: [
          "ホートン・プレインズ国立公園",
          "ベーカーズ滝",
          "アンベウェラ農場",
          "ランボーダ滝",
          "グレンロック紅茶工場",
          "キャンディ湖散策",
          "伝統的な舞踊ショー",
          "仏歯寺",
        ],
        overnight: "Jack Tree Lodge - キャンディ泊",
      },
      {
        days: [5],
        title: "5日目 – キャンディからハバラナへ",
        image: "/tours/habarana.jpg",
        description: "文化三角地帯とサファリに浸る。",
        activities: [
          "マータレーのヒンドゥー寺院",
          "ダンブッラ黄金石窟寺院",
          "ダンブッラ野菜市場",
          "料理教室と伝統的ランチ付の村ツアー",
          "エコパークサファリ または ピドゥランガラ・ロックの夕日",
        ],
        overnight: "Go Go Green - ハバラナ泊（プール付）",
      },
      {
        days: [6],
        title: "6日目 – ハバラナからパシクダへ",
        image: "/tours/pasikuda.jpg",
        description: "歴史的なシンボルと東の壮観なビーチ。",
        activities: [
          "シーギリヤ・ロック要塞登頂",
          "ポロンナルワ古代王国の探索",
          "パシクダビーチ（カルクダー）でのリラックス",
        ],
        overnight: "パシクダの厳選ホテル泊",
      },
      {
        days: [7],
        title: "7日目 – バッティカロア探索",
        image: "/tours/batticaloa.jpg",
        description: "東海岸でのリラックスと発見の日。",
        activities: [
          "ウォータースポーツとビーチでの自由時間",
          "バッティカロアの歴史的な要塞",
          "カラディ橋",
          "バッティカロア灯台",
        ],
        overnight: "パシクダの厳選ホテル泊",
      },
      {
        days: [8],
        title: "8日目 – パシクダからトリンコマリーへ",
        image: "/tours/trincomalee.jpg",
        description: "トリンコマリーの素晴らしい湾へ向かいます。",
        activities: [
          "マーブルビーチ",
          "イギリス軍戦没者墓地",
          "ウプウェリビーチでのリラックス",
          "フレデリック砦の探索",
        ],
        overnight: "トリンコマリーの厳選ホテル泊",
      },
      {
        days: [9],
        title: "9日目 – トリンコマリーからアヌラーダプラへ",
        image: "/tours/anuradhapura.jpg",
        description: "午前中はシュノーケリング、午後は聖なる都市へ。",
        activities: [
          "ピジョン島国立公園でのシュノーケリング",
          "ニラヴェリビーチ",
          "コネーシュワラム寺院への訪問",
          "ミヒンタレー遺跡",
        ],
        overnight: "アヌラーダプラの厳選ホテル泊",
      },
      {
        days: [10],
        title: "10日目 – アヌラーダプラからカルピティヤへ",
        image: "/tours/kalpitiya.jpg",
        description: "古代都市とウィルパットゥのジャングルでのサファリ。",
        activities: [
          "アヌラーダプラ古代王国のツアー",
          "ウィルパットゥ国立公園でのサファリ",
        ],
        overnight: "カルピティヤの厳選ホテル泊",
      },
      {
        days: [11],
        title: "11日目 – カルピティヤ探索",
        image: "/tours/kalpitiya.jpg",
        description: "カイトサーフィンのオアシスでのウォータースポーツとリラックス。",
        activities: [
          "カイトサーフィン または ウォータースポーツ",
          "カルピティヤ・ダッチ・フォート（オランダ要塞）",
          "古いオランダ教会",
          "カルピティヤラグーンボートツアー",
        ],
        overnight: "カルピティヤの厳選ホテル泊",
      },
      {
        days: [12],
        title: "12日目 – 出発",
        image: "/tours/colombo.jpg",
        description: "コロンボへの最終移動でツアーは終了です。",
        activities: [
          "コロンボ市内パノラマ観光",
        ],
        drop: "国際空港 または ご指定のホテルへ送迎",
      },
    ],
  },
];