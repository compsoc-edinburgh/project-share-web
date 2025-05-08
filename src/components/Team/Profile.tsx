import { TeamMember } from './types'
import {
  ProfileWrapper,
  ImageWrapper,
  ProfileImage,
  ProfileInfo,
  SignatureWrapper,
} from './styles'

export const Profile = ({
  name,
  surname,
  position,
  imageUrl,
  links,
  signature,
}: TeamMember) => {
  return (
    <ProfileWrapper>
      <ImageWrapper>
        <ProfileImage src={imageUrl} alt={`${name} ${surname}`} />
      </ImageWrapper>
      <ProfileInfo>
        <h3 className="name">
          {name} {surname}
        </h3>
        <div className="position">{position}</div>
        {links && (
          <div className="links">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer">
                {link.label}
              </a>
            ))}
          </div>
        )}
      </ProfileInfo>
      <SignatureWrapper>
        <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
          <path
            d={signature}
            fill="none"
            stroke="#7815f4"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="2000"
            strokeDashoffset="-2000"
            style={{
              animation: 'draw 3s ease forwards',
            }}
          />
        </svg>
      </SignatureWrapper>
    </ProfileWrapper>
  )
}
