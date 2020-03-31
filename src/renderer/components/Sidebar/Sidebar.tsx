import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { useLocation, Link } from 'react-router-dom';

interface SidebarItem {
  hash: string;
  title: string;
}

interface SidebarProps {
  chartsList: SidebarItem[];
}

const Sidebar = ({ chartsList }: SidebarProps) => {
  const location = useLocation();
  console.log(location);

  const renderItem = (item: SidebarItem) => (
    <Link to={`/charts/${item.hash}`} key={item.hash} className="list-group-item">
      {item.title}
    </Link>
  );

  return (
    <ListGroup flush className="sidebar">
      {chartsList.map(item => renderItem(item))}
    </ListGroup>
  );
};

export default Sidebar;
