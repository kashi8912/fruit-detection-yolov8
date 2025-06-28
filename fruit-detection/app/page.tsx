import Link from "next/link"
import { Apple, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Apple className="h-6 w-6 text-green-500" />
            <span>FruitDetect</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="font-medium">
              Home
            </Link>
            <Link href="#how-it-works" className="font-medium">
              How It Works
            </Link>
            <Link href="#gallery" className="font-medium">
              Gallery
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-green-50 to-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Identify Any Fruit in Seconds
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Our model can identify over 5 different types of fruits from a single image as fresh and rotten.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/detect">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  Try It Now
                </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-600">
                  Fast & Accurate
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Upload Your Fruit Image</h2>
                <p className="text-gray-500 md:text-xl">
                  Simply upload a photo of any fruit, and our AI will identify it instantly.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/detect">
                    <Button className="bg-green-600 hover:bg-green-700">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Image
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative w-full max-w-[500px] aspect-square rounded-xl overflow-hidden border bg-gray-100 p-2">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-4">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-500">
                        Drag and drop your fruit image here or click to browse
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-green-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Our fruit detection technology uses advanced machine learning to identify fruits with incredible
                  accuracy.
                </p>
              </div>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2 w-full max-w-5xl">
                <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-white shadow-sm">
                  <div className="p-3 rounded-full bg-green-100">
                    <Upload className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold">Upload</h3>
                  <p className="text-gray-500 text-center">Take a photo or upload an existing image of any fruit.</p>
                </div>
                <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-white shadow-sm">
                  <div className="p-3 rounded-full bg-green-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-green-600"
                    >
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Analyze</h3>
                  <p className="text-gray-500 text-center">
                    Our AI processes the image and identifies the fruit in seconds.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="gallery" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Fruit Gallery</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Check out some of the fruits our system has successfully identified.
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-5xl">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="aspect-square overflow-hidden rounded-lg">
                    <img
                      src={`/placeholder.svg?height=300&width=300&text=Fruit+${i}`}
                      alt={`Fruit sample ${i}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-gray-50">
        <div className="container flex flex-col gap-4 py-10 md:flex-row md:gap-8 px-4 md:px-6">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-2 font-bold text-xl">
              <Apple className="h-6 w-6 text-green-500" />
              <span>FruitDetect</span>
            </div>
            <p className="text-sm text-gray-500">An Yolo Based fruit detection technology on the web.</p>
          </div>
          <div className="flex-1 space-y-4">
            <div className="font-medium">Quick Links</div>
            <nav className="flex flex-col gap-2 text-sm">
              <Link href="/" className="text-gray-500 hover:text-gray-900">
                Home
              </Link>
              <Link href="#how-it-works" className="text-gray-500 hover:text-gray-900">
                How It Works
              </Link>
              <Link href="#gallery" className="text-gray-500 hover:text-gray-900">
                Gallery
              </Link>
            </nav>
          </div>
          <div className="flex-1 space-y-4">
            <div className="font-medium">Contact</div>
            <div className="text-sm text-gray-500">
              <p>Email: info@fruitdetect.com</p>
              <p>Phone: (123) 456-7890</p>
            </div>
          </div>
        </div>
        <div className="border-t py-6 text-center text-sm text-gray-500">
          <p>© 2023 FruitDetect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
