import { OrganizationList, OrganizationProfile } from '@clerk/nextjs'

export default function CreateOrganizationPage() {
  return (
    // <OrganizationList
    //   hidePersonal
    //   afterCreateOrganizationUrl='/organization/:id'
    //   afterSelectOrganizationUrl='/organization/:id'
    // />
    <OrganizationProfile path="/select-org" />
  )
}
