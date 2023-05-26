import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  attackToBoss,
  attackCancel,
  atkCriCancel,
  addSkillPoint,
  minusSkillPoint,
  selectBoss,
  selectPlayer,
} from './bossSlice';
import styles from './Boss.module.css';

export function Boss({ attacked }) {
  const boss = useSelector(selectBoss);
  const player = useSelector(selectPlayer);
  const dispatch = useDispatch();
  const [summon, fixSummon] = useState({
    isThreeStar: true,
    isFourStar: false,
    isFiveStar: false,
    element: 'fire',
  });

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Digit3') {
      fixToThree(summon.element);
    }
    if (e.code === 'Digit4') fixToFour(summon.element);
    if (e.code === 'Digit5') fixToFive(summon.element);
  });
  function fixToThree(element) {
    fixSummon({
      isThreeStar: true,
      isFourStar: false,
      isFiveStar: false,
      element,
    });
  }
  function fixToFour(element) {
    fixSummon({
      isThreeStar: false,
      isFourStar: true,
      isFiveStar: false,
      element,
    });
  }
  function fixToFive(element) {
    fixSummon({
      isThreeStar: false,
      isFourStar: false,
      isFiveStar: true,
      element,
    });
  }
  return (
    <div>
      <div className={styles.row}>HP 
        <span className={styles.hp}>{boss.hp}</span>/
        <span className={styles.hp}>{boss.maxHp}</span>
      </div>
      <img className={boss.hp === 0 ? styles.boss_die : styles.boss}/>
      <div className={styles.player}>
        <div>
          <h2>플레이어 스킬</h2>
          <div>
            <div>소환 성공: {player.damage}/1</div>
            <div className={styles.skills}>
              <div>
                소환 대성공 : {player.fourStar}/3
              </div>
              <div>
                <button onClick={() => dispatch(addSkillPoint('fourStar'))}>
                  +
                </button>
                <button onClick={() => dispatch(minusSkillPoint('fourStar'))}>
                  -
                </button>
              </div>
            </div>
            <div className={styles.skills}>
              <div>
                대박 소환 : {player.fiveStar}/3
              </div>
              <div>
                <button onClick={() => dispatch(addSkillPoint('fiveStar'))}>
                  +
                </button>
                <button onClick={() => dispatch(minusSkillPoint('fiveStar'))}>
                  -
                </button>
              </div>
            </div>
            <div className={styles.skills}>
              <div>
                불의 소환사 : {player.fire}/5
              </div>
              <div>
                <button onClick={() => dispatch(addSkillPoint('fire'))}>+</button>
                <button onClick={() => dispatch(minusSkillPoint('fire'))}>
                  -
                </button>
              </div>
            </div>
            <div className={styles.skills}>
              <div>
                물의 소환사 : {player.water}/5
              </div>
              <div>
                <button onClick={() => dispatch(addSkillPoint('water'))}>
                  +
                </button>
                <button onClick={() => dispatch(minusSkillPoint('water'))}>
                  -
              </button>
              </div>
            </div>
            <div className={styles.skills}>
              <div>
                바람의 소환사 : {player.wind}/5
              </div>
              <div>
                <button onClick={() => dispatch(addSkillPoint('wind'))}>+</button>
                <button onClick={() => dispatch(minusSkillPoint('wind'))}>
                  -
                </button>
              </div>
            </div>
            <div className={styles.skills}>
              <div>
                빛의 소환사 : {player.light}/3
              </div>
              <div>
                <button onClick={() => dispatch(addSkillPoint('light'))}>
                  +
                </button>
                <button onClick={() => dispatch(minusSkillPoint('light'))}>
                  -
              </button>
              </div>
            </div>
            <div className={styles.skills}>
              <div>
                어둠의 소환사 : {player.dark}/3
              </div>
              <div>
                <button onClick={() => dispatch(addSkillPoint('dark'))}>+</button>
                <button onClick={() => dispatch(minusSkillPoint('dark'))}>
                  -
                </button>
              </div>
            </div>
            <div className={styles.skills}>
              <div>
                행운의 소환사 : {player.luck}/3
              </div>
              <div>
                <button onClick={() => dispatch(addSkillPoint('luck'))}>+</button>
                <button onClick={() => dispatch(minusSkillPoint('luck'))}>
                  -
                </button>
              </div>
            </div>
            <div className={styles.skills}>
              <div>
                강력한 소환사 : {player.power}/3
              </div>
              <div>
                <button onClick={() => dispatch(addSkillPoint('power'))}>
                  +
                </button>
                <button onClick={() => dispatch(minusSkillPoint('power'))}>
                  -
              </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>소환된 몬스터</div>
        <div>
          <input
            name="star"
            id="3"
            type="radio"
            onClick={() => fixToThree(summon.element)}
            defaultChecked
          />
          3성
          <input
            name="star"
            id="4"
            type="radio"
            onClick={() => fixToFour(summon.element)}
          />
          4성
          <input
            name="star"
            id="5"
            type="radio"
            onClick={() => fixToFive(summon.element)}
          />
          5성
        </div>
        <div>
          <input
            name="element"
            id="fire"
            type="radio"
            onClick={() => fixSummon({ ...summon, element: 'fire' })}
            defaultChecked
          />
          불속성
          <input
            name="element"
            id="water"
            type="radio"
            onClick={() => fixSummon({ ...summon, element: 'water' })}
          />
          물속성
          <input
            name="element"
            id="wind"
            type="radio"
            onClick={() => fixSummon({ ...summon, element: 'wind' })}
          />
          바람속성
          <input
            name="element"
            id="light"
            type="radio"
            onClick={() => fixSummon({ ...summon, element: 'light' })}
          />
          빛속성
          <input
            name="element"
            id="dark"
            type="radio"
            onClick={() => fixSummon({ ...summon, element: 'dark' })}
          />
          어둠속성
        </div>
      </div>
      <button
        className={styles.button}
        aria-label="Attack"
        onClick={() => dispatch(attackToBoss(summon))}
      >
        공격
      </button>
      <button
        className={styles.button}
        aria-label="Attack"
        onClick={() => dispatch(attackCancel(summon))}
      >
        공격 취소 (일반)
      </button>
      <button
        className={styles.button}
        aria-label="Attack"
        onClick={() => dispatch(atkCriCancel(summon))}
      >
        공격 취소 (치명)
      </button>
    </div>
  );
}
