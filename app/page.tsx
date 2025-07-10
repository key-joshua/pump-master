import Link from "next/link"
import Image from "next/image"

export default function LandingPage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-white-semi-active">
      <Image src="/landing-background.svg" alt="" width={1} height={1} priority className="hidden" />
      <div className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/landing-background.png')", }} />

      <div className="z-10 absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24 bg-transparent">
        <div className="space-y-5">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-semi-active relative block">
            PUMP MASTER
            <div className="absolute -bottom-2 left-0 w-[22%] h-1 bg-secondary-mini-active rounded-full"/>
          </h1>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-secondary-active relative block">
            SYSTEM
            <div className="absolute -bottom-2 left-0 w-[9%] h-1 bg-primary-micro-active rounded-full"/>
          </h2>
        </div>
      </div>

      <div className="fixed left-0 w-full z-20 bg-white py-6 flex justify-center gap-12 shadow-md" style={{ bottom: '30%' }} >
        <Link href="/login" className="px-5 py-2 text-lg border rounded-lg font-medium text-primary-semi-active hover:text-white-active hover:bg-primary-semi-active transition-all duration-300 border-primary-micro-active" > Login </Link>
        <Link href="/signup" className="px-5 py-2 text-lg border rounded-lg font-medium text-primary-semi-active hover:text-white-active hover:bg-primary-semi-active transition-all duration-300 border-primary-micro-active" > Sign Up </Link>
      </div>

    </div>
  )
}
