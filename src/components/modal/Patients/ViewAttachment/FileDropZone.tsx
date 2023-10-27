import { useDropzone } from 'react-dropzone';
import Icon from 'utils/Icon';
const FileDropzone = ({ onDrop, file }: any) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <section {...getRootProps()}>
      <input {...getInputProps()} />
      {file ? (
        <div className='mt-4 flex items-center  gap-3 rounded-lg  py-4 hover:cursor-pointer'>
          <Icon name='uploadIcon'></Icon>
          <p className='text-sm'>{file.name}</p>
        </div>
      ) : isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <div className='mt-4 flex items-center  gap-3 rounded-lg  py-4 hover:cursor-pointer'>
          {/* <Icon name='uploadIcon'></Icon> */}
          <p className='text-sm text-secondary-1'>
            <span className='mr-3 inline-block rounded-md bg-primary-1 px-4 py-3 text-white'>
              Choose File{' '}
            </span>{' '}
            {'  '}Name of the file will display here.
          </p>
        </div>
      )}
    </section>
  );
};

export default FileDropzone;
