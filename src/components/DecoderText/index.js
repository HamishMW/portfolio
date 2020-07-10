import React, { useRef, useState, useEffect, memo } from 'react';
import classNames from 'classnames';
import { usePrefersReducedMotion } from '/hooks';
import './index.css';

// prettier-ignore
const chars = [
  'ア', 'イ', 'ウ', 'エ', 'オ',
  'カ', 'キ', 'ク', 'ケ', 'コ',
  'サ', 'シ', 'ス', 'セ', 'ソ',
  'タ', 'チ', 'ツ', 'テ', 'ト',
  'ナ', 'ニ', 'ヌ', 'ネ', 'ノ',
  'ハ', 'ヒ', 'フ', 'ヘ', 'ホ',
  'マ', 'ミ', 'ム', 'メ', 'モ',
  'ヤ', 'ユ', 'ヨ', 'ー',
  'ラ', 'リ', 'ル', 'レ', 'ロ',
  'ワ', 'ヰ', 'ヱ', 'ヲ', 'ン',
  'ガ', 'ギ', 'グ', 'ゲ', 'ゴ',
  'ザ', 'ジ', 'ズ', 'ゼ', 'ゾ',
  'ダ', 'ヂ', 'ヅ', 'デ', 'ド',
  'バ', 'ビ', 'ブ', 'ベ', 'ボ',
  'パ', 'ピ', 'プ', 'ペ', 'ポ',
];

function shuffle(content, chars, position) {
  return content.map((value, index) => {
    if (index < position) {
      return { type: 'actual', value };
    }

    const rand = Math.floor(Math.random() * chars.length);
    return { type: 'code', value: chars[rand] };
  });
}

function DecoderText({ text, start, offset, delay, fps, className, ...rest }) {
  const position = useRef(0);
  const [started, setStarted] = useState(false);
  const output = useRef([{ type: 'code', value: '' }]);
  const content = useRef(text.split(''));
  const contentRef = useRef();
  const startTime = useRef(0);
  const elapsedTime = useRef(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    let timeout;

    if (start && !started && !prefersReducedMotion) {
      timeout = setTimeout(() => {
        startTime.current = Date.now();
        elapsedTime.current = 0;
        setStarted(true);
      }, delay);
    }

    if (prefersReducedMotion) {
      output.current = content.current.map((value, index) => ({
        type: 'actual',
        value: content.current[index],
      }));
      setStarted(true);
    }

    return function cleanUp() {
      clearTimeout(timeout);
    };
  }, [delay, prefersReducedMotion, start, started]);

  useEffect(() => {
    let animation;

    const animate = () => {
      if (!started) return;
      const elapsed = Date.now() - startTime.current;
      const deltaTime = elapsed - elapsedTime.current;
      const needsUpdate = 1000 / fps <= deltaTime;

      if (needsUpdate) {
        elapsedTime.current = elapsed;
        position.current = elapsedTime.current / offset;
        output.current = shuffle(content.current, chars, position.current);

        const characterMap = output.current.map(item => {
          const elementClass =
            item.type === 'actual' ? 'decoder-text__value' : 'decoder-text__code';
          return `<span aria-hidden="true" class="${elementClass}">${item.value}</span>`;
        });

        contentRef.current.innerHTML = characterMap.join('');
      }

      if (position.current <= content.current.length) {
        animation = requestAnimationFrame(animate);
      }
    };

    animation = requestAnimationFrame(animate);

    return function cleanup() {
      cancelAnimationFrame(animation);
    };
  }, [fps, offset, started]);

  return (
    <span className={classNames('decoder-text', className)} {...rest}>
      <span className="decoder-text__label">{text}</span>
      <span className="decoder-text__content" ref={contentRef} />
    </span>
  );
}

DecoderText.defaultProps = {
  offset: 100,
  delay: 300,
  fps: 24,
};

export default memo(DecoderText);
