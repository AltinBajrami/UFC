import React from 'react'
import { useAppContext } from '../context/AppContext';
import sublinks from '../data';
import styled from 'styled-components';

const SubMenu = () => {
  const { pageId, setPageId } = useAppContext();
  const currentPage = sublinks.find((item) => item.pageId === pageId);

  return <Wrapper className={`${currentPage ? 'submenu show-submenu' : ' submenu'}`} onMouseLeave={() => setPageId(null)} >
    <h5>{currentPage?.page}</h5>
    <div className="submenu-links" style={{ display: 'grid', gap: '1rem', gridTemplateColumns: currentPage?.links?.length > 3 ? '1fr 1fr' : '1fr' }}>
      {currentPage?.links.map((({ label, id, icon, url }) => {
        return <a key={id} href={url}>
          {icon}
          {label}
        </a>
      }))}
    </div>
  </Wrapper>
}

const Wrapper = styled.div`
    
@media screen and (min-width: 992px) {
     h5 {
    margin-bottom: 1rem;
    color: black;
  }
  .submenu-links {
    display: grid;
    row-gap: 0.5rem;
  }
  .submenu-links a {
    display: block;
    color: var(--grey-900);
    text-transform: capitalize;
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .submenu-links svg {
    color: var(--grey-500);
  }
}
`

export default SubMenu