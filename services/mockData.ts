
import { Product } from '../types';

// Helper to proxy images to bypass hotlink protection and resize for performance
// Using wsrv.nl which is very reliable for resizing and caching
const proxy = (url: string) => `https://wsrv.nl/?url=${encodeURIComponent(url)}&w=800&q=80&output=webp`;

// Nitecore Base URL
const NC_BASE = 'https://www.nitecore.com';
const NC_FL_BASE = 'https://flashlight.nitecore.com'; // New Base for scraped images
const VIC_CDN = 'https://imageengine.victorinox.com/transform';
const OLIGHT_CDN = 'https://cdn.olightstore.com/image';
const WB_CDN = 'https://www.wubenlight.com/cdn/shop/files';

export const products: Product[] = [
  // --- LATEST RELEASES ---
  {
      id: 'nitecore-edc17',
      slug: 'nitecore-edc17',
      name: 'Nitecore EDC17',
      brand: 'Nitecore',
      price: 89.95,
      category: 'tactical',
      description: {
          en: 'The NITECORE EDC17 Ultra Slim EDC Flashlight features three light sources: a 1,500-lumen white light, a 1,350mW UV light, and a <5mW green laser. Its simple design allows users to slide to turn it on and press to switch modes, making it a reliable everyday companion.',
          fa: 'چراغ قوه فوق باریک EDC17 نایتکور دارای سه منبع نوری است: نور سفید ۱۵۰۰ لومن، نور فرابنفش ۱۳۵۰ میلی‌وات و لیزر سبز <5mW. طراحی ساده آن اجازه می‌دهد تا با لغزش روشن شود و با فشار تغییر حالت دهد، که آن را به یک همراه قابل اعتماد روزمره تبدیل می‌کند.',
          zh: 'NITECORE EDC17 超薄 EDC 手电筒具有三种光源：1,500 流明白光、1,350mW 紫外线和 <5mW 绿激光。其简单的设计允许用户滑动开启并按压切换模式，使其成为可靠的日常伴侣。',
          es: 'La linterna EDC ultra delgada NITECORE EDC17 cuenta con tres fuentes de luz: una luz blanca de 1,500 lúmenes, una luz UV de 1,350mW y un láser verde de <5mW. Su diseño simple permite deslizar para encender y presionar para cambiar modos, convirtiéndola en una compañera diaria confiable.'
      },
      specs: {
          'Max Output': '1,500 Lumens',
          'Light Sources': 'White, UV, Green Laser',
          'Design': 'Ultra Slim',
          'Switch': 'Slide & Press'
      },
      images: [
          `${NC_FL_BASE}/Uploads/FLASHLIGHTS/goods_img/1761616185.png`,
          `${NC_FL_BASE}/Uploads/Banner/original_img/1761616404.webp`
      ].map(proxy),
      features: {
          en: ['Tri-Source', 'Green Laser', 'UV Light'],
          fa: ['سه منبع نور', 'لیزر سبز', 'نور UV'],
          zh: ['三光源', '绿激光', '紫外线'],
          es: ['Tres fuentes', 'Láser verde', 'Luz UV']
      },
      stock: 45
  },
  {
      id: 'nitecore-tup2',
      slug: 'nitecore-tup2',
      name: 'Nitecore TUP2',
      brand: 'Nitecore',
      price: 69.95,
      category: 'accessory',
      description: {
          en: 'Equipped with four quad-core MCT UHE LEDs, the NITECORE TUP2 Intelligent Three Color Temperatures Keychain Light features flexible color temperature switching, and flashlight-level performance with a max output of 1,200 lumens and 125-meter long range. With up to 190 hours of runtime and an OLED real-time display, it combines cutting-edge technology with outstanding performance.',
          fa: 'مجهز به چهار LED چهار هسته‌ای MCT UHE، چراغ جاکلیدی هوشمند TUP2 نایتکور دارای تغییر دمای رنگ انعطاف‌پذیر و عملکردی در سطح چراغ قوه با حداکثر خروجی ۱۲۰۰ لومن و برد ۱۲۵ متر است. با حداکثر ۱۹۰ ساعت کارکرد و نمایشگر OLED بلادرنگ، فناوری پیشرفته را با عملکردی برجسته ترکیب می‌کند.',
          zh: '配备四个四核 MCT UHE LED，NITECORE TUP2 智能三色温钥匙扣灯具有灵活的色温切换功能，以及手电筒级的性能，最大输出 1,200 流明和 125 米射程。拥有长达 190 小时的续航和 OLED 实时显示屏，将尖端科技与卓越性能完美结合。',
          es: 'Equipada con cuatro LED MCT UHE de cuatro núcleos, la luz de llavero inteligente NITECORE TUP2 presenta un cambio flexible de temperatura de color y un rendimiento de nivel de linterna con una salida máxima de 1,200 lúmenes y un alcance de 125 metros. Con hasta 190 horas de autonomía y pantalla OLED en tiempo real, combina tecnología de vanguardia con un rendimiento excepcional.'
      },
      specs: {
          'Max Output': '1,200 Lumens',
          'Max Beam Distance': '125 m',
          'LED': '4x MCT UHE',
          'Display': 'OLED Real-time'
      },
      images: [
          `${NC_FL_BASE}/Uploads/FLASHLIGHTS/goods_img/1759973707.png`
      ].map(proxy),
      features: {
          en: ['MCT UHE LEDs', 'OLED Display', '3 Color Temps'],
          fa: ['LEDهای MCT UHE', 'نمایشگر OLED', '۳ دمای رنگ'],
          zh: ['MCT UHE LED', 'OLED 显示屏', '三色温'],
          es: ['LEDs MCT UHE', 'Pantalla OLED', '3 Temp. Color']
      },
      stock: 100
  },
  {
      id: 'nitecore-ut27-2024',
      slug: 'nitecore-ut27-2024',
      name: 'Nitecore UT27',
      brand: 'Nitecore',
      price: 54.95,
      category: 'accessory',
      description: {
          en: 'The NITECORE UT27 High CRI Three Color Temperatures Lightweight Trail Running Headlamp, is equipped with the all-new Variable CRI Multiple Color Temperatures LED, offering three color temperatures and three CRI options. Weighing only 74g (2.61 oz) and featuring dual power options, it delivers a maximum output of 800 lumens with a maximum throw of 168 meters.',
          fa: 'هدلامپ تریل رانینگ سبک UT27 نایتکور با CRI بالا و سه دمای رنگ، مجهز به LED جدید با دمای رنگ متغیر است که سه دمای رنگ و سه گزینه CRI ارائه می‌دهد. با وزن تنها ۷۴ گرم و گزینه‌های دوگانه منبع تغذیه، حداکثر خروجی ۸۰۰ لومن و برد ۱۶۸ متر را ارائه می‌دهد.',
          zh: 'NITECORE UT27 高显色三色温轻量级越野跑头灯配备了全新的可变显色多色温 LED，提供三种色温和三种显色选项。仅重 74 克，具有双电源选项，最大输出 800 流明，最大射程 168 米。',
          es: 'La linterna frontal ligera para trail running NITECORE UT27 con alto CRI y tres temperaturas de color está equipada con el nuevo LED de temperaturas de color variables, ofreciendo tres opciones de temperatura y CRI. Con un peso de solo 74g y opciones de energía dual, ofrece un máximo de 800 lúmenes y 168 metros de alcance.'
      },
      specs: {
          'Max Output': '800 Lumens',
          'Max Beam Distance': '168 m',
          'Weight': '74 g',
          'Feature': '3 Color Temps'
      },
      images: [
          `${NC_FL_BASE}/Uploads/FLASHLIGHTS/goods_img/1758248409.png`,
          `${NC_FL_BASE}/Uploads/Banner/original_img/1758251055.jpg`
      ].map(proxy),
      features: {
          en: ['Variable CRI', 'Triple Color', 'Ultralight'],
          fa: ['CRI متغیر', 'سه رنگ', 'فوق سبک'],
          zh: ['可变 CRI', '三色温', '超轻'],
          es: ['CRI Variable', 'Triple color', 'Ultraligera']
      },
      stock: 100
  },
  {
      id: 'nitecore-cb12k',
      slug: 'nitecore-carbon-battery-12k',
      name: 'Carbon Battery™ 12K Kit',
      brand: 'Nitecore',
      price: 59.95,
      category: 'power',
      description: {
          en: 'The NITECORE Carbon Battery™ 12K Extended Headlamp Runtime Kit provides long-lasting, reliable power with a high capacity of 12,000mAh and a maximum output of 30W. Designed for stable and comfortable wearing, it ensures the headlamp to unleash its full performance and support TURBO-level illumination.',
          fa: 'کیت افزایش زمان کارکرد هدلامپ Carbon Battery™ 12K نایتکور قدرت طولانی مدت و قابل اعتمادی را با ظرفیت بالای ۱۲۰۰۰ میلی‌آمپر ساعت و خروجی ۳۰ وات فراهم می‌کند. طراحی شده برای پوشیدن پایدار و راحت، تضمین می‌کند که هدلامپ عملکرد کامل خود را آزاد کرده و از روشنایی سطح TURBO پشتیبانی کند.',
          zh: 'NITECORE Carbon Battery™ 12K 头灯续航扩展套件提供持久可靠的电力，拥有 12,000mAh 的高容量和 30W 的最大输出。专为稳定舒适佩戴而设计，确保护头灯释放全部性能并支持 TURBO 级照明。',
          es: 'El kit de extensión de autonomía para linterna frontal NITECORE Carbon Battery™ 12K proporciona energía duradera y fiable con una alta capacidad de 12,000 mAh y una salida máxima de 30W. Diseñado para un uso estable y cómodo, asegura que la linterna frontal despliegue todo su rendimiento y soporte iluminación nivel TURBO.'
      },
      specs: {
          'Capacity': '12,000 mAh',
          'Output': '30W Max',
          'Compatibility': 'Headlamps',
          'Material': 'Carbon Fiber'
      },
      images: [
          `${NC_FL_BASE}/Uploads/FLASHLIGHTS/goods_img/1757384084.png`
      ].map(proxy),
      features: {
          en: ['Headlamp Extender', '12000mAh', '30W Output'],
          fa: ['توسعه دهنده هدلامپ', '۱۲۰۰۰ میلی‌آمپر', 'خروجی ۳۰ وات'],
          zh: ['头灯扩展', '12000mAh', '30W 输出'],
          es: ['Extensor frontal', '12000mAh', 'Salida 30W']
      },
      stock: 50
  },
  {
      id: 'nitecore-ex7',
      slug: 'nitecore-ex7',
      name: 'Nitecore EX7',
      brand: 'Nitecore',
      price: 129.95,
      category: 'tactical',
      description: {
          en: 'The NITECORE EX7 Variable Beam Pattern High Performance Flashlight is equipped with the globally debuting M515S array LEDs, allowing users to choose from three beam patterns. It features 20 cores that deliver a max output of 6,000 lumens and a max throw of 500 meters, while providing long-lasting and stable output for next-level flashlight performance.',
          fa: 'چراغ قوه با عملکرد بالا EX7 نایتکور با الگوی پرتو متغیر مجهز به آرایه LEDهای M515S است که برای اولین بار در جهان عرضه شده است و به کاربران اجازه می‌دهد از بین سه الگوی پرتو انتخاب کنند. دارای ۲۰ هسته است که حداکثر خروجی ۶۰۰۰ لومن و برد ۵۰۰ متر را ارائه می‌دهد و خروجی پایدار و طولانی مدتی را برای عملکرد سطح بعدی چراغ قوه فراهم می‌کند.',
          zh: 'NITECORE EX7 可变光束高性能手电筒配备全球首发的 M515S 阵列 LED，允许用户从三种光束模式中进行选择。它具有 20 个核心，最大输出 6,000 流明，最大射程 500 米，同时提供持久稳定的输出，以此实现更高水平的手电筒性能。',
          es: 'La linterna de alto rendimiento con patrón de haz variable NITECORE EX7 está equipada con la matriz de LED M515S de debut mundial, permitiendo a los usuarios elegir entre tres patrones de haz. Cuenta con 20 núcleos que ofrecen un máximo de 6,000 lúmenes y un alcance de 500 metros, proporcionando una salida duradera y estable para un rendimiento de linterna de siguiente nivel.'
      },
      specs: {
          'Max Output': '6,000 Lumens',
          'Max Beam Distance': '500 m',
          'LED': 'M515S Array',
          'Feature': 'Variable Beam'
      },
      images: [
          `${NC_FL_BASE}/Uploads/FLASHLIGHTS/goods_img/1756969518.png`
      ].map(proxy),
      features: {
          en: ['Variable Beam', '6000 Lumens', 'M515S LEDs'],
          fa: ['پرتو متغیر', '۶۰۰۰ لومن', 'LEDهای M515S'],
          zh: ['可变光束', '6000 流明', 'M515S LED'],
          es: ['Haz variable', '6000 Lúmenes', 'LEDs M515S']
      },
      stock: 25
  },
  {
      id: 'nitecore-p40',
      slug: 'nitecore-p40',
      name: 'Nitecore P40',
      brand: 'Nitecore',
      price: 179.95,
      category: 'tactical',
      description: {
          en: 'The NITECORE P40 Ultra-Long Throw Dual Beam LEP Flashlight delivers a maximum throw of 2900 meters and a blazing brightness of 2000 lumens. With the ability to freely switch between spotlight, floodlight and mixed light, and the Adaptive Cruise Mode for automatic brightness control, it ensures optimal performance for every scenario.',
          fa: 'چراغ قوه LEP دو پرتو P40 نایتکور با برد فوق‌العاده طولانی، حداکثر برد ۲۹۰۰ متر و روشنایی خیره‌کننده ۲۰۰۰ لومن را ارائه می‌دهد. با قابلیت تغییر آزادانه بین نور متمرکز، پخش و ترکیبی، و حالت کروز تطبیقی برای کنترل خودکار روشنایی، عملکرد بهینه را برای هر سناریویی تضمین می‌کند.',
          zh: 'NITECORE P40 超长射程双光束 LEP 手电筒提供 2900 米的最大射程和 2000 流明的炽热亮度。能够在聚光、泛光和混合光之间自由切换，并具有用于自动亮度控制的自适应巡航模式，确保在每种情况下都能发挥最佳性能。',
          es: 'La linterna LEP de doble haz de alcance ultra largo NITECORE P40 ofrece un alcance máximo de 2900 metros y un brillo resplandeciente de 2000 lúmenes. Con la capacidad de cambiar libremente entre foco, inundación y luz mixta, y el modo de crucero adaptativo para el control automático del brillo, garantiza un rendimiento óptimo para cada escenario.'
      },
      specs: {
          'Max Output': '2,000 Lumens',
          'Max Beam Distance': '2900 m',
          'Technology': 'LEP Dual Beam',
          'Feature': 'Adaptive Cruise'
      },
      images: [
          `${NC_FL_BASE}/Uploads/FLASHLIGHTS/goods_img/1756177500.png`
      ].map(proxy),
      features: {
          en: ['LEP Technology', '2900m Throw', 'Dual Beam'],
          fa: ['تکنولوژی LEP', 'برد ۲۹۰۰ متر', 'پرتو دوگانه'],
          zh: ['LEP 技术', '2900米射程', '双光束'],
          es: ['Tecnología LEP', 'Alcance 2900m', 'Doble haz']
      },
      stock: 10
  },

  // --- AWARD WINNERS & TOP SALES ---
  {
      id: 'nitecore-edc29',
      slug: 'nitecore-edc29',
      name: 'Nitecore EDC29',
      brand: 'Nitecore',
      price: 119.95,
      category: 'tactical',
      description: {
          en: 'The EDC29 uses two UHi 20 MAX LEDs to produce up to 6,500 lumens. It features Rapid Lock™ for quick locking and unlocking, and an extensive armor-inspired anti-slip texture for a more secure grip. Winner of Red Dot Award 2025.',
          fa: 'چراغ قوه EDC29 از دو LED UHi 20 MAX استفاده می‌کند تا تا ۶۵۰۰ لومن نور تولید کند. دارای قفل سریع Rapid Lock™ برای قفل و باز کردن سریع، و بافت ضد لغزش گسترده با الهام از زره برای چسبندگی مطمئن‌تر است. برنده جایزه رد دات ۲۰۲۵.',
          zh: 'EDC29 使用两个 UHi 20 MAX LED 产生高达 6,500 流明的亮度。它具有 Rapid Lock™ 快速锁定技术，用于快速锁定和解锁，以及广泛的装甲风格防滑纹理，以提供更牢固的抓握。2025 红点奖得主。',
          es: 'La EDC29 utiliza dos LED UHi 20 MAX para producir hasta 6,500 lúmenes. Cuenta con Rapid Lock™ para un bloqueo y desbloqueo rápido, y una extensa textura antideslizante inspirada en armaduras para un agarre más seguro. Ganador del premio Red Dot 2025.'
      },
      specs: {
          'Max Output': '6,500 Lumens',
          'LED': '2x UHi 20 MAX',
          'Lock': 'Rapid Lock™',
          'Award': 'Red Dot 2025'
      },
      images: [
          `${NC_FL_BASE}/Uploads/FLASHLIGHTS/goods_img/1727244454.png`,
          `${NC_FL_BASE}/Uploads/Banner/original_img/1736327072.jpg`
      ].map(proxy),
      features: {
          en: ['6500 Lumens', 'Rapid Lock', 'Red Dot Winner'],
          fa: ['۶۵۰۰ لومن', 'قفل سریع', 'برنده رد دات'],
          zh: ['6500 流明', '快速锁定', '红点奖得主'],
          es: ['6500 Lúmenes', 'Bloqueo rápido', 'Ganador Red Dot']
      },
      stock: 30
  },
  {
      id: 'nitecore-mt2a-pro',
      slug: 'nitecore-mt2a-pro',
      name: 'Nitecore MT2A Pro',
      brand: 'Nitecore',
      price: 44.95,
      category: 'tactical',
      description: {
          en: 'The NITECORE MT2A Pro is a high performance rechargeable AA flashlight, debuting with the NiteLab UHi 20 LED. It has a max output of 1,000 lumens and a max throw of 255 meters. It includes a NL1416R rechargeable Li-ion battery and is also compatible with AA batteries.',
          fa: 'چراغ قوه MT2A Pro نایتکور یک چراغ قوه AA قابل شارژ با عملکرد بالا است که با LED جدید NiteLab UHi 20 عرضه شده است. دارای حداکثر خروجی ۱۰۰۰ لومن و برد ۲۵۵ متر است. شامل یک باتری لیتیوم-یون قابل شارژ NL1416R است و همچنین با باتری‌های AA سازگار است.',
          zh: 'NITECORE MT2A Pro 是一款高性能可充电 AA 手电筒，首发搭载 NiteLab UHi 20 LED。它的最大输出为 1,000 流明，最大射程为 255 米。它包括一个 NL1416R 可充电锂离子电池，也兼容 AA 电池。',
          es: 'La NITECORE MT2A Pro es una linterna AA recargable de alto rendimiento, debutando con el LED NiteLab UHi 20. Tiene una salida máxima de 1,000 lúmenes y un alcance máximo de 255 metros. Incluye una batería recargable de iones de litio NL1416R y también es compatible con baterías AA.'
      },
      specs: {
          'Max Output': '1,000 Lumens',
          'Max Beam Distance': '255 m',
          'Battery': 'Rechargeable AA / NL1416R',
          'LED': 'UHi 20'
      },
      images: [
          `${NC_FL_BASE}/Uploads/FLASHLIGHTS/goods_img/1698893090.png`
      ].map(proxy),
      features: {
          en: ['AA Compatible', '1000 Lumens', 'UHi 20 LED'],
          fa: ['سازگار با AA', '۱۰۰۰ لومن', 'LED UHi 20'],
          zh: ['兼容 AA', '1000 流明', 'UHi 20 LED'],
          es: ['Compatible AA', '1000 Lúmenes', 'LED UHi 20']
      },
      stock: 60
  },
  {
      id: 'nitecore-edc23',
      slug: 'nitecore-edc23',
      name: 'Nitecore EDC23',
      brand: 'Nitecore',
      price: 79.95,
      category: 'tactical',
      description: {
          en: 'The NITECORE EDC23 SABER, Ultra Slim Pocket Tactical EDC Flashlight, utilizes the UHi 25 LEDs to deliver 2500 lumens and a throw of 280 meters. It features a compact and ultra short structure, measuring just 102.8mm (4.05") in length.',
          fa: 'چراغ قوه تاکتیکی جیبی فوق باریک EDC23 SABER نایتکور، با استفاده از LEDهای UHi 25 خروجی ۲۵۰۰ لومن و برد ۲۸۰ متر را ارائه می‌دهد. دارای ساختار فشرده و بسیار کوتاه است که تنها ۱۰۲.۸ میلی‌متر طول دارد.',
          zh: 'NITECORE EDC23 SABER 超薄袖珍战术 EDC 手电筒，利用 UHi 25 LED 提供 2500 流明和 280 米射程。它具有紧凑和超短的结构，长度仅为 102.8 毫米。',
          es: 'La NITECORE EDC23 SABER, linterna táctica EDC de bolsillo ultra delgada, utiliza LED UHi 25 para ofrecer 2500 lúmenes y 280 metros de alcance. Cuenta con una estructura compacta y ultra corta, midiendo solo 102.8 mm de longitud.'
      },
      specs: {
          'Max Output': '2,500 Lumens',
          'Max Beam Distance': '280 m',
          'Length': '102.8 mm',
          'Design': 'Ultra Short'
      },
      images: [
          `${NC_FL_BASE}/Uploads/FLASHLIGHTS/goods_img/1730083089.png`
      ].map(proxy),
      features: {
          en: ['Ultra Short', '2500 Lumens', 'Tactical'],
          fa: ['فوق کوتاه', '۲۵۰۰ لومن', 'تاکتیکی'],
          zh: ['超短', '2500 流明', '战术'],
          es: ['Ultra corta', '2500 Lúmenes', 'Táctica']
      },
      stock: 40
  },
  {
      id: 'nitecore-hc65-uhe',
      slug: 'nitecore-hc65-uhe',
      name: 'Nitecore HC65 UHE',
      brand: 'Nitecore',
      price: 119.95,
      category: 'accessory',
      description: {
          en: 'The NITECORE HC65 UHE Ultra High Triple Output Metal Headlamp features an 8-core ultra high efficiency UHE LED that shines up to 2,000 lumens. It includes a 4,000mAh 18650 Li-ion battery; it is IP68-rated and 2m impact resistant.',
          fa: 'هدلامپ فلزی با خروجی سه گانه فوق العاده بالا HC65 UHE نایتکور دارای LED 8 هسته‌ای UHE با کارایی بالا است که تا ۲۰۰۰ لومن می‌درخشد. شامل یک باتری لیتیوم-یون ۱۸۶۵۰ با ظرفیت ۴۰۰۰ میلی‌آمپر ساعت است؛ دارای رتبه IP68 و مقاوم در برابر ضربه تا ۲ متر.',
          zh: 'NITECORE HC65 UHE 超高三输出金属头灯具有 8 核超高效 UHE LED，亮度高达 2,000 流明。它包括一个 4,000mAh 18650 锂离子电池；具有 IP68 防护等级，2 米抗冲击。',
          es: 'La linterna frontal metálica de triple salida ultra alta NITECORE HC65 UHE cuenta con un LED UHE de 8 núcleos de ultra alta eficiencia que brilla hasta 2,000 lúmenes. Incluye una batería de iones de litio 18650 de 4,000 mAh; tiene clasificación IP68 y es resistente a impactos de 2 m.'
      },
      specs: {
          'Max Output': '2,000 Lumens',
          'LED': '8-core UHE',
          'Rating': 'IP68',
          'Battery': '4000mAh 18650'
      },
      images: [
          `${NC_FL_BASE}/Uploads/FLASHLIGHTS/goods_img/1763434108.png`
      ].map(proxy),
      features: {
          en: ['8-Core UHE', '2000 Lumens', 'IP68 Waterproof'],
          fa: ['۸ هسته‌ای UHE', '۲۰۰۰ لومن', 'ضدآب IP68'],
          zh: ['8核 UHE', '2000 流明', 'IP68 防水'],
          es: ['UHE 8 núcleos', '2000 Lúmenes', 'IP68 Impermeable']
      },
      stock: 25
  },
  {
      id: 'nitecore-edc33',
      slug: 'nitecore-edc33',
      name: 'Nitecore EDC33',
      brand: 'Nitecore',
      price: 99.95,
      category: 'tactical',
      description: {
          en: 'In the 2024 ASIA OUTDOOR GEAR AWARDS, NITECORE EDC33 Tactical EDC Flashlight stood out with its comprehensive performance and user experience.',
          fa: 'در جوایز تجهیزات فضای باز آسیا ۲۰۲۴، چراغ قوه تاکتیکی EDC نایتکور EDC33 با عملکرد جامع و تجربه کاربری خود متمایز شد.',
          zh: '在 2024 亚洲户外装备大奖中，NITECORE EDC33 战术 EDC 手电筒凭借其全面的性能和用户体验脱颖而出。',
          es: 'En los PREMIOS ASIA OUTDOOR GEAR 2024, la linterna táctica EDC NITECORE EDC33 destacó por su rendimiento integral y experiencia de usuario.'
      },
      specs: {
          'Award': 'Asia Outdoor Gear 2024',
          'Type': 'Tactical EDC',
          'Performance': 'Comprehensive',
          'Experience': 'Top Tier'
      },
      images: [
          `${NC_FL_BASE}/Uploads/FLASHLIGHTS/goods_img/1735185838.png`
      ].map(proxy),
      features: {
          en: ['Award Winner', 'Tactical', 'High Performance'],
          fa: ['برنده جایزه', 'تاکتیکی', 'عملکرد بالا'],
          zh: ['获奖者', '战术', '高性能'],
          es: ['Ganador de premio', 'Táctica', 'Alto rendimiento']
      },
      stock: 35
  },
  {
      id: 'nitecore-summit10000',
      slug: 'nitecore-summit10000',
      name: 'Summit 10000',
      brand: 'Nitecore',
      price: 89.95,
      category: 'power',
      description: {
          en: 'After winning IDEA 2023 Featured Finalist and GOOD DESIGN AWARD 2023, the NITECORE SUMMIT 10000 Low Temperature Resistant Carbon Fiber Power Bank has won another award for its professional design and outstanding performance – Gold Award of 2023 ASIA OUTDOOR GEAR AWARDS.',
          fa: 'پس از کسب فینالیست ویژه IDEA 2023 و جایزه طراحی خوب ۲۰۲۳، پاور بانک فیبر کربنی مقاوم در برابر دمای پایین SUMMIT 10000 نایتکور جایزه دیگری برای طراحی حرفه‌ای و عملکرد برجسته خود کسب کرده است - جایزه طلایی جوایز تجهیزات فضای باز آسیا ۲۰۲۳.',
          zh: '在获得 IDEA 2023 特色入围者和 2023 优秀设计奖之后，NITECORE SUMMIT 10000 耐低温碳纤维移动电源凭借其专业的设计和出色的性能赢得了另一个奖项 – 2023 亚洲户外装备大奖金奖。',
          es: 'Después de ganar el Finalista Destacado de IDEA 2023 y el GOOD DESIGN AWARD 2023, la batería externa de fibra de carbono resistente a bajas temperaturas NITECORE SUMMIT 10000 ha ganado otro premio por su diseño profesional y rendimiento sobresaliente: el Premio de Oro de los PREMIOS ASIA OUTDOOR GEAR 2023.'
      },
      specs: {
          'Award': 'Gold Award 2023',
          'Feature': 'Low Temp Resistant',
          'Material': 'Carbon Fiber',
          'Capacity': '10,000 mAh'
      },
      images: [
          `${NC_FL_BASE}/Uploads/FLASHLIGHTS/goods_img/1705561533.png`
      ].map(proxy),
      features: {
          en: ['Gold Award', 'Low Temp', 'Carbon Fiber'],
          fa: ['جایزه طلا', 'دمای پایین', 'فیبر کربن'],
          zh: ['金奖', '耐低温', '碳纤维'],
          es: ['Premio de Oro', 'Baja Temp', 'Fibra de carbono']
      },
      stock: 40
  },
  {
      id: 'nitecore-nu25-2021',
      slug: 'nitecore-nu25-2021',
      name: 'Nitecore NU25',
      brand: 'Nitecore',
      price: 49.95,
      category: 'accessory',
      description: {
          en: 'The NITECORE NU25 Dual Beam USB-C Rechargeable Headlamp is available with 3 light sources. Utilizing dual primary lights — Spotlight and Floodlight, it can produce a max output of 400 lumens with a light transmission of over 94%. It is all weather applicable as IP66 rated.',
          fa: 'هدلامپ شارژی USB-C دو پرتو NU25 نایتکور با ۳ منبع نور موجود است. با استفاده از چراغ‌های اصلی دوگانه - نور متمرکز و پخش، می‌تواند حداکثر خروجی ۴۰۰ لومن را با انتقال نور بیش از ۹۴٪ تولید کند. دارای رتبه IP66 و مناسب برای تمام شرایط آب و هوایی.',
          zh: 'NITECORE NU25 双光束 USB-C 可充电头灯具有 3 种光源。利用双主灯——聚光灯和泛光灯，它可以产生最大 400 流明的输出，透光率超过 94%。IP66 防护等级，全天候适用。',
          es: 'La linterna frontal recargable USB-C de doble haz NITECORE NU25 está disponible con 3 fuentes de luz. Utilizando luces primarias duales: foco e inundación, puede producir una salida máxima de 400 lúmenes con una transmisión de luz de más del 94%. Es aplicable a todo clima con clasificación IP66.'
      },
      specs: {
          'Max Output': '400 Lumens',
          'Max Beam Distance': '64 m',
          'Weight': '45 g',
          'Charging': 'USB-C'
      },
      images: [
          `${NC_FL_BASE}/Uploads/FLASHLIGHTS/goods_img/1665472316.png`
      ].map(proxy),
      features: {
          en: ['Dual Beam', 'USB-C', 'Ultra Light'],
          fa: ['پرتو دوگانه', 'USB-C', 'فوق سبک'],
          zh: ['双光束', 'USB-C', '超轻'],
          es: ['Doble haz', 'USB-C', 'Ultra ligera']
      },
      stock: 80
  },
  {
      id: 'nitecore-cw20',
      slug: 'nitecore-cw20',
      name: 'CineWind™ CW20',
      brand: 'Nitecore',
      price: 119.95,
      category: 'tech',
      description: {
          en: 'Winner of Red Dot Award 2025. Multipurpose pocket photography fan that fits easily in one hand. Features a 100W high power brushless motor.',
          fa: 'برنده جایزه رد دات ۲۰۲۵. فن عکاسی جیبی چندمنظوره که به راحتی در یک دست جا می‌شود. دارای موتور براشلس پرقدرت ۱۰۰ وات.',
          zh: '2025 红点奖得主。多用途袖珍摄影风扇，单手即可轻松握持。配备 100W 大功率无刷电机。',
          es: 'Ganador del premio Red Dot 2025. Ventilador de fotografía de bolsillo multiusos que cabe fácilmente en una mano. Cuenta con un motor sin escobillas de alta potencia de 100 W.'
      },
      specs: {
          'Power': '100W',
          'Motor': 'Brushless',
          'Award': 'Red Dot 2025',
          'Runtime': '20 mins max'
      },
      images: [
          `${NC_BASE}/Uploads/Banner/original_img/1730083089.png`
      ].map(proxy),
      features: {
          en: ['100W Motor', 'Red Dot Winner', 'Photography'],
          fa: ['موتور ۱۰۰ وات', 'برنده رد دات', 'عکاسی'],
          zh: ['100W 电机', '红点奖得主', '摄影'],
          es: ['Motor 100W', 'Ganador Red Dot', 'Fotografía']
      },
      stock: 15
  },

  // --- OLIGHT NEW DATA ---
  {
      id: 'olight-arkpro-series',
      slug: 'olight-arkpro-series',
      name: 'ArkPro Series',
      brand: 'Olight',
      price: 103.99,
      category: 'flashlight',
      description: {
          en: 'ArkPro Series – Flat Unibody EDC Flashlight with Multi-Light Sources. The ultimate everyday carry light featuring unique flat design and versatile lighting options.',
          fa: 'سری ArkPro - چراغ قوه EDC تخت یکپارچه با منابع نوری متعدد. چراغ قوه نهایی برای حمل روزمره با طراحی تخت منحصر به فرد.',
          zh: 'ArkPro 系列 – 具有多光源的扁平一体式 EDC 手电筒。终极日常携带灯，具有独特的扁平设计和多功能的照明选项。',
          es: 'Serie ArkPro: linterna EDC plana de cuerpo único con múltiples fuentes de luz. La luz de transporte diario definitiva con diseño plano único.'
      },
      specs: {
          'Max Output': 'High Perf',
          'Type': 'Flat EDC',
          'Feature': 'Multi-Light',
          'Body': 'Unibody'
      },
      images: [
          `${OLIGHT_CDN}/1-znz9n8.jpg@600w_600h_90q.webp`
      ].map(proxy),
      features: {
          en: ['Flat Design', 'Multi-Source', 'EDC'],
          fa: ['طراحی تخت', 'چند منبع', 'EDC'],
          zh: ['扁平设计', '多光源', 'EDC'],
          es: ['Diseño plano', 'Multi-fuente', 'EDC']
      },
      stock: 925
  },
  {
      id: 'olight-warrior-ultra',
      slug: 'olight-warrior-ultra-2500',
      name: 'Warrior Ultra',
      brand: 'Olight',
      price: 111.99,
      category: 'tactical',
      description: {
          en: 'Warrior Ultra 2500 Lumens Tactical Flashlight with OAL Material. A robust and powerful tactical tool designed for extreme conditions.',
          fa: 'چراغ قوه تاکتیکی Warrior Ultra با ۲۵۰۰ لومن و مواد OAL. یک ابزار تاکتیکی قدرتمند و مستحکم که برای شرایط سخت طراحی شده است.',
          zh: 'Warrior Ultra 2500 流明战术手电筒，采用 OAL 材料。专为极端条件设计的坚固强大的战术工具。',
          es: 'Linterna táctica Warrior Ultra de 2500 lúmenes con material OAL. Una herramienta táctica robusta y poderosa diseñada para condiciones extremas.'
      },
      specs: {
          'Max Output': '2500 Lumens',
          'Material': 'OAL',
          'Type': 'Tactical',
          'Throw': 'Long Range'
      },
      images: [
          `${OLIGHT_CDN}/guoqise-3-5pxgqc.jpg@600w_600h_90q.webp`
      ].map(proxy),
      features: {
          en: ['2500 Lumens', 'OAL Material', 'Tactical'],
          fa: ['۲۵۰۰ لومن', 'مواد OAL', 'تاکتیکی'],
          zh: ['2500 流明', 'OAL 材料', '战术'],
          es: ['2500 Lúmenes', 'Material OAL', 'Táctica']
      },
      stock: 470
  },
  {
      id: 'olight-iultra',
      slug: 'olight-iultra-keychain',
      name: 'iUltra Olive Green',
      brand: 'Olight',
      price: 23.99,
      category: 'accessory',
      description: {
          en: 'iUltra Olive Green OAL Keychain Flashlight. Compact, stylish, and durable everyday carry light for your keyring.',
          fa: 'چراغ قوه جاکلیدی iUltra سبز زیتونی با مواد OAL. چراغ قوه EDC فشرده، شیک و بادوام برای دسته کلید شما.',
          zh: 'iUltra 橄榄绿 OAL 钥匙扣手电筒。紧凑、时尚且耐用的钥匙扣日常携带灯。',
          es: 'Linterna de llavero iUltra verde oliva con material OAL. Luz de transporte diario compacta, elegante y duradera para su llavero.'
      },
      specs: {
          'Type': 'Keychain',
          'Color': 'Olive Green',
          'Material': 'OAL',
          'Size': 'Mini'
      },
      images: [
          `${OLIGHT_CDN}/01-bvsoyz.jpg@600w_600h_90q.webp`
      ].map(proxy),
      features: {
          en: ['Keychain Size', 'Olive Green', 'OAL'],
          fa: ['اندازه جاکلیدی', 'سبز زیتونی', 'OAL'],
          zh: ['钥匙扣尺寸', '橄榄绿', 'OAL'],
          es: ['Tamaño llavero', 'Verde oliva', 'OAL']
      },
      stock: 200
  },
  {
      id: 'olight-oclip-pro',
      slug: 'olight-oclip-pro',
      name: 'Oclip Pro',
      brand: 'Olight',
      price: 31.99,
      category: 'accessory',
      description: {
          en: 'Oclip Pro Clip on Flashlight with Floodlight, Spotlight and Red Light. Versatile clip-on light for hands-free illumination.',
          fa: 'چراغ قوه گیره‌ای Oclip Pro با نور پخش، متمرکز و قرمز. چراغ گیره‌ای چندکاره برای روشنایی بدون دخالت دست.',
          zh: 'Oclip Pro 夹式手电筒，带泛光灯、聚光灯和红光。多功能夹式灯，可实现免提照明。',
          es: 'Linterna de clip Oclip Pro con luz de inundación, foco y luz roja. Luz de clip versátil para iluminación manos libres.'
      },
      specs: {
          'Modes': 'Flood, Spot, Red',
          'Mount': 'Clip-on',
          'Usage': 'Hands-free',
          'Compact': 'Yes'
      },
      images: [
          `${OLIGHT_CDN}/1-compressed-ab3lz6.jpg@600w_600h_90q.webp`
      ].map(proxy),
      features: {
          en: ['Clip-on', 'Red Light', 'Versatile'],
          fa: ['گیره‌ای', 'نور قرمز', 'چندکاره'],
          zh: ['夹式', '红光', '多功能'],
          es: ['Con clip', 'Luz roja', 'Versátil']
      },
      stock: 1200
  },
  {
      id: 'olight-seeker-4-pro',
      slug: 'olight-seeker-4-pro',
      name: 'Seeker 4 Pro',
      brand: 'Olight',
      price: 97.99,
      category: 'flashlight',
      description: {
          en: 'Seeker 4 Pro High Power Flashlight. The ultimate search light with incredible brightness and dimming capabilities.',
          fa: 'چراغ قوه پرقدرت Seeker 4 Pro. چراغ جستجوی نهایی با روشنایی باورنکردنی و قابلیت تنظیم نور.',
          zh: 'Seeker 4 Pro 大功率手电筒。终极搜索灯，具有令人难以置信的亮度和调光功能。',
          es: 'Linterna de alta potencia Seeker 4 Pro. La luz de búsqueda definitiva con un brillo increíble y capacidades de atenuación.'
      },
      specs: {
          'Type': 'High Power',
          'Series': 'Seeker',
          'Feature': 'Stepless Dimming',
          'Charging': 'MCC'
      },
      images: [
          `${OLIGHT_CDN}/3-1v7ngm-nr3wa9-684ffs.jpg@600w_600h_90q.webp`
      ].map(proxy),
      features: {
          en: ['High Power', 'Search Light', 'Dimming'],
          fa: ['قدرت بالا', 'چراغ جستجو', 'دیمر'],
          zh: ['大功率', '搜索灯', '调光'],
          es: ['Alta potencia', 'Luz de búsqueda', 'Atenuación']
      },
      stock: 1993
  },
  {
      id: 'olight-arkfeld-pro',
      slug: 'olight-arkfeld-pro',
      name: 'Arkfeld Pro',
      brand: 'Olight',
      price: 99.99,
      category: 'flashlight',
      description: {
          en: 'Arkfeld Pro Flat EDC Flashlight with LED Light, UV and Laser. A triple-source EDC flashlight that handles every situation.',
          fa: 'چراغ قوه EDC تخت Arkfeld Pro با نور LED، UV و لیزر. یک چراغ قوه EDC با سه منبع نوری که هر موقعیتی را مدیریت می‌کند.',
          zh: 'Arkfeld Pro 扁平 EDC 手电筒，带 LED 灯、紫外线和激光。处理各种情况的三光源 EDC 手电筒。',
          es: 'Linterna EDC plana Arkfeld Pro con luz LED, UV y láser. Una linterna EDC de triple fuente que maneja cualquier situación.'
      },
      specs: {
          'Sources': 'LED, UV, Laser',
          'Shape': 'Flat',
          'Type': 'EDC',
          'Laser': 'Class 1/3R'
      },
      images: [
          `${OLIGHT_CDN}/1-4w1h9x.jpg@600w_600h_90q.webp`
      ].map(proxy),
      features: {
          en: ['UV Light', 'Green Laser', 'Flat Body'],
          fa: ['نور UV', 'لیزر سبز', 'بدنه تخت'],
          zh: ['紫外线', '绿激光', '扁平机身'],
          es: ['Luz UV', 'Láser verde', 'Cuerpo plano']
      },
      stock: 3203
  },
  {
      id: 'olight-arkfeld-ultra',
      slug: 'olight-arkfeld-ultra',
      name: 'Arkfeld Ultra',
      brand: 'Olight',
      price: 119.99,
      category: 'flashlight',
      description: {
          en: 'Arkfeld Ultra 3-in-1 EDC Flashlight with O-aluminum Material. Premium material meets versatile functionality.',
          fa: 'چراغ قوه EDC سه کاره Arkfeld Ultra با مواد O-aluminum. مواد ممتاز با عملکرد چندکاره ملاقات می‌کند.',
          zh: 'Arkfeld Ultra 三合一 EDC 手电筒，采用 O-铝材料。优质材料满足多功能性。',
          es: 'Linterna EDC 3 en 1 Arkfeld Ultra con material O-aluminio. El material premium se une a la funcionalidad versátil.'
      },
      specs: {
          'Material': 'O-aluminum',
          'Functions': '3-in-1',
          'Design': 'Premium',
          'Series': 'Arkfeld'
      },
      images: [
          `${OLIGHT_CDN}/aku-gll-kb-lahm6d.jpg@600w_600h_90q.webp`
      ].map(proxy),
      features: {
          en: ['O-aluminum', '3-in-1', 'Premium'],
          fa: ['O-aluminum', 'سه کاره', 'ممتاز'],
          zh: ['O-铝', '三合一', '优质'],
          es: ['O-aluminio', '3 en 1', 'Premium']
      },
      stock: 2190
  },
  {
      id: 'olight-baton-turbo',
      slug: 'olight-baton-turbo',
      name: 'Baton Turbo',
      brand: 'Olight',
      price: 59.99,
      category: 'flashlight',
      description: {
          en: 'Baton Turbo Compact EDC Flashlight with 510m Long-Range Beam. Incredible throw in a pocket-sized form factor.',
          fa: 'چراغ قوه EDC فشرده Baton Turbo با برد طولانی ۵۱۰ متر. پرتاب نور باورنکردنی در اندازه جیبی.',
          zh: 'Baton Turbo 紧凑型 EDC 手电筒，具有 510 米长射程光束。口袋大小的惊人射程。',
          es: 'Linterna EDC compacta Baton Turbo con haz de largo alcance de 510 m. Alcance increíble en un formato de bolsillo.'
      },
      specs: {
          'Throw': '510m',
          'Size': 'Compact',
          'Series': 'Baton',
          'Type': 'Turbo'
      },
      images: [
          `${OLIGHT_CDN}/03-5cd3h4.jpg@600w_600h_90q.webp`
      ].map(proxy),
      features: {
          en: ['510m Throw', 'Compact', 'Turbo'],
          fa: ['برد ۵۱۰ متر', 'فشرده', 'توربو'],
          zh: ['510米射程', '紧凑', '涡轮'],
          es: ['Alcance 510m', 'Compacta', 'Turbo']
      },
      stock: 1446
  },
  {
      id: 'olight-baton-3-pro-max',
      slug: 'olight-baton-3-pro-max',
      name: 'Baton 3 Pro Max',
      brand: 'Olight',
      price: 89.99,
      category: 'flashlight',
      description: {
          en: 'Baton 3 Pro Max 2500 Lumens Powerful EDC Flashlight. The powerful upgrade to the classic Baton series with motion sensor control.',
          fa: 'چراغ قوه قدرتمند EDC Baton 3 Pro Max با ۲۵۰۰ لومن. ارتقای قدرتمند سری کلاسیک Baton با کنترل سنسور حرکتی.',
          zh: 'Baton 3 Pro Max 2500 流明强大 EDC 手电筒。经典 Baton 系列的强大升级，带有运动传感器控制。',
          es: 'Linterna EDC potente Baton 3 Pro Max de 2500 lúmenes. La potente actualización de la clásica serie Baton con control por sensor de movimiento.'
      },
      specs: {
          'Max Output': '2500 Lumens',
          'Sensor': 'Proximity',
          'Battery': '21700',
          'Switch': 'Side Switch'
      },
      images: [
          `${OLIGHT_CDN}/publicpreview-1-ej0h3h.png@600w_600h_90q.webp`
      ].map(proxy),
      features: {
          en: ['2500 Lumens', 'Motion Sensor', '21700 Battery'],
          fa: ['۲۵۰۰ لومن', 'سنسور حرکت', 'باتری ۲۱۷۰۰'],
          zh: ['2500 流明', '运动传感器', '21700 电池'],
          es: ['2500 Lúmenes', 'Sensor mov.', 'Batería 21700']
      },
      stock: 1230
  },
  {
      id: 'olight-perun-3',
      slug: 'olight-perun-3',
      name: 'Perun 3',
      brand: 'Olight',
      price: 63.99,
      category: 'accessory',
      description: {
          en: 'Perun 3 Headlamp 3000 Lumens White Light and Red Light. A versatile right-angle light doubling as a headlamp and handheld.',
          fa: 'هدلامپ Perun 3 با ۳۰۰۰ لومن نور سفید و قرمز. یک چراغ زاویه‌دار چندکاره که هم به عنوان هدلامپ و هم چراغ دستی عمل می‌کند.',
          zh: 'Perun 3 头灯 3000 流明白光和红光。多功能直角灯，可用作头灯和手持设备。',
          es: 'Linterna frontal Perun 3 de 3000 lúmenes luz blanca y luz roja. Una luz de ángulo recto versátil que funciona como linterna frontal y de mano.'
      },
      specs: {
          'Max Output': '3000 Lumens',
          'Modes': 'White + Red',
          'Type': 'Right Angle',
          'Mount': 'Headband'
      },
      images: [
          `${OLIGHT_CDN}/042520fa-4b3e-4699-a8c0-ed34d2956401-zx6974.png@600w_600h_90q.webp`
      ].map(proxy),
      features: {
          en: ['3000 Lumens', 'Red Light', 'Right Angle'],
          fa: ['۳۰۰۰ لومن', 'نور قرمز', 'زاویه قائمه'],
          zh: ['3000 流明', '红光', '直角'],
          es: ['3000 Lúmenes', 'Luz roja', 'Ángulo recto']
      },
      stock: 531
  },
  
  // --- WUBEN NEW DATA ---
  {
      id: 'wuben-x1',
      slug: 'wuben-x1',
      name: 'Wuben X1',
      brand: 'Wuben',
      price: 179.00,
      category: 'flashlight',
      description: {
          en: 'Small and Powerful ECL Flashlight 12000 Lumens. Active cooling system.',
          fa: 'چراغ قوه قدرتمند و کوچک ECL با ۱۲۰۰۰ لومن. سیستم خنک کننده فعال.',
          zh: '小巧强大的 ECL 手电筒 12000 流明。主动冷却系统。',
          es: 'Linterna ECL pequeña y potente de 12000 lúmenes. Sistema de refrigeración activo.'
      },
      specs: {
          'Max Output': '12,000 Lumens',
          'Cooling': 'Active Fan',
          'Battery': 'Built-in',
          'Charging': 'USB-C'
      },
      images: [
          `${WB_CDN}/X1_c359ceef-9747-4052-a034-a56eed388a57.jpg`,
          `${WB_CDN}/B670519A-163D-4583-A706-5B5D724FA91C.png`
      ].map(proxy),
      features: {
          en: ['12000 Lumens', 'Active Cooling', 'Compact'],
          fa: ['۱۲۰۰۰ لومن', 'خنک کننده فعال', 'فشرده'],
          zh: ['12000 流明', '主动冷却', '紧凑'],
          es: ['12000 Lúmenes', 'Refrigeración activa', 'Compacta']
      },
      stock: 20
  },
  {
      id: 'wuben-x1-pro',
      slug: 'wuben-x1-pro',
      name: 'Wuben X1 Pro',
      brand: 'Wuben',
      price: 199.00,
      category: 'flashlight',
      description: {
          en: 'Compact & Powerful WUBEN X1Pro-Explorer.',
          fa: 'فشرده و قدرتمند WUBEN X1Pro-Explorer.',
          zh: '紧凑且强大的 WUBEN X1Pro-Explorer。',
          es: 'Compacta y potente WUBEN X1Pro-Explorer.'
      },
      specs: {
          'Max Output': 'High',
          'Type': 'Explorer',
          'Series': 'X-Series'
      },
      images: [
          `${WB_CDN}/lQLPJyCqpu6wyp_NA97NB4CwfsU4nhrhVfcI3k4FF0nOAA_1920_990.png`,
          `${WB_CDN}/lQLPJwjnCrvT2Z_NAeDNAliwk9_bVJgAqrkI3k4FF0nOAQ_600_480.png`
      ].map(proxy),
      features: {
          en: ['Compact', 'Powerful', 'Explorer'],
          fa: ['فشرده', 'قدرتمند', 'Explorer'],
          zh: ['紧凑', '强大', '探索者'],
          es: ['Compacta', 'Potente', 'Explorador']
      },
      stock: 15
  },
  {
      id: 'wuben-x4',
      slug: 'wuben-x4',
      name: 'Wuben X4',
      brand: 'Wuben',
      price: 38.99,
      category: 'flashlight',
      description: {
          en: 'Powerful Main Light – Up to 1500 lumens with customizable output, flood + spot beam, and a 205m throw. Versatile Side Light – Easily switch between RGB modes or 4000K warm white. Compact & Lightweight – Just 89.7g. Long-Lasting Power – USB-C fast charging, up to 720 hours of runtime. Hands-Free Use – Magnetic base, pocket clip.',
          fa: 'نور اصلی قدرتمند - تا ۱۵۰۰ لومن با خروجی قابل تنظیم، پرتو پخش + متمرکز و برد ۲۰۵ متر. نور جانبی متنوع - تغییر آسان بین حالت‌های RGB یا سفید گرم ۴۰۰۰ کلوین. فشرده و سبک - تنها ۸۹.۷ گرم. قدرت ماندگار - شارژ سریع USB-C، تا ۷۲۰ ساعت کارکرد. استفاده بدون دست - پایه مغناطیسی، گیره جیبی.',
          zh: '强大的主灯 – 高达 1500 流明，可自定义输出，泛光 + 聚光束，射程 205 米。多功能侧灯 – 轻松切换 RGB 模式或 4000K 暖白光。紧凑轻便 – 仅 89.7 克。持久动力 – USB-C 快速充电，续航时间长达 720 小时。免提使用 – 磁性底座，口袋夹。',
          es: 'Luz principal potente: hasta 1500 lúmenes con salida personalizable, haz de inundación + punto y alcance de 205 m. Luz lateral versátil: cambie fácilmente entre modos RGB o blanco cálido de 4000 K. Compacto y ligero: solo 89,7 g. Energía duradera: carga rápida USB-C, hasta 720 horas de autonomía. Uso manos libres: base magnética, clip de bolsillo.'
      },
      specs: {
          'Max Output': '1500 Lumens',
          'Runtime': '720H',
          'Beam Distance': '205m',
          'Side Light': 'RGB + 4000K',
          'Waterproof': 'IP68'
      },
      images: [
          `https://www.wubenlight.com/cdn/shop/files/X4_2f93154b-bd15-4a1b-be44-6f3ee0e43e97.jpg?v=1757576711`,
          `https://www.wubenlight.com/cdn/shop/files/002.png?v=1757512739`,
          `https://www.wubenlight.com/cdn/shop/files/2_da4b28eb-1bac-49df-aaf3-9ad114350123.jpg?v=1757512739`,
          `https://www.wubenlight.com/cdn/shop/files/lQDPKdjSI4JZa73NFePNINCwd6w1czbEJQQIm-bzPUOKAA_8400_5603.jpg?v=1757512739`,
          `https://www.wubenlight.com/cdn/shop/files/X4_fca69169-dab9-48ba-a2e5-2e27cdae5d34.jpg?v=1757512739`,
          `https://www.wubenlight.com/cdn/shop/files/4_54e39f27-63cc-459b-a646-ac087ca6a7f5.jpg?v=1757512739`,
          `https://www.wubenlight.com/cdn/shop/files/3_a7f8c7d8-668f-4bd9-800d-731bf34be80a.jpg?v=1757512739`,
          `https://www.wubenlight.com/cdn/shop/files/5_cdcebc13-15d9-4969-b826-d2837d87bf30.jpg?v=1757512739`,
          `https://www.wubenlight.com/cdn/shop/files/6_ff83d588-35c7-4c91-9ce0-189487f1abca.jpg?v=1757512739`,
          `https://www.wubenlight.com/cdn/shop/files/1_700e62e1-4ac5-4319-969c-108f43e4efd9.jpg?v=1757512739`,
          `https://www.wubenlight.com/cdn/shop/files/11_2650b71d-6387-4479-ac5f-cef660285f12.jpg?v=1757512739`,
          `https://www.wubenlight.com/cdn/shop/files/X4_83f1ab35-f3a9-4fa4-b27e-9eb4190273aa.jpg?v=1757512739`,
          `https://www.wubenlight.com/cdn/shop/files/14_d1c72170-6e02-49ee-a01e-dcef7c65a6c1.jpg?v=1757512739`,
          `https://www.wubenlight.com/cdn/shop/files/12_8e27d319-c316-425c-ad75-1a83ddb33078.jpg?v=1757512739`,
          `https://www.wubenlight.com/cdn/shop/files/13_59922168-ad58-461b-aef3-dfd2e4ef2139.jpg?v=1757512739`,
          `https://www.wubenlight.com/cdn/shop/files/15_f6e387eb-15c5-406a-91db-5d6d9b04912a.jpg?v=1757512739`,
          `https://www.wubenlight.com/cdn/shop/files/16_00080232-6f05-4d86-abfd-dcf39c3cec79.jpg?v=1757512739`,
          `https://www.wubenlight.com/cdn/shop/files/X4_6a82e91b-0229-4a8c-9217-8d446703e43c.jpg?v=1757512739`
      ].map(proxy),
      features: {
          en: ['1500 Lumens', 'RGB Side Light', 'Magnetic Base', 'USB-C Charging'],
          fa: ['۱۵۰۰ لومن', 'نور جانبی RGB', 'پایه مغناطیسی', 'شارژ USB-C'],
          zh: ['1500 流明', 'RGB 侧灯', '磁性底座', 'USB-C 充电'],
          es: ['1500 Lúmenes', 'Luz lateral RGB', 'Base magnética', 'Carga USB-C']
      },
      stock: 60
  },
  {
      id: 'wuben-g5',
      slug: 'wuben-g5',
      name: 'Wuben G5',
      brand: 'Wuben',
      price: 29.99,
      category: 'accessory',
      description: {
          en: 'Wuben G5 400 Lumen Quick Release Keychain Light. Small & Bright.',
          fa: 'چراغ جاکلیدی ۴۰۰ لومن Wuben G5. کوچک و پرنور.',
          zh: 'Wuben G5 400 流明快速释放钥匙扣灯。小巧明亮。',
          es: 'Luz de llavero de liberación rápida Wuben G5 de 400 lúmenes. Pequeña y brillante.'
      },
      specs: {
          'Max Output': '400 Lumens',
          'Type': 'Keychain',
          'Feature': 'Quick Release'
      },
      images: [
          `${WB_CDN}/G5_94fc98f6-4c83-4a72-a3a4-d2251d57d71a.jpg`,
          `${WB_CDN}/FotoJet_3.jpg`,
          `${WB_CDN}/G5_f7284d87-9795-432a-8305-56b1e8a52ada.jpg`,
          `${WB_CDN}/1750235669__1750235666244-494048.jpg`,
          `${WB_CDN}/G5_-2_2560x720_9bb35860-d208-427c-9421-c641c02231d5.jpg`
      ].map(proxy),
      features: {
          en: ['400 Lumens', 'Quick Release', 'Keychain'],
          fa: ['۴۰۰ لومن', 'آزاد سازی سریع', 'جاکلیدی'],
          zh: ['400 流明', '快速释放', '钥匙扣'],
          es: ['400 Lúmenes', 'Liberación rápida', 'Llavero']
      },
      stock: 100
  },
  {
      id: 'wuben-h4',
      slug: 'wuben-h4',
      name: 'Wuben H4',
      brand: 'Wuben',
      price: 39.99,
      category: 'accessory',
      description: {
          en: 'Wuben H4 Headlamp 800 Lumens. 3 Light Sources for versatile use.',
          fa: 'هدلامپ ۸۰۰ لومن Wuben H4. دارای ۳ منبع نوری برای کاربردهای متنوع.',
          zh: 'Wuben H4 头灯 800 流明。3种光源，用途广泛。',
          es: 'Linterna frontal Wuben H4 de 800 lúmenes. 3 fuentes de luz para uso versátil.'
      },
      specs: {
          'Max Output': '800 Lumens',
          'Sources': '3 Lights',
          'Type': 'Headlamp'
      },
      images: [
          `${WB_CDN}/H4_1920x990_18855315-a360-4d92-aaa3-2013e338c070.jpg`,
          `${WB_CDN}/H4_600x480_5ad174a0-e802-45d0-852e-58fdcd6d67d0.jpg`
      ].map(proxy),
      features: {
          en: ['800 Lumens', '3 Sources', 'Headlamp'],
          fa: ['۸۰۰ لومن', '۳ منبع', 'هدلامپ'],
          zh: ['800 流明', '3光源', '头灯'],
          es: ['800 Lúmenes', '3 Fuentes', 'Frontal']
      },
      stock: 50
  },
   {
      id: 'wuben-x3',
      slug: 'wuben-x3',
      name: 'Wuben X3',
      brand: 'Wuben',
      price: 69.99,
      category: 'flashlight',
      description: {
          en: 'Wuben X3 Best EDC Flashlight 700 Lumens. 180° Rotating Head, Wireless Charging.',
          fa: 'بهترین چراغ قوه EDC ووبن X3 با ۷۰۰ لومن. سر چرخشی ۱۸۰ درجه، شارژ بی‌سیم.',
          zh: 'Wuben X3 最佳 EDC 手电筒 700 流明。180° 旋转头，无线充电。',
          es: 'La mejor linterna EDC Wuben X3 de 700 lúmenes. Cabezal giratorio de 180°, carga inalámbrica.'
      },
      specs: {
          'Max Output': '700 Lumens',
          'Head': '180° Rotating',
          'Charging': 'Wireless/USB-C',
          'Body': 'Glow in Dark (some models)'
      },
      images: [
          `${WB_CDN}/X3_3da07585-8b71-4c6f-acef-a13a87f9de57.jpg`,
          `${WB_CDN}/589773E3-4469-4fc6-BCBA-7DDBE9C079C8.png`,
          `${WB_CDN}/X3_758d9ded-280e-4e4d-ba22-2017379985be.jpg`,
          `${WB_CDN}/1744107311__0__G-K9Ll3i__71OOGhs.jpg`
      ].map(proxy),
      features: {
          en: ['700 Lumens', 'Rotating Head', 'Wireless Charge'],
          fa: ['۷۰۰ لومن', 'سر چرخشی', 'شارژ بی‌سیم'],
          zh: ['700 流明', '旋转头', '无线充电'],
          es: ['700 Lúmenes', 'Cabezal giratorio', 'Carga inalámbrica']
      },
      stock: 80
  },
  {
      id: 'wuben-e7',
      slug: 'wuben-e7',
      name: 'Wuben E7',
      brand: 'Wuben',
      price: 25.99,
      category: 'accessory',
      description: {
          en: 'Wuben E7 Best Rechargeable LED Headlamp 1800 Lumens. Sensor control available.',
          fa: 'بهترین هدلامپ شارژی LED ووبن E7 با ۱۸۰۰ لومن. کنترل سنسور موجود است.',
          zh: 'Wuben E7 最佳可充电 LED 头灯 1800 流明。可提供传感器控制。',
          es: 'La mejor linterna frontal LED recargable Wuben E7 de 1800 lúmenes. Control por sensor disponible.'
      },
      specs: {
          'Max Output': '1800 Lumens',
          'Battery': '18350',
          'Type': 'Headlamp/EDC'
      },
      images: [
          `${WB_CDN}/1920__26.jpg`,
          `${WB_CDN}/1745293125__wyveb__original.jpg`
      ].map(proxy),
      features: {
          en: ['1800 Lumens', 'Rechargeable', 'Compact'],
          fa: ['۱۸۰۰ لومن', 'قابل شارژ', 'فشرده'],
          zh: ['1800 流明', '可充电', '紧凑'],
          es: ['1800 Lúmenes', 'Recargable', 'Compacta']
      },
      stock: 60
  },
  {
      id: 'wuben-pl01',
      slug: 'wuben-pl01',
      name: 'Wuben PL01',
      brand: 'Wuben',
      price: 35.00,
      category: 'flashlight',
      description: {
          en: 'Wuben PL01 Penlight. Solid materials, rechargeable, low light mode lasts all day.',
          fa: 'چراغ خودکاری Wuben PL01. مواد محکم، قابل شارژ، حالت نور کم تمام روز کار می‌کند.',
          zh: 'Wuben PL01 笔灯。坚固的材料，可充电，低光模式可持续一整天。',
          es: 'Linterna tipo bolígrafo Wuben PL01. Materiales sólidos, recargable, modo de luz baja dura todo el día.'
      },
      specs: {
          'Type': 'Penlight',
          'Charging': 'Rechargeable',
          'Design': 'Pen Shape'
      },
      images: [
          `${WB_CDN}/1751619994__0__gvpO6Gyd__617s631.jpg`
      ].map(proxy),
      features: {
          en: ['Penlight', 'Rechargeable', 'Durable'],
          fa: ['چراغ خودکاری', 'قابل شارژ', 'بادوام'],
          zh: ['笔灯', '可充电', '耐用'],
          es: ['Tipo bolígrafo', 'Recargable', 'Duradera']
      },
      stock: 40
  },

  {
      id: 'vic-classic-sd',
      slug: 'victorinox-classic-sd',
      name: 'Classic SD',
      brand: 'Victorinox',
      price: 24.00,
      category: 'knife',
      description: {
          en: 'For more than a century, the Classic SD has been an icon of sleek functionality.',
          fa: 'برای بیش از یک قرن، Classic SD نمادی از کارایی شیک بوده است.',
          zh: '一个多世纪以来，Classic SD 一直是时尚功能的象征。',
          es: 'Durante más de un siglo, la Classic SD ha sido un icono de funcionalidad elegante.'
      },
      specs: {
          'Length': '58 mm',
          'Tools': '7 Functions',
          'Weight': '21 g',
          'Scale Material': 'ABS / Cellidor'
      },
      images: [
          `${VIC_CDN}/d391e6ed-e58b-4081-896e-046d554293a4/SAK_0-6223_S1-jpg`
      ].map(proxy),
      features: {
          en: ['Small Blade', 'Scissors', 'Nail File', 'Screwdriver'],
          fa: ['تیغه کوچک', 'قیچی', 'سوهان ناخن', 'پیچ‌گوشتی'],
          zh: ['小刀', '剪刀', '指甲锉', '螺丝刀'],
          es: ['Hoja pequeña', 'Tijeras', 'Lima de uñas', 'Destornillador']
      },
      stock: 150
  },
  // --- VICTORINOX ONYX LIMITED EDITION ---
  {
      id: 'vic-spartan-onyx',
      slug: 'victorinox-spartan-onyx-black',
      name: 'Spartan Onyx Black',
      brand: 'Victorinox',
      price: 89.00,
      category: 'knife',
      description: {
          en: 'We’ve given our iconic pocket knife a glossy makeover, raising its style game to new heights: meet the lustrous Spartan Onyx Black. Thanks to a special polispectral process, the monochrome black finish not only looks timelessly classy, it’s extra durable, too. This sleek knife combines exceptional multifunctionality to tackle DIY or picnic tasks with charisma and depth.',
          fa: 'ما به چاقوی جیبی نمادین خود ظاهری براق بخشیده‌ایم و سبک آن را به ارتفاعات جدیدی ارتقا داده‌ایم: با اسپارتان اونیکس مشکی درخشان آشنا شوید. به لطف فرآیند خاص پلی‌اسپکترال، روکش مشکی تک‌رنگ نه تنها کلاسیک و جاودانه به نظر می‌رسد، بلکه بسیار بادوام نیز هست. این چاقوی شیک، چندکاره بودن استثنایی را برای انجام کارهای فنی یا پیک‌نیک با جذابیت و عمق ترکیب می‌کند.',
          zh: '我们要给我们的标志性袖珍刀进行光泽改造，将其风格提升到新的高度：遇见光泽的斯巴达黑玛瑙。由于特殊的光谱工艺，单色黑色饰面不仅看起来永恒经典，而且非常耐用。这款时尚的刀具结合了卓越的多功能性，以魅力和深度应对 DIY 或野餐任务。',
          es: 'Le hemos dado a nuestra icónica navaja de bolsillo un cambio de imagen brillante, elevando su estilo a nuevas alturas: conozca la lustrosa Spartan Onyx Black. Gracias a un proceso poliespectral especial, el acabado negro monocromático no solo se ve atemporalmente elegante, sino que también es extra duradero. Esta elegante navaja combina una multifuncionalidad excepcional para abordar tareas de bricolaje o picnic con carisma y profundidad.'
      },
      specs: {
          'Functions': '12',
          'Length': '91 mm',
          'Scale Material': 'Polyamide',
          'Color': 'Black'
      },
      images: [
          `https://wsrv.nl/?url=https://imageengine.victorinox.com/transform/0b4930a4-78cd-479b-8bbb-00241c4b1fca/SAK_1-3603-31P_S1_Reddot-jpg?io=transform%3Afit%2Cwidth%3A500%2Cheight%3A370&quality=100&output=webp`
      ],
      features: {
          en: ['Polispectral Finish', '12 Functions', 'Black Tools'],
          fa: ['پوشش پلی‌اسپکترال', '۱۲ عملکرد', 'ابزار مشکی'],
          zh: ['光谱饰面', '12 种功能', '黑色工具'],
          es: ['Acabado poliespectral', '12 funciones', 'Herramientas negras']
      },
      stock: 20
  },
  {
      id: 'vic-ranger-onyx',
      slug: 'victorinox-ranger-55-grip-onyx-black',
      name: 'Ranger 55 Grip Onyx Black',
      brand: 'Victorinox',
      price: 135.00,
      category: 'knife',
      description: {
          en: 'We’ve given our iconic pocket knife a glossy makeover, raising its style game to new heights: meet the lustrous Ranger 55 Grip Onyx Black. Thanks to a special polispectral process, the monochrome black finish not only looks timelessly classy, it’s extra durable, too. This sleek knife combines exceptional multifunctionality and tackles all cutting tasks with strength and charisma.',
          fa: 'ما به چاقوی جیبی نمادین خود ظاهری براق بخشیده‌ایم و سبک آن را به ارتفاعات جدیدی ارتقا داده‌ایم: با رنجر ۵۵ گریپ اونیکس مشکی درخشان آشنا شوید. به لطف فرآیند خاص پلی‌اسپکترال، روکش مشکی تک‌رنگ نه تنها کلاسیک و جاودانه به نظر می‌رسد، بلکه بسیار بادوام نیز هست. این چاقوی شیک، چندکاره بودن استثنایی را ترکیب می‌کند و تمام کارهای برش را با قدرت و کاریزما انجام می‌دهد.',
          zh: '我们要给我们的标志性袖珍刀进行光泽改造，将其风格提升到新的高度：遇见光泽的游侠 55 握把黑玛瑙。由于特殊的光谱工艺，单色黑色饰面不仅看起来永恒经典，而且非常耐用。这款时尚的刀具结合了卓越的多功能性，并以力量和魅力应对所有切割任务。',
          es: 'Le hemos dado a nuestra icónica navaja de bolsillo un cambio de imagen brillante, elevando su estilo a nuevas alturas: conozca la lustrosa Ranger 55 Grip Onyx Black. Gracias a un proceso poliespectral especial, el acabado negro monocromático no solo se ve atemporalmente elegante, sino que también es extra duradero. Esta elegante navaja combina una multifuncionalidad excepcional y aborda todas las tareas de corte con fuerza y carisma.'
      },
      specs: {
          'Functions': '12',
          'Length': '130 mm',
          'Scale Material': 'Polyamide',
          'Feature': 'Lock Blade'
      },
      images: [
          `https://wsrv.nl/?url=https://imageengine.victorinox.com/transform/9033d08e-8457-4ccf-8ea7-61ab9d6ebc37/SAK_0-9563-C31P_B1_Reddot-jpg?io=transform%3Afit%2Cwidth%3A500%2Cheight%3A370&quality=100&output=webp`
      ],
      features: {
          en: ['Ergonomic Grip', 'Large Blade', 'Wood Saw'],
          fa: ['دسته ارگونومیک', 'تیغه بزرگ', 'اره چوب'],
          zh: ['人体工学握把', '大刀', '木锯'],
          es: ['Agarre ergonómico', 'Hoja grande', 'Sierra para madera']
      },
      stock: 15
  },
  {
      id: 'vic-signature-onyx',
      slug: 'victorinox-signature-lite-onyx-black',
      name: 'Signature Lite Onyx Black',
      brand: 'Victorinox',
      price: 65.00,
      category: 'knife',
      description: {
          en: 'We’ve given our iconic pocket knife a glossy makeover, raising its style game to new heights: meet the lustrous Signature Lite Onyx Black. Thanks to a special polispectral process, the monochrome black finish not only looks timelessly classy, it’s extra durable, too. This knife includes an LED light and a handy ballpoint pen for quick notes and truly signature multifunctionality.',
          fa: 'ما به چاقوی جیبی نمادین خود ظاهری براق بخشیده‌ایم و سبک آن را به ارتفاعات جدیدی ارتقا داده‌ایم: با سیگنچر لایت اونیکس مشکی درخشان آشنا شوید. به لطف فرآیند خاص پلی‌اسپکترال، روکش مشکی تک‌رنگ نه تنها کلاسیک و جاودانه به نظر می‌رسد، بلکه بسیار بادوام نیز هست. این چاقو شامل یک چراغ LED و یک خودکار کاربردی برای یادداشت‌برداری سریع و چندکاره بودن واقعی است.',
          zh: '我们要给我们的标志性袖珍刀进行光泽改造，将其风格提升到新的高度：遇见光泽的签名版 Lite 黑玛瑙。由于特殊的光谱工艺，单色黑色饰面不仅看起来永恒经典，而且非常耐用。这款刀具包括一个 LED 灯和一个方便的圆珠笔，用于快速记录笔记，具有真正的标志性多功能性。',
          es: 'Le hemos dado a nuestra icónica navaja de bolsillo un cambio de imagen brillante, elevando su estilo a nuevas alturas: conozca la lustrosa Signature Lite Onyx Black. Gracias a un proceso poliespectral especial, el acabado negro monocromático no solo se ve atemporalmente elegante, sino que también es extra duradero. Esta navaja incluye una luz LED y un práctico bolígrafo para notas rápidas y una multifuncionalidad verdaderamente distintiva.'
      },
      specs: {
          'Functions': '8',
          'Length': '58 mm',
          'Scale Material': 'ABS / Cellidor',
          'Tools': 'LED, Pen'
      },
      images: [
          `https://wsrv.nl/?url=https://imageengine.victorinox.com/transform/7ca2b032-c766-4e7a-8964-b4cfe9e62e55/SAK_0-6226-31P_S1_Reddot-jpg?io=transform%3Afit%2Cwidth%3A500%2Cheight%3A370&quality=100&output=webp`
      ],
      features: {
          en: ['LED Light', 'Ballpoint Pen', 'Compact'],
          fa: ['چراغ LED', 'خودکار', 'فشرده'],
          zh: ['LED 灯', '圆珠笔', '紧凑'],
          es: ['Luz LED', 'Bolígrafo', 'Compacta']
      },
      stock: 50
  }
];
