import { MatPaginatorIntl } from '@angular/material/paginator';

export function CustomPaginator() {
  const customPaginatorIntl = new MatPaginatorIntl();

//   customPaginatorIntl.itemsPerPageLabel = '';
//   customPaginatorIntl.nextPageLabel     = '';
//   customPaginatorIntl.previousPageLabel = '';
//   customPaginatorIntl.firstPageLabel = '';
  
  return customPaginatorIntl;
}