"use client";

import { flame } from "@/style/fonts/fonts";
import Link from "next/link";
import { usePathname } from "next/navigation";

const steps: { title: string; step: string, link: string }[] = [
  { title: "cart", step: "preview", link: '/cart/preview' },
  { title: "delivery info", step: "delivery", link: '/cart/delivery' },
  { title: "payment", step: "payment", link: '/cart/payment' },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  function getProgress(){
    let progressStep: number= 0;
    steps.find((step,index) => {
      if(pathname.includes(step.step)){
        progressStep = index
        return true
      }
    })
    return progressStep
  }
  return (
    <main className={`px-[15px] lg:px-0 ${flame.className}`}>
      <div
        className={`flex h-[45px] ${flame.className} rounded-[5px] overflow-hidden mb-6`}
      >
        {steps.map((step, index) => {
          return (
            <div
              key={step.step}
              className={`grid place-content-center relative grow w-full h-full ${
                index <= getProgress()
                  ? "text-[#8b542f] bg-[#faaf18]"
                  : "bg-[#fcebd9] text-[#c5a997]"
              }`}
            > 
              <Link href={index <= getProgress() ? step.link : ''} className='flex items-center'>
                <span
                  className={`hidden lg:grid text-sm  place-content-center h-5 w-5 pt-0.5 mr-1 text-sm rounded-full ${
                    index <= getProgress() ? "bg-[#8b542f]" : "bg-[#c5a997]"
                  } text-white`}
                >
                  {index + 1}
                </span>
                <h4 className="capitalize text-xl">{step.title}</h4>
              </Link>
              {index < steps.length - 1 && (
                <div
                  className={`absolute z-10 rotate-[45deg] right-[-16px] h-[32px] w-[32px] top-[6px] ${
                    index <= getProgress()
                      ? "bg-[#faaf18]"
                      : "bg-[#fcebd9]"
                  }`}
                  style={{ borderRadius: "2px 5px 2px 0px" }}
                ></div>
              )}
            </div>
          );
        })}
      </div>
      {children}
    </main>
  );
}
