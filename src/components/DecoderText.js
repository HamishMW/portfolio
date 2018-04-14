import React, { PureComponent } from 'react';
import styled from 'styled-components';

export default class DecoderText extends PureComponent {
  constructor(props) {
    super(props);

    const { text, offset = 100 } = this.props;

    this.content = text.split('');
    this.startTime = 0;
    this.elapsedTime = 0;
    this.running = false;
    this.timeOffset = offset;
    this.fps = 24;
    this.chars = [
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

    this.state = {
      position: 0,
      started: false,
      output: [{type: 'code', value: ''}],
    }
  }

  componentWillReceiveProps(nextProps) {
    const { start } = nextProps;
    const { started } = this.state;
    if (start && !started) this.timeout = setTimeout(() => {this.start()}, 300);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  start = () => {
    this.startTime = Date.now();
    this.elapsedTime = 0;
    this.running = true;
    this.setState({started: true});
    this.anim();
  }

  stop = () => this.running = false;

  anim = () => {
    const { position } = this.state;
  	const elapsedTime = Date.now() - this.startTime;
  	const deltaTime = elapsedTime - this.elapsedTime;
  	const needsUpdate = 1000 / this.fps <= deltaTime;

  	if (!needsUpdate) {
  		requestAnimationFrame(this.anim);
  		return;
  	}

  	this.elapsedTime = elapsedTime;
    this.setState({position: (this.elapsedTime / this.timeOffset) | 0});

  	if (!this.running) return;

  	if (position > this.content.length) {
  		this.running = false;
      const finalArray = this.setValue(this.content);
      this.setState({output: finalArray});
  		return;
  	}

  	requestAnimationFrame(this.anim);

  	const textArray = this.shuffle(this.content, this.chars, position);
    this.setState({output: textArray});
  }

  setValue = value => {
    return value.map(value => ({
      type: 'actual',
      value,
    }));
  }

  shuffle = (content, chars, position) => {
    return content.map((value, index) => {
      if (index < position) {
        return {type: 'actual', value};
      }

      return {
        type: 'code',
        value: this.getRandCharacter(chars),
      }
    });
  }

  getRandCharacter = chars => {
  	const randNum = Math.floor(Math.random() * chars.length);
  	const lowChoice =	- .5 + Math.random();
  	const picketCharacter = chars[randNum];
  	const chosen = lowChoice < 0 ? picketCharacter.toLowerCase() : picketCharacter;
  	return chosen;
  }

  render() {
    const { text, className, style } = this.props;
    const { output } = this.state;

    return (
      <DecoderSpan aria-label={text} className={className} style={style}>
        {output.map((item, index) => {
          if (item.type === 'actual') {
            return (
              <span
                key={`${item.value}_${index}`}
                aria-hidden="true"
              >
                {item.value}
              </span>
            )
          }

          return (
            <DecoderCode
              key={`${item.value}_${index}`}
              aria-hidden="true"
            >
              {item.value}
            </DecoderCode>
          )
        })}
      </DecoderSpan>
    );
  }
}

const DecoderSpan = styled.span`
  &:after {
    content: '_';
    opacity: 0;
  }
`;

const DecoderCode = styled.span`
  opacity: 0.8;
  font-weight: 400;
  font-family: 'Hiragino Sans', sans-serif;
  line-height: 0;
`;
