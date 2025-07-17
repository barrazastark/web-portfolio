'use client'

import React, { useState } from 'react'
import { ShoppingCart, Minus, Plus, X, Shirt, Package, MapPin, MoveLeft } from 'lucide-react'
import { clsx as cn } from 'clsx'
import { Toaster, toast } from 'sonner';
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter', 
  display: 'swap',
})

const colors = [
  { hex: '#F43F5E', name: 'Rose' },
  { hex: '#F97316', name: 'Orange' },
  { hex: '#FACC15', name: 'Yellow' },
  { hex: '#4ADE80', name: 'Green' },
  { hex: '#94A3B8', name: 'Slate' },
];

const chestSizes: string[] = ['20-24 in', '25-29 in', '30-34 in', '35-39 in', '40-44 in', '45-49 in']
const torsoSizes: string[] = ['35-39 in', '40-44 in', '45-49 in', '50-54 in', '55-59 in', '60-64 in']


interface Model {
  name: string;
  thumb: string;
  mainImage: string;
  secondaryImages: string[];
  height: string;
  size: string;
  chest: string;
  torso: string;
}

interface CartItem {
  model: string
  image: string
  color: string
  chest: string
  torso: string
  quantity: number
  price: number
}

interface FormData {
  name: string;
  address: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
  cartItems: CartItem[]
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>
  checkoutStep: number
  setCheckoutStep: React.Dispatch<React.SetStateAction<number>>
  formData: FormData
  setFormData: React.Dispatch<React.SetStateAction<FormData>>
}

const formatCardNumber = (value: string) =>
  value
    .replace(/\D/g, '')                 
    .slice(0, 16)                        
    .replace(/(\d{4})/g, '$1 ')         
    .trim();

const formatExpiry = (value: string) => {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  if (digits.length < 3) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
};

const formatCVV = (value: string) =>
  value.replace(/\D/g, '').slice(0, 3);

