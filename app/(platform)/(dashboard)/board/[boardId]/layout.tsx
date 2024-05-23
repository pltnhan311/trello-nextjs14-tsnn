import { BoardNavbar } from '@/app/(platform)/(dashboard)/board/[boardId]/_components/board-navbar';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { notFound, redirect } from 'next/navigation';

export async function generateMetadata({
  params
}: {
  params: {
    boardId: string;
  };
}) {
  const { orgId } = auth();

  if (!orgId) {
    return {
      title: 'Board'
    };
  }
  const board = await db.board.findUnique({
    where: {
      id: params.boardId,
      orgId
    }
  });

  return {
    title: board?.title || 'Board'
  };
}

const BoardIdLayout = async ({
  children,
  params
}: {
  children: React.ReactNode;
  params: {
    boardId: string;
  };
}) => {
  const { orgId } = auth();

  if (!orgId) {
    redirect('/select-org');
  }

  const board = await db.board.findUnique({
    where: {
      id: params.boardId,
      orgId
    }
  });

  if (!board) {
    notFound();
  }

  return (
    <div
      className='relative h-full bg-cover bg-center bg-no-repeat'
      style={{ backgroundImage: `url(${board.imageFullUrl})` }}
    >
      <BoardNavbar data={board} />
      <div className='absolute inset-0 bg-black/30' />
      <main className='relative pt-28 h-full'>{children}</main>
    </div>
  );
};

export default BoardIdLayout;
