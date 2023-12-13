import { LazyLoadImage } from 'react-lazy-load-image-component';
import rocketBoy from 'assets/image/rocketBoy.png?format=webp&w=700&h=669.86&imagetools';
import loginIcon from 'assets/svg/login.svg?format=webp&w=700&h=669.86&imagetools';
import Icon from 'utils/Icon';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Input } from 'components/shadcn/input';
import { Label } from 'components/shadcn/label';
import { Checkbox } from 'components/shadcn/checkbox';
import CONSTANTS from 'constant';
import { useEffect, useState } from 'react';
import { Dialog, DialogContent } from 'components/shadcn/dialog';
import { useMutation } from '@tanstack/react-query';
import customerService from 'services/customer';
import { customerLoginFormInterface, customerLoginFormSchema } from './login.model';
import { processError } from 'helper/error';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputErrorWrapper from 'components/Hocs/InputError';
import BtnLoader from 'components/Hocs/BtnLoader';
import { authDetailsInterface } from 'types';
import useStore from 'store';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
  FormDescription,
} from 'components/shadcn/ui/form';

const Login = () => {
  const navigate = useNavigate();
  const [emailVerifiedOpen, setEmailVerifiedOpen] = useState(false);
  const { setAuthDetails, setLoggedIn } = useStore((store) => store);

  const [params] = useSearchParams();

  const email_verfied = params.get('email');

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<customerLoginFormInterface>({
    resolver: zodResolver(customerLoginFormSchema),
    mode: 'all',
  });

  const { mutate, isLoading } = useMutation<authDetailsInterface, any, customerLoginFormInterface>({
    mutationFn: ({ email, password }) =>
      customerService.customerLogin({
        email,
        password,
      }),
    onSuccess: (data) => {
      setAuthDetails(data);
      setLoggedIn(true);
      navigate(`/app/${CONSTANTS.ROUTES['dashboard']}`);
    },
    onError: (err) => {
      processError(err);
    },
  });

  const onSubmit: SubmitHandler<customerLoginFormInterface> = (data) => {
    mutate(data);
  };

  useEffect(() => {
    if (email_verfied) {
      setEmailVerifiedOpen(true);
    }
  }, []);

  return (
    <div className=' flex h-full w-full items-center justify-center'>
      <Dialog open={emailVerifiedOpen} onOpenChange={setEmailVerifiedOpen}>
        <DialogContent className='h-screen !max-w-[1120px] bg-white sm:h-max sm:w-[80vw] lg:w-[50vw]'>
          <div className='mx-auto flex h-full w-full flex-col gap-[1.5rem] pb-[5.31rem] pt-[6.56rem]  md:max-w-[30rem]'>
            <div
              className='mb-[2.125rem] flex cursor-pointer items-center'
              onClick={() => navigate(`/`)}
            >
              <Icon name='nfmLogo' svgProp={{ width: 40, height: 40 }} />
              <h4 className='whitespace-nowrap text-[22px] font-[700]   leading-[24px] tracking-[0.15px] text-primary-9/[0.87] md:text-[28px]'>
                Nollywood Filmmaker.com
              </h4>
            </div>
            <div className='mb-[1.5rem] flex w-full flex-col'>
              <h5 className='font-inter text-[24px] font-[700] leading-[32px] tracking-[0.18px] text-primary-9/[0.87]'>
                Email Verified ✉️
              </h5>
              <p className='leading-[24px] tracking-[0.15px] text-primary-9/[0.60]'>
                Your email hase been verified, you can now continue to login.
              </p>
            </div>
            <button
              onClick={() => setEmailVerifiedOpen(false)}
              className='mb-[1.75rem] w-full rounded-[8px] bg-primary-1 py-2 text-[15px] font-[500] text-white shadow-3 transition-opacity duration-300 ease-in-out hover:opacity-90'
            >
              <span className='leading-[0.46px]'>Continue</span>
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <div className=' mx-auto flex   w-full flex-col items-center justify-center  bg-white px-4 md:max-w-xl md:px-[3rem]  '>
        <div
          className='mb-[2.125rem] flex w-full cursor-pointer   items-center
             justify-center gap-2'
          onClick={() => navigate(`/`)}
        >
          <h4 className=' text-center text-[17px] font-[700]  leading-[24px] tracking-[0.15px] text-primary-1 md:text-[2.5rem]'>
            ilera
          </h4>
        </div>
        <section className='w-full rounded-lg border p-8 pt-10'>
          <div className='mb-[1.5rem] flex w-full flex-col'>
            <h5 className='font-inter text-[17px] font-[600] leading-[32px] tracking-[0.18px] '>
              Welcome Back!
            </h5>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className='mx-auto flex w-full flex-col items-start justify-center'
          >
            <div className='mb-[1.25rem] flex w-full flex-col gap-4'>
              <div className='relative'>
                <label className=' text-sm font-semibold text-gray-700'>Username</label>
                <InputErrorWrapper error={errors?.email?.message}>
                  <Input
                    {...register('email')}
                    className='mt-1 w-full placeholder:text-primary-9/[0.38]'
                    // placeholder='Email'
                  />
                </InputErrorWrapper>
              </div>
              <div className='relative'>
                <label className=' text-sm font-semibold text-gray-700'>Password</label>

                <InputErrorWrapper error={errors?.password?.message}>
                  <Input
                    {...register('password')}
                    className='mt-1 w-full placeholder:text-primary-9/[0.38]'
                    // placeholder='Password'
                  />
                </InputErrorWrapper>
              </div>
            </div>

            <button
              onClick={() => navigate('/app/dashboard')}
              disabled={isLoading}
              className='mb-[1.75rem] w-full rounded-[8px] bg-primary-1 py-2 text-[15px] font-[500] text-white shadow-3 transition-opacity duration-300 ease-in-out hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50'
            >
              <BtnLoader isLoading={isLoading}>
                <span className='leading-[0.46px]'>Sign in</span>
              </BtnLoader>
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Login;
