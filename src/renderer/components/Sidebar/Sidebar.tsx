import React from 'react';
import { ListGroup } from 'reactstrap';
import { useLocation, Link } from 'react-router-dom';
import cn from 'classnames';

interface SidebarItem {
  hash: string;
  title: string;
}

interface SidebarProps {
  chartsList: SidebarItem[];
}

const Sidebar = ({ chartsList }: SidebarProps) => {
  const { pathname: currentPathname } = useLocation();

  const renderItem = (item: SidebarItem) => {
    const pathname = `/charts/${item.hash}`;
    return (
      <Link
        to={pathname}
        key={item.hash}
        className={cn('list-group-item', { active: pathname === currentPathname })}
        replace
      >
        {item.title}
      </Link>
    );
  };

  return (
    <ListGroup flush className="sidebar mb-4">
      {chartsList.map(item => renderItem(item))}
    </ListGroup>
  );
};

export default Sidebar;
