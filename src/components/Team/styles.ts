import styled from 'styled-components'

export const Background = styled.div`
  background-color: #f3f3f3;
  min-height: 100vh;
  padding: 2rem 0 5rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    padding: 16px;
  }
`

export const Page = styled.div`
  width: 600px;
  margin: 0rem auto;
  color: black;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
  }
`

export const TimelineContainer = styled.div`
  position: fixed;
  left: 2rem;
  top: 50%;
  transform: translateY(-50%);
  height: 80vh;
  width: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 100;

  @media (max-width: 1200px) {
    display: none;
  }
`

export const TimelineSVG = styled.svg`
  width: 100%;
  height: 100%;
  user-select: none;

  @media (max-width: 1200px) {
    width: 300px;
    height: 100px;
  }
`

export const TimelinePath = styled.path`
  stroke: #e0e0e0;
  stroke-width: 4;
  fill: none;
`

export const TimelineGroup = styled.g`
  cursor: pointer;

  &:hover {
    circle {
      stroke-width: 4;
    }
  }
`

export const TimelineDot = styled.circle<{ isSelected: boolean }>`
  fill: ${(props) => (props.isSelected ? '#7815f4' : 'white')};
  stroke: #7815f4;
  stroke-width: ${(props) => (props.isSelected ? '2' : '2')};
  transition: all 0.3s ease;
  r: ${(props) => (props.isSelected ? '4' : '8')};
`

export const TimelineText = styled.text`
  fill: #666;
  font-size: 14px;
  text-anchor: middle;
  user-select: none;
`

export const ContentWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 2rem 0px;
  gap: 5rem;

  @media (max-width: 768px) {
    gap: 2rem;
  }
`

export const CommitteeSection = styled.div`
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  background-color: white;

  h2 {
    text-align: center;
    color: #7815f4;
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
    letter-spacing: 0.5px;
    position: relative;
    padding: 0 1rem;
  }

  @media (max-width: 768px) {
    padding: 1rem 0.5rem;
    h2 {
      font-size: 1.3rem;
      margin-bottom: 0.2rem;
      padding: 0;
    }
    p {
      margin-top: 0.2rem !important;
      margin-bottom: 0.5rem !important;
      font-size: 0.98rem;
    }
  }
`

export const TeamGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: 768px) {
    gap: 0.7rem;
  }
`

export const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem;
  background: rgba(120, 21, 244, 0.03);
  border-radius: 8px;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    gap: 0.7rem;
    padding: 0.5rem 0.5rem;
    min-height: 70px;
  }
`

export const ImageWrapper = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 64px;
    height: 64px;
  }
`

export const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
`

export const SignatureWrapper = styled.div`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 140px;
  height: 48px;
  opacity: 0.75;

  @media (max-width: 768px) {
    width: 90px;
    height: 32px;
    right: 0.3rem;
    top: 70%;
    transform: translateY(-40%);
  }
`

export const ProfileInfo = styled.div`
  text-align: left;
  flex: 1;

  h3 {
    font-size: 1.1rem;
    margin: 0;
    color: #333;
  }

  .position {
    font-size: 0.9rem;
    color: #646464;
    margin: 0;
  }

  .links {
    display: flex;
    gap: 0.75rem;
    font-size: 0.85rem;

    a {
      color: #7815f4;
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 0.25rem;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`
