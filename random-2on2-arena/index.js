setTimeout(() => {
  paintAll(IMAGE_IDS, 시즌_25_지원_몬스터_목록);
}, 1000);

const PLAYER_IDS = ["p1", "p3", "p2", "p4"];

const IMAGE_IDS = [
  "m1",
  "m2",
  "m3",
  "m4",
  "m5",
  "m6",
  "m7",
  "m8",
  "m9",
  "m10",
  "m11",
  "m12",
];

const 시즌_25_지원_몬스터_목록 = [
  { name: "물음양사", image: "Shizuka_Icon" },
  { name: "물스카이서퍼", image: "Miles_Icon" },
  { name: "불오라클", image: "Juno_Icon" },
  { name: "불스트라이커", image: "Douglas_Icon" },
  { name: "불화백", image: "Jeogun_Icon" },
  { name: "풍오공", image: "Xing_Zhe_Icon" },
  { name: "풍유니콘", image: "Diana_Icon" },
  { name: "풍요정", image: "Ganymede_Icon" },
  { name: "물머메이드", image: "Tetra_Icon" },
  { name: "불요괴무사", image: "Kaki_Icon" },
  { name: "풍실프", image: "Shimitae_Icon" },
  { name: "암로보", image: "ROBO-F29_Icon" },
];

function paintOne(imgId, imgName) {
  document
    .getElementById(imgId)
    .setAttribute("src", `./images/${imgName}.webp`);
  document.getElementById(imgId).setAttribute("style", "opacity: 1");
}

function paintAll(imgIds, monsters) {
  monsters.sort(() => Math.random() - 0.5);

  for (let j = 0; j < PLAYER_IDS.length; j++) {
    setTimeout(() => {
      document
        .getElementById(PLAYER_IDS[j])
        .setAttribute("style", "opacity: 1");
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          paintOne(imgIds[i + j * 3], monsters[i + j * 3].image);
        }, (i + 1) * 500);
      }
    }, j * 2000);
  }
}
