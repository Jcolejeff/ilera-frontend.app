import * as React from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react';

import { Button } from 'components/shadcn/ui/button';
import { Checkbox } from 'components/shadcn/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'components/shadcn/dropdown-menu';
import { Input } from 'components/shadcn/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'components/shadcn/ui/table';
import { Link } from 'react-router-dom';
import CONSTANTS from 'constant';
import Icon from 'utils/Icon';
import API from 'services';
import toast from 'helper';
import { processError } from 'helper/error';
import Spinner from 'components/shadcn/ui/spinner';
import { useNavigate, useLocation } from 'react-router-dom';
import useStore from 'store';
export type Page = {
  id: string;
  type: string;
  title: string;
  url: string;
};
const data: Payment[] = [
  {
    id: 'm5gr84i9',
    amount: 316,
    status: 'success',
    email: 'ken99@yahoo.com',
  },
  {
    id: '3u1reuv4',
    amount: 242,
    status: 'success',
    email: 'Abe45@gmail.com',
  },
  {
    id: 'derv1ws0',
    amount: 837,
    status: 'processing',
    email: 'Monserrat44@gmail.com',
  },
  {
    id: '5kma53ae',
    amount: 874,
    status: 'success',
    email: 'Silas22@gmail.com',
  },
  {
    id: 'bhqecj4p',
    amount: 721,
    status: 'failed',
    email: 'carmella@hotmail.com',
  },
];

export type Payment = {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
};

function AllPagesTable({ pages, refetch }: { pages: any; refetch: any }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();

  // refactor this
  const data = React.useMemo(() => {
    if (!pages?.items) return [];

    return pages.items.map((i: any) => ({
      id: i?.id,
      type: i?.description?.slice(0, 10),
      title: i?.title,
      url: i?.url,
    }));
  }, [pages]);
  const deletePage = async (id: string) => {
    setIsLoading(true);
    //     try {
    //       const res = await API.delete(`/pages/${id}`);
    //       toast.success('Page deleted successfully');
    //       setTimeout(() => {
    //         refetch();
    //       }, 10);
    //     } catch (error) {
    //       processError(error);
    //     }
    setIsLoading(false);
  };
  const columns: ColumnDef<Page>[] = [
    {
      id: 'select',
      header: 'S/N',
      cell: ({ row }) => (
        <Link to={`/${CONSTANTS.ROUTES['profile']}/${row.original.id}`}>
          <div className='capitalize'>{row.index + 1}</div>
        </Link>
      ),

      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'title',
      header: ({ column }) => {
        return (
          <Button
            className='px-0'
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Page Title
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        );
      },
      cell: ({ row }) => (
        <Link to={`/${CONSTANTS.ROUTES['profile']}/${row.original.id}`}>
          <div className='capitalize'>{row.getValue('title')}</div>
        </Link>
      ),
    },
    {
      accessorKey: 'url',
      header: ({ column }) => {
        return (
          <Button
            className='px-0'
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Page URL
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        );
      },
      cell: ({ row }) => (
        <Link to={`/${CONSTANTS.ROUTES['profile']}/${row.original.id}`}>
          <div className='lowercase'>{row.getValue('url')}</div>
        </Link>
      ),
    },
    {
      accessorKey: 'type',
      header: () => <div className='text-right'>Page Type</div>,
      cell: ({ row }) => {
        return (
          <Link to={`/${CONSTANTS.ROUTES['profile']}/${row.original.id}`}>
            <div className='text-right font-medium'>{row.getValue('type')}</div>
          </Link>
        );
      },
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const page = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <span className='sr-only'>Open menu</span>
                <MoreHorizontal className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='px-4 py-2'>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigate(`/${CONSTANTS.ROUTES['profile']}/${page.id}`)}
                className='flex items-center gap-2'
              >
                <Icon name='editPen' svgProp={{ className: 'text-black' }}></Icon>
                <p> Edit Page</p>
              </DropdownMenuItem>
              <DropdownMenuSeparator />

              <DropdownMenuItem
                className='flex items-center gap-2 text-red-500 disabled:cursor-not-allowed disabled:opacity-50'
                onClick={() => {
                  deletePage(page.id);
                }}
                disabled={isLoading}
              >
                <Icon name='trash' svgProp={{ className: 'text-black' }}></Icon>
                <p> Delete Page</p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className='w-full'>
      <div className='flex items-center py-4'>
        <Input
          placeholder='Filter page title...'
          value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('title')?.setFilterValue(event.target.value)}
          className='max-w-sm'
        />
        <button
          className='  mx-4 rounded-md border px-4 py-1 text-sm shadow-md'
          onClick={() => {
            table.resetSorting();
          }}
        >
          reset
        </button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className='ml-auto'>
              <Button variant='outline'>
                Columns <ChevronDown className='ml-2 h-4 w-4' />
              </Button>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className='capitalize'
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className=' bg-white'>
        <Table className=''>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className='border bg-slate-200/80'>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className='border-0'
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {/* <Link to={`/${CONSTANTS.ROUTES['view-pages']}/${cell.id}`}> */}
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      {/* </Link> */}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-end space-x-2 py-4'>
        <div className='flex-1 text-sm text-muted-foreground'>
          Showing {table.getRowModel().rows?.length ?? 0} of {data.length} results
        </div>
        <div className='space-x-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AllPagesTable;