const models: Model[] = [
  {
    name: 'Harvest Look',
    thumb: 'https://plus.unsplash.com/premium_photo-1691367279053-ffa6edf80181?w=500&auto=format&fit=crop&q=60', // Matches mainImage
    mainImage: 'https://plus.unsplash.com/premium_photo-1691367279053-ffa6edf80181?w=500&auto=format&fit=crop&q=60',
    secondaryImages: [
      'https://plus.unsplash.com/premium_photo-1691367279262-5c1b06a25783?w=500&auto=format&fit=crop&q=60',
      'https://plus.unsplash.com/premium_photo-1691367279313-71af7ba83f2d?w=500&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1738618810591-bc2b5a3b3b66?w=500&auto=format&fit=crop&q=60'
    ],
    height: `5'7"`,
    size: 'S',
    chest: '25-29"',
    torso: '40-44"',
  },
  {
    name: 'GG',
    thumb: 'https://plus.unsplash.com/premium_photo-1690822104061-84ff7d66d1bb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8d29tYW4lMjBicm93JTIwdCUyMHNoaXJ0fGVufDB8fDB8fHww', // Matches mainImage
    mainImage: 'https://plus.unsplash.com/premium_photo-1690822104061-84ff7d66d1bb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8d29tYW4lMjBicm93JTIwdCUyMHNoaXJ0fGVufDB8fDB8fHww',
    secondaryImages: [
            'https://images.unsplash.com/photo-1738618810591-bc2b5a3b3b66?w=500&auto=format&fit=crop&q=60',
      'https://plus.unsplash.com/premium_photo-1691367279313-71af7ba83f2d?w=500&auto=format&fit=crop&q=60',
      'https://plus.unsplash.com/premium_photo-1691367279262-5c1b06a25783?w=500&auto=format&fit=crop&q=60',
    ],
    height: `5'7"`,
    size: 'S',
    chest: '25-29"',
    torso: '40-44"',
  },
  {
    name: 'Samuel',
    thumb: 'https://images.unsplash.com/photo-1682731500074-0a45a3408fc5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWFuJTIwYnJvdyUyMHQlMjBzaGlydHxlbnwwfHwwfHx8MA%3D%3D', // Matches mainImage
    mainImage: 'https://images.unsplash.com/photo-1682731500074-0a45a3408fc5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWFuJTIwYnJvdyUyMHQlMjBzaGlydHxlbnwwfHwwfHx8MA%3D%3D',
    secondaryImages: [
            'https://images.unsplash.com/photo-1738618810591-bc2b5a3b3b66?w=500&auto=format&fit=crop&q=60',
      'https://plus.unsplash.com/premium_photo-1691367279313-71af7ba83f2d?w=500&auto=format&fit=crop&q=60',
      'https://plus.unsplash.com/premium_photo-1691367279262-5c1b06a25783?w=500&auto=format&fit=crop&q=60',

    ],
    height: `5'7"`,
    size: 'S',
    chest: '25-29"',
    torso: '40-44"',
  },
  {
    name: 'Amy',
    thumb: 'https://plus.unsplash.com/premium_photo-1691367279053-ffa6edf80181?w=500&auto=format&fit=crop&q=60', // Matches mainImage
    mainImage: 'https://plus.unsplash.com/premium_photo-1691367279053-ffa6edf80181?w=500&auto=format&fit=crop&q=60',
    secondaryImages: [
      'https://plus.unsplash.com/premium_photo-1691367279262-5c1b06a25783?w=500&auto=format&fit=crop&q=60',
      'https://plus.unsplash.com/premium_photo-1691367279313-71af7ba83f2d?w=500&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1738618810591-bc2b5a3b3b66?w=500&auto=format&fit=crop&q=60'
    ],
    height: `5'7"`,
    size: 'S',
    chest: '25-29"',
    torso: '40-44"',
  },
  {
    name: 'Ana',
    thumb: 'https://plus.unsplash.com/premium_photo-1690822104061-84ff7d66d1bb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8d29tYW4lMjBicm93JTIwdCUyMHNoaXJ0fGVufDB8fDB8fHww', // Matches mainImage
    mainImage: 'https://plus.unsplash.com/premium_photo-1690822104061-84ff7d66d1bb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8d29tYW4lMjBicm93JTIwdCUyMHNoaXJ0fGVufDB8fDB8fHww',
    secondaryImages: [
            'https://images.unsplash.com/photo-1738618810591-bc2b5a3b3b66?w=500&auto=format&fit=crop&q=60',
      'https://plus.unsplash.com/premium_photo-1691367279313-71af7ba83f2d?w=500&auto=format&fit=crop&q=60',
      'https://plus.unsplash.com/premium_photo-1691367279262-5c1b06a25783?w=500&auto=format&fit=crop&q=60',

    ],
    height: `5'7"`,
    size: 'S',
    chest: '25-29"',
    torso: '40-44"',
  },
  {
    name: 'Jose',
    thumb: 'https://images.unsplash.com/photo-1682731500074-0a45a3408fc5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWFuJTIwYnJvdyUyMHQlMjBzaGlydHxlbnwwfHwwfHx8MA%3D%3D', // Matches mainImage
    mainImage: 'https://images.unsplash.com/photo-1682731500074-0a45a3408fc5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWFuJTIwYnJvdyUyMHQlMjBzaGlydHxlbnwwfHwwfHx8MA%3D%3D',
    secondaryImages: [
            'https://images.unsplash.com/photo-1738618810591-bc2b5a3b3b66?w=500&auto=format&fit=crop&q=60',
      'https://plus.unsplash.com/premium_photo-1691367279313-71af7ba83f2d?w=500&auto=format&fit=crop&q=60',
      'https://plus.unsplash.com/premium_photo-1691367279262-5c1b06a25783?w=500&auto=format&fit=crop&q=60',

    ],
    height: `5'7"`,
    size: 'S',
    chest: '25-29"',
    torso: '40-44"',
  },
  
];

