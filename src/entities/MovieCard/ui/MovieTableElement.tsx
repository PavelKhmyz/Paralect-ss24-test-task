interface IMovieTableElement {
  title: string;
  value?: string;
}

export const MovieTableElement = ({ title, value }: IMovieTableElement) => {
  if(!value) {
    return null;
  }

  return (
    <tr>
      <td>{title}</td>
      <td>{value}</td>
    </tr>
  );
};
