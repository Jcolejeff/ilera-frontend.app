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
import {
  ArrowUpDown,
  ChevronDown,
  MoreHorizontal,
  MoreVertical,
  MoreVerticalIcon,
} from 'lucide-react';

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

const pages = {
  items: [
    {
      id: 1,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      title: 'Home Page',
      url: '/app/home',
    },
    {
      id: 2,
      description: 'Nulla facilisi. Sed id tellus nec orci ullamcorper.',
      title: 'About Page',
      url: '/dash/about',
    },
    {
      id: 3,
      description: 'Fusce a dolor sit amet velit ultrices laoreet.',
      title: 'Contact Page',
      url: '/contact',
    },
    {
      id: 4,
      description:
        'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
      title: 'Blog Page',
      url: '/blog',
    },
    {
      id: 5,
      description:
        'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed aliquam, nisi quis porttitor congue, elit erat euismod orci, ac placerat dolor lectus quis orci.',
      title: 'Services Page',
      url: '/services',
    },
    {
      id: 6,
      description: 'Donec eu est non lacus lacinia semper.',
      title: 'Portfolio Page',
      url: '/portfolio',
    },
    {
      id: 7,
      description: 'Suspendisse in orci enim.',
      title: 'Testimonials Page',
      url: '/testimonials',
    },
    {
      id: 8,
      description: 'Aenean nec eros.',
      title: 'FAQ Page',
      url: '/faq',
    },
    {
      id: 9,
      description: 'Morbi in sem quis dui placerat ornare.',
      title: 'Terms of Service Page',
      url: '/terms-of-service',
    },
    {
      id: 10,
      description: 'Aliquam dapibus tincidunt metus.',
      title: 'Privacy Policy Page',
      url: '/privacy-policy',
    },
    {
      id: 3,
      description: 'Fusce a dolor sit amet velit ultrices laoreet.',
      title: 'Contact Page',
      url: '/contact',
    },
    {
      id: 4,
      description:
        'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
      title: 'Blog Page',
      url: '/blog',
    },
    {
      id: 5,
      description:
        'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed aliquam, nisi quis porttitor congue, elit erat euismod orci, ac placerat dolor lectus quis orci.',
      title: 'Services Page',
      url: '/services',
    },
    {
      id: 6,
      description: 'Donec eu est non lacus lacinia semper.',
      title: 'Portfolio Page',
      url: '/portfolio',
    },
    {
      id: 7,
      description: 'Suspendisse in orci enim.',
      title: 'Testimonials Page',
      url: '/testimonials',
    },
    {
      id: 8,
      description: 'Aenean nec eros.',
      title: 'FAQ Page',
      url: '/faq',
    },
    {
      id: 9,
      description: 'Morbi in sem quis dui placerat ornare.',
      title: 'Terms of Service Page',
      url: '/terms-of-service',
    },
    {
      id: 10,
      description: 'Aliquam dapibus tincidunt metus.',
      title: 'Privacy Policy Page',
      url: '/privacy-policy',
    },
  ],
};

function UserTableComponent() {
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
          <div className=''>
            <Link to={`/${CONSTANTS.ROUTES['profile']}/${row.original.id}`}>
              <div className='text-right font-medium'>{row.getValue('type')}</div>
              {/* <Icon name='linkIcon' svgProp={{ className: '' }}></Icon> */}
            </Link>
          </div>
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
                <MoreVertical className='h-4 w-4' />
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
          <TableHeader className='border-0 [&_tr]:border-b-0'>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className='border-0'>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className='border-0'>
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
                  className='border-t-0'
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

export default UserTableComponent;
