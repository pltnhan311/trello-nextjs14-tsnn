'use client';

import { FormInput } from '@/components/form/form-input';
import { Button } from '@/components/ui/button';
import { Board } from '@prisma/client';
import { ElementRef, useEffect, useRef, useState } from 'react';

interface BoardTitleFormProps {
  data: Board;
}

export const BoardTitleForm = ({ data }: BoardTitleFormProps) => {
  const formRef = useRef<ElementRef<'form'>>(null);
  const inputRef = useRef<ElementRef<'input'>>(null);

  const [isEditing, setIsEditing] = useState(false);

  const enableEditing = () => {
    console.log('alo');
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string;
    console.log('I am submiting', title);
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  if (isEditing) {
    <form ref={formRef} action={onSubmit} className='flex items-center gap-x-2'>
      <FormInput
        ref={inputRef}
        id='title'
        onBlur={onBlur}
        defaultValue={data.title}
        className='text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent bg-none'
      />
    </form>;
  }
  console.log(isEditing);
  return (
    <Button variant='transparent' className='font-bold text-lg h-auto w-auto p-1 px-2' onClick={enableEditing}>
      {data.title}
    </Button>
  );
};
