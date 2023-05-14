import { createSlice } from '@reduxjs/toolkit';
import skills, { skillMax } from './skills';

const initialState = {
  boss: {
    maxHp: 10000,
    hp: 10000,
    phase: 1,
    p1: 7000,
    p2: 5000,
    p3: 2500,
    p4: 1000,
    avoidRate: 0.15,
    legend: false,
    transcendence: false,
  },
  player: {
    damage: 1,
    fourStar: 1,
    fiveStar: 1,
    fire: 1,
    water: 1,
    wind: 1,
    light:1,
    dark: 1,
    luck: 1,
    power: 1,
  },
  summon: {
    isThreeStar: true,
    isFourStar: false,
    isFiveStar: false,
    element: "fire",
  }
};

function calculateAttackDamage(player, situation){
  let finalDamage = player.damage*10;
  if(situation.element === "dark" || situation.element === "light"){
    finalDamage += skills.DLD[player[situation.element]];
  } else {
    finalDamage += skills.ED[player[situation.element]];
  }
  
  if(situation.isFourStar){
    finalDamage += skills.SD4[player.fourStar];
  } else if(situation.isFiveStar){
    finalDamage += skills.SD5[player.fiveStar];
  }
  
  if(Date.now() % 100 < (skills.CRP[player.luck]) * 100){
    Math.floor(finalDamage *= skills.CRD[player.power]);
  }
  console.log(`${finalDamage}의 데미지!`)
  return finalDamage
}

export const battleSlice = createSlice({
  name: 'battle',
  initialState,
  reducers: {
    attackToBoss: (state, action) => {
      const boss = state.boss;
      state.boss.hp -= calculateAttackDamage(state.player,action.payload);
      if(state.boss.hp < boss.p4){
        state.boss.phase = 5;
      } else if(state.boss.hp < boss.p3) {
        state.boss.phase = 4;
      } else if(state.boss.hp < boss.p2) {
        state.boss.phase = 3;
      } else if(state.boss.hp < boss.p1) {
        state.boss.phase = 2;
      }
    },
    addSkillPoint: (state, action) => {
      if(skillMax[action.payload] > state.player[action.payload])
        state.player[action.payload] += 1;
    },
    minusSkillPoint: (state, action) => {
      if(state.player[action.payload] > 1)
        state.player[action.payload] -= 1;
    },
    fixToThree: (state) => {
      state.summon = {
        ...state.summon,
        isThreeStar: true,
        isFourStar: false,
        isFiveStar: false,
      }
    },
    fixToFour: (state) => {
      state.summon = {
        ...state.summon,
        isThreeStar: false,
        isFourStar: true,
        isFiveStar: false,
      }
    },
    fixToFive: (state) => {
      state.summon = {
        ...state.summon,
        isThreeStar: false,
        isFourStar: false,
        isFiveStar: true,
      }
    },
    fixElement: (state, action) => {
      state.summon = {
        ...state.summon,
        element: action.payload,
      }
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const selectBoss = (state) => state.battle.boss;
export const selectPlayer = (state) => state.battle.player;
export const selectSummon = (state) => state.battle.summon;

export const { attackToBoss, addSkillPoint, minusSkillPoint, fixElement, fixToFive, fixToThree, fixToFour } = battleSlice.actions;

export default battleSlice.reducer;
