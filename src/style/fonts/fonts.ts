import localFont from 'next/font/local'
 
const flame = localFont({ src: [
  {
    path: './FlameRegular.otf',
    weight:'400',
    style:'normal'
  },
  {
    path: './FlameSans.otf',
    weight:'300',
    style:'lighter'
  },
  {
    path: './FlameBold.otf',
    weight:'600',
    style:'bold'
  },
  {
    path: './FlameCondensed.otf',
    weight:'700',
    style:'bolder'
  },
]})
 
export { flame }