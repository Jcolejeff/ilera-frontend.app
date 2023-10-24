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
        <div className='flex border-spacing-3 items-center justify-center gap-3  rounded-lg border border-dashed px-6 py-16  pr-16 hover:cursor-pointer'>
          <Icon name='uploadIcon' svgProp={{ className: 'w-12' }}></Icon>
          <p className='text-sm'>{file.name}</p>
        </div>
      ) : isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <div className='flex items-center justify-center gap-3 rounded-lg border px-6 py-16 pr-16 hover:cursor-pointer'>
          <Icon name='uploadIcon' svgProp={{ className: 'w-12' }}></Icon>

          <p className='text-sm text-secondary-1'>Choose file</p>
        </div>
      )}
    </section>
  );
};

export default FileDropzone;
