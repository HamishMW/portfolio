import React from 'react';
import styled from 'styled-components/macro';
import { Transition } from 'react-transition-group';
import { Media } from '../utils/StyleUtils';
import { RouterButton, LinkButton } from '../components/Button';
import ProgressiveImage from '../components/ProgressiveImage';
import Svg from '../utils/Svg';
import phone from '../assets/phone.png';
import phoneLarge from '../assets/phone-large.png';
import phonePlaceholder from '../assets/phone-placeholder.png';

const ProjectItem = ({
  id,
  tabIndex,
  visible,
  sectionRef,
  index,
  title,
  description,
  imageSrc,
  imageAlt,
  imageType,
  imagePlaceholder,
  buttonText,
  buttonLink,
  buttonTo,
}) => {
  return (
    <ProjectItemSection index={index} ref={sectionRef} id={id} tabIndex={tabIndex}>
      <ProjectItemContent>
        <Transition in={visible} timeout={0}>
          {status => (
            <React.Fragment>
              <ProjectItemDetails>
                <ProjectItemIndex status={status}>
                  <ProjectItemIndexNumber status={status}>{index}</ProjectItemIndexNumber>
                </ProjectItemIndex>
                <ProjectItemTitle status={status}>{title}</ProjectItemTitle>
                <ProjectItemDescription status={status}>{description}</ProjectItemDescription>
                <ProjectItemButton status={status}>
                  {buttonLink ?
                    <LinkButton
                      href={buttonLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      iconRight="arrowRight"
                    >
                      {buttonText}
                    </LinkButton>
                    : <RouterButton to={buttonTo} iconRight="arrowRight">{buttonText}</RouterButton>
                  }
                </ProjectItemButton>
              </ProjectItemDetails>
              <ProjectItemPreview>
                {imageType === 'laptop' &&
                  <ProjectItemPreviewContentLaptop>
                    <ProjectItemImageLaptop
                      status={status}
                      visible={visible}
                      srcSet={imageSrc[0]}
                      alt={imageAlt[0]}
                      placeholder={imagePlaceholder[0]}
                      sizes={`(max-width: ${Media.mobile}) 300px,(max-width: ${Media.tablet}) 420px,(max-width: ${Media.desktop}) 860px, 900px`}
                    />
                    <ProjectItemImageLaptopSvg status={status} icon="projects" />
                  </ProjectItemPreviewContentLaptop>
                }
                {imageType === 'phone' &&
                  <ProjectItemPreviewContentPhone>
                    <ProjectItemPhoneImageSvg status={status} icon="projects" />
                    {imageSrc && imageSrc.map((src, index) => (
                      <ProjectItemPhone first={index === 0} status={status} key={`img_${index}`}>
                        <ProjectItemPhoneFrame
                          visible={visible}
                          srcSet={`${phone} 414w, ${phoneLarge} 828w`}
                          sizes={`(max-width: ${Media.tablet}) 248px, 414px`}
                          alt=""
                          role="presentation"
                          placeholder={phonePlaceholder}
                        />
                        <ProjectItemPhoneImage
                          visible={visible}
                          srcSet={imageSrc[index]}
                          alt={imageAlt[index]}
                          placeholder={imagePlaceholder[index]}
                          sizes={`(max-width: ${Media.tablet}) 152px, 254px`}
                        />
                      </ProjectItemPhone>
                    ))}
                  </ProjectItemPreviewContentPhone>
                }
              </ProjectItemPreview>
            </React.Fragment>
          )}
        </Transition>
      </ProjectItemContent>
    </ProjectItemSection>
  );
}

const ProjectItemContent = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  align-items: center;
  justify-content: center;
  display: grid;
  grid-template-columns: 43% 55%;
  grid-column-gap: 2%;

  @media (min-width: ${Media.desktop}) {
    max-width: 1100px;
  }

  @media (max-width: 1245px) {
    grid-template-columns: 50% 50%;
  }

  @media (max-width: ${Media.tablet}) {
    grid-template-columns: 100%;
    flex-direction: column-reverse;
    height: auto;
  }
`;

const ProjectItemDetails = styled.div`
  flex: 0 0 410px;
  max-width: 410px;
  z-index: 1;
  position: relative;

  @media (max-width: ${Media.tablet}) {
    flex: 0 0 auto;
    max-width: 410px;
    order: 2;
    justify-self: center;
  }
`;

const ProjectItemSection = styled.section`
  min-height: 100vh;
  height: 100vh;
  width: 100vw;
  padding-right: 80px;
  padding-bottom: 40px;
  padding-left: 220px;
  margin-top: ${props => props.index === '01' ? '0' : '120px'};
  margin-bottom: 120px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &:focus {
    outline: none;
  }

  &:nth-child(2n + 1) {
    grid-template-columns: 55% 40%;
  }

  &:nth-child(2n + 1) ${ProjectItemContent} {
    grid-template-columns: 55% 40%;
  }

  &:nth-child(2n + 1) ${ProjectItemDetails} {
    order: 2;
  }

  @media (min-width: ${Media.desktop}) {
    padding-left: 120px;
    margin-bottom: 0;
    margin-top: 0;
  }

  @media (max-width: ${Media.tablet}) {
    padding-left: 160px;
    padding-right: 80px;
    height: auto;
    margin-top: ${props => props.index === '01' ? '0' : '60px'};
    margin-bottom: 60px;

    &:nth-child(2n + 1) ${ProjectItemContent} {
      grid-template-columns: 100%;
    }
  }

  @media (max-width: ${Media.mobile}) {
    padding-left: 25px;
    padding-right: 25px;
    padding-bottom: 100px;
    margin-bottom: 0;
    overflow-x: hidden;
  }

  @media (max-width: ${Media.mobile}), (max-height: ${Media.mobile}) {
    padding-right: ${props => props.theme.spacingOuter.mobile};
    padding-left: ${props => props.theme.spacingOuter.mobile};
  }
`;

const ProjectItemPreview = styled.div`
  flex: 0 1 auto;
  position: relative;
  display: flex;
  align-items: center;
  justify-self: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const ProjectItemPreviewContentPhone = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 600px;
`;

const ProjectItemPreviewContentLaptop = styled.div`
  position: relative;

  @media (max-width: ${Media.tablet}) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const ProjectItemIndex = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 32px;

  &:before {
    content: '';
    position: relative;
    display: block;
    height: 2px;
    top: -1px;
    background: ${props => props.theme.colorPrimary(1)};
    width: 96px;
    margin-right: 15px;
    transition-property: transform, opacity;
    transition-timing-function: ${props => props.theme.curveFastoutSlowin};
    transition-duration: 0.4s;
    transition-delay: 1s;
    transform: scale3d(0, 1, 1);
    transform-origin: left;
  }

  ${props => props.status === 'entered' && `
    &:before {
      transform: scale3d(1, 1, 1);
    }
  `}
`;

const ProjectItemIndexNumber = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: ${props => props.theme.colorPrimary(1)};
  transform: translateX(-10px);
  opacity: 0;
  transition-property: transform, opacity;
  transition-timing-function: ${props => props.theme.curveFastoutSlowin};
  transition-duration: 0.4s;
  transition-delay: 1.3s;

  ${props => props.status === 'entered' && `
    transform: translateX(0);
    opacity: 1;
  `}
`;

const ProjectItemTitle = styled.h2`
  font-size: 42px;
  font-weight: 500;
  line-height: 1.2;
  margin: 0;
  margin-bottom: 16px;
  padding: 0;
  color: ${props => props.theme.colorText(1)};
  transition-property: transform, opacity;
  transition-timing-function: ${props => props.theme.curveFastoutSlowin};
  transition-duration: 0.8s;
  transition-delay: 0.4s;
  transform: translate3d(0, 40px, 0);
  opacity: 0;

  ${props => props.status === 'entered' && `
    transform: translate3d(0, 0, 0);
    opacity: 1;
  `}

  @media (max-width: 1245px) {
    font-size: 36px;
  }

  @media (max-width: ${Media.mobile}) {
    font-size: 28px;
  }
`;

const ProjectItemDescription = styled.p`
  font-size: 18px;
  line-height: 1.4;
  color: ${props => props.theme.colorText(0.8)};
  margin-bottom: 38px;
  transition-property: transform, opacity;
  transition-timing-function: ${props => props.theme.curveFastoutSlowin};
  transition-duration: 0.8s;
  transition-delay: 0.6s;
  transform: translate3d(0, 40px, 0);
  opacity: 0;

  ${props => props.status === 'entered' && `
    transform: translate3d(0, 0, 0);
    opacity: 1;
  `}

  @media (max-width: ${Media.mobile}) {
    font-size: 16px;
  }
`;

const ProjectItemButton = styled.div`
  transition-property: transform, opacity;
  transition-timing-function: ${props => props.theme.curveFastoutSlowin};
  transition-duration: 0.8s;
  transition-delay: 0.8s;
  transform: translate3d(0, 40px, 0);
  opacity: 0;

  ${props => props.status === 'entered' && `
    transform: translate3d(0, 0, 0);
    opacity: 1;
  `}
`;

const ProjectItemImageLaptop = styled(ProgressiveImage)`
  width: 862px;
  height: 531px;
  transition-property: transform, opacity;
  transition-duration: 1s;
  transition-delay: 0.4s;
  transition-timing-function: ${props => props.theme.curveFastoutSlowin};
  transform: translate3d(40px, 0, 0);
  opacity: 0;
  position: relative;
  right: -140px;

  ${props => props.status === 'entered' && `
    transform: translate3d(0, 0, 0);
    opacity: 1;
  `}

  @media(min-width: 1440px) {
    width: 880px;
    height: 542px;
  }

  @media(max-width: 1245px) {
    width: 761px;
    height: 491px;
  }

  @media (max-width: ${Media.tablet}) {
    width: 420px;
    height: 258px;
    margin-bottom: 120px;
    right: 0;
  }

  @media (max-width: ${Media.mobile}) {
    width: 336px;
    height: 206px;
    margin-bottom: 60px;
  }
`;

const ProjectItemImageLaptopSvg = styled(Svg)`
  position: absolute;
  bottom: -40px;
  right: -200px;
  width: 600px;
  opacity: 0;
  transition: opacity 0.4s ease 0.6s;

  ${props => props.status === 'entered' && `
    opacity: 1;
  `}

  @media (max-width: ${Media.tablet}) {
    width: 400px;
    right: 0;
    bottom: 64px;
  }

  @media (max-width: ${Media.mobile}) {
    width: 260px;
    bottom: 10px;
  }
`;

const ProjectItemPhone = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition-duration: 1s;
  transition-timing-function: ${props => props.theme.curveFastoutSlowin};
  transition-property: transform, opacity;
  width: 100%;
  max-width: 100%;
  flex: 1 0 100%;

  ${props => props.first ? `
    left: calc(50% - 140px);
    top: -120px;
    transform: translate3d(0, 80px, 0);
    transition-delay: 0s;

    @media (max-width: ${Media.tablet}) {
      left: calc(50% - 48px);
      top: -60px;
    }
  `: `
    left: calc(-50% + 20px);
    top: 120px;
    transform: translate3d(0, 80px, 0);
    transition-delay: 0.2s;

    @media (max-width: ${Media.tablet}) {
      left: calc(-50% + 40px);
      top: 60px;
    }
  `}

  ${props => props.status === 'entered' && `
    transform: translate3d(0, 0, 0);
    opacity: 1;
  `}
`;

const ProjectItemPhoneFrame = styled(ProgressiveImage)`
  position: absolute;
  width: 414px;
  height: 721px;

  @media (max-width: ${Media.tablet}) {
    width: 248px;
    height: 431px;
  }
`;

const ProjectItemPhoneImage = styled(ProgressiveImage)`
  box-shadow: 0 0 0 2px #1C1C1C;
  position: relative;
  top: -14px;
  width: 254px;
  height: 452px;

  img {
    width: 100%;
    height: 100%;
  }

  @media (max-width: ${Media.tablet}) {
    box-shadow: 0 0 0 1px #1C1C1C;
    width: 152px;
    height: 270px;
    top: -9px;
  }
`;

const ProjectItemPhoneImageSvg = styled(Svg)`
  position: absolute;
  transform: translateY(260px);
  width: 600px;
  transition: opacity 0.6s ease 0.6s;
  opacity: 0;

  ${props => props.status === 'entered' && `
    opacity: 1;
  `}

  @media (max-width: ${Media.tablet}) {
    width: 400px;
    transform: translateY(180px);
  }

  @media (max-width: ${Media.mobile}) {
    width: 320px;
    transform: translateY(160px);
  }
`;

export default ProjectItem;
