import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components/macro';

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

    const randNum = Math.floor(Math.random() * chars.length);
    return { type: 'code', value: chars[randNum] };
  });
};

function DecoderText(props) {
  const { text, start, offset = 100, delay = 300, fps = 24, ...rest } = props;
  const [position, setPosition] = useState(0);
  const [started, setStarted] = useState(false);
  const [output, setOutput] = useState([{ type: 'code', value: '' }]);
  const content = useRef(text.split(''));
  const startTime = useRef(0);
  const elapsedTime = useRef(0);

  useEffect(() => {
    let timeout;

    if (start && !started) {
      timeout = setTimeout(() => {
        startTime.current = Date.now();
        elapsedTime.current = 0;
        setStarted(true);
      }, delay);
    }

    return function cleanUp() {
      clearTimeout(timeout);
    };
  }, [delay, start, started]);

  useEffect(() => {
    let animation;

    const animate = () => {
      if (!started) return;
      const elapsed = Date.now() - startTime.current;
      const deltaTime = elapsed - elapsedTime.current;
      const needsUpdate = 1000 / fps <= deltaTime;
      animation = requestAnimationFrame(animate);

      if (needsUpdate) {
        elapsedTime.current = elapsed;
        setPosition(elapsedTime.current / offset);
      }
    };

    if (position < content.current.length) {
      animation = requestAnimationFrame(animate);
      setOutput(shuffle(content.current, chars, position));
    }

    return function cleanup() {
      cancelAnimationFrame(animation);
    };
  }, [fps, offset, position, started]);

  return (
    <DecoderSpan {...rest}>
      {output.map((item, index) => item.type === 'actual'
        ? <span key={`${item.value}-${index}`}>{item.value}</span>
        : <DecoderCode key={`${item.value}-${index}`} aria-hidden>{item.value}</DecoderCode>
      )}
    </DecoderSpan>
  );
};

const DecoderSpan = styled.span`
  &:after {
    content: '_';
    opacity: 0;
    visibility: hidden;
  }
`;

const DecoderCode = styled.span`
  opacity: 0.8;
  font-weight: 400;
  font-family: 'ヒラギノ角ゴ Pro W3', 'Hiragino Kaku Gothic Pro', 'Hiragino Sans', Osaka, 'メイリオ', Meiryo, 'ＭＳ Ｐゴシック', 'MS PGothic', sans-serif;
  line-height: 0;
`;

export default React.memo(DecoderText);
