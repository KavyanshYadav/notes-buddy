"use client"

import { useEffect, useRef } from "react"

function LeftComponent() {
    const r = useRef<HTMLDivElement>(null);
    const intiPositonConstant = window.innerHeight/2

    const handleScroll = () => {
        if (r.current) {
            const height = r.current.getBoundingClientRect().height;
            const scrolly = intiPositonConstant+ window.scrollY - height/2
         
          r.current.style.top = scrolly + "px";
        }
      };

    useEffect(()=>{
        window.addEventListener("scroll",handleScroll)
        return ()=>{
            window.removeEventListener("scroll",handleScroll)
        }
    },[])

  return (
    <div ref={r} className="absolute right-10 top-10 max-w-20 min-w-20 h-52 border w-[20%]  border-foreground">
        name
    </div>
  )
}

export default LeftComponent