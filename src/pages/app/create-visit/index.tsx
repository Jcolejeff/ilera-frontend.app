import { TabsContent } from 'components/shadcn/ui/tabs';
import { Button } from 'components/shadcn/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormDescription,
  FormLabel,
} from 'components/shadcn/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'components/shadcn/ui/select';
import { Input } from 'components/shadcn/input';
import axiosInstance from 'services';
import { ChevronRightIcon } from 'lucide-react';
import React, { useState } from 'react';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import { cn } from 'lib/utils';
import { Checkbox } from 'components/shadcn/ui/checkbox';
import 'react-phone-input-2/lib/style.css';
import InlineLoader from 'components/Loaders/InlineLoader';
import useUserLocation from 'hooks/useUserLoction';
import { useEffect } from 'react';
import Icon from 'utils/Icon';
import { useNavigate } from 'react-router-dom';
import UploadImageForm from './UploadForm';
import SavePatientModal from 'components/modal/Patients/SavePatient';
import LinkPatientsModal from 'components/modal/Patients/LinkPatient';
import PI, { PhoneInputProps } from 'react-phone-input-2';

// fix for phone input build error
const PhoneInput: React.FC<PhoneInputProps> = (PI as any).default || PI;
interface Iprops {
  switchTab: (tab: string) => void;
  handleComplete: (tab: string) => void;
  data: string[];
  userInfo: any; // change to the right type
  handleUserInfo: (info: any) => void; // change to the right type
}
const FormSchema = z.object({
  firstName: z.string().min(2, {
    message: 'Please enter a name',
  }),
  jobMode: z.string({
    required_error: 'Job Mode is required.',
  }),
  lastName: z.string().min(2, {
    message: 'Please enter a valid name',
  }),
  middleName: z.string().min(2, {
    message: 'Please enter a valid name',
  }),
  age: z.string().min(1, {
    message: 'Please enter a valid age.',
  }),
  maritalStatus: z.string({
    required_error: 'Marital Status is required.',
  }),
  gender: z.string({
    required_error: 'gender is required.',
  }),
  idType: z.string({
    required_error: 'ID Type is required.',
  }),
  idNumber: z.string().min(2, {
    message: 'Please enter a valid ID Number.',
  }),
  lga: z.string().min(2, {
    message: 'Please enter a valid LGA.',
  }),
  hearUs: z.string({
    required_error: 'How did you hear about us is required.',
  }),
  occupation: z.string().min(2, {
    message: 'Please enter a valid occupation.',
  }),
  referredBy: z.string().min(2, {
    message: 'Please enter a valid referred by.',
  }),
  KinName: z.string().min(2, {
    message: 'Please enter a valid name.',
  }),
  relationship: z.string().min(2, {
    message: 'Please enter a valid relationship.',
  }),
  kinEmail: z
    .string()
    .min(2, {
      message: 'Please enter a valid email.',
    })
    .email(),
  address: z.string().min(2, {
    message: 'Please enter a valid address.',
  }),
  city: z.string().min(2, {
    message: 'Please enter a valid address.',
  }),
  postalCode: z.string().min(2, {
    message: 'Please enter a valid address.',
  }),
  apartment: z.string().optional(),
  emailMe: z.boolean().default(false).optional(),
  saveInfo: z.boolean().default(false).optional(),
  phone_number: z.string().min(2, {
    message: 'Please enter a valid Number.',
  }),
  phone_country_code: z.string().optional(),

  currency_code: z.string().optional(),
  KinPhone_number: z.string().min(2, {
    message: 'Please enter a valid Number.',
  }),
  KinCurrency_code: z.string().optional(),
  KinPhone_country_code: z.string().optional(),
  email: z
    .string()
    .min(2, {
      message: 'Please enter a valid email.',
    })
    .email(),
});
const CreatePatient = () => {
  const { location } = useUserLocation();
  const navigate = useNavigate();

  const [issuer, setIssuer] = useState<string | null>(null);
  const [country, setCountry] = useState<string>('');
  const [region, setRegion] = useState<string>('');
  const [phoneCountry, setPhoneCountry] = useState('');

  const [phoneData, setPhoneData] = useState({
    phoneNumber: '',
    countryCode: '',
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const handleOnPhoneChange = (phone: any, countryData: any) => {
    setPhoneData((prev) => ({
      ...prev,
      phoneNumber: phone?.slice(countryData?.dialCode?.length),
      countryCode: countryData.dialCode,
    }));

    form.setValue('phone_number', phone);
    form.setValue('phone_country_code', `+${countryData?.dialCode}`);
    setPhoneCountry(countryData?.iso2);
  };
  const handleOnPhoneChangeNextOfKin = (phone: any, countryData: any) => {
    form.setValue('KinPhone_number', phone);
    form.setValue('KinCurrency_code', `+${countryData?.dialCode}`);
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    // switchTab(tabData[3]);

    console.log(data);

    const userInfo = {
      ...data,
      country,
      region,
      phone_number: data.phone_number?.slice(location?.country_calling_code?.slice(1)?.length),
      phone_country_code: data.phone_country_code,
    };
  }
  useEffect(() => {
    form.setValue('phone_number', location?.country_calling_code);
    form.setValue('currency_code', location?.currency);
    form.setValue('KinPhone_number', location?.country_calling_code);
    form.setValue('KinCurrency_code', location?.currency);
  }, [location?.country_calling_code, location?.currency]);

  return (
    <div className=' container     flex h-full w-full  max-w-[150rem]   flex-col gap-8  px-container-base  py-[1.875rem] '>
      <div className='flex w-full  items-center justify-between gap-4 md:flex-row'>
        <div
          onClick={() => navigate(-1)}
          className='flex w-max cursor-pointer items-center gap-1 rounded-[8px] px-[2px]   transition-colors duration-300 ease-in-out hover:bg-slate-100 active:bg-slate-200'
        >
          <Icon
            name='arrowBack'
            svgProp={{ width: '1.5rem', height: '1.5rem', className: 'text-black' }}
          />
          <InlineLoader isLoading={false}>
            <div className='flex items-center gap-1'>
              <h5 className='text-base font-[500] capitalize leading-[113%] text-black'>Back</h5>
              <h5 className='text-sm font-[500] capitalize leading-[113%]'></h5>
            </div>
          </InlineLoader>
        </div>

        <div className='flex gap-4'>
          <SavePatientModal
            trigger={
              <button className='group flex  items-center justify-center gap-2  rounded-[5px] bg-primary-1 px-8 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:opacity-90'>
                <span className='text-xs font-[500] leading-[24px] tracking-[0.4px] text-white md:text-sm'>
                  Create Patient
                </span>
              </button>
            }
          ></SavePatientModal>

          <button className='group flex  items-center justify-center gap-2  rounded-[5px] border   px-5 text-base font-semibold transition-all duration-300 ease-in-out hover:opacity-90'>
            <span className='text-xs font-[500] leading-[24px] tracking-[0.4px]  md:text-sm'>
              Cancel
            </span>
          </button>
        </div>
      </div>
      <div className='flex items-end justify-between'>
        <UploadImageForm />
        <LinkPatientsModal
          trigger={
            <button className='group flex  items-center justify-center gap-2  rounded-[5px] px-4  text-base font-semibold text-primary-1  transition-all duration-300 ease-in-out hover:opacity-90'>
              <Icon
                name='linkIcon'
                svgProp={{
                  className:
                    'text-primary-1 cursor-pointer hover:opacity-95 transition-opacity duration-300 ease-in-out active:opacity-100',
                }}
              />
              <span className='text-xs font-[500] leading-[24px] tracking-[0.4px] text-primary-1 md:text-base'>
                Link Patient
              </span>
            </button>
          }
        ></LinkPatientsModal>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=' flex h-full w-full flex-col gap-8 
        '
        >
          <div className='flex items-center gap-1'>
            <p className='text-sm  text-gray-400   '>Demographic</p>
            <div className='h-[1px] w-32 bg-gray-400'></div>
          </div>
          <section className=' grid grid-cols-1 gap-8 md:gap-6 xm:grid-cols-[1fr_1fr_1fr_1fr]  '>
            <FormField
              control={form.control}
              name='firstName'
              render={({ field }) => (
                <FormItem>
                  <div className='relative'>
                    <label className=' rounded-full bg-white px-1 text-sm  font-semibold  '>
                      First Name
                    </label>
                    <FormControl>
                      <Input
                        className='rounded-[8px] py-6 text-base placeholder:text-sm placeholder:text-secondary-1/50'
                        {...field}
                        type='text'
                      />
                    </FormControl>
                  </div>
                  <FormMessage className='mt-1 text-sm' />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='middleName'
              render={({ field }) => (
                <FormItem>
                  <div className='relative'>
                    <label className=' rounded-full bg-white px-1 text-sm  font-semibold  '>
                      Middle Name
                    </label>
                    <FormControl>
                      <Input
                        className='py-6 text-base placeholder:text-sm placeholder:text-secondary-1/50 '
                        {...field}
                        type='text'
                      />
                    </FormControl>
                  </div>
                  <FormMessage className='mt-1 text-sm' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='lastName'
              render={({ field }) => (
                <FormItem>
                  <div className='relative'>
                    <label className=' rounded-full bg-white px-1 text-sm  font-semibold  '>
                      Last Name
                    </label>
                    <FormControl>
                      <Input
                        className='py-6 text-base placeholder:text-sm placeholder:text-secondary-1/50 '
                        {...field}
                        type='text'
                      />
                    </FormControl>
                  </div>
                  <FormMessage className='mt-1 text-sm' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <div className='relative'>
                    <label className=' rounded-full bg-white px-1 text-sm  font-semibold  '>
                      Email
                    </label>
                    <FormControl>
                      <div className='flex flex-col items-end gap-1 xm:flex-row xm:items-center xm:gap-4'>
                        <Input
                          className='py-6 text-base placeholder:text-sm placeholder:text-secondary-1/80'
                          {...field}
                          type='text'
                        />
                      </div>
                    </FormControl>
                  </div>
                  <FormMessage className='mt-1 text-sm' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='phone_number'
              render={({ field }) => (
                <FormItem>
                  <div className='relative'>
                    <label className=' rounded-full bg-white px-1 text-sm  font-semibold  '>
                      Phone Number
                    </label>
                    <FormControl>
                      <PhoneInput
                        containerClass='phone-container'
                        inputClass='py-6 relative text-lg focus-within:placeholder:text-secondary-2  placeholder:text-gray-300 placeholder:text-sm  focus:border-0  transition-all duration-300 ease-in-out text-base'
                        placeholder='phone number'
                        buttonClass='bg-[#DBF1FF] '
                        inputStyle={{ border: '1px solid #e4e2e2', width: '100%' }}
                        onChange={(phone, country) => handleOnPhoneChange(phone, country)}
                        autoFormat={true}
                        inputProps={{
                          name: 'phone',
                          required: true,
                        }}
                        buttonStyle={{
                          background: 'white',
                          paddingInline: '0.1rem',
                          border: '1px solid #e4e2e2',
                          borderRight: 'none',
                        }}
                        dropdownStyle={{ height: '300px', maxHeight: '300px' }}
                        dropdownClass='bg-white shadow-1'
                        searchStyle={{
                          width: '80%',
                          border: '1px solid #e4e2e2',
                          borderLeft: 'none',
                          borderRight: 'none',
                          borderTop: 'none',
                          borderBottom: 'none',
                          paddingBlock: '0.6rem',
                          marginBottom: '0.1rem',
                        }}
                        value={field.value}
                        country={phoneCountry || location.country_code}
                        enableSearch={true}
                        disableSearchIcon={true}
                      />
                    </FormControl>
                    <FormMessage className='mt-1 text-base' />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='age'
              render={({ field }) => (
                <FormItem>
                  <div className='relative'>
                    <label className=' rounded-full bg-white px-1 text-sm  font-semibold  '>
                      DOB/age
                    </label>
                    <FormControl>
                      <Input
                        className='py-6 text-base placeholder:text-sm placeholder:text-secondary-1/50 '
                        {...field}
                        type='text'
                      />
                    </FormControl>
                  </div>
                  <FormMessage className='mt-1 text-sm' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='maritalStatus'
              render={({ field }) => (
                <FormItem>
                  <div className='relative'>
                    <label className=' rounded-full bg-white px-1 text-sm  font-semibold  '>
                      Marital Status
                    </label>
                    <FormControl>
                      <Input
                        className='py-6 text-base placeholder:text-sm placeholder:text-secondary-1/50 '
                        {...field}
                        type='text'
                      />
                    </FormControl>
                  </div>
                  <FormMessage className='mt-1 text-sm' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='gender'
              render={({ field }) => (
                <FormItem>
                  <div className='relative'>
                    <label className=' rounded-full bg-white px-1 text-sm  font-semibold  '>
                      Gender
                    </label>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className='w-full py-6 text-sm  text-secondary-3 transition-all duration-300  ease-in-out  placeholder:text-lg focus-within:text-secondary-2 '>
                          <SelectValue placeholder='' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className='bg-primary-1'>
                        <SelectItem value='female' className='py-3 text-sm text-white'>
                          Male
                        </SelectItem>
                        <SelectItem value='Female' className='py-3 text-sm text-white'>
                          Female
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <FormMessage className='mt-1 text-xs' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='idType'
              render={({ field }) => (
                <FormItem>
                  <div className='relative'>
                    <label className=' rounded-full bg-white px-1 text-sm  font-semibold  '>
                      ID Type
                    </label>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className='w-full py-6 text-sm  text-secondary-3 transition-all duration-300  ease-in-out  placeholder:text-lg focus-within:text-secondary-2 '>
                          <SelectValue placeholder='' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className='bg-primary-1'>
                        <SelectItem value='nationalId' className='py-3 text-sm text-white'>
                          National Id
                        </SelectItem>
                        <SelectItem value='license' className='py-3 text-sm text-white'>
                          Drivers License
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <FormMessage className='mt-1 text-xs' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='idNumber'
              render={({ field }) => (
                <FormItem>
                  <div className='relative'>
                    <label className=' rounded-full bg-white px-1 text-sm  font-semibold  '>
                      ID/SSN No.
                    </label>
                    <FormControl>
                      <Input
                        className='py-6 text-base placeholder:text-sm placeholder:text-secondary-1/50 '
                        {...field}
                        type='text'
                      />
                    </FormControl>
                  </div>
                  <FormMessage className='mt-1 text-sm' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='address'
              render={({ field }) => (
                <FormItem className='col-span-2'>
                  <div className='relative '>
                    <label className=' rounded-full bg-white px-1 text-sm  font-semibold  '>
                      Address
                    </label>
                    <FormControl>
                      <div className='flex flex-col items-end gap-1 xm:flex-row xm:items-center xm:gap-4'>
                        <Input
                          className='py-6 text-base placeholder:text-sm placeholder:text-secondary-1/50'
                          {...field}
                          type='text'
                        />
                      </div>
                    </FormControl>
                  </div>
                  <FormMessage className='mt-1 text-sm' />
                </FormItem>
              )}
            />
            <div className='relative'>
              <label className=' rounded-full bg-white px-1 text-sm  font-semibold  '>
                Country
              </label>
              <CountryDropdown
                value={country}
                onChange={(val) => setCountry(val)}
                classes=' border-gray-200 rounded-md focus:ring-0 focus:border-gray-200 py-3 w-full  text-sm text-secondary-1/90'
              />
            </div>
            <div className='relative'>
              <label className=' rounded-full bg-white px-1 text-sm  font-semibold  '>State</label>
              <RegionDropdown
                country={country}
                value={region}
                onChange={(val) => setRegion(val)}
                blankOptionLabel='Select Region or State'
                defaultOptionLabel='Now select a region'
                classes=' border-gray-200 rounded-md focus:ring-0 focus:border-gray-200 py-3 w-full  text-sm text-secondary-1/90'
              />
            </div>
            <FormField
              control={form.control}
              name='city'
              render={({ field }) => (
                <FormItem>
                  <div className='relative'>
                    <label className=' rounded-full bg-white px-1 text-sm  font-semibold  '>
                      City
                    </label>

                    <FormControl>
                      <div className='flex flex-col items-end gap-1 xm:flex-row xm:items-center xm:gap-4'>
                        <Input
                          className='py-6 text-base placeholder:text-sm placeholder:text-secondary-1/50 '
                          {...field}
                          type='text'
                        />
                      </div>
                    </FormControl>
                  </div>
                  <FormMessage className='mt-1 text-sm' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='lga'
              render={({ field }) => (
                <FormItem>
                  <div className='relative'>
                    <label className=' rounded-full bg-white px-1 text-sm  font-semibold  '>
                      LGA
                    </label>

                    <FormControl>
                      <div className='flex flex-col items-end gap-1 xm:flex-row xm:items-center xm:gap-4'>
                        <Input
                          className='py-6 text-base placeholder:text-sm placeholder:text-secondary-1/50 '
                          {...field}
                          type='text'
                        />
                      </div>
                    </FormControl>
                  </div>
                  <FormMessage className='mt-1 text-sm' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='hearUs'
              render={({ field }) => (
                <FormItem>
                  <div className='relative'>
                    <label className=' rounded-full bg-white px-1 text-sm  font-semibold  '>
                      How did you hear about us
                    </label>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className='w-full py-6 text-sm  text-secondary-3 transition-all duration-300  ease-in-out  placeholder:text-lg focus-within:text-secondary-2 '>
                          <SelectValue placeholder='' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className='bg-primary-1'>
                        <SelectItem value='FaceBook' className='py-3 text-sm text-white'>
                          FaceBook
                        </SelectItem>
                        <SelectItem value='whatsApp' className='py-3 text-sm text-white'>
                          whatsApp
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <FormMessage className='mt-1 text-xs' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='occupation'
              render={({ field }) => (
                <FormItem>
                  <div className='relative'>
                    <label className=' rounded-full bg-white px-1 text-sm  font-semibold  '>
                      Occupation
                    </label>

                    <FormControl>
                      <div className='flex flex-col items-end gap-1 xm:flex-row xm:items-center xm:gap-4'>
                        <Input
                          className='py-6 text-base placeholder:text-sm placeholder:text-secondary-1/50 '
                          {...field}
                          type='text'
                        />
                      </div>
                    </FormControl>
                  </div>
                  <FormMessage className='mt-1 text-sm' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='referredBy'
              render={({ field }) => (
                <FormItem>
                  <div className='relative'>
                    <label className=' rounded-full bg-white px-1 text-sm  font-semibold  '>
                      Referred By
                    </label>

                    <FormControl>
                      <div className='flex flex-col items-end gap-1 xm:flex-row xm:items-center xm:gap-4'>
                        <Input
                          className='py-6 text-base placeholder:text-sm placeholder:text-secondary-1/50 '
                          {...field}
                          type='text'
                        />
                      </div>
                    </FormControl>
                  </div>
                  <FormMessage className='mt-1 text-sm' />
                </FormItem>
              )}
            />
          </section>
          <div className='flex items-center gap-1'>
            <p className='text-sm  text-gray-400   '>Next of Kin</p>
            <div className='h-[1px] w-32 bg-gray-400'></div>
          </div>
          <section className=' grid grid-cols-1 gap-8 md:gap-6 xm:grid-cols-[1fr_1fr_1fr_1fr]  '>
            <FormField
              control={form.control}
              name='KinName'
              render={({ field }) => (
                <FormItem>
                  <div className='relative'>
                    <label className=' rounded-full bg-white px-1 text-sm  font-semibold  '>
                      Full Name
                    </label>
                    <FormControl>
                      <Input
                        className='rounded-[8px] py-6 text-base placeholder:text-sm placeholder:text-secondary-1/50'
                        {...field}
                        type='text'
                      />
                    </FormControl>
                  </div>
                  <FormMessage className='mt-1 text-sm' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='relationship'
              render={({ field }) => (
                <FormItem>
                  <div className='relative'>
                    <label className=' rounded-full bg-white px-1 text-sm  font-semibold  '>
                      Relationship
                    </label>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className='w-full py-6 text-sm  text-secondary-3 transition-all duration-300  ease-in-out  placeholder:text-lg focus-within:text-secondary-2 '>
                          <SelectValue placeholder='' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className='bg-primary-1'>
                        <SelectItem value='brother' className='py-3 text-sm text-white'>
                          Brother
                        </SelectItem>
                        <SelectItem value='sister' className='py-3 text-sm text-white'>
                          Sister
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <FormMessage className='mt-1 text-xs' />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='kinEmail'
              render={({ field }) => (
                <FormItem>
                  <div className='relative'>
                    <label className=' rounded-full bg-white px-1 text-sm  font-semibold  '>
                      Email
                    </label>
                    <FormControl>
                      <div className='flex flex-col items-end gap-1 xm:flex-row xm:items-center xm:gap-4'>
                        <Input
                          className='py-6 text-base placeholder:text-sm placeholder:text-secondary-1/80'
                          {...field}
                          type='text'
                        />
                      </div>
                    </FormControl>
                  </div>
                  <FormMessage className='mt-1 text-sm' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='KinPhone_number'
              render={({ field }) => (
                <FormItem>
                  <div className='relative'>
                    <label className=' rounded-full bg-white px-1 text-sm  font-semibold  '>
                      Phone Number
                    </label>
                    <FormControl>
                      <PhoneInput
                        containerClass='phone-container'
                        inputClass='py-6 relative text-lg focus-within:placeholder:text-secondary-2  placeholder:text-gray-300 placeholder:text-sm  focus:border-0  transition-all duration-300 ease-in-out text-base'
                        placeholder='phone number'
                        buttonClass='bg-[#DBF1FF] '
                        inputStyle={{ border: '1px solid #e4e2e2', width: '100%' }}
                        onChange={(phone, country) => handleOnPhoneChangeNextOfKin(phone, country)}
                        autoFormat={true}
                        inputProps={{
                          name: 'phone',
                          required: true,
                        }}
                        buttonStyle={{
                          background: 'white',
                          paddingInline: '0.1rem',
                          border: '1px solid #e4e2e2',
                          borderRight: 'none',
                        }}
                        dropdownStyle={{ height: '300px', maxHeight: '300px' }}
                        dropdownClass='bg-white shadow-1'
                        searchStyle={{
                          width: '80%',
                          border: '1px solid #e4e2e2',
                          borderLeft: 'none',
                          borderRight: 'none',
                          borderTop: 'none',
                          borderBottom: 'none',
                          paddingBlock: '0.6rem',
                          marginBottom: '0.1rem',
                        }}
                        value={field.value}
                        country={phoneCountry || location.country_code}
                        enableSearch={true}
                        disableSearchIcon={true}
                      />
                    </FormControl>
                    <FormMessage className='mt-1 text-base' />
                  </div>
                </FormItem>
              )}
            />
          </section>

          <div className='invisible flex w-full items-center justify-center gap-4'>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit deserunt vero hic
              illum quidem nesciunt accusantium facilis aut harum iusto doloribus tempora totam at
              minima adipisci consectetur porro, ea ipsam.
            </p>
          </div>

          {/* <div className='flex  w-full items-center justify-center gap-4'>
            <button
              type='submit'
              
              className={cn(
                `group mt-9 flex items-center justify-center gap-2 rounded-full bg-primary-1 px-8 py-3 transition-all duration-300 ease-in-out hover:opacity-90 xm:px-12 xm:py-4 ${
                  form.formState.isSubmitting
                    ? 'cursor-not-allowed bg-gray-500 font-[700]'
                    : 'cursor-pointer'
                } `,
              )}
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <div className='px-5 py-1'>
                  <div className='h-4 w-4 animate-spin  rounded-full border-t-4 border-white'></div>
                </div>
              ) : (
                <span className='text-sm font-[600] leading-[24px]  tracking-[0.4px] text-white xm:text-base'>
                  Continue to shipping
                </span>
              )}
            </button>
          </div> */}
        </form>
      </Form>
    </div>
  );
};

export default CreatePatient;
