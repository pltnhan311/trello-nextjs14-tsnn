'use client';

import ListForm from '@/app/(platform)/(dashboard)/board/[boardId]/_components/list-form';
import ListItem from '@/app/(platform)/(dashboard)/board/[boardId]/_components/list-item';
import { ListWithCards } from '@/types';
import { useEffect, useState } from 'react';

interface ListContainerProps {
  data: ListWithCards[];
  boardId: string;
}

export const ListContainer = ({ data, boardId }: ListContainerProps) => {
  const [orderedData, setOrderedData] = useState(data);

  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  return (
    <ol className='flex gap-x-3 h-full'>
      {orderedData.map((list, index) => {
        return <ListItem key={list.id} index={index} data={list} />;
      })}
      <ListForm />
      <div className='flex-shrink-0 w-1' />
    </ol>
  );
};
