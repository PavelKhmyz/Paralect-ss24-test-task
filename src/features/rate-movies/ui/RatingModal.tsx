'use client';

import { Button, Modal, Rating, UnstyledButton } from '@mantine/core';
import { useState } from 'react';
import classes from './RatingModal.module.scss';

export interface IRatingModal {
  opened: boolean;
  title: string;
  rating: number;
  onConfirm(value: number): void;
  onReset(): void;
  onClose(): void;
}

export const RatingModal = ({ opened, title, rating, onConfirm, onReset, onClose }: IRatingModal) => {
  const [userRating, setUserRating] = useState(rating ? rating : 0);

  const handleChangeRating = (value: number) => {
    setUserRating(value);
  };

  const handleConfirm = () => {
    onConfirm(userRating);
    onClose();
  };

  const handleRemoveRating = () => {
    onReset();
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title='Your rating'
      size='sm' centered
      classNames={{
        content: classes.modalContent,
        header: classes.modalHeader,
        close: classes.modalClose,
        body: classes.modalBody,
      }}
    >
      <h4 className={classes.modalTitle}>{title}</h4>
      <Rating
        value={userRating}
        onChange={handleChangeRating}
        count={10}
        size='lg'
        w='100%'
        fractions={10}
        classNames={{
          root: classes.ratingRoot,
        }}
      />
      <div className={classes.modalButtons}>
        <Button
          variant='filled'
          onClick={handleConfirm}
          classNames={{
            root: classes.buttonRoot,
          }}
        >
          Save
        </Button>
        <UnstyledButton
          onClick={handleRemoveRating}
          classNames={{
            root: classes.unstyledButtonRoot,
          }}
        >
          Remove rating
        </UnstyledButton>
      </div>
    </Modal>
  );
};
