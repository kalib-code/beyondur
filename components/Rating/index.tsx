import { IconStar } from '@tabler/icons';

interface Props {
  rating: number;
}

export const Rating = (props: Props) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < props.rating) {
      stars.push(<IconStar key={i} className="" stroke={'0'} fill={'orange'} />);
    } else {
      stars.push(<IconStar key={i} stroke={'0'} fill={'gray'} />);
    }
  }
  return <div className="flex">{stars}</div>;
};
