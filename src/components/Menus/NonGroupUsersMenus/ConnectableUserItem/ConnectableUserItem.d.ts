import React from 'react';
import { ConnectionStatus } from '../../../../types';
type ConnectableUserItemProps = {
    name: string;
    status: ConnectionStatus | undefined;
    onSelect: (e: React.MouseEvent) => void;
    onRequest: (e: React.MouseEvent) => void;
    onAccept: (e: React.MouseEvent) => void;
};
/**
 * A user row in the non-group pickers. Users you are not connected with
 * cannot be selected directly: they show a Request / Requested / Accept chip.
 */
declare const _default: React.NamedExoticComponent<ConnectableUserItemProps>;
export default _default;
