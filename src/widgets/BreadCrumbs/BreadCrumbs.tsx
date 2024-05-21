import { Breadcrumbs } from '@mantine/core';
import Link from 'next/link';
import { wordCapitalize } from '@/shared/lib';

interface IBreadCrumbsData {
  title: string;
  href: string;
}

interface IBreadCrumbs {
  data: IBreadCrumbsData[];
}

export const BreadCrumbs = ({ data }: IBreadCrumbs) => {
  const breadCrumbsData = data.map(el =>
    <Link className='breadcrumb-link' key={el.title} href={el.href}>{wordCapitalize(el.title)}</Link>
  );

  return (
    <Breadcrumbs>
      {breadCrumbsData}
    </Breadcrumbs>
  );
};
