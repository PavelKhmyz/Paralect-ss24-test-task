import { Breadcrumbs } from '@mantine/core';
import Link from 'next/link';

interface IBreadCrumbsData {
  title: string;
  href: string;
}

interface IBreadCrumbs {
  data: IBreadCrumbsData[];
  className?: {
    wrapper: string;
    link: string;
  };
}

export const wordCapitalize = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};


export const BreadCrumbs = ({ data, className }: IBreadCrumbs) => {
  const breadCrumbsData = data.map(el =>
    <Link className={className?.link} key={el.title} href={el.href}>{wordCapitalize(el.title)}</Link>
  );

  return (
    <Breadcrumbs className={className?.wrapper}>
      {breadCrumbsData}
    </Breadcrumbs>
  );
};
