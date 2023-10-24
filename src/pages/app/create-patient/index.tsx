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
import PhoneInput from 'react-phone-input-2';
import useUserLocation from 'hooks/useUserLoction';
import { useEffect } from 'react';
import Icon from 'utils/Icon';
import { useNavigate } from 'react-router-dom';
import UploadImageForm from './UploadForm';
import SavePatientModal from 'components/modal/Patients/SavePatient';
import LinkPatientsModal from 'components/modal/Patients/LinkPatient';
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
  currency_code: z.string().optional(),
  phone_country_code: z.string().optional(),
  email: z
    .string()
    .min(2, {
      message: 'Please enter a valid email.',
    })
    .email(),
});
const StepOneUserInfo = () => {
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
  }, [location?.country_calling_code, location?.currency]);

  return (
    <div className=' container     flex h-full w-full  max-w-[150rem]   flex-col gap-8  px-container-base  py-[1.875rem] '>
      <div className='flex w-full  items-center justify-between gap-4 md:flex-row'>
        <div
          onClick={() => navigate(-1)}
          className='flex w-max cursor-pointer items-center gap-1 rounded-[8px] px-[2px] py-1  transition-colors duration-300 ease-in-out hover:bg-slate-100 active:bg-slate-200'
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
          <p className='text-lg font-semibold md:text-xl'>Contact</p>
          <section className=' grid grid-cols-1 gap-8 md:gap-6 xm:grid-cols-[1fr_1fr_1fr]  '>
            <FormField
              control={form.control}
              name='firstName'
              render={({ field }) => (
                <FormItem>
                  <div className='relative'>
                    <label className='absolute left-2 top-[-20%] rounded-full bg-white px-1 text-sm font-extralight text-secondary-1'>
                      First Name
                    </label>
                    <FormControl>
                      <Input
                        className='py-6 text-base placeholder:text-sm placeholder:text-secondary-1/50'
                        {...field}
                        type='text'
                        placeholder='John'
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
                    <label className='absolute left-2 top-[-20%] rounded-full bg-white px-1 text-sm font-extralight text-secondary-1'>
                      Last Name
                    </label>
                    <FormControl>
                      <Input
                        className='py-6 text-base placeholder:text-sm placeholder:text-secondary-1/50 '
                        {...field}
                        type='text'
                        placeholder='Doe'
                      />
                    </FormControl>
                  </div>
                  <FormMessage className='mt-1 text-sm' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='jobMode'
              render={({ field }) => (
                <FormItem>
                  <div className='relative'>
                    <label className='absolute left-2 top-[-20%] rounded-full bg-white px-1 text-xs font-extralight text-secondary-1'>
                      Job Mode
                    </label>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className='w-full py-6 text-lg  text-secondary-3 transition-all duration-300  ease-in-out  placeholder:text-lg focus-within:text-secondary-2 '>
                          <SelectValue placeholder='Contract' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className='bg-primary-1'>
                        <SelectItem value='internship' className='py-3 text-lg text-white'>
                          Internship
                        </SelectItem>
                        <SelectItem value='Full Time' className='py-3 text-lg text-white'>
                          Full Time
                        </SelectItem>
                        <SelectItem value='Part Time' className='py-3 text-lg text-white'>
                          Part Time
                        </SelectItem>
                        <SelectItem value='Contract' className='py-3 text-lg text-white'>
                          Contract
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <FormMessage className='mt-1 text-xs' />
                </FormItem>
              )}
            />
          </section>

          <section className=' grid grid-cols-1 gap-6 xm:grid-cols-[1fr_1fr]  '>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <div className='relative'>
                    <label className='absolute left-2 top-[-20%] rounded-full bg-white px-1 text-sm font-extralight text-secondary-1'>
                      Email
                    </label>
                    <FormControl>
                      <div className='flex flex-col items-end gap-1 xm:flex-row xm:items-center xm:gap-4'>
                        <Input
                          className='py-6 text-base placeholder:text-sm placeholder:text-secondary-1/80'
                          placeholder='Your email'
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
          </section>

          <FormField
            control={form.control}
            name='emailMe'
            render={({ field }) => (
              <FormItem className='flex flex-row items-center space-x-3 space-y-0 rounded-md '>
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className=' leading-none'>
                  <FormLabel className='text-sm text-secondary-1/80'>
                    Email me with news and offers
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
          <p className='text-lg font-semibold md:text-xl'>Shipping Address</p>

          <div className='flex flex-col gap-6 md:flex-row'>
            <CountryDropdown
              value={country}
              onChange={(val) => setCountry(val)}
              classes=' border-gray-200 rounded-md focus:ring-0 focus:border-gray-200 py-3 w-full md:w-1/2 text-base text-secondary-1/90'
            />
            <RegionDropdown
              country={country}
              value={region}
              onChange={(val) => setRegion(val)}
              blankOptionLabel='Select Region or State'
              defaultOptionLabel='Now select a region'
              classes=' border-gray-200 rounded-md focus:ring-0 focus:border-gray-200 py-3 w-full md:w-1/2 text-base text-secondary-1/90'
            />
          </div>

          <FormField
            control={form.control}
            name='address'
            render={({ field }) => (
              <FormItem>
                <div className='relative'>
                  <label className='absolute left-2 top-[-13%] rounded-full bg-white px-1 text-sm font-extralight text-secondary-1 xm:top-[-20%]'>
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
          <FormField
            control={form.control}
            name='apartment'
            render={({ field }) => (
              <FormItem>
                <div className='relative'>
                  <label className='absolute left-2 top-[-13%] rounded-full bg-white px-1 text-sm font-extralight text-secondary-1 xm:top-[-20%]'>
                    Apartment, suite, etc. (optional)
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
          <section className=' grid grid-cols-1 gap-6 xm:grid-cols-[1fr_1fr]  '>
            <FormField
              control={form.control}
              name='city'
              render={({ field }) => (
                <FormItem>
                  <div className='relative'>
                    <label className='absolute left-2 top-[-13%] rounded-full bg-white px-1 text-sm font-extralight text-secondary-1  xm:top-[-20%]'>
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
              name='postalCode'
              render={({ field }) => (
                <FormItem>
                  <div className='relative'>
                    <label className='absolute left-2 top-[-13%] rounded-full bg-white px-1 text-sm font-extralight text-secondary-1 xm:top-[-20%]'>
                      Postal Code
                    </label>
                    <FormControl>
                      <div className='flex flex-col items-end gap-1 xm:flex-row xm:items-center xm:gap-4'>
                        <Input
                          className='py-6 text-base placeholder:text-sm  placeholder:text-secondary-1/50'
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

          <FormField
            control={form.control}
            name='saveInfo'
            render={({ field }) => (
              <FormItem className='flex flex-row items-center space-x-3 space-y-0 rounded-md '>
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className=' leading-none'>
                  <FormLabel className='text-sm text-secondary-1/80'>
                    Save this information for next time
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
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

export default StepOneUserInfo;
