import { FC } from 'react'
import styled, { css, keyframes } from 'styled-components'

interface LogoProps {
  size?: number
  animated?: boolean
}

const rotateAnimation = keyframes`
  40% {
    transform: rotate(0deg);
  }
  45% {
    transform: rotate(-5deg);
  }
  75% {
    transform: rotate(363deg);
  }
  80% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(360deg);
  }
`
const Rotate = styled.g<{ animated: boolean }>`
  transform-origin: 50% 50%;
  animation: ${({ animated }) =>
    animated
      ? css`
          ${rotateAnimation} 3s infinite cubic-bezier(0.680, -0.550, 0.265, 1.550)
        `
      : 'none'};
  animation-fill-mode: backwards;
`

const Logo: FC<LogoProps> = ({ size = 126, animated = false }) => {
  return (
    <div>
      <svg
        width={size}
        height={size}
        viewBox="0 0 102 102"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_69_284)">
          <Rotate animated={animated}>
            <path
              d="M77.1208 32.6825H80.7965C80.7965 31.7005 80.4037 30.7595 79.7053 30.069C79.0069 29.3785 78.0618 28.9961 77.08 29.007L77.1208 32.6825ZM24.8109 25.2702V21.5945C23.8361 21.5945 22.9011 21.9818 22.2118 22.671C21.5225 23.3604 21.1353 24.2953 21.1353 25.2702H24.8109ZM80.7965 42.2126V32.6825H73.4452V42.2126H80.7965ZM77.1208 32.6825C77.08 29.007 77.08 29.007 77.08 29.007C77.0795 29.007 77.0795 29.007 77.079 29.007C77.0786 29.007 77.0781 29.007 77.0767 29.007C77.0749 29.0071 77.0717 29.0071 77.0671 29.0072C77.0584 29.0073 77.045 29.0074 77.0271 29.0076C76.9917 29.008 76.9389 29.0085 76.8691 29.0092C76.7303 29.0106 76.5254 29.0125 76.2635 29.0148C75.7388 29.0193 74.9853 29.0251 74.0696 29.03C72.2377 29.0399 69.7631 29.0465 67.186 29.0333C64.6043 29.0201 61.9394 28.9873 59.722 28.9192C57.3779 28.8472 55.8598 28.7419 55.3494 28.6462L53.9944 35.8716C55.178 36.0936 57.3136 36.2001 59.4964 36.2671C61.8052 36.338 64.5413 36.3713 67.1483 36.3846C69.7594 36.3979 72.2616 36.3912 74.1095 36.3813C75.034 36.3763 75.7958 36.3705 76.3269 36.3659C76.5925 36.3636 76.8006 36.3616 76.9421 36.3602C77.0133 36.3595 77.0675 36.3589 77.1048 36.3585C77.1231 36.3583 77.1369 36.3582 77.1466 36.3581C77.1516 36.358 77.1548 36.358 77.1576 36.358C77.159 36.358 77.1599 36.3579 77.1604 36.3579C77.1608 36.3579 77.1608 36.3579 77.1613 36.3579C77.1613 36.3579 77.1617 36.3579 77.1208 32.6825ZM55.3494 28.6462C55.5474 28.6833 55.444 28.7488 54.9708 28.282C54.4801 27.7981 54.0137 27.1857 53.2653 26.2421C52.6151 25.4221 51.715 24.3072 50.6137 23.4158C49.4554 22.4783 47.8418 21.5945 45.7772 21.5945V28.9458C45.6216 28.9458 45.6506 28.8562 45.9888 29.1298C46.3835 29.4495 46.8333 29.9626 47.5059 30.8105C48.0803 31.5347 48.91 32.6297 49.8083 33.5158C50.724 34.4189 52.1024 35.5169 53.9944 35.8716L55.3494 28.6462ZM45.7772 21.5945H24.8109V28.9458H45.7772V21.5945ZM21.1353 25.2702V68.1299H28.4866V25.2702H21.1353ZM21.1353 68.1299C21.1353 72.0592 23.6916 74.3896 26.2061 75.529C28.5819 76.6051 31.3499 76.8881 33.4939 76.8881V69.5368C31.826 69.5368 30.2525 69.2914 29.2397 68.8324C28.7636 68.6169 28.5839 68.4313 28.5354 68.3688C28.5278 68.3587 28.4866 68.3339 28.4866 68.1299H21.1353Z"
              fill="#7816F4"
            />
            <path
              d="M38.6612 46.9521L25.8696 67.87L32.2654 74.0598H74.7664L89.8274 46.9521H38.6612Z"
              fill="#7816F4"
            />
            <path
              d="M25.8696 67.7629L23.7137 66.4443C23.0966 67.4537 23.2621 68.7558 24.1122 69.5787L25.8696 67.7629ZM38.6612 46.8451V44.3179C37.7811 44.3179 36.9644 44.7757 36.5053 45.5266L38.6612 46.8451ZM89.8274 46.8451L92.036 48.0724C92.4712 47.2894 92.4592 46.3351 92.0053 45.5634C91.5513 44.7917 90.7225 44.3179 89.8274 44.3179V46.8451ZM74.7664 73.9528V76.4798C75.6839 76.4798 76.5298 75.9822 76.9754 75.18L74.7664 73.9528ZM32.2654 73.9528L30.508 75.7686L31.2428 76.4798L32.5 76.8931L32.2654 73.9528ZM28.0255 69.0811L40.817 48.1633L36.5053 45.5266L23.7137 66.4443L28.0255 69.0811ZM38.6612 49.3722H89.8274V44.3179H38.6612V49.3722ZM87.6184 45.6176L72.5573 72.7256L76.9754 75.18L92.036 48.0724L87.6184 45.6176ZM74.7664 71.4258H32.2654L32.5 76.8931L74.7664 76.4798V71.4258ZM34.0228 72.137L27.6271 65.9472L24.1122 69.5787L30.508 75.7686L34.0228 72.137Z"
              fill="#7816F4"
            />
          </Rotate>
          <path
            d="M51 101.311C78.7859 101.311 101.311 78.7859 101.311 51C101.311 23.2141 78.7859 0.689209 51 0.689209C23.2141 0.689209 0.689209 23.2141 0.689209 51C0.689209 78.7859 23.2141 101.311 51 101.311Z"
            stroke="#7816F4"
          />
          <path
            d="M101.311 0.689209H0.689209V101.311H101.311V0.689209Z"
            stroke="#7816F4"
          />
          <path
            d="M0.459473 101.541L51 51M51 51L101.541 0.459473M51 51L0.459473 0.459473M51 51L101.541 101.541"
            stroke="#7816F4"
          />
        </g>
        <defs>
          <clipPath id="clip0_69_284">
            <rect width="102" height="102" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  )
}

export default Logo
