import { useRef, useEffect, memo } from 'react';
import classNames from 'classnames';
import { usePrefersReducedMotion } from 'hooks';
import { spring, chain, delay, value } from 'popmotion';
import VisuallyHidden from 'components/VisuallyHidden';
import prerender from 'utils/prerender';
import './index.css';

// prettier-ignore
const glyphs = [
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

const CharType = {
  Glyph: 'glyph',
  Value: 'value',
};

function shuffle(content, output, position) {
  return content.map((value, index) => {
    if (index < position) {
      return { type: CharType.Value, value };
    }

    if (position % 1 < 0.5) {
      const rand = Math.floor(Math.random() * glyphs.length);
      return { type: CharType.Glyph, value: glyphs[rand] };
    }

    return { type: CharType.Glyph, value: output[index].value };
  });
}

const DecoderText = ({
  text,
  start = true,
  delay: startDelay = 0,
  className,
  ...rest
}) => {
  const output = useRef([{ type: CharType.Glyph, value: '' }]);
  const container = useRef();
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    const containerInstance = container.current;
    const content = text.split('');
    let animation;

    const renderOutput = () => {
      const characterMap = output.current.map(item => {
        return `<span class="decoder-text__${item.type}">${item.value}</span>`;
      });

      containerInstance.innerHTML = characterMap.join('');
    };

    const springValue = value(0, position => {
      output.current = shuffle(content, output.current, position);
      renderOutput();
    });

    if (start && !animation && !reduceMotion && !prerender) {
      animation = chain(
        delay(startDelay),
        spring({
          from: 0,
          to: content.length,
          stiffness: 8,
          damping: 5,
        })
      ).start(springValue);
    }

    if (reduceMotion) {
      output.current = content.map((value, index) => ({
        type: CharType.Value,
        value: content[index],
      }));
      renderOutput();
    }

    return () => {
      if (animation) {
        animation.stop();
      }
    };
  }, [reduceMotion, start, startDelay, text]);

  return (
    <span className={classNames('decoder-text', className)} {...rest}>
      <VisuallyHidden className="decoder-text__label">{text}</VisuallyHidden>
      <span aria-hidden className="decoder-text__content" ref={container} />
    </span>
  );
};

export default memo(DecoderText);
