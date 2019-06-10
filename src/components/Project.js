import React, { useState, useEffect, useRef } from 'react';
import styled, { css, keyframes } from 'styled-components/macro';
import { media, AnimFade, rgba, sectionPadding } from '../utils/styleUtils';
import ProgressiveImage from '../components/ProgressiveImage';
import { LinkButton } from '../components/Button';
import { usePrefersReducedMotion } from '../utils/hooks';

const initDelay = 300;
const prerender = navigator.userAgent === 'ReactSnap';

export function ProjectBackground(props) {
  const [offset, setOffset] = useState();
  const scheduledAnimationFrame = useRef(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (prefersReducedMotion || scheduledAnimationFrame.current) return;
      lastScrollY.current = window.scrollY;
      scheduledAnimationFrame.current = true;

      requestAnimationFrame(() => {
        setOffset(lastScrollY.current * 0.4);
        scheduledAnimationFrame.current = false;
      });
    };

    window.addEventListener('scroll', handleScroll);

    return function cleanUp() {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prefersReducedMotion]);

  return (
    <ProjectBackgroundImage offset={offset} {...props} />
  );
}

export function ProjectHeader(props) {
  const { title, description, linkLabel, url, roles } = props;

  return (
    <ProjectHeaderContainer>
      <ProjectHeaderInner>
        <ProjectDetails entered={!prerender}>
          <ProjectTitle>{title}</ProjectTitle>
          <ProjectDescription>{description}</ProjectDescription>
          <LinkButton
            secondary
            iconHoverShift
            style={{ paddingLeft: '3px' }}
            icon="chevronRight"
            href={url}
            target="_blank"
          >
            {linkLabel ? linkLabel : 'Visit website'}
          </LinkButton>
        </ProjectDetails>
        <ProjectMeta entered={!prerender}>
          {roles && roles.map(role => (
            <ProjectMetaItem key={role}>{role}</ProjectMetaItem>
          ))}
        </ProjectMeta>
      </ProjectHeaderInner>
    </ProjectHeaderContainer>
  );
}

export const ProjectContainer = styled.article`
  position: relative;
  width: 100vw;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
`;

export const ProjectSection = styled.section`
  position: relative;
  width: 100vw;
  padding-top: 100px;
  padding-bottom: 100px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  ${sectionPadding}

  @media (max-width: ${media.tablet}) {
    padding-top: 60px;
    padding-bottom: 60px;
    height: auto;
  }

  @media (max-width: ${media.mobile}) {
    padding-top: 40px;
    padding-bottom: 40px;
  }

  ${props => props.light && css`
    background: ${props.theme.colorBackgroundLight};
    padding-top: 120px;
    padding-bottom: 140px;

    @media (max-width: ${media.tablet}) {
      padding-top: 80px;
      padding-bottom: 100px;
    }

    @media (max-width: ${media.mobile}) {
      padding-top: 80px;
      padding-bottom: 100px;
    }
  `}
`;

export const ProjectBackgroundImage = styled(ProgressiveImage).attrs(props => ({
  alt: '',
  role: 'presentation',
  opacity: props.opacity ? props.opacity : 0.7,
  style: {
    transform: `translate3d(0, ${props.offset}px, 0)`,
  },
}))`
  z-index: 0;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 800px;
  opacity: 0;
  overflow: hidden;

  ${props => props.entered && css`
    animation: ${AnimFade} 2s ease ${initDelay}ms forwards;
  `}

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  &:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg,
      ${props => rgba(props.theme.colorBackground, props.opacity)} 0%,
      ${props => props.theme.colorBackground} 100%
    );
  }
`;

const ProjectHeaderContainer = styled(ProjectSection)`
  padding-top: 140px;
  padding-bottom: 40px;

  @media (max-width: ${media.tablet}) {
    padding-top: 100px;
    padding-bottom: 0;
  }

  @media (max-width: ${media.mobile}) {
    padding-top: 130px;
    padding-bottom: 20px;
  }
`;

