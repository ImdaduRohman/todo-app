export default function FormInput({
  // eslint-disable-next-line react/prop-types
  onChange = () => undefined,
  // eslint-disable-next-line react/prop-types
  value,
  // eslint-disable-next-line react/prop-types
  type,
  // eslint-disable-next-line react/prop-types
  name,
  ...props
}) {
  return (
    <>
      <label data-cy='modal-add-name-title' className='text-xs text-[#111111] leading-[18px] font-semibold' htmlFor={name}>
        NAMA LIST ITEM
      </label>
      <input
        data-cy='modal-add-name-input'
        onChange={onChange}
        value={value}
        type={type}
        name={name}
        id={name}
        className='w-full bg-white ring-1 mt-[9px] text-[#111111] text-base focus:ring-[#16ABF8] focus:ring-2 outline-none px-[18px] py-[14px] rounded-md ring-[#E5E5E5]'
        placeholder='Tambahkan nama list item'
        {...props}
      />
    </>
  );
}
