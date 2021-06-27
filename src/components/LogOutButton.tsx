import { ReactNode, ButtonHTMLAttributes } from 'react';
import { FiLogOut } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { auth } from '../services/firebase';

import '../styles/logOutButton.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isDisabled?: boolean;
  children?: ReactNode;
};

export function LogOutButton({ isDisabled = false, children, ...props }: ButtonProps) {
  const history = useHistory();

  async function signOutOfGoogle() {
    await auth.signOut();
    history.push('/');
  }
  return (
    <button className="logout" onClick={signOutOfGoogle}>
      <div>
        <FiLogOut size={20} />
      </div>
      <span>Log out</span>
    </button>
  );
}
