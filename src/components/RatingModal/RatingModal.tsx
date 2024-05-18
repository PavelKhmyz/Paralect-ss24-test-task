import { Button, Modal, Rating, UnstyledButton } from '@mantine/core';
import { useState } from 'react';
import './RatingModal.style.scss';

interface IRatingModal {
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
    <Modal opened={opened} onClose={onClose} title='Your rating' size='sm' centered>
      <h4 className='modal-title'>{title}</h4>
      <Rating value={userRating} onChange={handleChangeRating} count={10} size='lg' w='100%' fractions={10}/>
      <div className='modal-buttons'>
        <Button variant='filled' onClick={handleConfirm}>Save</Button>
        <UnstyledButton onClick={handleRemoveRating}>Remove rating</UnstyledButton>
      </div>
    </Modal>
  );
};
