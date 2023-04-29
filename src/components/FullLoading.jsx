// eslint-disable-next-line react/prop-types
export default function FullLoading({ isFullScreen = false}) {
  return (
    <div
      className={`w-full flex justify-center items-center ${
        isFullScreen ? 'h-screen' : 'h-full'
      }`}
    >
      <div className='border-t-transparent border-solid animate-spin rounded-full border-primary-50 border-4 h-10 w-10' />
    </div>
  );
}
