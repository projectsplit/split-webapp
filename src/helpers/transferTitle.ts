/** How a transfer names itself to the person looking at it, who appears in it as "You". */
export const transferTitle = (senderName: string, receiverName: string) =>
  senderName === 'You'
    ? `Sent to ${receiverName}`
    : receiverName === 'You'
      ? `Received from ${senderName}`
      : `${senderName} sent to ${receiverName}`;
