export default function Header() {
  return (
    <div 
      className='px-[25px] md:px-[100px] lg:px-[150px] py-8 bg-[#16ABF8]' 
      data-cy='header-background'
    >
      <div 
        className='text-2xl leading-9 font-bold text-white' 
        data-cy='header-title'
      >
        TO DO LIST APP
      </div>
    </div>
  )
}
