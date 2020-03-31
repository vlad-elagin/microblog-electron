import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

interface SidebarItem {
  hash: string;
  title: string;
}

interface SidebarProps {
  data: SidebarItem[];
}

const Sidebar = ({ data }: SidebarProps) => {
  const renderItem = (item: SidebarItem) => (
    <ListGroupItem tag="a" href={`#${item.hash}`}>
      {item.title}
    </ListGroupItem>
  );

  return <ListGroup flush>{data.map(item => renderItem(item))}</ListGroup>;
};

export default Sidebar;
