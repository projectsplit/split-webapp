import { jsx as _jsx } from "react/jsx-runtime";
import { getInitials } from '../../helpers/getInitials';
import { StyledUserOptionsButton } from './UserOptionsButton.styled';
export default function UserOptionsButton({ onClick, username, }) {
    return (_jsx(StyledUserOptionsButton, { onClick: onClick, children: getInitials(username) }));
}
