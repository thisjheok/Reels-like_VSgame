'use client';

import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import styles from '../page.module.css';

const posts = [
  { comment: "창모의 띵곡은?", options: ["METEOR", "빌었어"] },
  { comment: "에스파의 짱은?", options: ["카리나", "윈터"] },
  { comment: "4세대 아이돌 짱은?", options: ["뉴진스", "에스파"] },
  { comment: "더 감성인 것은?", options: ["인스타", "블로그"] },
  { comment: "농심의 짱은?", options: ["짜파게티", "너구리"] }
];

export default function Home() {
  const [index, setIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(null);
  const [direction, setDirection] = useState(null);
  const [transitioning, setTransitioning] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSwipe = (deltaY) => {
    if (deltaY < 0 && index < posts.length - 1) {
      setDirection('up');
      setNextIndex(index + 1);
      setTransitioning(true);
      setSelectedOption(null);
      setTimeout(() => {
        setIndex(index + 1);
        setTransitioning(false);
        setNextIndex(null);
      }, 300);
    } else if (deltaY > 0 && index > 0) {
      setDirection('down');
      setNextIndex(index - 1);
      setTransitioning(true);
      setSelectedOption(null);
      setTimeout(() => {
        setIndex(index - 1);
        setTransitioning(false);
        setNextIndex(null);
      }, 300);
    }
  };

  const handleButtonClick = (option) => {
    setSelectedOption(option);
  };

  const handlers = useSwipeable({
    onSwiped: (eventData) => handleSwipe(eventData.deltaY),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  return (
    <div className={styles.container} {...handlers}>
      <div className={`${styles.postContainer}`}>
        <div className={`${styles.post} ${transitioning ? (direction === 'up' ? styles.slideOutUp : styles.slideOutDown) : ''}`}>
          <div className={styles.comment}>{posts[index].comment}</div>
          <div className={styles.buttons}>
            <button
              className={`${styles.button} ${selectedOption === posts[index].options[0] ? styles.selected : ''}`}
              onClick={() => handleButtonClick(posts[index].options[0])}
            >
              {posts[index].options[0]}
            </button>
            <button
              className={`${styles.button} ${selectedOption === posts[index].options[1] ? styles.selected : ''}`}
              onClick={() => handleButtonClick(posts[index].options[1])}
            >
              {posts[index].options[1]}
            </button>
          </div>
        </div>
        {transitioning && nextIndex !== null && (
          <div className={`${styles.post} ${direction === 'up' ? styles.slideInUp : styles.slideInDown}`}>
            <div className={styles.comment}>{posts[nextIndex].comment}</div>
            <div className={styles.buttons}>
              <button className={styles.button}>{posts[nextIndex].options[0]}</button>
              <button className={styles.button}>{posts[nextIndex].options[1]}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
