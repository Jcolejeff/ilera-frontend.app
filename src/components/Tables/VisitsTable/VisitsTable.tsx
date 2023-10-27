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
import sections from 'pages/app/patients/tempData';
import { cn } from 'lib/utils';
import DeletePatient from 'components/modal/Patients/DeletePatient';
import NormalTableInfoCard from 'components/general/tableInfoCard/NormalTableInfoCard';
import DoubleTableInfoCard from 'components/general/tableInfoCard/DoubleTableInfoCard';
import MergePatientModal from 'components/modal/Patients/MergePatient';
import CreateVisitsModal from 'components/modal/Visits/CreateVisit';
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

function VisitsTableComponent() {
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
      id: 'visitId',
      header: 'Visit ID',
      cell: ({ row }) => (
        <Link to={`/app/${CONSTANTS.ROUTES['patients']}/${row.original.id}`}>
          <div className='capitalize'>{Number(row.original.id) * 1245632}</div>
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
            Patient Name
            <Icon name='sort' svgProp={{ className: 'ml-2 h-3 w-3' }} />
          </Button>
        );
      },
      cell: ({ row }) => (
        <Link to={`/app/${CONSTANTS.ROUTES['patients']}/${row.original.id}`}>
          <div className='capitalize'>{row.getValue('title')}</div>
        </Link>
      ),
    },
    {
      id: 'patientId',
      header: 'Patient ID',
      cell: ({ row }) => (
        <Link to={`/app/${CONSTANTS.ROUTES['patients']}/${row.original.id}`}>
          <div className='capitalize'>{Number(row.original.id) * 1245632}</div>
        </Link>
      ),

      enableSorting: false,
      enableHiding: false,
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
            Gender
            <Icon name='sort' svgProp={{ className: 'ml-2 h-3 w-3' }} />
          </Button>
        );
      },
      cell: ({ row }) => (
        <Link to={`/app/${CONSTANTS.ROUTES['patients']}/${row.original.id}`}>
          <div className='lowercase'>{row.getValue('url')}</div>
        </Link>
      ),
    },
    {
      accessorKey: 'type',
      header: ({ column }) => {
        return (
          <Button
            className='px-0'
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Type
            <Icon name='sort' svgProp={{ className: 'ml-2 h-3 w-3' }} />
          </Button>
        );
      },
      cell: ({ row }) => (
        <Link to={`/app/${CONSTANTS.ROUTES['patients']}/${row.original.id}`}>
          <div className='lowercase'>{row.getValue('type')}</div>
        </Link>
      ),
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
            Payment
            <Icon name='sort' svgProp={{ className: 'ml-2 h-3 w-3' }} />
          </Button>
        );
      },
      cell: ({ row }) => (
        <Link to={`/app/${CONSTANTS.ROUTES['patients']}/${row.original.id}`}>
          <div className='capitalize'>{Number(row.original.id) * 40}</div>
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
            Status
            <Icon name='sort' svgProp={{ className: 'ml-2 h-3 w-3' }} />
          </Button>
        );
      },
      cell: ({ row }) => (
        <Link to={`/app/${CONSTANTS.ROUTES['patients']}/${row.original.id}`}>
          {/* <div className='lowercase'>{row.getValue('url')}</div> */}
          <div className='flex w-fit items-center   gap-2 rounded-lg bg-green-200/40 p-3'>
            {/* <div className='h-3 w-3 rounded-full bg-green-500'></div> */}
            <p className='text-center text-xs font-semibold text-green-500'>Active</p>
          </div>
        </Link>
      ),
    },

    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const page = row.original;

        return (
          <div className='flex items-center gap-4'>
            <button className='group flex  items-center justify-center gap-2  rounded-[5px]  px-4 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:opacity-90'>
              <Icon
                name='linkIcon'
                svgProp={{
                  className:
                    'text-primary-1 cursor-pointer hover:opacity-95 transition-opacity duration-300 ease-in-out active:opacity-100',
                }}
              ></Icon>{' '}
              {/* <span className='text-xs font-[500] leading-[24px] tracking-[0.4px] text-white md:text-sm'>
                New Patient
              </span> */}
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' className='h-8 w-8 p-0'>
                  <span className='sr-only'>Open menu</span>
                  <MoreVertical className='h-4 w-4' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' className='px-4 py-2'>
                <DropdownMenuItem
                  onClick={() => navigate(`/${CONSTANTS.ROUTES['profile']}/${page.id}`)}
                  className='flex items-center gap-2'
                >
                  <Icon name='editPen' svgProp={{ className: 'text-black' }}></Icon>
                  <p> View Visit</p>
                </DropdownMenuItem>{' '}
                <DropdownMenuSeparator />
                {/* <DropdownMenuItem
                  onClick={() => navigate(`/${CONSTANTS.ROUTES['profile']}/${page.id}`)}
                  className='flex items-center gap-2'
                >
                  <Icon name='editPen' svgProp={{ className: 'text-black' }}></Icon>
                  <p> Create Visit</p>
                </DropdownMenuItem>
                <DropdownMenuSeparator /> */}
                <DropdownMenuItem
                  onClick={() => navigate(`/${CONSTANTS.ROUTES['profile']}/${page.id}`)}
                  className='flex items-center gap-2'
                >
                  <Icon name='editPen' svgProp={{ className: 'text-black' }}></Icon>
                  <p> Schedule Appointment</p>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {/* <MergePatientModal
                  trigger={
                    <Button
                      variant='outline'
                      className='flex w-full  items-center justify-start gap-2 border-0 p-0 px-2  capitalize  disabled:cursor-not-allowed disabled:opacity-50'
                      onClick={() => {
                        setTimeout(() => {
                          console.log('delete');
                        }, 500);
                      }}
                    >
                      <Icon name='editPen' svgProp={{ className: 'text-black' }}></Icon>
                      <p>Merge Patient</p>
                    </Button>
                  }
                ></MergePatientModal>
                <DropdownMenuSeparator />
                <DeletePatient btnText='Deactivate Patient' />
                <DeletePatient btnText='delete Patients' /> */}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
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
    <div className='flex w-full flex-col gap-12'>
      <div className='flex items-center justify-between '>
        <h3 className='font-semibold text-primary-1'>Visits Records</h3>
        <div className='flex gap-3'>
          {/* <div className='flex  items-center rounded-lg border px-4'>
            <input
              value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
              onChange={(event) => table.getColumn('title')?.setFilterValue(event.target.value)}
              className='form-input  max-w-xl flex-grow border-0  placeholder:text-sm placeholder:font-semibold placeholder:text-textColor-disabled focus:!ring-0'
              placeholder='Search Patients'
            />
            <Icon name='searchIcon' svgProp={{ className: 'text-primary-9' }} />
          </div> */}

          {/* <Link
            to={`/app/${CONSTANTS.ROUTES['create-visit']}`}
            className='group flex  items-center justify-center gap-2  rounded-[5px] bg-primary-1  px-4 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:opacity-90'
          >
            <Icon
              name='addIcon'
              svgProp={{
                className:
                  'text-primary-1 cursor-pointer hover:opacity-95 transition-opacity duration-300 ease-in-out active:opacity-100',
              }}
            />
          </Link> */}
          <CreateVisitsModal
            trigger={
              <button className='group flex  items-center justify-center gap-2  rounded-[5px] bg-primary-1  px-4 py-3 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:opacity-90'>
                <span className='text-xs font-[500] leading-[24px] tracking-[0.4px] text-white md:text-sm'>
                  New Visit
                </span>
              </button>
            }
          ></CreateVisitsModal>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-12 w-12 p-0'>
                <span className='sr-only'>Open menu</span>
                <MoreHorizontal className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='px-4 py-2  pb-4'>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  table.resetSorting();
                }}
                className='flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-center'
              >
                Reset Sorting
              </DropdownMenuItem>
              <DropdownMenuSeparator className='my-2' />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className=''>
                    <Button variant='outline' className='py-2'>
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
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <section className=' grid grid-cols-[1fr_1fr] gap-[2rem] rounded-lg border md:grid-cols-[1fr_1fr_1fr]  xxl:grid-cols-[1fr_1fr_1fr_1fr]'>
        <NormalTableInfoCard
          title='Walk-in Visits Today'
          value={0}
          description='This is the total number of patients that came in without appointments'
        />
        <NormalTableInfoCard
          title='Appointment Visit Today '
          value={0}
          description='This is the total number of patients that have had visits today'
        />
        {/* <NormalTableInfoCard
          title='Linked Patients'
          value={0}
          description='This is the total number of patients that are linked to another.'
        /> */}
        <DoubleTableInfoCard
          title='Visit Status'
          value1={0}
          value2={0}
          description1='Open Visits'
          description2='Closed Visits'
        />
      </section>
      <div className='rounded-lg border bg-white px-2 py-4'>
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
                <TableCell colSpan={columns.length} className='h-[400px] text-center'>
                  <div>
                    <p className='text-base font-semibold text-gray-500'>No Patients Records</p>
                    <p className='text-sm leading-6 tracking-normal text-gray-400'>
                      Create a patient to populate list
                    </p>
                  </div>
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

export default VisitsTableComponent;
