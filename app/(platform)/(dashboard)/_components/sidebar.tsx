'use client';

import NavItem, { Organization } from '../_components/nav-item';
import { Accordion } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useOrganization, useOrganizationList } from '@clerk/nextjs';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useLocalStorage } from 'usehooks-ts';

interface SidebarProps {
  storageKey?: string;
}

const SideBar = ({ storageKey }: SidebarProps) => {
  storageKey = 't-sidebar-state';
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(storageKey, {});

  const { organization: activeOrganization, isLoaded: isLoadOrg } = useOrganization();

  const { userMemberships, isLoaded: isLoadOrgList } = useOrganizationList({
    userMemberships: {
      infinite: true
    }
  });

  const defaultAccordionValue: string[] = Object.keys(expanded).reduce((acc: string[], key: string) => {
    if (expanded[key]) {
      acc.push(key);
    }
    return acc;
  }, []);

  const onExpand = (id: string) => {
    setExpanded((curr) => ({ ...curr, [id]: !curr[id] }));
  };

  if (!isLoadOrg || !isLoadOrgList || userMemberships.isLoading) {
    return (
      <>
        <Skeleton />
      </>
    );
  }

  return (
    <>
      <div className='font-medium text-xs flex items-center mb-1'>
        <span className='pl-4'>Workspaces</span>
        <Button asChild type='button' size='icon' variant='ghost' className='ml-auto'>
          <Link href='/select-org'>
            <Plus className='h-4 w-4' />
          </Link>
        </Button>
      </div>
      <Accordion type='multiple' defaultValue={defaultAccordionValue}>
        {userMemberships.data.map(({ organization }) => (
          <NavItem
            key={organization.id}
            isActive={activeOrganization?.id === organization.id}
            isExpanded={expanded[organization.id]}
            organization={organization as Organization}
            onExpand={onExpand}
            // href={`/select-org/${organization.id}`}
          />
        ))}
      </Accordion>
    </>
  );
};

export default SideBar;
