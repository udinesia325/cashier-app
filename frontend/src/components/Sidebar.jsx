import brand from "@/assets/images/brand.png"
import Image from 'next/image'
import NavItem from './NavItem'

export default function Sidebar() {
  return (
    <div className='flex-none w-24 flex flex-col'>
      <Image alt='brand logo' src={brand} width={100} height={100} />
      <NavItem />
    </div>
  )
}