const handleNotImplemented = () => {
  toast.info("Feature not implemented");
}

const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  setCartItems,
  checkoutStep,
  setCheckoutStep,
  formData,
  setFormData,
}) => {
  const [isPaying, setIsPaying] = useState(false);
  const handlePayment = () => {
    setIsPaying(true);
    const paymentPromise = new Promise((resolve) => setTimeout(resolve, 2000));

    toast.promise(paymentPromise, {
      loading: 'Processing...',
      success: 'Payment complete!',
      error: 'Something went wrong!',
    });

    paymentPromise.then(() => {
      setCartItems([]);
      onClose();
      setCheckoutStep(1);
      setFormData({
        name: '',
        address: '',
        cardNumber: '',
        expiry: '',
        cvv: ''
      });
       setIsPaying(false);
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex justify-end">
      <div className="w-full sm:w-[400px] bg-white dark:bg-zinc-900 p-4 flex flex-col gap-4 max-h-screen">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">Cart</h2>
          <button onClick={onClose}><X className='h-5 w-5'/></button>
        </div>

        {checkoutStep === 1 ? (
          cartItems.length === 0 ? (
            <p className="text-muted-foreground">Your cart is empty.</p>
          ) : (
            <>
             
              <div className="flex-1 overflow-y-auto pr-1">
                <ul className="divide-y">
                  {cartItems.map((item, i) => (
                    <li key={i} className="py-2 flex justify-between items-center">
                      <div className="flex gap-3 items-center">
                        <img alt="Item" src={item.image} className="w-12 h-12 object-cover rounded" />
                        <div className="text-sm space-y-1">
                          <div className="font-bold">{item.model}</div>
                          <div className="text-xs text-muted-foreground flex items-center gap-1">
                            Color:
                            <span
                              className="inline-block w-4 h-4 rounded-full border border-gray-300"
                              style={{ backgroundColor: item.color }}
                            />
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Chest: <span className="font-medium">{item.chest}</span> • Torso: <span className="font-medium">{item.torso}</span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Qty: <span className="font-medium">{item.quantity}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <div className="text-sm font-semibold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                        <button
                          onClick={() => {
                            const copy = [...cartItems];
                            copy.splice(i, 1);
                            setCartItems(copy);
                          }}
                          className="text-xs text-red-500"
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              
              <div className="border-t pt-4">
                <div className="text-sm font-semibold mt-2 mb-6">
                  Total: ${cartItems.reduce((acc, i) => acc + i.price * i.quantity, 0).toFixed(2)}
                </div>
                <button
                  className="w-full py-2 bg-black text-white rounded dark:bg-white dark:text-black font-semibold"
                  onClick={() => setCheckoutStep(2)}
                >
                  Proceed to Checkout
                </button>
              </div>
            </>
          )
        ) : (
          <>
            <h3 className="font-semibold">Checkout</h3>
            <form
              className="flex flex-col gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                handlePayment();
              }}
            >
              <input
                required
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="px-3 py-2 border rounded text-sm bg-white text-black dark:bg-zinc-800 dark:text-white dark:border-zinc-600"
              />
              <input
                required
                placeholder="Address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="px-3 py-2 border rounded text-sm bg-white text-black dark:bg-zinc-800 dark:text-white dark:border-zinc-600"
              />
              <input
                required
                placeholder="Card Number"
                value={formData.cardNumber}
                onChange={(e) =>
                  setFormData({ ...formData, cardNumber: formatCardNumber(e.target.value) })
                }
                className="px-3 py-2 border rounded text-sm bg-white text-black dark:bg-zinc-800 dark:text-white dark:border-zinc-600"
                inputMode="numeric"
              />
              <div className="flex gap-3">
  <input
    required
    placeholder="MM/YY"
    value={formData.expiry}
    onChange={(e) =>
      setFormData({ ...formData, expiry: formatExpiry(e.target.value) })
    }
    className="flex-1 px-3 py-2 border rounded text-sm bg-white text-black dark:bg-zinc-800 dark:text-white dark:border-zinc-600"
    inputMode="numeric"
  />
  <input
    required
    placeholder="CVV"
    value={formData.cvv}
    onChange={(e) =>
      setFormData({ ...formData, cvv: formatCVV(e.target.value) })
    }
    className="w-20 px-3 py-2 border rounded text-sm bg-white text-black dark:bg-zinc-800 dark:text-white dark:border-zinc-600"
    inputMode="numeric"
    maxLength={3}
  />
</div>


              <button
  type="submit"
  disabled={isPaying}
  className={cn(
    "w-full py-2 rounded font-semibold",
    isPaying
      ? "bg-gray-400 text-white cursor-not-allowed"
      : "bg-green-600 text-white"
  )}
>
  {isPaying ? "Processing..." : `Pay $${cartItems.reduce((acc, i) => acc + i.price * i.quantity, 0).toFixed(2)}`}
</button>
              <button
  type="button"
  onClick={() => setCheckoutStep(1)}
  className="text-xs text-muted-foreground underline mt-2 flex items-center justify-center gap-1"
>
  <MoveLeft className="h-5 w-5" />
  Back to Cart
</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};


function SizeGuideModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 w-[90%] max-w-md relative shadow-lg">
        <button
          className="absolute top-3 right-3 text-zinc-500 hover:text-black dark:hover:text-white"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>
        <h3 className="text-lg font-semibold mb-4">Size Guide</h3>
        <table className="w-full text-sm table-auto border-collapse">
          <thead>
            <tr className="text-left border-b border-zinc-300 dark:border-zinc-700">
              <th className="pb-2">Size</th>
              <th className="pb-2">Chest</th>
              <th className="pb-2">Torso</th>
            </tr>
          </thead>
          <tbody>
            {[
              { size: "XS", chest: "20–24\"", torso: "35–39\"" },
              { size: "S", chest: "25–29\"", torso: "40–44\"" },
              { size: "M", chest: "30–34\"", torso: "45–49\"" },
              { size: "L", chest: "35–39\"", torso: "50–54\"" },
              { size: "XL", chest: "40–44\"", torso: "55–59\"" },
              { size: "XXL", chest: "45–49\"", torso: "60–64\"" },
            ].map(({ size, chest, torso }) => (
              <tr key={size} className="border-b border-dashed border-zinc-200 dark:border-zinc-700">
                <td className="py-2 font-medium">{size}</td>
                <td className="py-2">{chest}</td>
                <td className="py-2">{torso}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


function SizeSection({
  chest,
  torso,
  setChest,
  setTorso,
}: {
  chest: string;
  torso: string;
  setChest: (val: string) => void;
  setTorso: (val: string) => void;
}) {
  const [showSizeGuide, setShowSizeGuide] = useState(false)

  return (
    <div >
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium my-2">
          <span >Size</span>
          <span className="ml-2 text-muted-foreground">• <span className='font-bold'>Measurements</span> | <span className='text-muted-foreground'>XS-XXL</span></span>
        </span>
        <button
          onClick={() => setShowSizeGuide(true)}
          className="flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
        >
          <Shirt className="w-5 h-5" />
          Size Guide
        </button>
      </div>
      <div className='my-8'>
      <SizeSelector title="Chest" options={chestSizes} selected={chest} onSelect={setChest} />
      </div>
      <div className='mt-8'>
      <SizeSelector title="Torso Length" options={torsoSizes} selected={torso} onSelect={setTorso} />
</div>
      {showSizeGuide && <SizeGuideModal onClose={() => setShowSizeGuide(false)} />}
    </div>
  )
}


function Header({
  cartCount,
  setIsCartOpen,
}: {
  cartCount: number
  setIsCartOpen: (value: boolean) => void
}) {
  return (
    <nav className={`${inter.className} w-full px-6 py-4 md:px-8 lg:px-12 border-b text-sm font-semibold sticky top-0 z-50 bg-white dark:bg-zinc-900`}>
   
      <div className="hidden md:flex items-center justify-between   px-12">
       
        <div className="flex gap-4 flex-1">
          <a className="cursor-pointer" onClick={handleNotImplemented}>SHOP</a>
          <a className="cursor-pointer" onClick={handleNotImplemented}>LOOK BOOK</a>
          <a className="cursor-pointer" onClick={handleNotImplemented}>SUSTAINABILITY</a>
        </div>

     
        <div className="flex-1 flex justify-center">
          <h1 className="text-lg font-bold text-center">HARVEST & MILL</h1>
        </div>

        <div className="flex gap-4 items-center justify-end flex-1">
          <div className="relative">
            <ShoppingCart className="w-5 h-5 cursor-pointer" onClick={() => setIsCartOpen(true)} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
            )}
          </div>
        </div>
      </div>

      <div className="md:hidden px-4 space-y-2">
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-bold">HARVEST & MILL</h1>
          <div className="flex gap-4 items-center relative">
       
            <div className="relative">
              <ShoppingCart className="w-5 h-5 cursor-pointer" onClick={() => setIsCartOpen(true)} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-between text-sm">
          <a className="cursor-pointer" onClick={handleNotImplemented}>SHOP</a>
          <a className="cursor-pointer" onClick={handleNotImplemented}>LOOK BOOK</a>
          <a className="cursor-pointer" onClick={handleNotImplemented}>SUSTAINABILITY</a>
        </div>
      </div>
    </nav>
  );
}







function Breadcrumbs() {
  return <div className="text-xs text-muted-foreground">Harvest & Mill / Shop / All / Tops / <strong>Crop Top T-Shirt</strong></div>
}

function ImageGallery({
  mainImage,
  thumbnails,
  onImageClick,
  selectedModelIndex,
  onModelSelect,
  selectedModel,
}: {
  mainImage: string;
  thumbnails: string[];
  onImageClick: (image: string) => void;
  selectedModelIndex: number;
  onModelSelect: (index: number) => void;
  selectedModel: Model;
}) {
  return (
    <div className="grid grid-cols-6 grid-rows-7 gap-4 max-h-[750px]">
  
  <div className="col-span-2 row-span-6 grid grid-rows-3 gap-2">
  {thumbnails.map((src, i) => (
    <img
      alt="Image"
      key={i}
      src={src}
      className="w-full h-full object-cover rounded border cursor-pointer hover:opacity-80"
      onClick={() => onImageClick(src)}
    />
  ))}
</div>

 
  <div className="col-start-3 col-span-4 row-span-6 w-full h-full relative flex items-center justify-center">
  <div className="w-full h-full p-6 rounded-lg shadow-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-zinc-900/40 relative">
    <img
      alt="Main image"
      src={mainImage}
      className="w-full h-full object-contain rounded"
      onClick={() => onImageClick(mainImage)}
    />

    
    <div className="absolute bottom-4 left-4 flex flex-wrap justify-center gap-2 px-2">
      <span className="text-xs font-medium px-3 py-1 rounded-full bg-[#dbf227] text-black">
        <span className="opacity-70 mr-1">Model:</span> {selectedModel.height}
      </span>
      <span className="text-xs font-medium px-3 py-1 rounded-full bg-[#dbf227] text-black">
        <span className="opacity-70 mr-1">Size:</span> {selectedModel.size}
      </span>
      <span className="text-xs font-medium px-3 py-1 rounded-full bg-[#dbf227] text-black">
        <span className="opacity-70 mr-1">Chest:</span> {selectedModel.chest}
      </span>
      <span className="text-xs font-medium px-3 py-1 rounded-full bg-[#dbf227] text-black">
        <span className="opacity-70 mr-1">Torso:</span> {selectedModel.torso}
      </span>
    </div>
  </div>
</div>



  <div className="col-span-6 row-start-7">
  <div className="grid grid-cols-6 gap-4">
  {models.slice(0, 6).map((model, i) => (
    <div
      key={i}
      onClick={() => onModelSelect(i)}
      className={cn(
  "h-[140px] flex flex-col justify-center items-center text-center transition-transform duration-300 cursor-pointer bg-white dark:bg-zinc-800 border rounded",
  i === selectedModelIndex
    ? "border-[#dbf227]  shadow-[0_0_10px_1px_#dbf227]"
    : "border-zinc-200 dark:border-zinc-700 hover:shadow-[0_0_10px_1px_#dbf227] shadow"
)}

    >
      <img
        alt="Model"
        src={model.thumb}
        className="w-[80px] h-[80px] object-cover rounded border"
      />
      <span className="mt-2 font-medium">{model.name}</span>
    </div>
  ))}
</div>


</div>
</div>


  )
}



function FullscreenModal({ image, onClose }: { image: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
      <button className="absolute top-4 right-4 text-white" onClick={onClose}><X className="w-5 h-5" /></button>
      <img alt="Main image" src={image} className="max-w-full max-h-full object-contain rounded" />
    </div>
  )
}



function ProductInfo({ price }: { price: number }) {
  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 py-10 px-6 shadow-sm">
      <div className="flex  items-start gap-4">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">Cropped Cotton T-Shirt</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
            Organic, ultra soft cotton crop top is the perfect summer essential. It’s designed to keep you cool with breathable,
            natural material. This crop top is a highly versatile piece and can be layered and styled to your heart’s desire.
          </p>
        </div>

          <span className="mr-4 bg-[#dbf227] text-black px-3 py-1.5 text-sm rounded-full font-semibold shadow">
            ${price.toFixed(2)}
          </span>

      </div>
    </div>
  )
}


function ColorSelector({ selected, onSelect }: { selected: string; onSelect: (color: string) => void }) {
  const selectedColor = colors.find((c) => c.hex === selected)?.name ?? selected;
  return (
    <div className="pb-6 border-b border-zinc-200 dark:border-zinc-700">
      <label className="text-sm font-medium">Color <span className='text-muted-foreground'>•</span> {selectedColor}</label>
      <div className="flex gap-3 mt-4">
        {colors.map((c) => (
          <button
            key={c.name}
            onClick={() => onSelect(c.hex)}
            className={cn(
              'w-6 h-6 rounded-full border-2',
              selected === c.hex ? 'border-black dark:border-white' : 'border-muted'
            )}
            style={{ backgroundColor: c.hex }}
          />
        ))}
      </div>
    </div>
  );
}


function SizeSelector({
  title,
  options,
  selected,
  onSelect,
}: {
  title: string
  options: string[]
  selected: string
  onSelect: (size: string) => void
}) {
  return (
    <div className="mt-4">
      <div className="text-sm mb-2 font-medium">{title}</div>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
        {options.map((size) => (
          <button
            key={size}
            onClick={() => onSelect(size)}
            className={cn(
              'w-full text-xs font-medium px-3 py-2 rounded-full bg-[#dbf227] text-black',
              selected === size
                ? 'bg-[#dbf227] text-black shadow'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
            )}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  )
}


function QuantitySelector({ quantity, setQuantity }: { quantity: number; setQuantity: (val: number) => void }) {
  return (
    <div className="flex flex-col gap-2 items-start">
      <label className="text-sm font-medium">Quantity</label>
      <div className="flex items-center gap-2">
        <button
          className="border rounded px-2 py-2"
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
        >
          <Minus className="w-5 h-5" />
        </button>
        <span className="text-sm">{quantity}</span>
        <button
          className="border rounded px-2 py-2"
          onClick={() => setQuantity(quantity + 1)}
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}


function FooterLinks() {
  return (
    <div className="mt-6 flex justify-evenly text-base ">
      <div className="flex gap-2 items-center cursor-pointer" role="button" onClick={handleNotImplemented}>
        <Package className='h-5 w-5'/> Delivery & Shipping
      </div>
      <div className="flex gap-2 items-center cursor-pointer" role="button" onClick={handleNotImplemented}>
      <MapPin className='h-5 w-5'/> Store Locations
      </div>
    </div>
  );
}

export default function ProductPage() {
  const [color, setColor] = useState(colors[0].hex)
  const [chest, setChest] = useState(chestSizes[1])
  const [torso, setTorso] = useState(torsoSizes[2])
  const [quantity, setQuantity] = useState(1)
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null)
  const [selectedModelIndex, setSelectedModelIndex] = useState(0);
  const selectedModel = models[selectedModelIndex];
  const [mainImage, setMainImage] = useState(selectedModel.mainImage);
  const [cartItems, setCartItems] = useState<CartItem[]>([])
const [isCartOpen, setIsCartOpen] = useState(false);
const [checkoutStep, setCheckoutStep] = useState(1);
const [formData, setFormData] = useState<FormData>({
  name: '',
  address: '',
  cardNumber: '',
  expiry: '',
  cvv: '',
});
  const price = 32

  return (
    <>
    <Header cartCount={cartItems.length} setIsCartOpen={setIsCartOpen}/>
   <Toaster position="top-center" richColors />
    <main className={`${inter.className} flex flex-col bg-background text-foreground px-6 py-10 md:px-16 lg:px-24 space-y-12`}>

      
      
      <CartDrawer 
        isOpen={isCartOpen} 
        checkoutStep={checkoutStep}
        cartItems={cartItems}
        setCartItems={setCartItems}
        setCheckoutStep={setCheckoutStep}
        formData={formData}
        setFormData={setFormData}
        onClose={() => {
          setFormData({
            name: '',
            address: '',
            cardNumber: '',
            expiry: '',
            cvv: '',
          });
          setIsCartOpen(false);
        }}
      />
      <Breadcrumbs />
      <div className="flex-1 grid lg:grid-cols-2 gap-12 pb-12">
          <div className='mb-8'>
          <ImageGallery
            mainImage={mainImage}
            thumbnails={selectedModel.secondaryImages}
            onImageClick={(img) => setFullscreenImage(img)}
            selectedModelIndex={selectedModelIndex}
            onModelSelect={(i) => {
              setSelectedModelIndex(i);
              setMainImage(models[i].mainImage);
            }}
            selectedModel={selectedModel}
          />
          </div>

        <div className="flex flex-col gap-8 overflow-hidden">
          <ProductInfo price={price} />

          <ColorSelector  selected={color} onSelect={setColor} />

          <SizeSection chest={chest} setChest={setChest} torso={torso} setTorso={setTorso} />

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6 border-b border-zinc-200 dark:border-zinc-700 pb-12">
            <QuantitySelector quantity={quantity} setQuantity={setQuantity} />

            <button
              onClick={() => {
                const newItem = {
                  model: selectedModel.name,
                  image: selectedModel.mainImage,
                  color,
                  chest,
                  torso,
                  quantity,
                  price: price * quantity
                };
                setCartItems(prev => [...prev, newItem]);
                toast.success("Added to cart!");
              }}
              className="group w-full sm:w-auto px-6 py-3 rounded bg-black text-white text-sm font-bold dark:bg-white dark:text-black hover:scale-[1.02] transition-transform relative overflow-hidden"
            >
              <span className="z-10 relative">${price * quantity} – Add to Cart</span>
              <div className="absolute inset-0 bg-yellow-300 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none" />
            </button>
          </div>


          <FooterLinks />
        </div>
      </div>
      {fullscreenImage && <FullscreenModal image={fullscreenImage} onClose={() => setFullscreenImage(null)} />}
    </main>
     </>
  )
}

