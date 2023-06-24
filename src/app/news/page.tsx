import Link from "next/link"

interface BannerProp{
  image: string
  desc: string
  link: string
}

const newsItem : BannerProp[] = [
  {image: 'https://bkdelivery.co.id/media/landscape_image/2023/5/11/md4ufigb6mggcqz6bw2rd9.jpg', desc:'Burger King Promo 30%', link: '/menus'},
  {image: 'https://bkdelivery.co.id/media/landscape_image/2023/5/17/y5vpy4rvgzsttwrriei4bq.jpg', desc:'BK Cheeseburger hanya Rp.10.000' ,link: '/menus'},
  {image: 'https://bkdelivery.co.id/media/landscape_image/2023/3/7/9upbgojkbfesyzqxpengik.jpg', desc:'Burger King Diskon 50%' , link: '/menus'},
]

function PromoBanner({image,desc,link}:BannerProp){
  return(
    <Link href={link} className='block mb-[30px]'>
      <img className='w-full h-auto' src={image} alt={desc} loading="lazy"/>
    </Link>
  )
}
export default function News(){
  return(
    <main>
      {newsItem.map(({image, desc, link},index) => {
        return(
          <PromoBanner key={'banner'+index} image={image} desc={desc} link={link} />
        )
      })}
    </main>
  )
}
