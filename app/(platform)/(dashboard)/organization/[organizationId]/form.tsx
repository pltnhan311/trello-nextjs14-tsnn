'use client';

import { State, create } from '@/actions/create-board';
import { FormButton } from '@/app/(platform)/(dashboard)/organization/[organizationId]/form-button';
import { FormInput } from '@/app/(platform)/(dashboard)/organization/[organizationId]/form-input';
import { Button } from '@/components/ui/button';
import { useFormState } from 'react-dom';

export const Form = () => {
  const initialState: State = {
    message: null,
    errors: {}
  };
  const [state, dispatch] = useFormState(create, initialState);

  return (
    <form action={dispatch}>
      <div className='flex space-x-2'>
        <div className='flex flex-col space-y-2'>
          <FormInput errors={state?.errors} />
        </div>
        <FormButton />
      </div>
    </form>
  );
};
