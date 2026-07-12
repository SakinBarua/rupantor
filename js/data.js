/* ============================================================
   রূপান্তর — Shared Card Data
   250 cards across 14 types
   ============================================================ */

window.RUPANTOR_DATA = (function() {
  const CARD_TYPES = {
    core:       { bn:"কোর",       en:"CORE",       color:"#FF3B3B", c2:"#780000", accent:"#FFD60A" },
    evolution:  { bn:"বিবর্তন",   en:"EVOLUTION",  color:"#FF8500", c2:"#9D2C00", accent:"#FFD60A" },
    memory:     { bn:"স্মৃতি",     en:"MEMORY",     color:"#9D4EDD", c2:"#3C096C", accent:"#FFB703" },
    world:      { bn:"বিশ্ব",      en:"WORLD",      color:"#06A77D", c2:"#023C2C", accent:"#FFE066" },
    reality:    { bn:"বাস্তবতা",   en:"REALITY",    color:"#E63946", c2:"#370617", accent:"#FFD60A" },
    mission:    { bn:"মিশন",      en:"MISSION",    color:"#FFD60A", c2:"#8B6914", accent:"#E63946" },
    time:       { bn:"সময়",      en:"TIME",       color:"#3A86FF", c2:"#003566", accent:"#FFD60A" },
    legendary:  { bn:"কিংবদন্তি", en:"LEGENDARY",  color:"#FFB703", c2:"#7B4400", accent:"#FF3B3B" },
    artifact:   { bn:"আর্টিফ্যাক্ট", en:"ARTIFACT", color:"#B5651D", c2:"#3D1F0A", accent:"#FFD60A" },
    secret:     { bn:"গোপন",      en:"SECRET",     color:"#4A4E69", c2:"#0D0D1F", accent:"#C9A961" },
    awakened:   { bn:"জাগ্রত",    en:"AWAKENED",   color:"#FFD700", c2:"#8B6914", accent:"#FF3B3B" },
    collapse:   { bn:"পতন",      en:"COLLAPSE",   color:"#6A040F", c2:"#03071E", accent:"#DC2F02" },
    special:    { bn:"বিশেষ",    en:"SPECIAL",    color:"#F72585", c2:"#3A0CA3", accent:"#FFD60A" },
    hidden:     { bn:"গুপ্ত",     en:"HIDDEN",     color:"#1D3557", c2:"#000814", accent:"#C9A961" },
  };

  const ALL_CARDS = [
    ["core","বীজ","Seed"],["core","শিকড়","Root"],["core","কাণ্ড","Stem"],["core","পাতা","Leaf"],["core","কুঁড়ি","Bud"],
    ["core","ফুল","Flower"],["core","ফল","Fruit"],["core","ডাল","Branch"],["core","বৃক্ষ","Tree"],["core","লতা","Vine"],
    ["core","ঘাস","Grass"],["core","শৈবাল","Moss"],["core","মৃত্তিকা","Soil"],["core","পাথর","Stone"],["core","বালি","Sand"],
    ["core","জল","Water"],["core","অগ্নি","Fire"],["core","বায়ু","Air"],["core","আকাশ","Sky"],["core","মেঘ","Cloud"],
    ["core","নদী","River"],["core","পাহাড়","Mountain"],["core","উপত্যকা","Valley"],["core","সমুদ্র","Sea"],["core","দ্বীপ","Island"],
    ["core","উপকূল","Shore"],["core","তারকা","Star"],["core","চাঁদ","Moon"],["core","সূর্য","Sun"],["core","গ্রহণ","Eclipse"],
    ["evolution","অঙ্কুরিত বীজ","Sprouted Seed"],["evolution","বিস্তারিত শিকড়","Spread Root"],["evolution","বিকশিত কুঁড়ি","Bloomed Bud"],
    ["evolution","পরিণত ফুল","Mature Flower"],["evolution","পরিপক্ব ফল","Ripened Fruit"],["evolution","বিস্তৃত ডাল","Extended Branch"],
    ["evolution","প্রাচীন বৃক্ষ","Ancient Tree"],["evolution","বিস্তারিত লতা","Sprawling Vine"],["evolution","ঘন ঘাস","Dense Grass"],
    ["evolution","গভীর শৈবাল","Deep Moss"],["evolution","উর্বর মৃত্তিকা","Fertile Soil"],["evolution","প্রখর অগ্নি","Intense Fire"],
    ["evolution","প্রবল বায়ু","Powerful Wind"],["evolution","বিস্তৃত আকাশ","Vast Sky"],["evolution","জমে থাকা মেঘ","Accumulated Cloud"],
    ["evolution","প্রবাহিত নদী","Flowing River"],["evolution","উচ্চ পাহাড়","High Mountain"],["evolution","সমৃদ্ধ উপত্যকা","Rich Valley"],
    ["evolution","বিশাল সমুদ্র","Vast Sea"],["evolution","দূরবর্তী দ্বীপ","Distant Island"],["evolution","উজ্জ্বল তারকা","Bright Star"],
    ["evolution","পূর্ণ চাঁদ","Full Moon"],
    ["memory","প্রথম স্মৃতি","First Memory"],["memory","হারানো স্মৃতি","Lost Memory"],["memory","গভীর স্মৃতি","Deep Memory"],
    ["memory","অস্পষ্ট স্মৃতি","Faint Memory"],["memory","প্রাচীন স্মৃতি","Ancient Memory"],["memory","নতুন স্মৃতি","New Memory"],
    ["memory","গোপন স্মৃতি","Secret Memory"],["memory","ভাগ করা স্মৃতি","Shared Memory"],["memory","একা স্মৃতি","Lonely Memory"],
    ["memory","সুখের স্মৃতি","Happy Memory"],["memory","দুঃখের স্মৃতি","Sad Memory"],["memory","ভয়ের স্মৃতি","Fearful Memory"],
    ["memory","সাহসের স্মৃতি","Courage Memory"],["memory","প্রেমের স্মৃতি","Love Memory"],["memory","ক্ষোভের স্মৃতি","Anger Memory"],
    ["memory","ক্ষমার স্মৃতি","Forgiveness Memory"],["memory","ত্যাগের স্মৃতি","Sacrifice Memory"],["memory","বিজয়ের স্মৃতি","Victory Memory"],
    ["memory","পরাজয়ের স্মৃতি","Defeat Memory"],["memory","শুরুর স্মৃতি","Beginning Memory"],["memory","শেষের স্মৃতি","Ending Memory"],
    ["memory","অসমাপ্ত স্মৃতি","Unfinished Memory"],
    ["world","নীরব বন","Silent Forest"],["world","গম্ভীর পাহাড়","Solemn Mountain"],["world","প্রশান্ত হ্রদ","Tranquil Lake"],
    ["world","বন্য সমুদ্র","Wild Sea"],["world","অনন্ত মরু","Endless Desert"],["world","ঘন কুয়াশা","Dense Fog"],
    ["world","জ্যোতির্ময় আকাশ","Luminous Sky"],["world","অন্ধকার গুহা","Dark Cave"],["world","উঁচু শৃঙ্গ","High Peak"],
    ["world","গভীর খাদ","Deep Canyon"],["world","পবিত্র উপত্যকা","Sacred Valley"],["world","অভিশপ্ত ভূমি","Cursed Land"],
    ["world","বরফাবৃত প্রান্তর","Snowy Field"],["world","উষ্ণ সমভূমি","Warm Plain"],["world","ঘূর্ণিত নদী","Swirling River"],
    ["world","স্থির পুকুর","Still Pond"],["world","বিশাল গাছতলা","Vast Canopy"],["world","খোলা প্রান্তর","Open Meadow"],
    ["world","আদিম অরণ্য","Primeval Forest"],["world","পতিত নগরী","Fallen City"],["world","উদীয়মান দ্বীপ","Rising Island"],
    ["world","নিমজ্জিত মহাদেশ","Sunken Continent"],
    ["reality","বাস্তবতা ফাটল","Reality Rift"],["reality","সময় বিভাজন","Time Split"],["reality","স্থান বিকৃতি","Spatial Distortion"],
    ["reality","দিক বিপর্যয়","Directional Chaos"],["reality","সত্য প্রতিফলন","Truth Reflection"],["reality","অস্তিত্ব সংশয়","Existential Doubt"],
    ["reality","সম্ভাবনা বিভাজন","Probability Split"],["reality","নিয়তি পরিবর্তন","Fate Shift"],["reality","কারণ বিচ্ছিন্নতা","Causal Severance"],
    ["reality","প্রভাব বিপর্যয়","Effect Chaos"],["reality","স্মৃতি পুনর্লিখন","Memory Rewrite"],["reality","সত্তা বিভাজন","Self Split"],
    ["reality","বাস্তবতা ঘূর্ণন","Reality Rotation"],["reality","সময় প্রবাহ পরিবর্তন","Time Flow Change"],["reality","স্থান সংকোচন","Spatial Contraction"],
    ["reality","স্থান প্রসারণ","Spatial Expansion"],["reality","দ্বৈত অস্তিত্ব","Dual Existence"],["reality","বাস্তবতা পতন","Reality Collapse"],
    ["mission","প্রথম গোপন লক্ষ্য","First Secret Goal"],["mission","দ্বিতীয় গোপন লক্ষ্য","Second Secret Goal"],
    ["mission","তৃতীয় গোপন লক্ষ্য","Third Secret Goal"],["mission","শেষ গোপন লক্ষ্য","Final Secret Goal"],
    ["mission","হারানো মুকুট","Lost Crown"],["mission","ভাঙা আয়না","Broken Mirror"],["mission","অসমাপ্ত পথ","Unfinished Path"],
    ["mission","ভুলে যাওয়া প্রতিশ্রুতি","Forgotten Promise"],["mission","গোপন জোট","Secret Alliance"],["mission","একা যাত্রা","Solitary Journey"],
    ["mission","অন্ধকারে অন্বেষণ","Search in Dark"],["mission","আলোয় লুকানো","Hiding in Light"],["mission","নীরব বিপ্লব","Silent Revolution"],
    ["mission","ধীর প্রতিশোধ","Slow Revenge"],["mission","পবিত্র তীর্থ","Sacred Pilgrimage"],["mission","অভিশপ্ত অনুসন্ধান","Cursed Quest"],
    ["mission","জ্ঞানের সন্ধান","Search for Knowledge"],["mission","শক্তির সংগ্রহ","Power Collection"],
    ["time","বর্তমান মুহূর্ত","Present Moment"],["time","অতীত প্রতিধ্বনি","Past Echo"],["time","ভবিষ্যৎ সম্ভাবনা","Future Possibility"],
    ["time","স্থগিত সময়","Suspended Time"],["time","প্রবাহিত সময়","Flowing Time"],["time","স্থির সময়","Static Time"],
    ["time","চক্রাকার সময়","Cyclical Time"],["time","রৈখিক সময়","Linear Time"],["time","বিভাজিত সময়","Split Time"],
    ["time","একত্রিত সময়","Unified Time"],["time","প্রথম ক্ষণ","First Instant"],["time","শেষ ক্ষণ","Last Instant"],
    ["time","মধ্যবর্তী ক্ষণ","Middle Instant"],["time","অনন্ত ক্ষণ","Eternal Instant"],["time","হারানো ক্ষণ","Lost Instant"],
    ["time","পাওয়া ক্ষণ","Found Instant"],["time","ঘুরে আসা ক্ষণ","Returned Instant"],["time","না-আসা ক্ষণ","Never-Come Instant"],
    ["legendary","প্রথম স্রষ্টা","First Creator"],["legendary","আদিস্থপতি","Primordial Architect"],["legendary","সময়ের রক্ষক","Time Keeper"],
    ["legendary","স্মৃতির ধারক","Memory Bearer"],["legendary","বাস্তবতার নির্মাতা","Reality Builder"],["legendary","স্থানের অধিপতি","Space Lord"],
    ["legendary","দ্বাদশ দিকের স্বামী","Master of Twelve"],["legendary","অসীমের দ্বাররক্ষক","Gatekeeper of Infinity"],
    ["legendary","বীজ যুগের সাক্ষী","Witness of Seed Age"],["legendary","পতন যুগের অবশিষ্ট","Remnant of Collapse Age"],
    ["legendary","জাগরণ যুগের অগ্রদূত","Pioneer of Awakening"],["legendary","নীরবতার কণ্ঠ","Voice of Silence"],
    ["legendary","অন্ধকারের আলো","Light in Darkness"],["legendary","আলোর ছায়া","Shadow of Light"],
    ["legendary","গভীরতার পৃষ্ঠ","Surface of Depth"],["legendary","পৃষ্ঠের গভীরতা","Depth of Surface"],
    ["legendary","অসীম সম্ভাবনা","Infinite Possibility"],["legendary","নিরপেক্ষ সত্য","Absolute Truth"],
    ["artifact","প্রাচীন মুকুট","Ancient Crown"],["artifact","ভাঙা মূর্তি","Broken Idol"],["artifact","হারানো তীর","Lost Arrow"],
    ["artifact","প্রথম শিলালিপি","First Inscription"],["artifact","অমলিন চিত্র","Fading Painting"],["artifact","নীরব ঘণ্টা","Silent Bell"],
    ["artifact","বন্ধ দরজা","Closed Door"],["artifact","খোলা বই","Open Book"],["artifact","ভাঙা চাবি","Broken Key"],
    ["artifact","সম্পূর্ণ চাবি","Complete Key"],["artifact","প্রাচীন মানচিত্র","Ancient Map"],["artifact","হারানো কম্পাস","Lost Compass"],
    ["artifact","অমলিন ক্রিস্টাল","Fading Crystal"],["artifact","উজ্জ্বল রত্ন","Bright Gem"],["artifact","পবিত্র পাত্র","Sacred Vessel"],
    ["artifact","অভিশপ্ত তলোয়ার","Cursed Sword"],["artifact","আশীর্বাদিত ঢাল","Blessed Shield"],["artifact","বিস্মৃত মুদ্রা","Forgotten Coin"],
    ["secret","গোপন পথ","Secret Path"],["secret","লুকানো দরজা","Hidden Door"],["secret","অদৃশ্য সেতু","Invisible Bridge"],
    ["secret","নীরব সিগন্যাল","Silent Signal"],["secret","ছদ্মবেশী অতিথি","Disguised Guest"],["secret","অপ্রকাশিত সত্য","Unrevealed Truth"],
    ["secret","গুপ্ত সংকেত","Coded Message"],["secret","মূর্তিমান ছায়া","Embodied Shadow"],["secret","অস্পষ্ট আকার","Vague Form"],
    ["secret","অন্ধকারের চোখ","Eyes of Darkness"],["secret","নীরবতার কান","Ears of Silence"],["secret","গোপন মিত্র","Secret Ally"],
    ["secret","লুকানো শত্রু","Hidden Enemy"],["secret","অজানা সম্পদ","Unknown Resource"],["secret","গুপ্ত জ্ঞান","Esoteric Knowledge"],
    ["awakened","জাগ্রত চোখ","Awakened Eye"],["awakened","সচেতন হৃদয়","Conscious Heart"],["awakened","উদ্ভাসিত মন","Illuminated Mind"],
    ["awakened","প্রত্যয়ী আত্মা","Conviction Soul"],["awakened","জাগ্রত বৃক্ষ","Awakened Tree"],["awakened","সচেতন নদী","Conscious River"],
    ["awakened","উদ্ভাসিত পাথর","Illuminated Stone"],["awakened","প্রত্যয়ী অগ্নি","Conviction Fire"],["awakened","জাগ্রত বায়ু","Awakened Wind"],
    ["awakened","সচেতন মেঘ","Conscious Cloud"],["awakened","উদ্ভাসিত তারকা","Illuminated Star"],["awakened","প্রত্যয়ী চাঁদ","Conviction Moon"],
    ["awakened","জাগ্রত সূর্য","Awakened Sun"],["awakened","সচেতন ছায়া","Conscious Shadow"],["awakened","উদ্ভাসিত আলো","Illuminated Light"],
    ["collapse","পতনশীল বৃক্ষ","Falling Tree"],["collapse","ক্ষয়িষ্ণু নদী","Decaying River"],["collapse","ভগ্ন পাহাড়","Broken Mountain"],
    ["collapse","বিলুপ্ত উপত্যকা","Vanished Valley"],["collapse","অবলুপ্ত দ্বীপ","Disappeared Island"],
    ["collapse","নিমজ্জিত মহাদেশ","Submerged Continent"],["collapse","বিলীন সভ্যতা","Dissolved Civilization"],
    ["collapse","ক্ষয়িষ্ণু স্মৃতি","Fading Memory"],["collapse","পতিত স্বপ্ন","Fallen Dream"],["collapse","ভগ্ন আশা","Shattered Hope"],
    ["collapse","বিলুপ্ত ভাষা","Lost Language"],["collapse","অন্তর্হিত সত্য","Vanished Truth"],["collapse","পতনশীল নায়ক","Falling Hero"],
    ["collapse","ক্ষয়িষ্ণু দেবতা","Decaying God"],["collapse","বিলীন মহাকাল","Dissolved Era"],
    ["special","অদ্ভুত অতিথি","Strange Guest"],["special","বিস্ময়কর উপহার","Wondrous Gift"],["special","অপ্রত্যাশিত মুহূর্ত","Unexpected Moment"],
    ["special","অবিশ্বাস্য ঘটনা","Incredible Event"],["special","রহস্যময় বস্তু","Mysterious Object"],
    ["special","অলৌকিক সংযোগ","Miraculous Connection"],["special","অব্যক্ত আবেগ","Unspoken Emotion"],
    ["special","অবধারিত বিস্ময়","Inevitable Wonder"],["special","অসাধারণ আবিষ্কার","Extraordinary Discovery"],
    ["special","অকল্পনীয় রূপ","Inconceivable Form"],
    ["hidden","গোপন এক","Hidden One"],["hidden","লুকানো দুই","Hidden Two"],["hidden","অদৃশ্য তিন","Invisible Three"],
    ["hidden","নীরব চার","Silent Four"],["hidden","অজানা পাঁচ","Unknown Five"],["hidden","গুপ্ত ছয়","Secret Six"],
    ["hidden","অপ্রকাশিত সাত","Unrevealed Seven"],["hidden","বিস্মৃত আট","Forgotten Eight"],["hidden","অন্তর্হিত নয়","Vanished Nine"],
  ];

  // Build full card objects
  const CARDS = ALL_CARDS.map((c, i) => ({
    num: i + 1,
    type: c[0],
    name_bn: c[1],
    name_en: c[2],
    type_info: CARD_TYPES[c[0]],
    ability: getAbility(i+1, c[0]),
    rarity: getRarity(i+1, c[0]),
    lore: getLore(i+1)
  }));

  function getAbility(num, type) {
    const rng = mulberry32(num * 7 + 3);
    const pool = {
      core: ["স্থাপন: সংলগ্ন কার্ডে প্রভাব।","সক্রিয়: দিক মিললে শক্তি দ্বিগুণ।","স্থাপন: কেন্দ্রে হলে বোনাস।","সক্রিয়: স্তর ২ হলে বৃদ্ধি।"],
      evolution: ["বিবর্তন: কোর কার্ডের উপর স্থাপন।","সক্রিয়: বিবর্তিত ক্ষমতা সক্রিয়।","স্থায়ী: সংলগ্ন সব কার্ডে প্রভাব।"],
      memory: ["স্মৃতি: পূর্বরূপ সংরক্ষণ।","সক্রিয়: স্মৃতি ক্রিস্টাল সহ পুনরুদ্ধার।","বিশেষ: অতীত ক্ষমতা পুনরায় সক্রিয়।"],
      world: ["বিশ্ব: চারপাশের পরিবেশ পরিবর্তন।","সক্রিয়: সংলগ্ন সব কার্ডে প্রভাব।","স্থায়ী: স্থাপিত থাকলে কাজ করে।"],
      reality: ["বাস্তবতা: পুরো টেবিল ঘুরিয়ে দাও।","সক্রিয়: সব সম্পর্ক পাল্টে দাও।","বিশেষ: দ্বিতীয় স্থানান্তর আনে।"],
      mission: ["মিশন: গোপন লক্ষ্য নির্ধারণ।","শর্ত: নির্দিষ্ট কার্ড সংগ্রহ।","পুরস্কার: পূরণে পয়েন্ট।"],
      time: ["সময়: একটি অতিরিক্ত টার্ন।","সক্রিয়: অতীতে ফেরার ক্ষমতা।","বিশেষ: ভবিষ্যৎ দেখার ক্ষমতা।"],
      legendary: ["কিংবদন্তি: গেম বদলে দেওয়ার ক্ষমতা।","সক্রিয়: শক্তিশালী স্থায়ী প্রভাব।","বিশেষ: অনন্য ক্ষমতা।"],
      artifact: ["আর্টিফ্যাক্ট: স্থায়ী প্রভাব।","সক্রিয়: নির্দিষ্ট শর্তে ক্ষমতা।","বিশেষ: অন্য কার্ডের সঙ্গে মিলে শক্তিশালী।"],
      secret: ["গোপন: লুকানো অবস্থায় স্থাপন।","সক্রিয়: প্রকাশ করার সময় নির্বাচন।","বিশেষ: অন্য খেলোয়াড় দেখতে পান না।"],
      awakened: ["জাগ্রত: সচেতনতা অর্জন।","সক্রিয়: নিজস্ব ইচ্ছায় কাজ।","বিশেষ: বহুগুণ শক্তিশালী।"],
      collapse: ["পতন: স্থাপিত কাঠামো ভাঙে।","সক্রিয়: স্তর মুছে দেয়।","বিশেষ: সংযোগ বিচ্ছিন্ন করে।"],
      special: ["বিশেষ: অনন্য ক্ষমতা।","সক্রিয়: নির্দিষ্ট পরিস্থিতিতে কাজ।","বিশেষ: অন্য কোনো শ্রেণীতে নেই।"],
      hidden: ["গুপ্ত: সম্পূর্ণ লুকানো।","বিশেষ: নির্দিষ্ট পরিস্থিতিতে আবির্ভূত।","রহস্য: গেমের সবচেয়ে বড় গোপন।"],
    };
    const arr = pool[type] || pool.special;
    return arr[Math.floor(rng() * arr.length)];
  }

  function getRarity(num, type) {
    const pool = {
      core: ["সাধারণ","সাধারণ","অসাধারণ"],
      evolution: ["অসাধারণ","বিরল"],
      memory: ["অসাধারণ","বিরল"],
      world: ["অসাধারণ","বিরল"],
      reality: ["বিরল","বিশেষ"],
      mission: ["অসাধারণ","বিরল"],
      time: ["বিরল","বিশেষ"],
      legendary: ["কিংবদন্তি","পৌরাণিক"],
      artifact: ["বিরল","বিশেষ"],
      secret: ["বিশেষ","কিংবদন্তি"],
      awakened: ["কিংবদন্তি","পৌরাণিক"],
      collapse: ["বিরল","বিশেষ"],
      special: ["বিশেষ","কিংবদন্তি"],
      hidden: ["পৌরাণিক"],
    };
    const arr = pool[type] || pool.special;
    const rng = mulberry32(num * 13 + 7);
    return arr[Math.floor(rng() * arr.length)];
  }

  function getLore(num) {
    const rng = mulberry32(num * 11 + 5);
    const lores = [
      "একসময় এটি একটি সাধারণ বস্তু ছিল।",
      "প্রাচীন স্রষ্টা একে গড়েছিলেন।",
      "এর উৎপত্তি অজানা, গোপন।",
      "স্মৃতি বহন করে অতীতের।",
      "জীবন্ত সত্তা, নিজস্ব ইচ্ছা।",
      "টেবিলে এলে সময় থামে।",
      "উপস্থিতিতেই পরিবেশ বদলায়।",
      "যাকে বেছে নেয়, সে অসাধারণ।",
      "হারানো সভ্যতার শেষ অবশিষ্ট।",
      "যে বোঝে, সে গেম বোঝে।",
    ];
    return lores[Math.floor(rng() * lores.length)];
  }

  function mulberry32(a) {
    return function() {
      let t = a += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }

  return {
    CARD_TYPES,
    CARDS,
    MISSIONS: generateMissions(),
    EXPANSIONS: getExpansions(),
    FAQ: getFaq(),
  };

  function generateMissions() {
    const templates = [
      ["স্থাপন মিশন","একই ধরনের তিনটি কার্ড সংলগ্নভাবে স্থাপন করো","৫ পয়েন্ট"],
      ["সংযোগ মিশন","চারটি ভিন্ন ধরনের কার্ড একটি বৃত্তে সংযুক্ত করো","৬ পয়েন্ট"],
      ["স্তর মিশন","একই স্থানে তিনটি স্তর গড়ে তোলো","৭ পয়েন্ট"],
      ["রূপান্তর মিশন","একটি কোর কার্ডকে বিবর্তিত করো","৪ পয়েন্ট"],
      ["জাগরণ মিশন","একটি কার্ডকে জাগ্রত করো","৮ পয়েন্ট"],
      ["স্মৃতি মিশন","একটি স্মৃতি ক্রিস্টাল সংরক্ষণ করো","৫ পয়েন্ট"],
      ["সময় মিশন","একটি সময় কার্ড সক্রিয় করো","৬ পয়েন্ট"],
      ["বাস্তবতা মিশন","একটি বাস্তবতা স্থানান্তর ট্রিগার করো","৯ পয়েন্ট"],
      ["পতন মিশন","একটি কার্ড ধ্বংস করো","৩ পয়েন্ট"],
      ["কেন্দ্র মিশন","টেবিলের কেন্দ্রে একটি লিজেন্ডারি কার্ড স্থাপন করো","১০ পয়েন্ট"],
    ];
    const goals = ["বীজ থেকে বৃক্ষ পর্যন্ত","অগ্নি থেকে ছাই পর্যন্ত","অন্ধকার থেকে আলো পর্যন্ত","অতীত থেকে বর্তমান পর্যন্ত","এক থেকে অনেক পর্যন্ত","সরল থেকে জটিল পর্যন্ত"];
    const list = [];
    for (let i = 1; i <= 200; i++) {
      const t = templates[i % templates.length];
      const g = goals[i % goals.length];
      list.push({
        num: i,
        type: t[0],
        desc: `${t[1]}। লক্ষ্য: ${g}।`,
        reward: t[2]
      });
    }
    return list;
  }

  function getExpansions() {
    return [
      {n:1, name:"প্রথম জাগরণ", en:"First Awakening", cards:30, missions:20, theme:"নতুন জাগ্রত কার্ড"},
      {n:2, name:"স্মৃতির গভীরে", en:"Deep Memory", cards:25, missions:20, theme:"স্মৃতি বিষয়ক"},
      {n:3, name:"বাস্তবতার ফাটল", en:"Reality Rift", cards:25, missions:15, theme:"বাস্তবতা বিষয়ক"},
      {n:4, name:"সময়ের চক্র", en:"Time Cycle", cards:25, missions:15, theme:"সময় বিষয়ক"},
      {n:5, name:"পতনের পরে", en:"After Collapse", cards:30, missions:20, theme:"পতন ও পুনর্জন্ম"},
      {n:6, name:"গোপন গোত্র", en:"Secret Clans", cards:20, missions:25, theme:"নতুন গোত্র"},
      {n:7, name:"লিজেন্ডারি যুগ", en:"Legendary Era", cards:20, missions:15, theme:"নতুন লিজেন্ডারি"},
      {n:8, name:"আর্টিফ্যাক্ট সংগ্রহ", en:"Artifact Collection", cards:25, missions:15, theme:"নতুন আর্টিফ্যাক্ট"},
      {n:9, name:"বিশ্বের সীমানা", en:"World Boundaries", cards:30, missions:20, theme:"নতুন বিশ্ব কার্ড"},
      {n:10, name:"চূড়ান্ত রূপান্তর", en:"Ultimate Transformation", cards:50, missions:35, theme:"সমাপ্তি প্যাক"},
    ];
  }

  function getFaq() {
    return [
      {q:"রূপান্তর কি সত্যিই অন্য কোনো গেমের মতো নয়?", a:"হ্যাঁ। রূপান্তরের মেকানিক—স্থানিক স্থাপন, দ্বিমুখী সংযোগ, স্তরীভবন, বাস্তবতা স্থানান্তর, গোপন মিশন—একত্রে কোনো বিদ্যমান গেমে দেখা যায় না। প্রতিটি মেকানিক মৌলিকভাবে ডিজাইন করা হয়েছে।"},
      {q:"নতুন খেলোয়াড় কি গেম শিখতে পারবেন?", a:"হ্যাঁ। গেমের নিয়ম সরল, কিন্তু গভীরতা অসীম। নতুন খেলোয়াড় প্রথম খেলায় মৌলিক মেকানিক শিখে যাবেন, এবং ধীরে ধীরে উন্নত কৌশল আয়ত্ত করবেন।"},
      {q:"গেম কতক্ষণ চলে?", a:"দুই খেলোয়াড়ের গেম ৩০-৪৫ মিনিট, ছয় খেলোয়াড়ের গেম ৪৫-৬০ মিনিট। গেমের দৈর্ঘ্য খেলোয়াড়ের সংখ্যা ও অভিজ্ঞতার উপর নির্ভর করে।"},
      {q:"গেম কি বাচ্চারা খেলতে পারবে?", a:"হ্যাঁ, কিডস মোডে আট বছরের বাচ্চারাও খেলতে পারবে। ফ্যামিলি মোডে বারো বছরের বাচ্চারা সম্পূর্ণ গেম উপভোগ করতে পারবে।"},
      {q:"একা খেলা যায় কি?", a:"হ্যাঁ, সোলো মোডে একা খেলা যায়। সোলো মোডে একটি নির্দিষ্ট লক্ষ্য নিয়ে খেলতে হয়, এবং একটি অটো-প্লে ব্যবস্থা বিপক্ষ হিসেবে কাজ করে।"},
      {q:"এক্সপানশন কবে আসবে?", a:"প্রথম এক্সপানশন 'প্রথম জাগরণ' গেম প্রকাশের ছয় মাস পর আসবে। এরপর প্রতি ছয় মাস অন্তর নতুন এক্সপানশন।"},
    ];
  }
})();
