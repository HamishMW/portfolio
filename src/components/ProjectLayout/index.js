import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { AnimFade, sectionPadding } from '/utils/style';
import Image from '/components/Image';
import { Button } from '/components/Button';
import { useParallax } from '/hooks';
import prerender from '/utils/prerender';
import { media } from '/utils/style';
import { pxToRem } from '/app/theme';

const initDelay = 300;

export function ProjectBackground(props) {
  const offset = useParallax(-0.6);

  return <ProjectBackgroundImage offsetValue={offset} {...props} />;
}

export function ProjectHeader(props) {
  const { title, description, linkLabel = 'Visit website', url, roles } = props;

  return (
    <ProjectHeaderContainer>
      <ProjectHeaderInner>
        <ProjectDetails>
          <ProjectTitle entered={!prerender}>{title}</ProjectTitle>
          <ProjectDescription entered={!prerender}>{description}</ProjectDescription>
          <ProjectLinkButton
            secondary
            iconHoverShift
            as="a"
            entered={!prerender}
            style={{ paddingLeft: 'var(--spaceXS)' }}
            icon="chevronRight"
            href={url}
            target="_blank"
          >
            {linkLabel}
          </ProjectLinkButton>
        </ProjectDetails>
        <ProjectMeta>
          {roles?.map((role, index) => (
            <ProjectMetaItem key={role} index={index} entered={!prerender}>
              {role}
            </ProjectMetaItem>
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
  padding-top: var(--space4XL);
  padding-bottom: var(--space4XL);
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  ${sectionPadding}

  @media (max-width: ${media.tablet}px) {
    padding-top: var(--space3XL);
    padding-bottom: var(--space3XL);
    height: auto;
  }

  @media (max-width: ${media.mobile}px) {
    padding-top: var(--space2XL);
    padding-bottom: var(--space2XL);
  }

  ${props =>
    props.light &&
    css`
      background: rgb(var(--rgbBackgroundLight));
      padding-top: var(--space5XL);
      padding-bottom: calc(var(--space5XL) + var(--spaceXL));

      @media (max-width: ${media.tablet}px) {
        padding-top: var(--space3XL);
        padding-bottom: var(--space4XL);
      }

      @media (max-width: ${media.mobile}px) {
        padding-top: var(--space2XL);
        padding-bottom: var(--space4XL);
      }
    `}
`;

export const ProjectBackgroundImage = styled(Image).attrs(props => ({
  alt: '',
  role: 'presentation',
  opacity: props.opacity ? props.opacity : 0.7,
  style: {
    transform: `translate3d(0, ${props.offsetValue}px, 0)`,
  },
}))`
  z-index: 0;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 800px;
  opacity: 0;
  overflow: hidden;

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
  }

  ${props =>
    props.entered &&
    css`
      animation: ${AnimFade} 2s ease ${initDelay}ms forwards;
    `}

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      180deg,
      ${props => `rgb(var(--rgbBackground) / ${props.opacity})`} 0%,
      rgb(var(--rgbBackground)) 100%
    );
  }
`;

const ProjectHeaderContainer = styled(ProjectSection)`
  padding-top: var(--space5XL);
  padding-bottom: var(--space2XL);

  @media (max-width: ${media.tablet}px) {
    padding-top: var(--space4XL);
    padding-bottom: 0;
  }

  @media (max-width: ${media.mobile}px) {
    padding-top: var(--space5XL);
    padding-bottom: var(--spaceXL);
  }
`;

const ProjectHeaderInner = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 300px;
  grid-gap: var(--space4XL);
  max-width: var(--maxWidthL);

  @media (min-width: ${media.desktop}px) {
    grid-template-columns: 1fr 400px;
  }

  @media (max-width: 1200px) {
    grid-template-columns: 1fr 200px;
    grid-gap: var(--space2XL);
  }

  @media (max-width: ${media.tablet}px) {
    grid-template-columns: 100%;
    grid-gap: var(--spaceXL);
  }
`;

const AnimFadeSlide = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(0, var(--space3XL), 0);
  }
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

const ProjectDetails = styled.div`
  position: relative;
`;

const ProjectTitle = styled.h1`
  font-size: var(--fontSizeH1);
  font-weight: var(--fontWeightMedium);
  line-height: var(--lineHeightTitle);
  margin: 0 0 var(--spaceL) 0;
  color: var(--colorTextTitle);
  opacity: 0;

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
  }

  ${props =>
    props.entered &&
    css`
      animation: ${AnimFadeSlide} 1.4s var(--bezierFastoutSlowin) ${initDelay}ms forwards;
    `}
`;

const ProjectDescription = styled.p`
  font-size: calc(var(--fontSizeBodyL) + ${pxToRem(2)});
  line-height: var(--lineHeightBody);
  margin: 0 0 var(--spaceL) 0;
  opacity: 0;

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
  }

  ${props =>
    props.entered &&
    css`
      animation: ${AnimFadeSlide} 1.4s var(--bezierFastoutSlowin) ${initDelay + 100}ms
        forwards;
    `}
`;

const ProjectLinkButton = styled(Button)`
  opacity: 0;

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
  }

  ${props =>
    props.entered &&
    css`
      animation: ${AnimFadeSlide} 1.4s var(--bezierFastoutSlowin) ${initDelay + 200}ms
        forwards;
    `}
`;

const ProjectMeta = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  margin-top: var(--spaceM);
`;

const ProjectMetaItem = styled.li`
  padding: var(--spaceL) 0;
  font-size: var(--fontSizeBodyS);
  font-weight: ${props =>
    props.theme.themeId === 'light'
      ? 'var(--fontWeightMedium)'
      : 'var(--fontWeightRegular)'};
  border-top: 1px solid rgb(var(--rgbText) / 0.2);
  opacity: 0;

  &:last-child {
    border-bottom: 1px solid rgb(var(--rgbText) / 0.2);
  }

  @media(prefers-reduced-motion: reduce) {
    opacity: 1;
  }

  ${props =>
    props.entered &&
    css`
      animation: ${AnimFadeSlide} 1.5s var(--bezierFastoutSlowin)
        ${initDelay + 300 + props.index * 140}ms forwards;
    `}

  @media(max-width: ${media.mobile}px) {
    padding: var(--spaceM) 0;
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
  max-width: var(--maxWidthL);
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const ProjectSectionHeading = styled.h2`
  font-size: var(--fontSizeH2);
  font-weight: var(--fontWeightMedium);
  margin: 0 0 var(--spaceL) 0;
  color: var(--colorTextTitle);

  @media (max-width: ${media.mobile}px) {
    margin-bottom: var(--spaceM);
  }
`;

export const ProjectSectionText = styled.p`
  font-size: var(--fontSizeBodyL);
  line-height: var(--lineHeightBody);
  color: var(--colorTextBody);
  margin: 0;

  & + a,
  & + & {
    margin-top: var(--spaceL);
  }
`;

export const ProjectTextRow = styled.div`
  max-width: var(--maxWidthM);
  align-self: center;
  margin-bottom: ${props => (props.noMargin ? 0 : 'var(--space3XL)')};
  text-align: ${props => (props.center ? 'center' : 'left')};
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: ${props => (props.center ? 'center' : 'flex-start')};

  ${props =>
    !props.centerMobile &&
    css`
      @media (max-width: ${media.mobile}px) {
        text-align: left;
        align-items: flex-start;
      }
    `}
`;
