import Hamburger from 'components/animation/hamburger';
import useOnClickOutside from 'hooks/useClickOutside';
import { useRef, useState } from 'react';
import Icon from 'utils/Icon';
import AuthMenu from './views/auth';
import NonAuthMenu from './views/non-auth';
import { createPortal } from 'react-dom';
import { useLockBodyScroll } from 'hooks/useLockBodyScroll';
import useStore from 'store';

const Menu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { loggedIn } = useStore((store) => store);
  const menuRef = useRef(null);

  useOnClickOutside(menuRef, () => {
    setMenuOpen(false);
  });

  useLockBodyScroll(menuOpen);

  return (
    <div className='relative z-20 overflow-hidden'>
      <button className='group relative flex items-center' onClick={() => setMenuOpen(true)}>
        <Hamburger menuOpen={menuOpen} />
      </button>
      {createPortal(
        <>
          <div
            className={`fixed bottom-0 left-0  right-0 top-0 h-screen w-full overflow-hidden bg-black/[0.25] ${
              menuOpen ? `opacity-100` : `hidden opacity-0`
            } transition-all duration-300 delay-200 ease-in-out`}
          ></div>
          <aside
            ref={menuRef}
            className={`fixed bottom-0 right-0 top-0 z-50 h-screen w-[320px] bg-white ${
              menuOpen ? `translate-x-0` : `translate-x-[100%]`
            } transition-transform duration-300 delay-300 ease-in-out `}
          >
            <div className='flex h-full  w-full flex-col px-[1.5rem] py-[1.875rem] pt-6 '>
              <div className='-[1.875rem] flex w-full justify-end  border-extraColor-borderBottom-2'>
                {/* <button>
                  <Icon name='notificationIcon' />
                </button> */}
                <button
                  className='group relative flex items-center'
                  onClick={() => setMenuOpen(false)}
                >
                  <Hamburger menuOpen={menuOpen} />
                </button>
              </div>
              <div className='flex flex-grow flex-col overflow-y-auto overflow-x-hidden pb-[2.5rem]'>
                <AuthMenu close={() => setMenuOpen(false)} />
              </div>
            </div>
          </aside>
        </>,
        document.body,
      )}
    </div>
  );
};

export default Menu;
