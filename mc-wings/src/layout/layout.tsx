import Header from "./header"; 
import Footer from "./footer"; 
type Props = {
  children: string | JSX.Element | JSX.Element[],
  next:string
}
export default function Layout({children,next}:Props) {
  return (
    <div className="bg-[#bc1c2c]">
        <Header/>
        {children}
        <Footer next={next}/>
    </div>
  )
}