const ProjectHeaderInner = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 300px;
  grid-gap: 100px;
  max-width: ${props => props.theme.maxWidthLaptop}px;

  @media (min-width: ${media.desktop}) {
    max-width: ${props => props.theme.maxWidthDesktop}px;
    grid-template-columns: 1fr 400px;
  }

  @media (max-width: 1200px) {
    grid-template-columns: 1fr 200px;
    grid-gap: 40px;
  }

  @media (max-width: ${media.tablet}) {
    grid-template-columns: 100%;
    grid-gap: 30px;
  }
`;

const AnimFadeSlide = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(0, 60px, 0);
  }
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

const ProjectDetails = styled.div`
  opacity: 0;

  ${props => props.entered && css`
    animation: ${AnimFadeSlide} 1.4s ${props.theme.curveFastoutSlowin} ${initDelay}ms forwards;
  `}
`;

const ProjectTitle = styled.h1`
  margin: 0;
  font-size: 54px;
  font-weight: 500;
  line-height: 1.1;
  color: ${props => props.theme.colorTitle};

  @media (max-width: ${media.tablet}) {
    font-size: 48px;
  }

  @media (max-width: ${media.mobile}) {
    font-size: 34px;
  }

  @media (max-width: 320px) {
    font-size: 28px;
  }
`;

const ProjectDescription = styled.p`
  font-size: 22px;
  line-height: 1.4;

  @media (max-width: ${media.mobile}) {
    font-size: 18px;
  }
`;

const ProjectMeta = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  margin-top: 10px;
  opacity: 0;

  ${props => props.entered && css`
    animation: ${AnimFadeSlide} 1.4s ${props.theme.curveFastoutSlowin} ${initDelay + 200}ms forwards;
  `}
`;

const ProjectMetaItem = styled.li`
  padding: 30px 0;
  font-size: 16px;
  font-weight: ${props => props.theme.id === 'light' ? 500 : 400};
  border-top: 1px solid ${props => rgba(props.theme.colorText, 0.2)};

  &:last-child {
    border-bottom: 1px solid ${props => rgba(props.theme.colorText, 0.2)};
  }

  @media (max-width: ${media.tablet}) {
    padding: 20px 0;
  }

  @media (max-width: ${media.mobile}) {
    padding: 15px 0;
  }
`;

export const ProjectImage = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  transform: translate3d(0, 0, 0);
  max-width: 100%;

  div {
    width: 100%;
  }
`;

export const ProjectSectionContent = styled.div`
  max-width: ${props => props.theme.maxWidthLaptop}px;
  width: 100%;
  display: flex;
  flex-direction: column;

  @media (min-width: ${media.desktop}) {
    max-width: ${props => props.theme.maxWidthDesktop}px;
  }
`;

export const ProjectSectionHeading = styled.h2`
  font-size: 32px;
  font-weight: 500;
  margin: 0;
  color: ${props => props.theme.colorTitle};

  @media (max-width: ${media.mobile}) {
    font-size: 24px;
  }
`;

export const ProjectSectionText = styled.p`
  font-size: 20px;
  line-height: 1.4;
  margin: 0;
  margin-top: 28px;
  color: ${props => rgba(props.theme.colorText, 0.7)};

  & + a {
    margin-top: 14px;
  }

  @media (max-width: ${media.mobile}) {
    font-size: 18px;
    margin-top: 22px;
  }
`;

export const ProjectTextRow = styled.div`
  max-width: 660px;
  align-self: center;
  margin-bottom: ${props => props.noMargin ? 0 : 80}px;
  text-align: ${props => props.center ? 'center' : 'left'};
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: ${props => props.center ? 'center' : 'flex-start'};

  ${props => !props.centerMobile && css`
    @media (max-width: ${media.mobile}) {
      text-align: left;
      align-items: flex-start;
    }
  `}
`;
