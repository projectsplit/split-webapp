import { StyledShareGroup } from './ShareGroup.styled';
import Spinner from '../../../components/Spinner/Spinner';
import { ShareGroupProps } from '../../../interfaces';
import { useEffect } from 'react';
import QRCodeStyling from 'qr-code-styling';
import logo from '../../../styles/logo/logoRounded.png';
import MyButton from '../../../components/MyButton/MyButton';
import { copyToClipboard } from '../../../helpers/copyToClipboars';
import { useQueryClient } from '@tanstack/react-query';
import { IoIosWarning } from 'react-icons/io';
import { TbQrcodeOff } from 'react-icons/tb';
import ShimmerPlaceholder from '../ShimmerPlaceholder/ShimmerPlaceholder';
import config from '../../../config';
import { useTimeLeft } from '@/hooks/useTimeLeft';

export default function ShareGroup({
  groupName,
  isPending,
  qrRef,
  invitationCode,
  mutate,
  groupId,
  setInvitationCode,
  expires,
  onCopied,
}: ShareGroupProps) {
  const pageSize = 10;
  const queryClient = useQueryClient();
  const timeLeft = useTimeLeft(expires);

  useEffect(() => {
    if (invitationCode && qrRef.current) {
      const qrCode = new QRCodeStyling({
        type: 'svg',
        width: 520,
        height: 520,
        data: `${config.clientUrl}/j/${invitationCode}`,
        dotsOptions: {
          color: '#000000',
          type: 'rounded',
        },
        cornersSquareOptions: {
          type: 'extra-rounded',
        },
        backgroundOptions: {
          color: '#c5a1ff',
          round: 0.1,
        },
        image: logo,
        imageOptions: {
          crossOrigin: 'anonymous',
          margin: 20,
          imageSize: 0.4,
        },
      });
      qrRef.current.innerHTML = '';
      qrCode.append(qrRef.current);
      return () => {
        if (qrRef.current) {
          qrRef.current.innerHTML = '';
        }
      };
    }
  }, [invitationCode, isPending, qrRef]);

  const isExpired = timeLeft === 'Expired';

  return (
    <StyledShareGroup>
      <div className="shareScroll">
        {isPending ? (
          <div className="spinnerBox">
            <Spinner />
          </div>
        ) : invitationCode ? (
          <>
            <div className="promptMessage">
              {groupName.length > 0 ? (
                <>
                  Scan this QR code with another device to join{' '}
                  <span className="groupName">{groupName}</span>
                </>
              ) : (
                'Scan this QR code with another device'
              )}
            </div>

            <div className="qrCodeContainer">
              <div className="qrCode" ref={qrRef} />
            </div>

            <div className="codeCard">
              <div className="cardLabel">Or share this code</div>
              <div className="code">{invitationCode}</div>
              <div className={`expires${isExpired ? ' expired' : ''}`}>
                {!timeLeft.length || timeLeft === 'NaN' ? (
                  <ShimmerPlaceholder />
                ) : isExpired ? (
                  <>
                    <IoIosWarning className="warning" /> Expired
                  </>
                ) : (
                  <span>
                    Expires in <span className="timeLeft">{timeLeft}</span>
                  </span>
                )}
              </div>
              <MyButton
                variant="secondary"
                onClick={async () =>
                  onCopied(
                    await copyToClipboard(
                      invitationCode,
                      `${config.clientUrl}/j/`
                    )
                  )
                }
              >
                Copy invite link
              </MyButton>
            </div>
          </>
        ) : (
          <div className="emptyState">
            <div className="msg">This invitation code no longer exists.</div>
            <TbQrcodeOff className="icon" />
          </div>
        )}
      </div>

      <div className="footer">
        <MyButton
          onClick={() =>
            mutate(
              { groupId: groupId },
              {
                onSuccess: (code: string) => {
                  queryClient.invalidateQueries({
                    queryKey: ['getGroupJoinCodes', groupId, pageSize],
                  });
                  setInvitationCode(code);
                },
              }
            )
          }
        >
          Generate new code
        </MyButton>
      </div>
    </StyledShareGroup>
  );
}
