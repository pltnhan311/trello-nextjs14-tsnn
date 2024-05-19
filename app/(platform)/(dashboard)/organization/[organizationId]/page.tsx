import { auth } from '@clerk/nextjs/server';
import React from 'react';

const OrganizationIdPage = () => {
  const { userId, orgId } = auth();

  return <div>OrganizationPage Id: {orgId}</div>;
};

export default OrganizationIdPage;
