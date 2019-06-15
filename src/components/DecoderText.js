import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { usePrefersReducedMotion } from '../utils/hooks';

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

const japaneseFonts = [
  'ヒラギノ角ゴ Pro W3',
  'Hiragino Kaku Gothic Pro',
  'Hiragino Sans',
  'Osaka',
  'メイリオ',
  'Meiryo',
  'Segoe UI',
  'sans-serif',
];

function shuffle(content, chars, position) {
  return content.map((value, index) => {
    if (index < position) {
      return { type: 'actual', value };
    }

    const rand = Math.floor(Math.random() * chars.length);
    return { type: 'code', value: chars[rand] };
  });
};

function DecoderText(props) {
  const { text, start, offset, delay, fps, ...rest } = props;
  const [position, setPosition] = useState(0);
  const [started, setStarted] = useState(false);
  const [output, setOutput] = useState([{ type: 'code', value: '' }]);
  const content = useRef(text.split(''));
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
      setOutput(content.current.map((value, index) => ({
        type: 'actual',
        value: content.current[index],
      })));
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
        setPosition(elapsedTime.current / offset);
        setOutput(shuffle(content.current, chars, position));
      } else {
        animation = requestAnimationFrame(animate);
      }
    };

    if (position <= content.current.length) {
      animation = requestAnimationFrame(animate);
    }

    return function cleanup() {
      cancelAnimationFrame(animation);
    };
  }, [fps, offset, position, started]);

  return (
    <DecoderWrapper className="decoder-text" {...rest}>
      <span className="decoder-text__label">{text}</span>
      {output.map((item, index) => item.type === 'actual'
        ? <span aria-hidden className="decoder-text__value" key={`${item.value}-${index}`}>{item.value}</span>
        : <span aria-hidden className="decoder-text__code" key={`${item.value}-${index}`}>{item.value}</span>
      )}
    </DecoderWrapper>
  );
};

DecoderText.defaultProps = {
  offset: 100,
  delay: 300,
  fps: 24,
};

const DecoderWrapper = styled.span`
  &::after {
    content: '_';
    visibility: hidden;
  }

  .decoder-text__label {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    width: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    position: absolute;
  }

  .decoder-text__code {
    opacity: 0.8;
    font-weight: 400;
    font-family: ${japaneseFonts.join(', ')};
    line-height: 0;
  }
`;

export default React.memo(DecoderText);
