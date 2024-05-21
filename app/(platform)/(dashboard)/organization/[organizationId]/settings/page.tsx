import { OrganizationProfile } from '@clerk/nextjs';

const SettingsPage = () => {
  return (
    <div className='w-full'>
      <OrganizationProfile
        routing='hash'
        appearance={{
          elements: {
            rootBox: {
              boxShadow: 'none',
              width: '100%'
            },
            cardBox: {
              border: '1px solid #e5e5e5',
              boxShadow: 'none',
              width: '100%',
              maxHeight: '500px'
            }
          }
        }}
      />
    </div>
  );
};

export default SettingsPage;
