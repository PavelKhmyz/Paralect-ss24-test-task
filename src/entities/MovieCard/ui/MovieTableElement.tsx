interface IMovieTableElement {
  title: string;
  value?: string;
  className?: string;
}

export const MovieTableElement = ({ title, value, className }: IMovieTableElement) => {
  if(!value) {
    return null;
  }

  return (
    <tr className={className}>
      <td>{title}</td>
      <td>{value}</td>
    </tr>
  );
};
