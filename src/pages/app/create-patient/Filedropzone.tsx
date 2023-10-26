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
        <div className='flex border-spacing-3 items-center justify-center gap-3  rounded-lg border border-dashed px-12 py-16   hover:cursor-pointer'>
          {/* <Icon name='uploadIcon' svgProp={{ className: 'w-12' }}></Icon> */}
          <p className='text-sm'>{file.name}</p>
        </div>
      ) : isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <div className='flex items-center justify-center gap-3 rounded-lg border px-12 py-16  hover:cursor-pointer'>
          {/* <Icon name='uploadIcon' svgProp={{ className: 'w-12' }}></Icon> */}

          <p className='rounded-lg bg-gray-100 px-2 py-1 text-sm font-semibold text-gray-500'>
            Choose file
          </p>
        </div>
      )}
    </section>
  );
};

export default FileDropzone;
