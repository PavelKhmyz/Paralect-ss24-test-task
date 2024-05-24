'use client';

import { useDisclosure } from '@mantine/hooks';
import { Button, Modal } from '@mantine/core';
import { useAppSelector } from '@/shared/lib';
import { useEffect, useState } from 'react';
import classes from './ErrorModal.module.scss';

export const ErrorModal = () => {
  const { error: moviesError } = useAppSelector(state => state.movies);
  const { error: genresError } = useAppSelector(state => state.filters);
  const [opened, { open, close }] = useDisclosure(false);
  const [error, setError] = useState<string>('');

  const handleRefresh = () => {
    window.location.reload();
  };

  useEffect(() => {
    if(moviesError || genresError) {
      moviesError
        ? setError(moviesError)
        : genresError && setError(genresError);

      open();
    }
  }, [genresError, moviesError, open]);

  return (
    <Modal
      opened={opened}
      onClose={close}
      title='Something goes wrong'
      centered
      classNames={{
        title: classes.title,
        content: classes.modalContent,
        header: classes.modalHeader,
        close: classes.modalClose,
        body: classes.modalBody,
      }}
    >
      {error}
      <Button
        variant='filled'
        onClick={handleRefresh}
        classNames={{
          root: classes.buttonRoot,
        }}
      >
        Try again
      </Button>
    </Modal>
  );
};

