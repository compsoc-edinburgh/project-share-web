import { TeamMember, SignatureStroke } from './types'
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
  // Convert legacy string signature to new format
  const signatureStrokes: SignatureStroke[] =
    typeof signature === 'string' ? [{ path: signature }] : signature

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
          {signatureStrokes.map((stroke, index) => (
            <path
              key={index}
              d={stroke.path}
              fill="none"
              stroke="#7815f4"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="2000"
              strokeDashoffset={stroke.reverse ? '2000' : '-2000'}
              style={{
                animation: `draw ${stroke.duration || 3}s ease forwards`,
                animationDelay: `${signatureStrokes
                  .slice(0, index)
                  .reduce((sum, s) => sum + (s.duration || 3), 0)}s`,
              }}
            />
          ))}
        </svg>
      </SignatureWrapper>
    </ProfileWrapper>
  )
}
